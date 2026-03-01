<script setup>
import { computed } from 'vue'
import { Parser as MarkdownParser } from 'commonmark'
import { parseLinetype, str_c } from '#base/js/utils'
const { extendX, extendY, data, coord2pos, getCoord, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, getCoord: Function, layout: Object
})
let events = ['click', 'contextmenu', 'singleclick', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'wheel']
const emit = defineEmits(['click', 'contextmenu', 'singleclick', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'wheel'])

const binds = computed(() => {
    let xlim_min = -layout.fullWidth * extendX - layout.l,
        xlim_max = layout.fullWidth * (1 + extendX) - layout.l,
        ylim_min = -layout.fullHeight * extendY - layout.t,
        ylim_max = layout.fullHeight * (1 + extendY) - layout.t
    return data.map(group => group.map(({
        x, xend, y, yend, size = 4, label, title,
        color, stroke, linewidth, linetype, alpha,
        'translate-x': translateX = 0, 'translate-y': translateY = 0,
        'font-family': fontFamily = "sans-serif", 'text-align': textAlign = 'start', inset = 0,
        $raw
    }) => {
        if (label == null) return null
        const { h: x1, v: y1 } = coord2pos({ x: x, y: y })
        const { h: x2, v: y2 } = coord2pos({ x: xend, y: yend })
        if (
            x1 < xlim_min && x2 < xlim_min || x1 > xlim_max && x2 > xlim_max ||
            y1 < ylim_min && y2 < ylim_min || y1 > ylim_max && y2 > ylim_max
        ) return null
        let radian = Math.atan2(y2 - y1, x2 - x1)
        let vbind = {
            fill: color,
            'font-size': size * 4,
            stroke: stroke,
            'stroke-width': linewidth,
            'stroke-dasharray': parseLinetype(linetype).join(" ") || null,
            'fill-opacity': alpha,
            'stroke-opacity': alpha,
            'font-family': fontFamily,
        }
        let von = Object.fromEntries(
            events.map(evt => [evt, (e) => emit(evt, Object.assign(e, { _vhandled: true }), getCoord(e), $raw)])
        )
        let tx, ty, content = parseMarkdownInline(String(label))
        switch (textAlign) {
            case "stretch":
                tx = (x1 + x2) / 2
                ty = (y1 + y2) / 2
                vbind['text-anchor'] = 'middle'
                vbind.textLength = Math.hypot(x2 - x1 || 0, y2 - y1 || 0)
                vbind.lengthAdjust = 'spacingAndGlyphs'
                break
            case "center":
                tx = (x1 + x2) / 2
                ty = (y1 + y2) / 2
                vbind['text-anchor'] = 'middle'
                break
            case "pre":
                tx = x1
                ty = y1
                translateX -= Math.cos(radian) * inset
                translateY -= Math.sin(radian) * inset
                vbind['text-anchor'] = 'end'
                break
            case "end":
                tx = x2
                ty = y2
                translateX -= Math.cos(radian) * inset
                translateY -= Math.sin(radian) * inset
                vbind['text-anchor'] = 'end'
                break
            case "post":
                tx = x2
                ty = y2
                translateX += Math.cos(radian) * inset
                translateY += Math.sin(radian) * inset
                vbind['text-anchor'] = 'start'
                break
            default:
                tx = x1
                ty = y1
                translateX += Math.cos(radian) * inset
                translateY += Math.sin(radian) * inset
                vbind['text-anchor'] = 'start'
        }
        let transform = []
        if (translateX || translateY) transform.push(`translate(${translateX}, ${translateY})`)
        if (radian) transform.push(`rotate(${radian * 180 / Math.PI})`)
        Object.assign(vbind, {
            x: tx, y: ty,
            'dominant-baseline': 'central',
            'transform-origin': `${tx} ${ty}`,
            transform: transform.join(' ') || null
        })
        return [vbind, von, content, String(title ?? String(label).replace(/\x01|\x02/g, ''))]
    }).filter(x => x != null))
})

const parser = new MarkdownParser()
function parseMarkdownInline(markdown) {
    const walker = parser.parse(markdown).walker()
    const fragments = []
    let stack = [], scales = [1], offset = 0
    let ev
    while (ev = walker.next()) {
        let { node: { type, literal }, entering } = ev
        let scale = scales.at(-1)
        if (entering) {
            if (type === 'text' || type === 'code') {
                const vbind = Object.assign({
                    dy: str_c(offset || null, "em"),
                }, ...stack, {
                    'font-family': type === 'code' ? 'monospace' : null,
                    'font-size': scale === 1 ? null : `${scale}em`,
                })
                offset = 0
                fragments.push({ text: literal, vbind })
            } else if (type === 'strong') {
                stack.push({ 'font-weight': 'bold' })
            } else if (type === 'emph') {
                stack.push({ 'font-style': 'italic' })
            } else if (type === 'softbreak' || type === 'paragraph') {
                fragments.push({ text: ' ' })
            } else if (type === 'html_inline') {
                const tag = literal
                if (tag.includes('color=')) {
                    const fill = tag.match(/color=(['"])(.*?)\1/i)?.[2] ?? tag.match(/color=(\S*)/)?.[1]
                    if (fill) stack.push({ fill })
                } else if (tag.includes('</font>')) {
                    stack.pop()
                } else if (tag.includes('<sup>')) {
                    offset -= 0.4 * scale
                    scales.push(scale * 0.7)
                } else if (tag.includes('</sup>')) {
                    offset += 0.4 * scales.at(-1)
                    scales.pop()
                } else if (tag.includes('<sub>')) {
                    offset += 0.25 * scale
                    scales.push(scale * 0.7)
                } else if (tag.includes('</sub>')) {
                    offset -= 0.25 * scales.at(-1)
                    scales.pop()
                }
            }
        } else {
            if (['strong', 'emph'].includes(type)) stack.pop()
        }
    }
    return fragments
}
</script>
<template>
    <g>
        <g v-for="group in binds">
            <template v-for="[vbind, von, textFragments, title] in group">
                <text v-bind="vbind" v-on="von">
                    <title>{{ title }}</title>
                    <tspan v-for="tspan in textFragments" v-bind="tspan.vbind">{{ tspan.text }}</tspan>
                </text>
            </template>
        </g>
    </g>
</template>
