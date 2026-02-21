<script setup>
import { computed, watch, useTemplateRef } from 'vue'
import { parseLinetype } from '#base/js/utils'
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
            'text-length': textLength, 'font-family': fontFamily = "sans-serif", 'text-align': textAlign = 'justify', angle = 'auto',
            $raw
        } of group) {
            const { h: x1, v: y1 } = coord2pos({ x: x, y: y })
            const { h: x2, v: y2 } = coord2pos({ x: xend, y: yend })
            if (textAlign !== 'justify' || angle === 'auto') angle = Math.atan2(y2 - y1, x2 - x1)
            ctx.save()
            ctx.translate(translateX, translateY)
            ctx.textBaseline = 'middle'
            ctx.lineWidth = linewidth
            ctx.globalAlpha = alpha
            ctx.font = `${size * 4}px ${fontFamily}`
            ctx.setLineDash(parseLinetype(linetype))
            if (["stretch", "start", "center", "end"].includes(textAlign)) {
                let text = String(label).replace(/\x01|\x02/g, '')
                if (textAlign === 'start') {
                    ctx.translate(x1, y1)
                    ctx.textAlign = 'start'
                } else if (textAlign === 'center' || textAlign === 'stretch') {
                    ctx.translate((x1 + x2) / 2, (y1 + y2) / 2)
                    ctx.textAlign = 'center'
                } else if (textAlign === 'end') {
                    ctx.translate(x2, y2)
                    ctx.textAlign = 'end'
                }
                ctx.rotate(angle)
                if (textAlign === 'stretch') {
                    ctx.scale(Math.hypot(x2 - x1 || 0, y2 - y1 || 0) / ctx.measureText(text).width, 1)
                }
                if (color !== 'none') {
                    ctx.fillStyle = color
                    ctx.fillText(text, 0, 0)
                }
                if (stroke != null) {
                    ctx.strokeStyle = stroke
                    ctx.strokeText(text, 0, 0)
                }
            } else {
                ctx.textAlign = 'center'
                let parts = splitLabel(String(label))
                let dx = (x2 - x1) / (parts.length - 1 || 1),
                    dy = (y2 - y1) / (parts.length - 1 || 1)
                for (let i = 0; i < parts.length; i++) {
                    ctx.save()
                    ctx.translate(x1 + i * dx, y1 + i * dy)
                    ctx.rotate(angle)
                    let text = parts[i]
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
