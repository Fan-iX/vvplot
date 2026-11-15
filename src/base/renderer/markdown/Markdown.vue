<script setup>
import MarkdownSvg from './MarkdownSvg.vue'

const { data, render, dpi } = defineProps({
    data: Object, render: String, dpi: Number
})
</script>

<template>
    <MarkdownSvg :data="data" />
</template>
