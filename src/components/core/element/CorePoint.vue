<script setup>
import { computed } from 'vue'
const {
    x, y, shape, size, color, stroke, linewidth, linetype, alpha,
    angle, translateX, translateY,
} = defineProps({
    x: { type: Number, default: 0 }, y: { type: Number, default: 0 },
    shape: String, size: { type: Number, default: 6 }, color: String,
    stroke: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 },
    angle: { type: Number, default: 0 },
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})

const paths = {
    square: "M-0.5-0.5H0.5V0.5H-0.5Z",
    triangle: "M0-0.667L0.577,0.333L-0.577,0.333Z",
    diamond: "M0-0.707L0.707,0L0,0.707L-0.707,0Z",
    plus: "M-0.1-0.5V-0.1H-0.5V0.1H-0.1V0.5H0.1V0.1H0.5V-0.1H0.1V-0.5H-0.1Z",
    cross: "M-0.283-0.424L-0.424-0.283L-0.141,0L-0.424,0.283L-0.283,0.424L0,0.141L0.283,0.424L0.424,0.283L0.141,0L0.424,-0.283L0.283,-0.424L0,-0.141Z",
}
const binds = computed(() => {
    let d = shape?.startsWith?.("path:") ? shape?.slice?.(5) : paths[shape]
    let result = {
        fill: color,
        'fill-opacity': alpha,
        stroke,
        'stroke-width': linewidth,
        'stroke-opacity': alpha,
        'stroke-dasharray': parseLineType(linetype),
    }
    if (d != null) {
        let transform = `translate(${x + translateX},${y + translateY}) scale(${size}) rotate(${angle})`
        Object.assign(result, { d, transform })
    } else {
        let transform = (translateX || translateY) ? `translate(${translateX}, ${translateY})` : null
        Object.assign(result, { cx: x, cy: y, r: size / 2, transform })
    }
    return result
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
    <path v-if="binds.d" v-bind="binds" />
    <circle v-else v-bind="binds" />
</template>
