<script setup>
import { computed } from 'vue'
const { majorBreaks, minorBreaks, coord2pos, layout, theme, translate, transcale } = defineProps({
    majorBreaks: { type: Array, default: () => [] },
    minorBreaks: { type: Array, default: () => [] },
    coord2pos: Function,
    pos2coord: Function,
    layout: Object,
    theme: { type: Object, default: () => ({}) },
    action: { type: Object, default: () => ({}) },
    translate: { type: Number, default: 0 },
    transcale: Object,
})
const width = computed(() => layout.width + layout.l + layout.r)
const height = computed(() => layout.height + layout.t + layout.b)

const majorLines = computed(() => {
    let result = []
    for (let line of majorBreaks) {
        if (line?.position == null) line = { position: +line }
        let position = coord2pos({ v: line.position }).v + layout.t + translate
        if (transcale?.ratio != null)
            position = position * transcale.ratio + (1 - transcale.ratio) * (transcale.origin ?? 0.5) * height.value
        if (position < 0 || position > height.value) continue
        result.push({
            x1: 0, x2: width.value,
            y1: position, y2: position,
            'stroke': line.color ?? theme.line_color_major,
            'stroke-width': line.width ?? theme.line_width_major ?? 0,
        })
    }
    return result.filter(l => l.stroke !== null)
})
const minorLines = computed(() => {
    let result = []
    for (let line of minorBreaks) {
        if (line?.position == null) line = { position: +line }
        let position = coord2pos({ v: line.position }).v + layout.t + translate
        if (transcale?.ratio != null)
            position = position * transcale.ratio + (1 - transcale.ratio) * (transcale.origin ?? 0.5) * height.value
        if (position < 0 || position > height.value) continue
        result.push({
            x1: 0, x2: width.value,
            y1: position, y2: position,
            'stroke': line.color ?? theme.line_color_minor,
            'stroke-width': line.width ?? theme.line_width_minor ?? 0,
        })
    }
    return result.filter(l => l.stroke !== null && majorLines.value.every(ml => ml.y1 !== l.y1))
})
</script>
<template>
    <g>
        <line v-for="line in minorLines" v-bind="line" />
        <line v-for="line in majorLines" v-bind="line" />
    </g>
</template>
