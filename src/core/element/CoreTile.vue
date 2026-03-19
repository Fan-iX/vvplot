<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#base/js/utils'
const {
    x, y, width, height, fill, color, linewidth, linetype, alpha, title,
    translateX, translateY,
} = defineProps({
    x: { type: Number, default: 0 }, y: { type: Number, default: 0 },
    width: { type: Number, default: 0 }, height: { type: Number, default: 0 },
    fill: String,
    color: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 }, title: String,
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})
const binds = computed(() => {
    return {
        x: x - width / 2, y: y - height / 2, width, height,
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
    <rect v-bind="binds">
        <title v-if="title">{{ title }}</title>
    </rect>
</template>
