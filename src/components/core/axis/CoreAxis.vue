<script setup>
import { computed } from 'vue'
const { theme, position } = defineProps({
    theme: { type: Object, default: () => ({}) },
    position: null
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
    <component v-if="position != 'none'" :is="axis[orientation]" :theme="theme" :position="position" />
</template>
