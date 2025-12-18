<script setup>
defineOptions({ inheritAttrs: false })
import { computed } from 'vue'
import vvbreak from '#base/js/break'
import { obj_merge } from '#base/js/utils'
const { scales, type } = defineProps({
    scales: Array,
    type: { type: String, default: 'legendkey' },
})
import CoreGuideGradientbar from './CoreGuideGradientbar.vue'
import CoreGuideLegendkey from './CoreGuideLegendkey.vue'
const guide = {
    legendkey: CoreGuideLegendkey,
    gradientbar: CoreGuideGradientbar,
}
const title = computed(() => {
    return scales.map(([s]) => s.title).find(v => v != null)
})
const breaks = computed(() => {
    let scale_funcs = scales.map(([s]) => s)
    let scale = scale_funcs.find(s => s.breaks != null)
    if (Array.isArray(scale?.breaks)) {
        return Array.from(scale.breaks)
    }
    scale = scale_funcs.find(s => s.level != null)
    if (scale?.level) {
        return scale.level.apply(Array.from(scale.level))
    }
    scale = scale_funcs.find(s => s.limits != null)
    return vvbreak.number({ minor: true })(scale.limits)
})
const binds = computed(() => {
    let result = { scales: scales.map(([s]) => s) }
    if (type == "legendkey") {
        result.appearances = {
            text: obj_merge(...scales.flatMap(([s, a]) => [a.text])),
            line: obj_merge(...scales.flatMap(([s, a]) => [a.line, a.linerange, a.curve])),
            point: obj_merge(...scales.flatMap(([s, a]) => [a.point])),
            tile: obj_merge(...scales.flatMap(([s, a]) => [a.rect, a.tile, a.polygon])),
        }
    } else if (type == "gradientbar") {
        let max = scales.map(([s]) => s.limits?.max).filter(v => v != null).reduce((a, b) => Math.min(a, b), Infinity)
        let min = scales.map(([s]) => s.limits?.min).filter(v => v != null).reduce((a, b) => Math.max(a, b), -Infinity)
        result.limits = { min, max }
        result.appearance = obj_merge(...scales.flatMap(([s, a]) => Object.values(a)))
    }
    return result
})
</script>
<template>
    <span>{{ title }}</span>
    <component :is="guide[type]" v-bind="binds" :breaks />
</template>
