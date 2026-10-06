<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#base/js/utils.js'
import { line, curveCardinal, curveCardinalClosed, curveCatmullRom, curveCatmullRomClosed, curveLinear, curveLinearClosed, curveNatural } from 'd3-shape'
const {
    points, interpolate, fill, color, linewidth, linetype, alpha, title,
    translateX, translateY,
} = defineProps({
    points: { type: Array, default: () => [] }, interpolate: { default: 'natural' },
    fill: String, color: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 }, title: String,
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})
const binds = computed(() => {
    let interpolatorFn = typeof interpolate == "function" ? interpolate : interpolators[interpolate] ?? curveNatural
    return {
        d: line().curve(interpolatorFn)(points.map(p => [p.x, p.y])),
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
    cardinal: curveCardinal,
    cardinalClosed: curveCardinalClosed,
    catmullRom: curveCatmullRom,
    catmullRomClosed: curveCatmullRomClosed,
    linear: curveLinear,
    linearClosed: curveLinearClosed,
    natural: curveNatural,
}
</script>
<template>
    <path v-bind="binds">
        <title v-if="title">{{ title }}</title>
    </path>
</template>
