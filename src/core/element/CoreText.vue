<script setup>
import { useTemplateRef, reactive, watch, nextTick, computed } from 'vue'
const {
    x, y, text, title, size, color, stroke, linewidth, linetype, alpha,
    angle, translateX, translateY, anchorX, anchorY, dockX, dockY, fontSize, textLength
} = defineProps({
    x: { type: Number, default: 0 }, y: { type: Number, default: 0 },
    text: null, title: null, size: Number, color: String,
    stroke: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 },
    angle: { type: Number, default: 0 },
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
    anchorX: Number, anchorY: Number, dockX: Number, dockY: Number,
    fontSize: Number, textLength: Number,
})
const ele = useTemplateRef('ele')
const textBox = reactive({ width: 0, height: 0 })
watch(
    [ele, () => fontSize, () => size, () => text, () => textLength],
    async ([e]) => {
        if (!e) return
        await nextTick()
        let { width, height } = e.getBBox()
        textBox.width = width
        textBox.height = height
    }
)
const binds = computed(() => {
    let transform
    if (dockX != null || dockY != null) {
        let alnX = { left: 0, center: 0.5, right: 1 }[dockX] ?? +(dockX ?? 0.5),
            alnY = { bottom: 0, center: 0.5, top: 1 }[dockY] ?? +(dockY ?? 0.5)
        if (isNaN(alnX)) alnX = 0.5
        if (isNaN(alnY)) alnY = 0.5
        let w = textBox.width * Math.abs(Math.cos(angle * Math.PI / 180)) + textBox.height * Math.abs(Math.sin(angle * Math.PI / 180)),
            h = textBox.width * Math.abs(Math.sin(angle * Math.PI / 180)) + textBox.height * Math.abs(Math.cos(angle * Math.PI / 180)),
            dx = translateX, dy = translateY
        transform = `translate(${w * (0.5 - alnX) + dx},${h * (alnY - 0.5) + dy})`
        if (angle) transform += ` rotate(${angle})`
    } else {
        let alnX = { left: 0, center: 0.5, right: 1 }[anchorX] ?? +(anchorX ?? 0.5),
            alnY = { bottom: 0, center: 0.5, top: 1 }[anchorY] ?? +(anchorY ?? 0.5)
        if (isNaN(alnX)) alnX = 0.5
        if (isNaN(alnY)) alnY = 0.5
        let w = textBox.width, h = textBox.height,
            dx = translateX * Math.cos(angle * Math.PI / 180) + translateY * Math.sin(angle * Math.PI / 180),
            dy = translateY * Math.cos(angle * Math.PI / 180) - translateX * Math.sin(angle * Math.PI / 180)
        transform = `translate(${w * (0.5 - alnX) + dx},${h * (alnY - 0.5) + dy})`
        if (angle) transform = `rotate(${angle}) ` + transform
    }
    return {
        x, y,
        fill: color || null,
        'fill-opacity': alpha == 1 ? null : alpha,
        stroke: stroke || null,
        'stroke-width': linewidth,
        'stroke-dasharray': parseLineType(linetype),
        'stroke-opacity': alpha == 1 ? null : alpha,
        transform,
        textLength,
        lengthAdjust: textLength ? 'spacingAndGlyphs' : null,
        'transform-origin': `${x} ${y}`,
    }
})

function parseLineType(linetype) {
    if (linetype == null) return null
    if (Array.isArray(linetype)) return linetype.join(' ')
    if (linetype === 'solid') return null
    if (linetype === 'dashed') return '4 4'
    if (linetype === 'dotted') return '1 3'
    if (linetype === 'dotdash') return '1 3 4 3'
    if (linetype === 'longdash') return '8 4'
    if (linetype === 'twodash') return '2 2 6 2'
    if (linetype.includes(' ')) return linetype
    return linetype.split('').map(v => +('0x' + v)).join(' ')
}
</script>
<template>
    <text ref="ele" text-anchor="middle" dominant-baseline="central" v-bind="binds"
        :font-size="(fontSize ?? size * 4) || null">
        <slot>
            <title v-if="title">{{ title }}</title>
            {{ text.replace(/ /g, "\u00a0") }}
        </slot>
    </text>
</template>
