<script setup>
import { computed, watch, useTemplateRef } from 'vue'
const { extendX, extendY, data, coord2pos, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, layout: Object
})
const emit = defineEmits(['click', 'contextmenu', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup'])

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
            xmin, xmax, ymin, ymax,
            fill, color, linewidth, linetype, alpha,
            'translate-x': translateX = 0, 'translate-y': translateY = 0, $raw
        } of group) {
            const { hmin: x1, hmax: x2, vmin: y1, vmax: y2 } = coord2pos({ xmin, xmax, ymin, ymax })
            const path2d = new Path2D()
            path2d.rect(x1 + translateX, y1 + translateY, x2 - x1, y2 - y1)
            path_data.set(path2d, $raw)
            ctx.lineWidth = linewidth
            ctx.globalAlpha = alpha
            ctx.setLineDash(parseLineType(linetype))
            if (fill !== 'none') {
                ctx.fillStyle = fill
                ctx.fill(path2d)
            }
            if (color != null) {
                ctx.strokeStyle = color
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
function parseLineType(linetype) {
    if (linetype == null) return []
    if (Array.isArray(linetype)) return linetype
    if (linetype === 'solid') return []
    if (linetype === 'dashed') return [4, 4]
    if (linetype === 'dotted') return [1, 3]
    if (linetype === 'dotdash') return [1, 3, 4, 3]
    if (linetype === 'longdash') return [8, 4]
    if (linetype === 'twodash') return [2, 2, 6, 2]
    if (linetype.includes(' ')) return linetype
    return linetype.split('').map(v => +('0x' + v))
}
</script>
<template>
    <foreignObject v-bind="vBind" ref="container"></foreignObject>
</template>
