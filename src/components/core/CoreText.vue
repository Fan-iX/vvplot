<script setup>
import { useTemplateRef, reactive, watch, nextTick } from 'vue';
const { x, y, text, title, angle, anchorX, anchorY, dockX, dockY, fontSize } = defineProps({
    x: { type: Number, default: 0 }, y: { type: Number, default: 0 },
    text: String, title: String,
    angle: { type: Number, default: 0 },
    anchorX: Number, anchorY: Number,
    dockX: Number, dockY: Number,
    fontSize: { type: Number, default: 12 }
})
const ele = useTemplateRef('ele')
const vBind = reactive({})
watch(
    [ele, () => angle, () => anchorX, () => anchorY, () => dockX, () => dockY, () => fontSize, () => text],
    async ([e]) => {
        if (!e) return
        await nextTick()
        let { width, height } = e.getBBox()
        if (anchorX != null || anchorY != null) {
            let alnX = { left: 0, center: 0.5, right: 1 }[anchorX] ?? +(anchorX ?? 0.5),
                alnY = { bottom: 0, center: 0.5, top: 1 }[anchorY] ?? +(anchorY ?? 0.5)
            if (isNaN(alnX)) alnX = 0.5
            if (isNaN(alnY)) alnY = 0.5
            let w = width, h = height
            vBind['transform'] = `rotate(${angle}) translate(${w * (0.5 - alnX)},${h * (alnY - 0.5)})`
        } else if (dockX != null || dockY != null) {
            let alnX = { left: 0, center: 0.5, right: 1 }[dockX] ?? +(dockX ?? 0.5),
                alnY = { bottom: 0, center: 0.5, top: 1 }[dockY] ?? +(dockY ?? 0.5)
            if (isNaN(alnX)) alnX = 0.5
            if (isNaN(alnY)) alnY = 0.5
            let w = width * Math.abs(Math.cos(angle * Math.PI / 180)) + height * Math.abs(Math.sin(angle * Math.PI / 180)),
                h = width * Math.abs(Math.sin(angle * Math.PI / 180)) + height * Math.abs(Math.cos(angle * Math.PI / 180))
            vBind['transform'] = `translate(${w * (0.5 - alnX)},${h * (alnY - 0.5)}) rotate(${angle})`
        }
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
