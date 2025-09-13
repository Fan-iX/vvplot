<script setup>
import { computed } from 'vue'
const {
    x1, y1, x2, y2, color, stroke, linewidth, linetype, alpha,
    translateX, translateY,
} = defineProps({
    x1: { type: Number, default: 0 }, y1: { type: Number, default: 0 },
    x2: { type: Number, default: 0 }, y2: { type: Number, default: 0 },
    color: String,
    stroke: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 },
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})

const binds = computed(() => {
    return {
        x1, x2, y1, y2,
        stroke: color,
        'stroke-width': linewidth,
        'stroke-opacity': alpha,
        'stroke-dasharray': parseLineType(linetype),
        transform: (translateX || translateY) ? `translate(${translateX}, ${translateY})` : null,
    }
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
    <line v-bind="binds" />
</template>
