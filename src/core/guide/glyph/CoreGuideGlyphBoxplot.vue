<script setup>
import { computed } from 'vue'
const { boxSize: s } = defineProps({ boxSize: { type: Number, default: 10 } })
import ElementPath from '#src/elements/ElementPath.vue'
const d = computed(() => {
    const a = s * 3 / 10, b = s / 2
    return `M-${a}-${b}H0V-${a}V-${b}H${a}Z M-${a},${b}H0V${a}V${b}H${a}Z M-${b},0H${b}Z M-${b}-${a}H${b}V${a}H-${b}Z`
})
</script>

<template>
    <ElementPath :d="d" fill="white" />
</template>
