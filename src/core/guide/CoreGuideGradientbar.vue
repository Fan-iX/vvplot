<script setup>
import { ref, computed, watch, useTemplateRef, nextTick } from 'vue'
import CoreTile from '../element/CoreTile.vue'
const { scales, appearance, theme, breaks, limits } = defineProps({
    scales: Array,
    appearance: { type: Object, default: () => ({}) },
    theme: { type: Object, default: () => ({}) },
    breaks: Array, limits: Object
})
const guide_breaks = computed(() => {
    let { min, max } = limits
    return breaks.map(v => ({
        position: (v - min) / (max - min),
        label: String(v)
    }))
})
const gradient_values = computed(() => {
    let nBins = 30
    let { min, max } = limits
    let step = (max - min) / (nBins - 1)
    let cuts = Array.from({ length: nBins }, (_, i) => min + i * step)
    let scaled = scales.map(s => s(cuts))
    return cuts.map((v, i) => Object.fromEntries(scales.map((s, j) => [{ 'color': 'fill' }[s.aesthetics] ?? s.aesthetics, scaled[j][i]])))
})
const width = ref(0)
const svgRef = useTemplateRef('svg')
watch(guide_breaks, async () => {
    await nextTick()
    let bbox = svgRef.value?.getBBox?.()
    if (!bbox) return
    width.value = bbox.width + bbox.x
}, { immediate: true })
</script>
<template>
    <svg :height="gradient_values.length * 3 + 20" :width="width" ref="svg">
        <CoreTile v-for="v, i in gradient_values" :width="10" :height="3.1" :x="10" :y="10 + (29 - i + 0.5) * 3"
            :alpha="appearance.alpha" v-bind="v" />
        <g v-for="v, i in guide_breaks">
            <line x1="15" x2="18" :y1="10 + (1 - v.position) * 90" :y2="10 + (1 - v.position) * 90" stroke="black" />
            <text x="20" :y="10 + (1 - v.position) * 90" alignment-baseline="central">{{ v.label }}</text>
        </g>
    </svg>
</template>
