<script setup>
import { computed, watch, useTemplateRef } from 'vue'
const { extendX, extendY, data, coord2pos, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, layout: Object
})
let events = ['click', 'contextmenu', 'singleclick', 'dblclick', 'pointermove', 'pointerdown', 'pointerup', 'wheel']
const emit = defineEmits(['click', 'contextmenu', 'singleclick', 'dblclick', 'pointermove', 'pointerdown', 'pointerup', 'wheel'])

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
            x, xmin, xmax, y, ymin, ymax,
            lwisker, Q1, median, Q3, uwisker, outliers,
            $xmin, $xmax, $ymin, $ymax,
            fill = 'white', color = "black", linewidth = 1, linetype, alpha,
            'translate-x': translateX = 0, 'translate-y': translateY = 0, $raw
        } of group) {
            if (color === 'transparent') continue
            const { hmin: rx1, hmax: rx2, vmin: ry1, vmax: ry2 } = coord2pos(x == null ? { ymin, ymax, xmin: Q1, xmax: Q3 } : { xmin, xmax, ymin: Q1, ymax: Q3 })
            const { h: lx1, v: ly1 } = coord2pos(x == null ? { y, x: lwisker } : { x, y: lwisker })
            const { h: lx2, v: ly2 } = coord2pos(x == null ? { y, x: uwisker } : { x, y: uwisker })
            const { h: mx1, v: my1 } = coord2pos(x == null ? { y: ymin, x: median } : { x: xmin, y: median })
            const { h: mx2, v: my2 } = coord2pos(x == null ? { y: ymax, x: median } : { x: xmax, y: median })
            const { h: uwx1, v: uwy1 } = coord2pos(x == null ? { y: ymin * 0.25 + ymax * 0.75, x: uwisker } : { x: xmin * 0.25 + xmax * 0.75, y: uwisker })
            const { h: uwx2, v: uwy2 } = coord2pos(x == null ? { y: ymin * 0.75 + ymax * 0.25, x: uwisker } : { x: xmin * 0.75 + xmax * 0.25, y: uwisker })
            const { h: lwx1, v: lwy1 } = coord2pos(x == null ? { y: ymin * 0.25 + ymax * 0.75, x: lwisker } : { x: xmin * 0.25 + xmax * 0.75, y: lwisker })
            const { h: lwx2, v: lwy2 } = coord2pos(x == null ? { y: ymin * 0.75 + ymax * 0.25, x: lwisker } : { x: xmin * 0.75 + xmax * 0.25, y: lwisker })
            ctx.globalAlpha = alpha
            ctx.setLineDash(parseLineType(linetype))
            const linepath2d = new Path2D()
            linepath2d.moveTo(lx1 + translateX, ly1 + translateY)
            linepath2d.lineTo(lx2 + translateX, ly2 + translateY)
            const wiskerpath2d = new Path2D()
            wiskerpath2d.moveTo(uwx1 + translateX, uwy1 + translateY)
            wiskerpath2d.lineTo(uwx2 + translateX, uwy2 + translateY)
            wiskerpath2d.moveTo(lwx1 + translateX, lwy1 + translateY)
            wiskerpath2d.lineTo(lwx2 + translateX, lwy2 + translateY)
            ctx.lineWidth = linewidth
            if (color !== "none") {
                ctx.strokeStyle = color
                ctx.stroke(linepath2d)
                ctx.stroke(wiskerpath2d)
            }
            const rectpath2d = new Path2D()
            rectpath2d.rect(rx1 + translateX, ry1 + translateY, rx2 - rx1, ry2 - ry1)
            if (fill !== 'none') {
                ctx.fillStyle = fill
                ctx.fill(rectpath2d)
            }
            if (color != null) {
                ctx.strokeStyle = color
                ctx.stroke(rectpath2d)
            }
            path_data.set(rectpath2d, $raw)
            const medianpath2d = new Path2D()
            medianpath2d.moveTo(mx1 + translateX, my1 + translateY)
            medianpath2d.lineTo(mx2 + translateX, my2 + translateY)
            ctx.lineWidth = linewidth * 2
            if (color !== "none") {
                ctx.strokeStyle = color
                ctx.stroke(medianpath2d)
            }
            for (let { x, y, $raw } of outliers) {
                const { h: ox, v: oy } = coord2pos({ x, y })
                const outlierpath2d = new Path2D()
                outlierpath2d.arc(ox + translateX, oy + translateY, 2, 0, Math.PI * 2)
                if (fill !== 'none') {
                    ctx.fillStyle = color
                    ctx.fill(outlierpath2d)
                }
                path_data.set(outlierpath2d, $raw)
            }
        }
    }
    for (let evt of events) {
        canvas.addEventListener(evt, function (e) {
            if (e._vhandled) return
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            for (const [path, data] of path_data) {
                if (ctx.isPointInPath(path, x, y)) {
                    emit(evt, e, data)
                    e._vhandled = true
                    break
                }
            }
        })
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
