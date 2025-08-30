<script setup>
import { computed } from 'vue'
const { theme } = defineProps({
    theme: { type: Object, default: () => ({}) },
})
import CoreAxisX from './CoreAxisX.vue'
import CoreAxisY from './CoreAxisY.vue'
const axis = {
    horizontal: CoreAxisX,
    vertical: CoreAxisY,
}
const orientation = computed(() => theme.line_orientation ?? "horizontal")
</script>
<template>
    <component :is="axis[orientation]" :theme="theme" />
</template>
