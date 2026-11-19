<script setup>
import { computed } from 'vue'
import { EnumElement, categorize } from '#src/js/utils.js'
import vvbreak from '#src/js/break.js'
import CoreGuide from './guide/CoreGuide.vue'
import scale from '#src/js/scale.js'
const { scales, theme } = defineProps({
    theme: { type: Object, default: () => ({}) },
    scales: Map,
})
const guides = computed(() => {
    let entries = Array.from(scales)
        .filter(([fn]) => fn.legend !== false && (fn.limits?.min != fn.limits?.max))
        .map(([scale, appearance]) => {
            let breaks = scale.breaks
            if (typeof breaks === "function") breaks = breaks(scale.limits)
            if (scale.level != null) breaks ??= scale.level.apply(scale.level)
            breaks ??= vvbreak.number({ minor: true })(scale.limits)
            breaks = Array.isArray(breaks) ? Array.from(breaks) : []

            let guide = scale.guide
            if (!scale.level && ['color', 'fill', 'alpha'].includes(scale.aesthetics)) guide ??= 'gradientbar'
            guide ??= 'legendkey'

            return { guide, breaks, scale, appearance }
        })
    let cate = categorize(
        entries.map(({ guide, breaks, scale }) => ({ guide, breaks, key: scale.key })),
        (a, b, lvl) => {
            if (a instanceof EnumElement && b instanceof EnumElement)
                return a.label === b.label && a.value === b.value
            if (a instanceof EnumElement || b instanceof EnumElement)
                return false
        }
    )
    return Array.from(Map.groupBy(
        entries.map(({ scale, appearance }) => ({ scale, appearance })),
        (_, i) => cate.categories[cate[i]]
    )).map(([{ guide, breaks, key }, sources], i) => {
        key ??= '_guide_' + (i + 1)
        return { sources, guide, breaks, key }
    })
})
</script>
<template>
    <div v-if="scales" class="vvplot-legend" :style="{ gap: `${theme.spacing || 0}px` }">
        <CoreGuide :key="key" :sources="sources" :type="guide" :breaks="breaks"
            v-for="{ sources, guide, breaks, key } in guides" :theme="theme" />
    </div>
</template>
<style>
.vvplot-legend {
    display: flex;
    flex-direction: column;
}
</style>
