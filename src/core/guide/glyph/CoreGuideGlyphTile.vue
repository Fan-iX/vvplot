<script setup>
import { computed } from 'vue'
const { boxSize: s } = defineProps({ boxSize: { type: Number, default: 10 } })
import ElementTile from '#src/elements/ElementTile.vue'
</script>

<template>
    <ElementTile :width="s" :height="s" />
</template>
