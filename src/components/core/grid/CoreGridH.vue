<script setup>
import { computed } from 'vue'
const { majorBreaks, minorBreaks, coord2pos, layout, theme, translate, transcale, transition } = defineProps({
    majorBreaks: { type: Array, default: () => [] },
    minorBreaks: { type: Array, default: () => [] },
    coord2pos: Function,
    pos2coord: Function,
    layout: Object,
    theme: { type: Object, default: () => ({}) },
    action: { type: Object, default: () => ({}) },
    translate: { type: Number, default: 0 },
    transcale: Object, transition: String,
})
const width = computed(() => layout.width + layout.l + layout.r)
const height = computed(() => layout.height + layout.t + layout.b)

const majorLines = computed(() => {
    let result = []
    for (let line of majorBreaks) {
        if (line?.position == null) line = { position: +line }
        let position = coord2pos({ v: line.position }).v + layout.t
        let tsl = translate
        if (transcale?.ratio != null)
            tsl += (1 - transcale.ratio) * ((transcale.origin ?? 0.5) * height.value - position)
        if (position + tsl < 0 || position + tsl > height.value) continue
        result.push({
            key: 'major-' + line.position,
            x1: 0, x2: width.value,
            y1: position, y2: position,
            'stroke': line.color ?? theme.line_color_major,
            'stroke-width': line.width ?? theme.line_width_major ?? 0,
            transform: tsl ? `translate(0,${tsl})` : null,
            style: { transition },
        })
    }
    return result.filter(l => l.stroke !== null)
})
const minorLines = computed(() => {
    let result = []
    for (let line of minorBreaks) {
        if (line?.position == null) line = { position: +line }
        let position = coord2pos({ v: line.position }).v + layout.t
        let tsl = translate
        if (transcale?.ratio != null)
            tsl += (1 - transcale.ratio) * ((transcale.origin ?? 0.5) * height.value - position)
        if (position + tsl < 0 || position + tsl > height.value) continue
        result.push({
            key: 'minor-' + line.position,
            x1: 0, x2: width.value,
            y1: position, y2: position,
            'stroke': line.color ?? theme.line_color_minor,
            'stroke-width': line.width ?? theme.line_width_minor ?? 0,
            transform: tsl ? `translate(0,${tsl})` : null,
            style: { transition },
        })
    }
    return result.filter(l => l.stroke !== null && majorLines.value.every(ml => ml.y1 !== l.y1))
})
</script>
<template>
    <g>
        <line v-for="line in minorLines" v-bind="line" :style="{ transition }" />
        <line v-for="line in majorLines" v-bind="line" :style="{ transition }" />
    </g>
</template>
