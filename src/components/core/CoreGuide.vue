<script setup>
import { ref, computed, watch, useTemplateRef, nextTick } from 'vue'
import { obj_merge } from '#base/js/utils'
import * as element from './element'
import vvbreak from '#base/js/break'
defineOptions({ inheritAttrs: false })
const { scale, geoms, theme } = defineProps({
    scale: Function,
    geoms: { type: Object, default: () => ({}) },
    theme: { type: Object, default: () => ({}) },
    breaks: Array
})
const values = computed(() => {
    if (scale == null) return []
    let cuts = []
    if (scale.level) {
        cuts = Array.from(scale.level)
        cuts.level = scale.level
        cuts.extent = scale.extent
    } else {
        cuts = vvbreak.number({ minor: true })(scale.extent)
        cuts.extent = scale.extent
    }
    return scale(cuts).map((v, i) => ({
        bind: { [scale.aesthetics]: v },
        label: String(cuts[i]),
    }))
})
const appearances = computed(() => {
    let text = obj_merge(["text"].map(g => geoms[g])),
        line = obj_merge(["line", "linerange"].map(g => geoms[g])),
        point = obj_merge(["point"].map(g => geoms[g])),
        tile = obj_merge(["rect", "tile", "polygon"].map(g => geoms[g]))
    let result = {}
    if (text != null) result.text = { size: 4, text: 'a', ...text }
    if (line != null) result.line = { x1: -5, x2: 5, color: 'black', ...line }
    if (point != null) result.point = { size: 6, ...point }
    if (tile != null) result.tile = { width: 10, height: 10, fill: 'transparent', ...tile }
    return result
})
const width = ref(0)
const svgRef = useTemplateRef('svg')
watch(values, async () => {
    await nextTick()
    let bbox = svgRef.value?.getBBox?.()
    if (!bbox) return
    width.value = bbox.width + bbox.x
}, { immediate: true })
</script>
<template>
    {{ scale.title }}
    <svg :height="values.length * 20" :width="width" ref="svg">
        <g v-for="v, i in values" :transform="`translate(0, ${i * 20})`">
            <g :transform="`translate(10, 10)`">
                <component :is="element[geom]" v-for="bind, geom in appearances" v-bind="{ ...bind, ...v.bind }" />
            </g>
            <text x="20" y="10" alignment-baseline="central">{{ v.label }}</text>
        </g>
    </svg>
</template>
