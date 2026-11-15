<script setup>
import BlankSvg from './BlankSvg.vue'

const { data, render, dpi } = defineProps({
    data: Object, render: String, dpi: Number
})
</script>

<template>
    <BlankSvg :data="data" />
</template>
