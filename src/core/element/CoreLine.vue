<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#base/js/utils'
const {
    x1, y1, x2, y2, color, stroke, linewidth, linetype, alpha, title,
    translateX, translateY,
} = defineProps({
    x1: { type: Number, default: 0 }, y1: { type: Number, default: 0 },
    x2: { type: Number, default: 0 }, y2: { type: Number, default: 0 },
    color: String,
    stroke: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 }, title: String,
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})

const binds = computed(() => {
    return {
        x1, x2, y1, y2,
        color: color || null,
        stroke: color || null,
        'stroke-width': linewidth,
        'stroke-opacity': alpha == 1 ? null : alpha,
        'stroke-dasharray': parseLinetype(linetype).join(" ") || null,
        transform: (translateX || translateY) ? `translate(${translateX}, ${translateY})` : null,
    }
})
</script>
<template>
    <line v-bind="binds">
        <title v-if="title">{{ title }}</title>
    </line>
</template>
