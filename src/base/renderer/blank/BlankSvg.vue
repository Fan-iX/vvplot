<script setup>
import { pointerEvents } from '#src/core/utils.js'
const { extendX, extendY, data, mapping, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, mapping: Object, layout: Object, options: Object,
    groupClass: null, groupStyle: null,
})
const emit = defineEmits(pointerEvents)
</script>
<template>
    <g class="vvplot-layer"></g>
</template>
