<script setup>
defineOptions({ inheritAttrs: false })
import { ref, computed, watch, nextTick, useTemplateRef } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { obj_merge } from '#src/js/utils.js'
import { serializeSVG } from '#src/core/utils.js'
import ElementText from '#src/elements/ElementText.vue'
import ElementMarkdown from '#src/elements/ElementMarkdown.vue'
const { sources, breaks, type, theme } = defineProps({
    breaks: Array, sources: Array,
    type: { type: String, default: 'legendkey' },
    theme: Object,
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
const title_bind = computed(() => {
    let size = theme.title_size || 0
    return {
        'font-size': size,
        color: theme.title_color,
        y: size * 1.2 / 2,
        'anchor-x': 0,
        text: title.value,
    }
})
const binds = computed(() => {
    if (type == 'legendkey') {
        return { sources }
    } else if (type == 'gradientbar') {
        let max = scales.value.map(s => s.limits?.max).filter(v => v != null).reduce((a, b) => Math.min(a, b), Infinity)
        let min = scales.value.map(s => s.limits?.min).filter(v => v != null).reduce((a, b) => Math.max(a, b), -Infinity)
        return {
            scales: scales.value,
            limits: { min, max },
            appearance: obj_merge(...sources.flatMap(source => Object.values(source.appearance)))
        }
    }
})
const width = ref(0), height = ref(0)
const svgRef = useTemplateRef('svg')
const gRef = useTemplateRef('g')
useResizeObserver(gRef, ([entry]) => {
    let bbox = svgRef.value?.getBBox?.()
    if (!bbox) return
    width.value = bbox.width + bbox.x
    height.value = bbox.height + bbox.y
})
defineExpose({
    serialize(options) { return serializeSVG(svgRef.value, options) },
})
</script>
<template>
    <svg ref="svg" :width="width" :height="height">
        <g ref="g">
            <ElementMarkdown v-bind="title_bind" v-if="title && theme.title_type == 'markdown'" />
            <ElementText v-bind="title_bind" v-else-if="title" />
            <g :transform="title ? `translate(0, ${title_bind.y * 2})` : null">
                <component :is="guide[type]" v-bind="binds" :theme="theme" :breaks="breaks" />
            </g>
        </g>
    </svg>
</template>
