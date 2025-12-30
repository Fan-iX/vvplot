<script setup>
import { computed } from 'vue'
const { majorBreaks, minorBreaks, coord2pos, layout, theme, activeTransform, transition } = defineProps({
    majorBreaks: { type: Array, default: () => [] },
    minorBreaks: { type: Array, default: () => [] },
    coord2pos: Function,
    pos2coord: Function,
    layout: Object,
    theme: { type: Object, default: () => ({}) },
    action: { type: Object, default: () => ({}) },
    activeTransform: Object, transition: String,
})
const width = computed(() => layout.width + layout.l + layout.r)
const height = computed(() => layout.height + layout.t + layout.b)

const majorLines = computed(() => {
    let result = []
    for (let line of majorBreaks) {
        let pos = coord2pos({ h: line.position }).h
        if (isNaN(pos)) continue
        let tsl = pos * (activeTransform.scaleH - 1) + activeTransform.translateH
        let position = pos + layout.l
        if (position + tsl < 0 || position + tsl > width.value) continue
        result.push({
            key: 'major-' + line.position,
            y1: 0, y2: height.value,
            x1: position, x2: position,
            'stroke': line.color ?? theme.line_color_major,
            'stroke-width': line.width ?? theme.line_width_major ?? 0,
            transform: tsl ? `translate(${tsl},0)` : null,
            style: { transition },
        })
    }
    return result.filter(l => l.stroke !== null)
})
const minorLines = computed(() => {
    let result = []
    for (let line of minorBreaks) {
        if (majorBreaks.some(ml => ml.position == line.position)) continue
        let pos = coord2pos({ h: line.position }).h
        if (isNaN(pos)) continue
        let tsl = pos * (activeTransform.scaleH - 1) + activeTransform.translateH
        let position = pos + layout.l
        if (position + tsl < 0 || position + tsl > width.value) continue
        result.push({
            key: 'minor-' + line.position,
            y1: 0, y2: height.value,
            x1: position, x2: position,
            'stroke': line.color ?? theme.line_color_minor,
            'stroke-width': line.width ?? theme.line_width_minor ?? 0,
            transform: tsl ? `translate(${tsl},0)` : null,
            style: { transition },
        })
    }
    return result.filter(l => l.stroke !== null)
})
const lines = computed(() => minorLines.value.concat(majorLines.value).sort((a, b) => a.x1 - b.x1))
</script>
<template>
    <g>
        <line v-for="line in lines" v-bind="line" :style="{ transition }" />
    </g>
</template>
