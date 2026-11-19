<script setup>
import { computed } from 'vue'
const { boxSize: s } = defineProps({ boxSize: { type: Number, default: 10 } })
import ElementText from '#src/elements/ElementText.vue'
</script>

<template>
    <ElementText :size="s * 4 / 10" text="a" />
</template>
