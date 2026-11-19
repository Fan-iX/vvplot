<script setup>
defineOptions({ inheritAttrs: false })
import { computed } from 'vue'
import ElementTile from '../../elements/ElementTile.vue'
import ElementText from '#src/elements/ElementText.vue'
import ElementMarkdown from '#src/elements/ElementMarkdown.vue'
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
const nBins = 30
const gradient_values = computed(() => {
    let { min, max } = limits
    let step = (max - min) / (nBins - 1)
    let cuts = Array.from({ length: nBins }, (_, i) => min + i * step)
    let scaled = scales.map(s => s(cuts))
    return cuts.map((v, i) => Object.fromEntries(scales.map((s, j) => [{ 'color': 'fill' }[s.aesthetics] ?? s.aesthetics, scaled[j][i]])))
})
const padding = 5
const w = computed(() => theme.key_size + padding * 2)
const h = computed(() => theme.key_spacing * 3 / 10)
const text_bind = computed(() => {
    return {
        'font-size': theme.label_size || 0,
        color: theme.label_color,
        'anchor-x': 0
    }
})
</script>
<template>
    <ElementTile v-for="v, i in gradient_values" :width="theme.key_size" :height="h * 1.05" :x="w / 2"
        :y="10 + (29 - i + 0.5) * h" :alpha="appearance.alpha" v-bind="v" />
    <g v-for="{ position, label }, i in guide_breaks">
        <line :x1="w - padding" :x2="w - padding + 3" :y1="10 + (1 - position) * h * nBins"
            :y2="10 + (1 - position) * h * nBins" stroke="black" />
        <ElementMarkdown :x="w" :y="10 + (1 - position) * h * nBins" v-bind="text_bind" :text="label"
            v-if="theme.label_type == 'markdown'" />
        <ElementText :x="w" :y="10 + (1 - position) * h * nBins" v-bind="text_bind" :text="label" v-else />
    </g>
</template>
