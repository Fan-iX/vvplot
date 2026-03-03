<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#base/js/utils'
const {
    x, y, shape, size, color, stroke, linewidth, linetype, alpha, title,
    angle, translateX, translateY,
} = defineProps({
    x: { type: Number, default: 0 }, y: { type: Number, default: 0 },
    shape: String, size: { type: Number, default: 6 }, color: String,
    stroke: String, linewidth: Number, linetype: String,
    alpha: { type: Number, default: 1 }, title: String,
    angle: { type: Number, default: 0 },
    translateX: { type: Number, default: 0 }, translateY: { type: Number, default: 0 },
})

const paths = {
    square: "M-0.5-0.5H0.5V0.5H-0.5Z",
    triangle: "M0-0.667L0.577,0.333L-0.577,0.333Z",
    diamond: "M0-0.707L0.707,0L0,0.707L-0.707,0Z",
    plus: "M-0.1-0.5V-0.1H-0.5V0.1H-0.1V0.5H0.1V0.1H0.5V-0.1H0.1V-0.5H-0.1Z",
    cross: "M-0.283-0.424L-0.424-0.283L-0.141,0L-0.424,0.283L-0.283,0.424L0,0.141L0.283,0.424L0.424,0.283L0.141,0L0.424,-0.283L0.283,-0.424L0,-0.141Z",
}
const binds = computed(() => {
    let d = shape?.startsWith?.("path:") ? shape?.slice?.(5) : paths[shape]
    let result = {
        fill: color || null,
        'fill-opacity': alpha == 1 ? null : alpha,
        stroke: stroke || null,
        'stroke-width': linewidth,
        'stroke-opacity': alpha == 1 ? null : alpha,
        'stroke-dasharray': parseLinetype(linetype).join(" ") || null,
    }
    if (d != null) {
        let transform = `translate(${x + translateX},${y + translateY})`
        if (size != 1) transform += `scale(${size})`
        if (angle) transform += `rotate(${angle})`
        Object.assign(result, { d, transform })
    } else {
        let transform = (translateX || translateY) ? `translate(${translateX}, ${translateY})` : null
        Object.assign(result, { cx: x, cy: y, r: size / 2, transform })
    }
    return result
})
</script>
<template>
    <path v-if="binds.d" v-bind="binds">
        <title v-if="title">{{ title }}</title>
    </path>
    <circle v-else v-bind="binds">
        <title v-if="title">{{ title }}</title>
    </circle>
</template>
