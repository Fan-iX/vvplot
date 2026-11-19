<script setup>
defineOptions({ inheritAttrs: false })
import { computed } from 'vue'
import * as glyphs from './glyph'
import { categorize, obj_merge } from '#src/js/utils.js'
import ElementText from '#src/elements/ElementText.vue'
import ElementMarkdown from '#src/elements/ElementMarkdown.vue'

const { sources, theme, breaks } = defineProps({
    sources: Array,
    theme: { type: Object, default: () => ({}) },
    breaks: Array
})

const scales = computed(() => new Map(
    sources.map(({ scale, appearance }) => [scale, appearance ?? {}])
))

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
const padding = 5
const h = computed(() => theme.key_size + theme.key_spacing)
const w = computed(() => theme.key_size + padding * 2)
const text_bind = computed(() => {
    return {
        'font-size': theme.label_size || 0,
        color: theme.label_color,
        'anchor-x': 0
    }
})
</script>
<template>
    <g v-for="{ bind, label }, i in guide_breaks" :transform="`translate(0, ${i * h})`">
        <g :transform="`translate(${w / 2}, ${h / 2})`">
            <template v-for="appearance, glyph in appearances" :key="glyph">
                <component :is="glyphs[glyph]" v-if="glyphs[glyph]" :box-size="theme.key_size"
                    v-bind="{ ...appearance, ...bind[glyph] }" />
            </template>
        </g>
        <ElementMarkdown :x="w" :y="h / 2" v-bind="text_bind" :text="label" v-if="theme.label_type == 'markdown'" />
        <ElementText :x="w" :y="h / 2" v-bind="text_bind" :text="label" v-else />
    </g>
</template>
