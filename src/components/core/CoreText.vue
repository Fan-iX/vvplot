<script setup>
import { useTemplateRef, reactive, watch, nextTick } from 'vue';
const { x, y, text, title, angle, anchorX, anchorY, fontSize } = defineProps({
    x: { type: Number, default: 0 }, y: { type: Number, default: 0 },
    text: String, title: String,
    angle: { type: Number, default: 0 },
    anchorX: { default: 0.5 }, anchorY: { default: 0.5 },
    fontSize: { type: Number, default: 12 }
})
const ele = useTemplateRef('ele')
const vBind = reactive({})
watch(
    [ele, () => angle, () => anchorX, () => anchorY, () => fontSize, () => text],
    async ([e]) => {
        if (!e) return
        await nextTick()
        let { width, height } = e.getBBox()
        let alnX = { left: 0, center: 0.5, right: 1 }[anchorX] ?? +anchorX,
            alnY = { bottom: 0, center: 0.5, top: 1 }[anchorY] ?? +anchorY
        if (isNaN(alnX)) alnX = 0.5
        if (isNaN(alnY)) alnY = 0.5
        let w = width * Math.abs(Math.cos(angle * Math.PI / 180)) + height * Math.abs(Math.sin(angle * Math.PI / 180)),
            h = width * Math.abs(Math.sin(angle * Math.PI / 180)) + height * Math.abs(Math.cos(angle * Math.PI / 180))
        vBind['transform'] = `translate(${w * (0.5 - alnX)},${h * (alnY - 0.5)}) rotate(${angle})`
    }
)
</script>
<template>
    <text ref="ele" :x="x" :y="y" :transform-origin="`${x} ${y}`" text-anchor="middle" dominant-baseline="central"
        :font-size="fontSize" v-bind="vBind">
        <slot>
            <title v-if="title ?? text">{{ title ?? text }}</title>
            {{ text }}
        </slot>
    </text>
</template>
