<script setup>
import { useTemplateRef, reactive, watch, nextTick, computed } from 'vue'
import { Parser as MarkdownParser } from 'commonmark'
import { parseLinetype, str_c } from '#base/js/utils'
const {
    x, y, text, title, size, color, stroke, linewidth, linetype, alpha,
    angle, translateX, translateY, anchorX, anchorY, dockX, dockY,
    fontFamily, fontSize, textLength, textAnchor
} = defineProps({
    x: { type: Number, default: 0 }, y: { type: Number, default: 0 },
    text: null, title: null, size: Number, color: String,
    stroke: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 },
    angle: { type: Number, default: 0 },
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
    anchorX: Number, anchorY: Number, dockX: Number, dockY: Number,
    fontFamily: String, fontSize: Number, textLength: Number, textAnchor: { type: String, default: 'middle' },
})
const parser = new MarkdownParser()
const ele = useTemplateRef('ele')
const textBox = reactive({ width: 0, height: 0 })
watch(
    [ele, () => fontSize, () => size, () => text, () => textLength, () => fontFamily],
    async ([e]) => {
        if (!e) return
        await nextTick()
        let { width, height } = e.getBBox()
        textBox.width = width
        textBox.height = height
    }
)
const binds = computed(() => {
    let { width, height } = textBox, transform = ""
    let xoffset = ({ start: -0.5, end: 0.5 }[textAnchor] ?? 0) * width
    if (dockX != null || dockY != null) {
        let alnX = { left: 0, center: 0.5, right: 1 }[dockX] ?? +(dockX ?? 0.5),
            alnY = { bottom: 0, center: 0.5, top: 1 }[dockY] ?? +(dockY ?? 0.5)
        if (isNaN(alnX)) alnX = 0.5
        if (isNaN(alnY)) alnY = 0.5
        let w = width * Math.abs(Math.cos(angle * Math.PI / 180)) + height * Math.abs(Math.sin(angle * Math.PI / 180)),
            h = width * Math.abs(Math.sin(angle * Math.PI / 180)) + height * Math.abs(Math.cos(angle * Math.PI / 180)),
            dx = translateX, dy = translateY
        transform += `translate(${w * (0.5 - alnX) + dx},${h * (alnY - 0.5) + dy})`
        if (angle) transform += ` rotate(${angle})`
        transform += ` translate(${xoffset},${-height / 2})`
    } else {
        let alnX = { left: 0, center: 0.5, right: 1 }[anchorX] ?? +(anchorX ?? 0.5),
            alnY = { bottom: 0, center: 0.5, top: 1 }[anchorY] ?? +(anchorY ?? 0.5)
        if (isNaN(alnX)) alnX = 0.5
        if (isNaN(alnY)) alnY = 0.5
        let w = width, h = height,
            dx = translateX * Math.cos(angle * Math.PI / 180) + translateY * Math.sin(angle * Math.PI / 180),
            dy = translateY * Math.cos(angle * Math.PI / 180) - translateX * Math.sin(angle * Math.PI / 180)
        if (angle) transform += `rotate(${angle}) `
        transform += `translate(${w * (0.5 - alnX) + dx + xoffset},${h * (alnY - 0.5) + dy - height / 2})`
    }
    return {
        x, y,
        fill: color || null,
        'fill-opacity': alpha == 1 ? null : alpha,
        stroke: stroke || null,
        'stroke-width': linewidth,
        'stroke-dasharray': parseLinetype(linetype).join(" ") || null,
        'stroke-opacity': alpha == 1 ? null : alpha,
        transform,
        'font-family': fontFamily || null,
        textLength,
        lengthAdjust: textLength ? 'spacingAndGlyphs' : null,
        'transform-origin': `${x} ${y}`,
    }
})

const textFragments = computed(() => {
    const walker = parser.parse(String(text)).walker()
    const fragments = []
    let stack = [], scales = [1], offset = 0, nl = true
    let ev
    while (ev = walker.next()) {
        let { node: { type, literal }, entering } = ev
        let scale = scales.at(-1)
        if (entering) {
            if (type === 'text' || type === 'code') {
                let dy = offset + (nl ? 1 : 0)
                const vbind = Object.assign({
                    x: nl ? x : null,
                    dy: str_c(dy || null, "em"),
                }, ...stack, {
                    'font-family': type === 'code' ? 'monospace' : null,
                    'font-size': scale === 1 ? null : `${scale}em`,
                })
                offset = 0
                nl = false
                fragments.push({ text: literal, vbind })
            } else if (type === 'strong') {
                stack.push({ 'font-weight': 'bold' })
            } else if (type === 'emph') {
                stack.push({ 'font-style': 'italic' })
            } else if (type === 'softbreak' || type === 'paragraph') {
                fragments.push({ text: '\n' })
                nl = true
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
})
</script>
<template>
    <text ref="ele" v-bind="binds" :text-anchor="textAnchor" :font-size="(fontSize ?? size * 4) || null">
        <title v-if="title">{{ title }}</title>
        <tspan v-for="span in textFragments" v-bind="span.vbind">{{ span.text }}</tspan>
    </text>
</template>
