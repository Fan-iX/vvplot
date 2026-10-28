<script setup>
import { ref, computed, watch, useTemplateRef, nextTick } from 'vue'
import * as glyphs from './glyph'
import { categorize, obj_merge } from '#src/js/utils.js'
import { resolveGeom } from '../registry/geom.js'

const { sources, theme, breaks } = defineProps({
    sources: Array,
    theme: { type: Object, default: () => ({}) },
    breaks: Array
})

const scales = computed(() => {
    let res = new Map()
    for (let { scale, appearance } of sources) {
        res.set(scale, Object.fromEntries(Object.entries(appearance).flatMap(
            ([geom, attr]) => [].concat(resolveGeom(geom)?.legend_glyph ?? []).map(g => [g, attr])
        )))
    }
    return res
})

const appearances = computed(() => {
    let glyphs = Array.from(scales.value.values().flatMap(v => Object.keys(v)))
    let result = Object.groupBy(scales.value.values().flatMap(v => Object.values(v)), (_, i) => glyphs[i])
    for (let geom in result) result[geom] = obj_merge(...result[geom])
    return result
})

const guide_breaks = computed(() => {
    let res = breaks.map(() => ({}))
    for (let [scale, glyphs] of scales.value) {
        let scaled = scale(breaks)
        for (let glyph in glyphs) {
            res.forEach(v => v[glyph] ??= {})
            for (let i = 0; i < scaled.length; i++) {
                res[i][glyph][scale.aesthetics] = scaled[i]
            }
        }
    }
    let cates = categorize(res)
    return Array.from(
        Map.groupBy(breaks.map(x => String(x)), (_, i) => cates.categories[cates[i]])
    ).map(([bind, labels]) => ({ label: labels.join("; "), bind }))
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
        <g v-for="{ bind, label }, i in guide_breaks" :transform="`translate(0, ${i * 20})`">
            <g :transform="`translate(10, 10)`">
                <template v-for="appearance, glyph in appearances" :key="glyph">
                    <component :is="glyphs[glyph]" v-if="glyphs[glyph]" v-bind="{ ...appearance, ...bind[glyph] }" />
                </template>
            </g>
            <text x="20" y="10" alignment-baseline="central">{{ label }}</text>
        </g>
    </svg>
</template>
