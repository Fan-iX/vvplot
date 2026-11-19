<script setup>
import { computed } from 'vue'
const { boxSize: s } = defineProps({ boxSize: { type: Number, default: 10 } })
import ElementPoint from '#src/elements/ElementPoint.vue'
</script>

<template>
    <ElementPoint :size="s * 6 / 10" />
</template>
