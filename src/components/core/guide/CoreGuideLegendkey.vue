<script setup>
import { ref, computed, watch, useTemplateRef, nextTick } from 'vue'
import * as element from '../element'
import { categorize } from '#base/js/utils'
const { scales, appearances, theme, breaks } = defineProps({
    scales: Array,
    appearances: { type: Object, default: () => ({}) },
    theme: { type: Object, default: () => ({}) },
    breaks: Array
})
const guide_breaks = computed(() => {
    let scaled = scales.map(s => s(breaks))
    let keys = breaks.map((v, i) => ({
        bind: Object.fromEntries(scales.map((s, j) => [s.aesthetics, scaled[j][i]])),
        label: String(v),
    }))
    let binds = categorize(keys.map(v => v.bind))
    let group = Map.groupBy(keys.map(v => v.label), (v, i) => binds.categories[binds[i]])
    return Array.from(group).map(([bind, labels]) => ({
        bind, label: labels.join('; ')
    }))
})
const geoms = computed(() => {
    let { text, line, point, tile } = appearances
    let result = {}
    if (text != null) result.text = { size: 4, text: 'a', ...text }
    if (line != null) result.line = { x1: -5, x2: 5, color: 'black', ...line }
    if (point != null) result.point = { size: 6, ...point }
    if (tile != null) result.tile = { width: 10, height: 10, fill: 'transparent', ...tile }
    return result
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
    <svg :height="guide_breaks.length * 20" :width="width" ref="svg">
        <g v-for="v, i in guide_breaks" :transform="`translate(0, ${i * 20})`">
            <g :transform="`translate(10, 10)`">
                <component :is="element[geom]" v-for="bind, geom in geoms" v-bind="{ ...bind, ...v.bind }" />
            </g>
            <text x="20" y="10" alignment-baseline="central">{{ v.label }}</text>
        </g>
    </svg>
</template>
