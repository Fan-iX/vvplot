<script setup>
import { useTemplateRef, reactive, watch, nextTick, computed } from 'vue'
import { parseLinetype } from '#base/js/utils'
const {
    x, y, text, title, size, color, stroke, linewidth, linetype, alpha,
    angle, translateX, translateY, anchorX, anchorY, dockX, dockY, fontFamily, fontSize, textLength, textAnchor
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
    let { width, height } = textBox, transform = []
    let xoffset = ({ start: -0.5, end: 0.5 }[textAnchor] ?? 0) * width
    if (dockX != null || dockY != null) {
        let alnX = { left: 0, center: 0.5, right: 1 }[dockX] ?? +(dockX ?? 0.5),
            alnY = { bottom: 0, center: 0.5, top: 1 }[dockY] ?? +(dockY ?? 0.5)
        if (isNaN(alnX)) alnX = 0.5
        if (isNaN(alnY)) alnY = 0.5
        let w = width * Math.abs(Math.cos(angle * Math.PI / 180)) + height * Math.abs(Math.sin(angle * Math.PI / 180)),
            h = width * Math.abs(Math.sin(angle * Math.PI / 180)) + height * Math.abs(Math.cos(angle * Math.PI / 180)),
            dx = translateX, dy = translateY
        transform.push(`translate(${w * (0.5 - alnX) + dx},${h * (alnY - 0.5) + dy})`)
        if (angle) transform.push(`rotate(${angle})`)
        transform.push(`translate(${xoffset},0)`)
    } else {
        let alnX = { left: 0, center: 0.5, right: 1 }[anchorX] ?? +(anchorX ?? 0.5),
            alnY = { bottom: 0, center: 0.5, top: 1 }[anchorY] ?? +(anchorY ?? 0.5)
        if (isNaN(alnX)) alnX = 0.5
        if (isNaN(alnY)) alnY = 0.5
        let w = width, h = height,
            dx = translateX * Math.cos(angle * Math.PI / 180) + translateY * Math.sin(angle * Math.PI / 180),
            dy = translateY * Math.cos(angle * Math.PI / 180) - translateX * Math.sin(angle * Math.PI / 180)
        if (angle) transform.push(`rotate(${angle})`)
        transform.push(`translate(${w * (0.5 - alnX) + dx + xoffset},${h * (alnY - 0.5) + dy})`)
    }
    return {
        x, y,
        color: color || null,
        fill: color || null,
        'fill-opacity': alpha == 1 ? null : alpha,
        stroke: stroke || null,
        'stroke-width': linewidth,
        'stroke-dasharray': parseLinetype(linetype).join(" ") || null,
        'stroke-opacity': alpha == 1 ? null : alpha,
        transform: transform.join(' ') || null,
        'font-family': fontFamily || null,
        textLength,
        lengthAdjust: textLength ? 'spacingAndGlyphs' : null,
        'transform-origin': `${x} ${y}`,
        'text-anchor': textAnchor,
        'dominant-baseline': 'central',
    }
})
</script>
<template>
    <text ref="ele" v-bind="binds" :font-size="(fontSize ?? size * 4) || null">
        <slot>
            <title v-if="title">{{ title }}</title>
            {{ text.replace(/ /g, "\u00a0") }}
        </slot>
    </text>
</template>
