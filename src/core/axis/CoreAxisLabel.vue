<script setup>
import { computed } from 'vue'
import { resolveElement } from '../registry/element.js'

const { type, value, getPosition } = defineProps({
    type: String, value: null, getPosition: Function
})
const emit = defineEmits([
    'click', 'dblclick', 'contextmenu', 'pointerdown', 'pointerup', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'wheel', 'singleclick'
])
const vOn = {
    pointerdown(e) { emit('pointerdown', e, getPosition(e), value) },
    pointerup(e) { emit('pointerup', e, getPosition(e), value) },
    pointerover(e) { emit('pointerover', e, getPosition(e), value) },
    pointerout(e) { emit('pointerout', e, getPosition(e), value) },
    pointerenter(e) { emit('pointerenter', e, getPosition(e), value) },
    pointerleave(e) { emit('pointerleave', e, getPosition(e), value) },
    dblclick(e) { emit('dblclick', e, getPosition(e), value) },
    click(e) { emit('click', e, getPosition(e), value) },
    singleclick(e) { emit('singleclick', e, getPosition(e), value) },
    contextmenu(e) { emit('contextmenu', e, getPosition(e), value) },
    pointermove(e) { emit('pointermove', e, getPosition(e), value) },
    wheel(e) { emit('wheel', e, getPosition(e), value) },
}
const LabelElement = computed(() => resolveElement(type) ?? resolveElement('text'))
</script>

<template>
    <component :is="LabelElement" v-on="vOn" />
</template>
