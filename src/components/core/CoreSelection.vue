<script setup>
import { computed } from 'vue'
import { oob_squish_any, dropNull } from '#base/js/utils'
const model = defineModel({ default: () => ({}) })
const { coord2pos, pos2coord, layout, theme, ...config } = defineProps({
    coord2pos: Function,
    pos2coord: Function,
    layout: Object,
    theme: Object,
    move: Boolean, resize: Boolean,
    xmin: Number, xmax: Number, ymin: Number, ymax: Number, x: Boolean, y: Boolean,
    ctrlKey: Boolean, shiftKey: Boolean, altKey: Boolean, metaKey: Boolean,
    buttons: Number,
})

const borderBind = computed(() => {
    if (model.value == null || model.value.hidden) return {}
    if (['xmin', 'xmax', 'ymin', 'ymax'].every(k => model.value?.[k] == null)) return {}
    let size = 10
    let { hmin, hmax, vmin, vmax } = coord2pos(model.value, { limited: true }),
        pos = coord2pos(model.value)
    if (hmin != null && hmax != null) [hmin, hmax] = [hmin, hmax].sort((a, b) => a - b)
    if (vmin != null && vmax != null) [vmin, vmax] = [vmin, vmax].sort((a, b) => a - b)
    let width = hmax - hmin, height = vmax - vmin
    let binds = {}
    binds[config.move ? "tblr" : ""] = {
        x: hmin, y: vmin, width, height,
        fill: theme?.background ?? "#00000020",
        'fill-opacity': theme?.opacity,
        stroke: theme?.line_color ?? "transparent",
        'stroke-width': theme?.line_width,
        'stroke-opacity': theme?.opacity,
        class: config.move ? "cursor-move" : "pointer-events-none"
    }
    if (config.resize) {
        if (pos.hmin != null)
            binds.l = { x: hmin - size / 2, y: vmin, width: size, height, class: "cursor-ew-resize" }
        if (pos.hmax != null)
            binds.r = { x: hmax - size / 2, y: vmin, width: size, height, class: "cursor-ew-resize" }
        if (pos.vmin != null)
            binds.t = { x: hmin, y: vmin - size / 2, width, height: size, class: "cursor-ns-resize" }
        if (pos.vmax != null)
            binds.b = { x: hmin, y: vmax - size / 2, width, height: size, class: "cursor-ns-resize" }
        if (pos.hmin != null && pos.vmin != null)
            binds.tl = { x: hmin - size / 2, y: vmin - size / 2, width: size, height: size, class: "cursor-nwse-resize" }
        if (pos.hmax != null && pos.vmin != null)
            binds.tr = { x: hmax - size / 2, y: vmin - size / 2, width: size, height: size, class: "cursor-nesw-resize" }
        if (pos.hmin != null && pos.vmax != null)
            binds.bl = { x: hmin - size / 2, y: vmax - size / 2, width: size, height: size, class: "cursor-nesw-resize" }
        if (pos.hmax != null && pos.vmax != null)
            binds.br = { x: hmax - size / 2, y: vmax - size / 2, width: size, height: size, class: "cursor-nwse-resize" }
    }
    return binds
})

const emit = defineEmits(['select', 'selecting'])
function selPointerdown(e, dir) {
    if (!["buttons", "ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => config[k] == e[k])) return
    e.stopPropagation()
    e.preventDefault()
    e.target.setPointerCapture(e.pointerId)
    let pos0 = coord2pos(model.value, { unlimited: true })
    let { hmin: hmin0, hmax: hmax0, vmin: vmin0, vmax: vmax0 } = pos0
    let pointerMoved = false
    let boundary = coord2pos(config, { unlimited: true }),
        hboundary = { min: boundary.hmin, max: boundary.hmax },
        vboundary = { min: boundary.vmin, max: boundary.vmax }
    let movementX = 0, movementY = 0, h1, h2, v1, v2
    e.target.onpointermove = (ev) => {
        pointerMoved = true
        movementX += ev.movementX
        movementY += ev.movementY
        if (dir == "tblr") {
            let dh = oob_squish_any(movementX, { min: boundary.hmin - hmin0, max: boundary.hmax - hmax0 })
            let dv = oob_squish_any(movementY, { min: boundary.vmin - vmin0, max: boundary.vmax - vmax0 })
            if (hmin0 != null) h1 = hmin0 + dh
            if (hmax0 != null) h2 = hmax0 + dh
            if (vmin0 != null) v1 = vmin0 + dv
            if (vmax0 != null) v2 = vmax0 + dv
        } else {
            h1 = dir.includes('l') && hmin0 != null ? oob_squish_any(hmin0 + movementX, hboundary) : hmin0
            h2 = dir.includes('r') && hmax0 != null ? oob_squish_any(hmax0 + movementX, hboundary) : hmax0
            v1 = dir.includes('t') && vmin0 != null ? oob_squish_any(vmin0 + movementY, vboundary) : vmin0
            v2 = dir.includes('b') && vmax0 != null ? oob_squish_any(vmax0 + movementY, vboundary) : vmax0
        }
        let { xmin, xmax, ymin, ymax } = pos2coord({ hmin: h1, hmax: h2, vmin: v1, vmax: v2 })
        emit('selecting', { modelValue: { xmin, xmax, ymin, ymax }, theme })
    }
    e.target.onclick = (ev) => {
        ev.currentTarget.onpointermove = null
        ev.currentTarget.onclick = null
        if (!pointerMoved) return
        let [hmin, hmax] = h1 > h2 ? [h2, h1] : [h1, h2]
        let [vmin, vmax] = v1 > v2 ? [v2, v1] : [v1, v2]
        let { xmin, xmax, ymin, ymax } = pos2coord({ hmin, hmax, vmin, vmax })
        let xreverse = Boolean((h1 > h2) ^ model.value.xreverse),
            yreverse = Boolean((v1 > v2) ^ model.value.yreverse)
        let res = { xmin, xmax, xreverse, ymin, ymax, yreverse },
            event = new PointerEvent("select", e)
        model.value = dropNull(res)
        emit('selecting', null)
        emit('select', dropNull(res), event)
    }
}
</script>
<template>
    <g class="vv-interactive">
        <rect v-for="bind, k in borderBind" fill="transparent" v-bind="bind" @pointerdown="selPointerdown($event, k)" />
    </g>
</template>
