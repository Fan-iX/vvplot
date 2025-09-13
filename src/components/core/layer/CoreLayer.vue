<script setup>
import { computed, useTemplateRef } from 'vue'
const { data, layout, coord2pos, geom, render, extendX, extendY, class: cls } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, layout: Object,
    geom: String, render: { type: String, default: "auto" },
    class: { type: String, default: '' }
})
import * as canvas from './canvas'
import * as svg from './svg'
import { twMerge } from 'tailwind-merge'
const geoms = { svg, canvas }
const rend = computed(() => {
    if (render == "auto") {
        let n_data = data.map(d => d.length).reduce((a, b) => a + b, 0)
        return n_data > 1e3 ? "canvas" : "svg"
    }
    if (geoms[render][geom] != null) return render
    return 'svg'
})
const className = computed(() => twMerge(cls, rend.value == "canvas" ? "cursor-default" : ""))
const layer = useTemplateRef('layer')
defineExpose({
    dispatchEvent: e => layer.value?.dispatchEvent?.(e)
})
</script>
<template>
    <component ref="layer" :is="geoms[rend][geom]" :data :coord2pos :extend-x :extend-y :layout :class="className" />
</template>
