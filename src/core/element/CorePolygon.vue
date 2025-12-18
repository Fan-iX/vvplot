<script setup>
import { computed } from 'vue'
const {
    points, fill, color, linewidth, linetype, alpha,
    translateX, translateY,
} = defineProps({
    points: { type: Array, default: () => [] },
    fill: String,
    color: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 },
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})
const binds = computed(() => {
    return {
        points: points.map(p => `${p.x},${p.y}`).join(' '),
        fill: fill || null,
        'fill-opacity': alpha == 1 ? null : alpha,
        stroke: color || null,
        'stroke-width': linewidth,
        'stroke-opacity': alpha == 1 ? null : alpha,
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
    <polygon v-bind="binds" />
</template>
