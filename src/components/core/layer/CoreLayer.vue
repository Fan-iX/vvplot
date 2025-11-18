<script setup>
import { computed, useTemplateRef } from 'vue'
const { data, geom, render } = defineProps({
    data: Object, geom: String, render: { type: String, default: "auto" },
})
import * as canvas from './canvas'
import * as svg from './svg'
const geoms = { svg, canvas }
const rend = computed(() => {
    if (render == "auto") {
        let n_data = data.map(d => d.length).reduce((a, b) => a + b, 0)
        return n_data > 1e3 ? "canvas" : "svg"
    }
    if (geoms[render][geom] != null) return render
    return 'svg'
})
const layer = useTemplateRef('layer')
const style = computed(() => rend.value == 'canvas' ? 'cursor-events:none;' : '')
defineExpose({
    dispatchEvent: e => layer.value?.dispatchEvent?.(e)
})
</script>
<template>
    <component ref="layer" :is="geoms[rend][geom]" :style :data />
</template>
