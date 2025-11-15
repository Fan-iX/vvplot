<script setup>
import { computed } from 'vue'
import * as d3 from 'd3'
const {
    points, interpolate, fill, color, stroke, linewidth, linetype, alpha,
    translateX, translateY,
} = defineProps({
    points: { type: Array, default: () => [] }, interpolate: { default: 'natural' },
    fill: { type: String, default: 'none' },
    color: String,
    stroke: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 },
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})
const binds = computed(() => {
    let interpolatorFn = interpolators[interpolate] ?? d3.curveNatural
    return {
        d: d3.line().curve(interpolatorFn)(points.map(p => [p.x, p.y])),
        fill: fill,
        stroke: color,
        'stroke-width': linewidth,
        'stroke-opacity': alpha,
        'stroke-dasharray': parseLineType(linetype),
        transform: (translateX || translateY) ? `translate(${translateX}, ${translateY})` : null,
    }
})

const interpolators = {
    cardinal: d3.curveCardinal,
    catmullRom: d3.curveCatmullRom,
    linear: d3.curveLinear,
    natural: d3.curveNatural,
}

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
    <path v-bind="binds" />
</template>
