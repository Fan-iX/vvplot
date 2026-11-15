<script setup>
import { computed, useTemplateRef } from 'vue'
import { resolveRenderer } from './register.js'
import { useEventClone } from './utils.js'

const {
    renderer, render: $render, defaultRender: $$render,
    dpi: $dpi, defaultDpi: $$dpi,
} = defineProps({
    renderer: [String, Object, Function],
    render: String, defaultRender: { type: String, default: 'auto' },
    dpi: Number, defaultDpi: Number,
})

const Renderer = computed(() => typeof renderer === 'string' ? resolveRenderer(renderer) : renderer)
const render = computed(() => $render ?? $$render)
const dpi = computed(() => $dpi ?? $$dpi)
const layer = useTemplateRef('layer')

defineExpose({
    dispatchEvent(event) {
        let $event = layer.value?.dispatchEvent?.(useEventClone(event))
        if ($event == null || $event === event) return
        if ($event.defaultPrevented) event.preventDefault()
        for (let key of Object.keys($event)) {
            let prop = Object.getOwnPropertyDescriptor(event, key)
            if (prop && !prop.writable && !prop.set) continue
            event[key] = $event[key]
        }
    }
})
</script>
<template>
    <component v-if="Renderer" :is="Renderer" ref="layer" :render="render" :dpi="dpi" />
</template>
