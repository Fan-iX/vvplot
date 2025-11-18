<script setup>
import { computed, watch, useTemplateRef } from 'vue'
const { extendX, extendY, data, coord2pos, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, layout: Object
})
const emit = defineEmits(['click', 'contextmenu', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup'])

const paths = {
    triangle: s => `M0-${s * 2 / 3}L${s * 0.577},${s / 3}L-${s * 0.577},${s / 3}Z`,
    diamond: s => `M0-${s * 0.707}L${s * 0.707},0L0,${s * 0.707}L-${s * 0.707},0Z`,
    square: s => `M-${s / 2}-${s / 2}H${s / 2}V${s / 2}H-${s / 2}Z`,
    plus: s => `M-${s / 10}-${s / 2}V-${s / 10}H-${s / 2}V${s / 10}H-${s / 10}V${s / 2}H${s / 10}V${s / 10}H${s / 2}V-${s / 10}H${s / 10}V-${s / 2}H-${s / 10}Z`,
    corss: s => `M-${s * 0.283}-${s * 0.424}L-${s * 0.424}-${s * 0.283}L-${s * 0.141},0L-${s * 0.424},${s * 0.283}L-${s * 0.283},${s * 0.424}L0,${s * 0.141}L${s * 0.283},${s * 0.424}L${s * 0.424},${s * 0.283}L${s * 0.141},0L${s * 0.424},-${s * 0.283}L${s * 0.283},-${s * 0.424}L0,-${s * 0.141}Z`,
}
const vBind = computed(() => ({
    width: layout.fullWidth * (1 + extendX * 2),
    height: layout.fullHeight * (1 + extendY * 2),
    x: -layout.l - layout.fullWidth * extendX,
    y: -layout.t - layout.fullHeight * extendY,
}))
const containerRef = useTemplateRef('container')
const layerCanvas = computed(() => {
    if (containerRef.value == null) return
    const canvas = document.createElement('canvas')
    canvas.width = layout.fullWidth * (1 + extendX * 2)
    canvas.height = layout.fullHeight * (1 + extendY * 2)
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.translate(layout.l + layout.fullWidth * extendX, layout.t + layout.fullHeight * extendY)
    let path_data = new Map()
    for (const group of data) {
        for (let {
            x, y, size = 6,
            shape, color, stroke, linewidth, alpha,
            'translate-x': translateX = 0, 'translate-y': translateY = 0, $raw
        } of group) {
            const { h: cx, v: cy } = coord2pos({ x, y })
            const path2d = new Path2D()
            if (String(shape).startsWith("path:")) {
                path2d.addPath(
                    new Path2D(shape.slice(5)),
                    new DOMMatrix().translateSelf(cx + translateX, cy + translateY)
                )
            } else if (shape in paths) {
                path2d.addPath(
                    new Path2D(paths[shape](size)),
                    new DOMMatrix().translate(cx + translateX, cy + translateY)
                )
            } else {
                path2d.arc(cx + translateX, cy + translateY, size / 2, 0, Math.PI * 2)
            }
            path_data.set(path2d, $raw)
            ctx.lineWidth = linewidth
            ctx.globalAlpha = alpha
            ctx.beginPath()
            if (color !== 'none') {
                ctx.fillStyle = color
                ctx.fill(path2d)
            }
            if (stroke != null) {
                ctx.strokeStyle = stroke
                ctx.stroke(path2d)
            }
        }
    }
    canvas.onclick = function (e) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        for (const [path, data] of path_data) {
            if (ctx.isPointInPath(path, x, y)) {
                emit('click', e, data)
                break
            }
        }
    }
    return canvas
})
watch(layerCanvas, (node) => containerRef.value.replaceChildren(node))
defineExpose({
    dispatchEvent: (event) => layerCanvas.value?.dispatchEvent?.(event)
})
</script>
<template>
    <foreignObject v-bind="vBind" ref="container"></foreignObject>
</template>
