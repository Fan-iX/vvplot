<script setup>
import { computed, unref, useTemplateRef } from 'vue'
import CurveSvg from './CurveSvg.vue'
import CurveCanvas from './CurveCanvas.vue'

const { data, render, dpi } = defineProps({
    data: Object, render: String, dpi: Number
})

const mode = computed(() => {
    if (render === 'svg') return 'svg'
    if (render === 'canvas') return 'canvas'
    return (data?.length ?? 0) > 1000 ? 'canvas' : 'svg'
})

const layer = useTemplateRef('layer')

defineExpose({
    dispatchEvent(event) {
        if (typeof layer.value?.dispatchEvent !== 'function') return
        let e = unref(event)
        layer.value?.dispatchEvent?.(e)
        return e
    }
})
</script>

<template>
    <CurveCanvas v-if="mode === 'canvas'" ref="layer" :data="data" :dpi="dpi" style="pointer-events: none;" />
    <CurveSvg v-else ref="layer" :data="data" />
</template>
