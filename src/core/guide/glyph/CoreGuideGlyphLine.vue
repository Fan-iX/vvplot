<script setup>
import { computed } from 'vue'
const { boxSize: s } = defineProps({ boxSize: { type: Number, default: 10 } })
import ElementLine from '#src/elements/ElementLine.vue'
</script>

<template>
    <ElementLine :x1="-s / 2" :x2="s / 2" color="black" />
</template>
