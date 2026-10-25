<script setup>
import { computed, useTemplateRef } from 'vue'
import { resolveGeom, getRenderer } from './register.js'

const { data, geom, mapping, render: $render, defaultRender: $$render, dpi: $dpi, defaultDpi: $$dpi } = defineProps({
    data: Object, geom: String, mapping: Object,
    render: String, defaultRender: { type: String, default: "auto" },
    dpi: Number, defaultDpi: Number
})

const candidates = computed(() => getRenderer(geom) ?? {})

const rend = computed(() => {
    let render = $render ?? $$render
    if (candidates.value[render])
        return render
    if (render == "auto") {
        let n_data = data.map(d => d.length).reduce((a, b) => a + b, 0)
        return n_data > 1e3 ? "canvas" : "svg"
    }
    if (candidates.value[render]) return render
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
    <component v-if="candidates[rend]" ref="layer" :is="candidates[rend]" :style="style" :data="data" :mapping="mapping" :dpi="dpi" />
</template>
