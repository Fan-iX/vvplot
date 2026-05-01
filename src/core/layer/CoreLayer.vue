<script setup>
import { computed, useTemplateRef } from 'vue'
const { data, geom, render: $render, defaultRender: $$render, dpi: $dpi, defaultDpi: $$dpi } = defineProps({
    data: Object, geom: String,
    render: String, defaultRender: { type: String, default: "auto" },
    dpi: Number, defaultDpi: Number
})
import * as canvas from './canvas'
import * as svg from './svg'
const geoms = { svg, canvas }
const rend = computed(() => {
    let render = $render ?? $$render
    if (render == "auto") {
        let n_data = data.map(d => d.length).reduce((a, b) => a + b, 0)
        return n_data > 1e3 ? "canvas" : "svg"
    }
    if (geoms[render][geom] != null) return render
    return 'svg'
})
const layer = useTemplateRef('layer')
const style = computed(() => rend.value == 'canvas' ? 'pointer-events: none;' : '')
defineExpose({
    render: rend,
    dispatchEvent: e => layer.value?.dispatchEvent?.(e)
})
const dpi = computed(() => rend.value === "canvas" ? $dpi ?? $$dpi : undefined)
</script>
<template>
    <component ref="layer" :is="geoms[rend][geom]" :style="style" :data="data" :dpi="dpi" />
</template>
