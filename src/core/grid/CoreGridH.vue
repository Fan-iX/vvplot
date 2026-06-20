<script setup>
import { computed } from 'vue'
const { breaks, coord2pos, layout, activeTransform, transition } = defineProps({
    breaks: { type: Array, default: () => [] },
    coord2pos: Function,
    pos2coord: Function,
    layout: Object,
    action: { type: Object, default: () => ({}) },
    activeTransform: Object, transition: String,
})
const width = computed(() => layout.width + layout.l + layout.r)
const height = computed(() => layout.height + layout.t + layout.b)

const majorLines = computed(() => {
    let result = []
    for (let b of breaks) {
        if (b.type != "major") continue
        let pos = coord2pos({ v: b.value }).v
        if (isNaN(pos)) continue
        let tsl = pos * (activeTransform.scaleV - 1) + activeTransform.translateV
        pos += layout.t
        if (pos + tsl < 0 || pos + tsl > height.value) continue
        result.push({
            key: 'major-' + b.value,
            x1: 0, x2: width.value,
            y1: pos, y2: pos,
            'stroke': b.theme.grid_color_major,
            'stroke-width': b.theme.grid_width_major ?? 0,
            transform: tsl ? `translate(0,${tsl})` : null,
            style: { transition },
        })
    }
    return result.filter(l => l.stroke !== null)
})
const minorLines = computed(() => {
    let result = []
    for (let b of breaks) {
        if (b.type != "minor") continue
        let pos = coord2pos({ v: b.value }).v
        if (isNaN(pos)) continue
        let tsl = pos * (activeTransform.scaleV - 1) + activeTransform.translateV
        pos += layout.t
        if (pos + tsl < 0 || pos + tsl > height.value) continue
        result.push({
            key: 'minor-' + b.value,
            x1: 0, x2: width.value,
            y1: pos, y2: pos,
            'stroke': b.theme.grid_color_minor,
            'stroke-width': b.theme.grid_width_minor ?? 0,
            transform: tsl ? `translate(0,${tsl})` : null,
            style: { transition },
        })
    }
    return result.filter(l => l.stroke !== null)
})
const lines = computed(() => minorLines.value.concat(majorLines.value).sort((a, b) => a.y1 - b.y1))
</script>
<template>
    <g>
        <line v-for="line in lines" v-bind="line" :style="{ transition }" />
    </g>
</template>
