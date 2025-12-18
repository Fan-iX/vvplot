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
            x, y,
            color, size = 4, label = "", title, stroke, linewidth, linetype, alpha,
            'anchor-x': anchorX, 'anchor-y': anchorY,
            'dock-x': dockX, 'dock-y': dockY,
            'translate-x': translateX = 0, 'translate-y': translateY = 0,
            angle, 'text-length': textLength, $raw
        } of group) {
            ctx.save()
            const { h: tx, v: ty } = coord2pos({ x, y })
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.lineWidth = linewidth
            ctx.globalAlpha = alpha
            ctx.font = `${size * 4}px sans-serif`
            ctx.setLineDash(parseLineType(linetype))
            ctx.translate(tx + translateX, ty + translateY)
            let { width: w, fontBoundingBoxAscent: a, fontBoundingBoxDescent: d } = ctx.measureText(label),
                width = w, height = a + d
            if (typeof (textLength) == "object") {
                let { x: lx = 0, y: ly = 0 } = textLength
                let { h: h1, v: v1 } = coord2pos({ x: x + lx / 2, y: y + ly / 2 }),
                    { h: h2, v: v2 } = coord2pos({ x: x - lx / 2, y: y - ly / 2 })
                width = Math.hypot(h1 - h2 || 0, v1 - v2 || 0)
            } else if (textLength != null) {
                width = textLength
            }
            if (anchorX != null || anchorY != null) {
                let alnX = { left: 0, center: 0.5, right: 1 }[anchorX] ?? +(anchorX ?? 0.5),
                    alnY = { bottom: 0, center: 0.5, top: 1 }[anchorY] ?? +(anchorY ?? 0.5)
                if (isNaN(alnX)) alnX = 0.5
                if (isNaN(alnY)) alnY = 0.5
                let w = width, h = height
                ctx.rotate(angle * Math.PI / 180)
                ctx.translate(w * (0.5 - alnX), h * (alnY - 0.5))
            } else if (dockX != null || dockY != null) {
                let alnX = { left: 0, center: 0.5, right: 1 }[dockX] ?? +(dockX ?? 0.5),
                    alnY = { bottom: 0, center: 0.5, top: 1 }[dockY] ?? +(dockY ?? 0.5)
                if (isNaN(alnX)) alnX = 0.5
                if (isNaN(alnY)) alnY = 0.5
                let w = width * Math.abs(Math.cos(angle * Math.PI / 180)) + height * Math.abs(Math.sin(angle * Math.PI / 180)),
                    h = width * Math.abs(Math.sin(angle * Math.PI / 180)) + height * Math.abs(Math.cos(angle * Math.PI / 180))
                ctx.translate(w * (0.5 - alnX), h * (alnY - 0.5))
                ctx.rotate(angle * Math.PI / 180)
            }
            if (width != w) ctx.scale(width / w, 1)
            if (color !== 'none') {
                ctx.fillStyle = color
                ctx.fillText(label, 0, 0)
            }
            if (stroke != null) {
                ctx.strokeStyle = stroke
                ctx.strokeText(label, 0, 0)
            }
            ctx.restore()
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
