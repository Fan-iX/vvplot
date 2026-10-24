<script setup>
import { pointerEvents } from '#src/core/utils.js'
const { extendX, extendY, data, coord2pos, getCoord, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, getCoord: Function, layout: Object,
    groupClass: null, groupStyle: null,
})
const emit = defineEmits(pointerEvents)
</script>
<template>
    <g class="vvplot-layer"></g>
</template>
