<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#base/js/utils'
import * as d3 from 'd3'
const {
    points, interpolate, fill, color, stroke, linewidth, linetype, alpha, title,
    translateX, translateY,
} = defineProps({
    points: { type: Array, default: () => [] }, interpolate: { default: 'natural' },
    fill: { type: String, default: 'none' },
    color: String,
    stroke: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 }, title: String,
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})
const binds = computed(() => {
    let interpolatorFn = interpolators[interpolate] ?? d3.curveNatural
    return {
        d: d3.line().curve(interpolatorFn)(points.map(p => [p.x, p.y])),
        color: color || null,
        fill: fill || null,
        'fill-opacity': alpha == 1 ? null : alpha,
        stroke: color || null,
        'stroke-width': linewidth,
        'stroke-opacity': alpha == 1 ? null : alpha,
        'stroke-dasharray': parseLinetype(linetype).join(" ") || null,
        transform: (translateX || translateY) ? `translate(${translateX}, ${translateY})` : null,
    }
})

const interpolators = {
    cardinal: d3.curveCardinal,
    catmullRom: d3.curveCatmullRom,
    linear: d3.curveLinear,
    natural: d3.curveNatural,
}
</script>
<template>
    <path v-bind="binds">
        <title v-if="title">{{ title }}</title>
    </path>
</template>
