<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#base/js/utils'
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
        'font-family': fontFamily = "sans-serif", 'text-align': textAlign = 'justify', angle = 'auto', inset = 0,
        $raw
    }) => {
        if (label == null) return null
        const { h: x1, v: y1 } = coord2pos({ x: x, y: y })
        const { h: x2, v: y2 } = coord2pos({ x: xend, y: yend })
        if (
            x1 < xlim_min && x2 < xlim_min || x1 > xlim_max && x2 > xlim_max ||
            y1 < ylim_min && y2 < ylim_min || y1 > ylim_max && y2 > ylim_max
        ) return null
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
        if (["stretch", "pre", "start", "center", "end", "post"].includes(textAlign)) {
            let radian = Math.atan2(y2 - y1, x2 - x1)
            let tx, ty, content = String(label).replace(/\x01|\x02/g, '')
            let insetX = Math.cos(radian) * inset, insetY = Math.sin(radian) * inset
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
                    translateX -= insetX
                    translateY -= insetY
                    vbind['text-anchor'] = 'end'
                    break
                case "start":
                    tx = x1
                    ty = y1
                    translateX += insetX
                    translateY += insetY
                    vbind['text-anchor'] = 'start'
                    break
                case "end":
                    tx = x2
                    ty = y2
                    translateX -= insetX
                    translateY -= insetY
                    vbind['text-anchor'] = 'end'
                    break
                case "post":
                    tx = x2
                    ty = y2
                    translateX += insetX
                    translateY += insetY
                    vbind['text-anchor'] = 'start'
                    break
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
        } else { // justify
            if (angle === 'auto') angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
            let parts = splitLabel(String(label))
            let dx = (x2 - x1) / (parts.length - 1 || 1),
                dy = (y2 - y1) / (parts.length - 1 || 1)
            let content = parts.map((label, i) => {
                let vbind = {
                    x: x1 + i * dx, y: y1 + i * dy,
                    'text-anchor': 'middle',
                    'dominant-baseline': 'central',
                    rotate: angle,
                }
                return [vbind, label]
            })
            if (translateX || translateY) vbind.transform = `translate(${translateX}, ${translateY})`
            return [vbind, von, content, String(title ?? String(label).replace(/\x01|\x02/g, ''))]
        }
    }).filter(x => x != null))
})
/**
 * split label into parts, use \x01 and \x02 to represent start and end of a segment
 * @param {string} label 
 * @returns {Array}
 */
function splitLabel(label) {
    let result = []
    for (let i = 0; i < label.length; i++) {
        if (label[i] == '\x01') {
            let j = i + 1
            while (j < label.length && label[j] != '\x02') j++
            result.push(label.slice(i + 1, j))
            i = j
        } else {
            result.push(label[i])
        }
    }
    return result
}
</script>
<template>
    <g>
        <g v-for="group in binds">
            <template v-for="[vbind, von, content, title] in group">
                <text v-bind="vbind" v-on="von">
                    <title>{{ title }}</title>
                    <template v-if="typeof content === 'string'">
                        {{ content.replace(/ /g, "\u00a0") }}
                    </template>
                    <template v-for="[vbind, label] in content" v-else>
                        <tspan v-if="label" v-bind="vbind">{{ label }}</tspan>
                    </template>
                </text>
            </template>
        </g>
    </g>
</template>
