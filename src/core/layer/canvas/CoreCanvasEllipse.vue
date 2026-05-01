<script setup>
import { computed, watch, useTemplateRef } from 'vue'
import { parseLinetype } from '#base/js/utils'
const { extendX, extendY, data, coord2pos, getCoord, layout, dpi } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, getCoord: Function, layout: Object,
    dpi: { type: Number, default: 96 },
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
    canvas.style.width = vBind.value.width + 'px'
    canvas.style.height = vBind.value.height + 'px'
    canvas.width = vBind.value.width * dpi / 96
    canvas.height = vBind.value.height * dpi / 96
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(dpi / 96, dpi / 96)
    ctx.translate(layout.l + layout.fullWidth * extendX, layout.t + layout.fullHeight * extendY)
    let _path_data = new Map(), path_data = new Map()
    for (const group of data) {
        for (let {
            cx, cy, A, B, C,
            fill = "none", color = 'black', linewidth, linetype, alpha,
            'translate-x': translateX = 0, 'translate-y': translateY = 0, $raw
        } of group) {
            let dx = Math.sqrt(C / (A * C - B * B)),
                dy = Math.sqrt(A / (A * C - B * B))
            const { h: ch, v: cv } = coord2pos({ x: cx, y: cy })
            let { h: h1, v: v1 } = coord2pos({ x: cx - dx, y: cy - dy }),
                { h: h2, v: v2 } = coord2pos({ x: cx + dx, y: cy + dy })
            let scaleX = (h2 - h1) / (2 * dx), scaleY = (v2 - v1) / (2 * dy)
            A /= scaleX * scaleX
            B /= scaleX * scaleY
            C /= scaleY * scaleY
            const tr = A + C, det = A * C - B * B
            const disc = Math.sqrt(Math.max(0, tr * tr / 4 - det))
            let rx = 1 / Math.sqrt(tr / 2 + disc), ry = 1 / Math.sqrt(tr / 2 - disc),
                angle = Math.atan2(2 * B, A - C) / 2
            const path2d = new Path2D()
            path2d.ellipse(ch + translateX, cv + translateY, rx, ry, angle, 0, 2 * Math.PI)
            _path_data.set(path2d, $raw)
            ctx.lineWidth = linewidth
            ctx.globalAlpha = alpha
            ctx.setLineDash(parseLinetype(linetype))
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
    for (let path of Array.from(_path_data.keys()).reverse()) {
        path_data.set(path, _path_data.get(path))
    }
    for (let evt of events) {
        canvas.addEventListener(evt, function (e) {
            if (e._vhandled) return
            const rect = canvas.getBoundingClientRect()
            const x = (e.clientX - rect.left) * canvas.width / rect.width
            const y = (e.clientY - rect.top) * canvas.height / rect.height
            for (const [path, data] of path_data) {
                if (ctx.isPointInPath(path, x, y)) {
                    emit(evt, e, getCoord(e), data)
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
</script>
<template>
    <foreignObject v-bind="vBind" ref="container"></foreignObject>
</template>
