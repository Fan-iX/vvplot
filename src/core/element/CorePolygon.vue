<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#base/js/utils'
const {
    points, fill, color, linewidth, linetype, alpha, title,
    translateX, translateY,
} = defineProps({
    points: { type: Array, default: () => [] },
    fill: String,
    color: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 }, title: String,
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})
const binds = computed(() => {
    return {
        points: points.map(p => `${p.x},${p.y}`).join(' '),
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
    <polygon v-bind="binds">
        <title v-if="title">{{ title }}</title>
    </polygon>
</template>
