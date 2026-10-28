<script setup>
defineOptions({ inheritAttrs: false })
import { computed } from 'vue'
import { obj_merge } from '#src/js/utils.js'
const { sources, breaks, type } = defineProps({
    breaks: Array, sources: Array,
    type: { type: String, default: 'legendkey' },
})
import CoreGuideGradientbar from './CoreGuideGradientbar.vue'
import CoreGuideLegendkey from './CoreGuideLegendkey.vue'
const guide = {
    legendkey: CoreGuideLegendkey,
    gradientbar: CoreGuideGradientbar,
}
const scales = computed(() => sources.map(source => source.scale))
const title = computed(() => {
    let scales = sources.map(source => source.scale)
    return scales.reduce((v, s) => v ?? s.title, null) ?? scales.reduce((v, s) => v ?? s._title, null)
})
const binds = computed(() => {
    let result = {}
    if (type == 'legendkey') {
        result.sources = sources
    } else if (type == 'gradientbar') {
        let max = scales.value.map(s => s.limits?.max).filter(v => v != null).reduce((a, b) => Math.min(a, b), Infinity)
        let min = scales.value.map(s => s.limits?.min).filter(v => v != null).reduce((a, b) => Math.max(a, b), -Infinity)
        result.scales = scales.value
        result.limits = { min, max }
        result.appearance = obj_merge(...sources.flatMap(source => Object.values(source.appearance)))
    }
    return result
})
</script>
<template>
    <span>{{ title }}</span>
    <component :is="guide[type]" v-bind="binds" :breaks="breaks" />
</template>
