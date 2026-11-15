<script setup>
import MarkdownsegmentSvg from './MarkdownsegmentSvg.vue'

const { data, render, dpi } = defineProps({
    data: Object, render: String, dpi: Number
})
</script>

<template>
    <MarkdownsegmentSvg :data="data" />
</template>
