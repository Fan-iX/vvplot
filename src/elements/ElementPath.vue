<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#src/core/utils.js'
import { line, curveCardinal, curveCardinalClosed, curveCatmullRom, curveCatmullRomClosed, curveLinear, curveLinearClosed, curveNatural } from 'd3-shape'
const {
    d, fill, color, linewidth, linetype, alpha, title,
    translateX, translateY,
} = defineProps({
    d: String,
    fill: String, color: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 }, title: String,
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})
const binds = computed(() => {
    return {
        d,
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
</script>
<template>
    <path v-bind="binds">
        <title v-if="title">{{ title }}</title>
    </path>
</template>
