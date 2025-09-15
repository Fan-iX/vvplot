<script setup>
import { computed } from 'vue'
import { interaction } from '#base/js/utils'
import CoreGuide from './guide/CoreGuide.vue'
const { scales, theme } = defineProps({
    theme: { type: Object, default: () => ({}) },
    scales: Map,
})
const guides = computed(() => {
    let scale_fns = Array.from(scales.keys())
    let keys = scale_fns.map(s => s.key)
    let j = 1
    for (let i in keys) {
        while (keys.includes("_guide_" + j)) j++
        if (keys[i] == null) keys[i] = "_guide_" + j
    }
    let types = scale_fns.map(s => getGuideType(s))
    let groups = interaction(keys, types)
    return Map.groupBy(scales, (s, i) => groups.categories[groups[i]])
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
    <div v-if="scales" class="flex flex-col" :style="{ gap: theme.spacing + 'px' }">
        <CoreGuide :key :type :scales v-for="[[key, type], scales] in guides" />
    </div>
</template>
