<script setup>
import { computed } from 'vue'
const {
    x, y, width, height, fill, color, linewidth, linetype, alpha,
    translateX, translateY,
} = defineProps({
    x: { type: Number, default: 0 }, y: { type: Number, default: 0 },
    width: { type: Number, default: 0 }, height: { type: Number, default: 0 },
    fill: String,
    color: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 },
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})
const binds = computed(() => {
    return {
        x: x - width / 2, y: y - height / 2, width, height,
        fill: fill,
        'fill-opacity': alpha,
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
    <rect v-bind="binds" />
</template>
