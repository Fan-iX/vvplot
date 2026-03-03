<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#base/js/utils'
const {
    cx, cy, rx, ry, angle,
    fill, color, linewidth, linetype, alpha, title,
    translateX, translateY,
} = defineProps({
    cx: { type: Number, default: 0 }, cy: { type: Number, default: 0 },
    rx: { type: Number, default: 0 }, ry: { type: Number, default: 0 },
    angle: { type: Number, default: 0 },
    fill: String,
    color: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 }, title: String,
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})
const binds = computed(() => {
    let transform = []
    if (translateX || translateY) transform.push(`translate(${translateX}, ${translateY})`)
    if (angle) transform.push(`rotate(${angle})`)
    return {
        cx, cy, rx, ry,
        fill: fill || null,
        'fill-opacity': alpha == 1 ? null : alpha,
        stroke: color || null,
        'stroke-width': linewidth,
        'stroke-opacity': alpha == 1 ? null : alpha,
        'stroke-dasharray': parseLinetype(linetype).join(" ") || null,
        transform: transform.join(' ') || null,
        'transform-origin': `${cx} ${cy}`,
    }
})
</script>
<template>
    <ellipse v-bind="binds">
        <title v-if="title">{{ title }}</title>
    </ellipse>
</template>
