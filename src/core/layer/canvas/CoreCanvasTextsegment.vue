<script setup>
import { computed, watch, useTemplateRef } from 'vue'
const { extendX, extendY, data, coord2pos, getCoord, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, getCoord: Function, layout: Object
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
    let _path_data = new Map(), path_data = new Map()
    for (const group of data) {
        for (let {
            x, xend, y, yend, size = 4, label = "", title,
            color, stroke, linewidth, linetype, alpha,
            'translate-x': translateX = 0, 'translate-y': translateY = 0,
            'text-length': textLength, $raw
        } of group) {
            ctx.save()
            ctx.translate(translateX, translateY)
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.lineWidth = linewidth
            ctx.globalAlpha = alpha
            ctx.font = `${size * 4}px sans-serif`
            let parts = splitLabel(String(label))
            let dx = (xend - x) / (parts.length - 1 || 1),
                dy = (yend - y) / (parts.length - 1 || 1)
            for (let i = 0; i < parts.length; i++) {
                ctx.save()
                let $x = x + i * dx, $y = y + i * dy
                const { h: tx, v: ty } = coord2pos({ x: $x, y: $y })
                ctx.translate(tx, ty)
                let text = parts[i]
                let { width: w, fontBoundingBoxAscent: a, fontBoundingBoxDescent: d } = ctx.measureText(text),
                    width = w, height = a + d
                if (typeof (textLength) == "object") {
                    let { x: lx = 0, y: ly = 0 } = textLength
                    let { h: h1, v: v1 } = coord2pos({ x: x + lx / 2, y: y + ly / 2 }),
                        { h: h2, v: v2 } = coord2pos({ x: x - lx / 2, y: y - ly / 2 })
                    width = Math.hypot(h1 - h2 || 0, v1 - v2 || 0)
                } else if (textLength != null) {
                    width = textLength
                }
                if (width != w) ctx.scale(width / w, 1)
                if (color !== 'none') {
                    ctx.fillStyle = color
                    ctx.fillText(text, 0, 0)
                }
                if (stroke != null) {
                    ctx.strokeStyle = stroke
                    ctx.strokeText(text, 0, 0)
                }
                ctx.restore()
            }
            ctx.restore()
        }
    }
    for (let path of Array.from(_path_data.keys()).reverse()) {
        path_data.set(path, _path_data.get(path))
    }
    for (let evt of events) {
        canvas.addEventListener(evt, function (e) {
            if (e._vhandled) return
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
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
/**
 * split label into parts, use \x01 and \x02 to represent start and end of a segment
 * @param {string} label 
 * @returns {Array}
 */
function splitLabel(label) {
    let result = []
    for (let i = 0; i < label.length; i++) {
        if (label[i] == '\x01') {
            let j = i + 1
            while (j < label.length && label[j] != '\x02') j++
            result.push(label.slice(i + 1, j))
            i = j
        } else {
            result.push(label[i])
        }
    }
    return result
}
</script>
<template>
    <foreignObject v-bind="vBind" ref="container"></foreignObject>
</template>
