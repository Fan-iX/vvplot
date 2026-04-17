<script setup>
import { computed } from 'vue'
import { interaction, EnumLevel } from '#base/js/utils'
import CoreGuide from './guide/CoreGuide.vue'
const { scales, theme } = defineProps({
    theme: { type: Object, default: () => ({}) },
    scales: Map,
})
const guides = computed(() => {
    let guide_scales = new Map(Array.from(scales).filter(([fn]) => fn.legend !== false && (fn.limits?.min != fn.limits?.max)))
    let scale_fns = Array.from(guide_scales.keys())
    let keys = scale_fns.map(s => s.key)
    let n = 1
    for (let i = 0; i < keys.length; i++) {
        while (keys.includes("_guide_" + n)) n++
        keys[i] ??= keys.find((_, j) => keys[j] != null && EnumLevel.isEqual(scale_fns[j].level, scale_fns[i].level)) ?? "_guide_" + n
    }
    let types = scale_fns.map(s => getGuideType(s))
    let groups = interaction(keys, types)
    return Map.groupBy(guide_scales, (s, i) => groups.categories[groups[i]])
})

function getGuideType(scale) {
    if (scale == null) return null
    if (['gradientbar', 'legendkey'].includes(scale.guide)) return scale.guide
    if (scale.level) return 'legendkey'
    if (['color', 'fill', 'alpha'].includes(scale.aesthetics)) return 'gradientbar'
    return 'legendkey'
}
</script>
<template>
    <div v-if="scales" class="vvplot-legend" :style="{ gap: theme.spacing + 'px' }">
        <CoreGuide :key :type :scales v-for="[[key, type], scales] in guides" />
    </div>
</template>
