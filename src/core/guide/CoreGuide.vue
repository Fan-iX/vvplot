<script setup>
defineOptions({ inheritAttrs: false })
import { ref, computed, watch, nextTick, useTemplateRef } from 'vue'
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
    for (let { title } of scales) {
        if (title !== undefined) return title
    }
    for (let { _title } of scales) {
        if (_title !== undefined) return _title
    }
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
const width = ref(0), height = ref(0)
const svgRef = useTemplateRef('svg')
watch(() => title, async () => {
    await nextTick()
    let bbox = svgRef.value?.getBBox?.()
    if (!bbox) return
    width.value = bbox.width + bbox.x
    height.value = bbox.height + bbox.y
}, { immediate: true })
</script>
<template>
    <svg ref="svg" :width="width" :height="height">
        <text dominant-baseline="central" y="10" v-if="title">{{ title }}</text>
        <g :transform="title ? `translate(0, 20)` : null">
            <component :is="guide[type]" v-bind="binds" :breaks="breaks" />
        </g>
    </svg>
</template>
