<script setup>
const { theme, position, orientation } = defineProps({
    theme: { type: Object, default: () => ({}) },
    position: null, orientation: null
 })
import CoreAxisH from './CoreAxisH.vue'
import CoreAxisV from './CoreAxisV.vue'
const axis = {
    h: CoreAxisH,
    v: CoreAxisV,
}
</script>
<template>
    <component v-if="position != 'none'" :is="axis[orientation]" :theme="theme" :position="position" />
</template>
