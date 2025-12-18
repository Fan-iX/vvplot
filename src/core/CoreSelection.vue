<script setup>
import { computed, h } from 'vue'
import { oob_squish_any, dropNull, plus } from '#base/js/utils'
const model = defineModel({ default: () => ({}) })
const { coord2pos, pos2coord, layout, theme, flip, ...config } = defineProps({
    coord2pos: Function,
    pos2coord: Function,
    layout: Object,
    theme: Object,
    flip: Boolean,
    move: Boolean, resize: Boolean, dismissible: Boolean,
    xmin: Number, xmax: Number, ymin: Number, ymax: Number, x: Boolean, y: Boolean,
    minRangeX: Number, minRangeY: Number,
    ctrlKey: Boolean, shiftKey: Boolean, altKey: Boolean, metaKey: Boolean,
    buttons: Number,
})

const borderBind = computed(() => {
    if (model.value == null || model.value.hidden) return null
    if (['xmin', 'xmax', 'ymin', 'ymax'].every(k => model.value?.[k] == null)) return null
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
        style: config.move ? "cursor:move;" : "pointer-events:none;"
    }
    if (config.resize) {
        if (pos.hmin != null)
            binds.l = { x: hmin - size / 2, y: vmin, width: size, height, style: "cursor:ew-resize;" }
        if (pos.hmax != null)
            binds.r = { x: hmax - size / 2, y: vmin, width: size, height, style: "cursor:ew-resize;" }
        if (pos.vmin != null)
            binds.t = { x: hmin, y: vmin - size / 2, width, height: size, style: "cursor:ns-resize;" }
        if (pos.vmax != null)
            binds.b = { x: hmin, y: vmax - size / 2, width, height: size, style: "cursor:ns-resize;" }
        if (pos.hmin != null && pos.vmin != null)
            binds.tl = { x: hmin - size / 2, y: vmin - size / 2, width: size, height: size, style: "cursor:nwse-resize;" }
        if (pos.hmax != null && pos.vmin != null)
            binds.tr = { x: hmax - size / 2, y: vmin - size / 2, width: size, height: size, style: "cursor:nesw-resize;" }
        if (pos.hmin != null && pos.vmax != null)
            binds.bl = { x: hmin - size / 2, y: vmax - size / 2, width: size, height: size, style: "cursor:nesw-resize;" }
        if (pos.hmax != null && pos.vmax != null)
            binds.br = { x: hmax - size / 2, y: vmax - size / 2, width: size, height: size, style: "cursor:nwse-resize;" }
    }
    return binds
})

const emit = defineEmits(['select', 'selecting', 'selectend', 'click', 'contextmenu'])
function selPointerdown(e, dir) {
    if (!dir) return
    if (!["buttons", "ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => config[k] == e[k])) return
    e.stopPropagation()
    e.preventDefault()
    e.target.setPointerCapture(e.pointerId)
    let pos0 = coord2pos(model.value)
    let { h: coordL, v: coordT } = pos2coord({ h: pos0.hmin, v: pos0.vmin }),
        { h: coordR, v: coordB } = pos2coord({ h: pos0.hmax, v: pos0.vmax })

    let { hmin: hmin0, hmax: hmax0, vmin: vmin0, vmax: vmax0 } = pos0
    let pointerMoved = false
    let xboundary = { min: config.xmin, max: config.xmax },
        yboundary = { min: config.ymin, max: config.ymax },
        [mrh = 0, mry = 0] = flip ? [config.minRangeY, config.minRangeX] : [config.minRangeX, config.minRangeY]
    let boundary = coord2pos(config)
    let movementX = 0, movementY = 0
    let xmin, xmax, ymin, ymax, xreverse = false, yreverse = false
    e.target.onpointermove = (ev) => {
        pointerMoved = true
        movementX += ev.movementX
        movementY += ev.movementY
        if (dir.includes('l') && dir.includes('r')) {
            let dh = oob_squish_any(movementX, { min: boundary.hmin - hmin0, max: boundary.hmax - hmax0 })
            let coord = pos2coord({ hmin: plus(hmin0, dh), hmax: plus(hmax0, dh) })
            coordL = coord.hmin
            coordR = coord.hmax
        } else if (dir.includes('l')) {
            coordL = pos2coord({ h: hmin0 + movementX }).h
            coordL = oob_squish_any(coordL, coordL > coordR ? { min: plus(coordR, mrh) } : { max: plus(coordR, -mrh) })
            xreverse = hmin0 + movementX > hmax0
        } else if (dir.includes('r')) {
            coordR = pos2coord({ h: hmax0 + movementX }).h
            coordR = oob_squish_any(coordR, coordR > coordL ? { min: plus(coordL, mrh) } : { max: plus(coordL, -mrh) })
            xreverse = hmax0 + movementX < hmin0
        }
        if (dir.includes('t') && dir.includes('b')) {
            let dv = oob_squish_any(movementY, { min: boundary.vmin - vmin0, max: boundary.vmax - vmax0 })
            let coord = pos2coord({ vmin: plus(vmin0, dv), vmax: plus(vmax0, dv) })
            coordT = coord.vmin
            coordB = coord.vmax
        } else if (dir.includes('t')) {
            coordT = pos2coord({ v: vmin0 + movementY }).v
            coordT = oob_squish_any(coordT, coordT > coordB ? { min: plus(coordB, mry) } : { max: plus(coordB, -mry) })
            yreverse = vmin0 + movementY > vmax0
        } else if (dir.includes('b')) {
            coordB = pos2coord({ v: vmax0 + movementY }).v
            coordB = oob_squish_any(coordB, coordB > coordT ? { min: plus(coordT, mry) } : { max: plus(coordT, -mry) })
            yreverse = vmax0 + movementY < vmin0
        }
        xmin = oob_squish_any(flip ? coordT : coordL, xboundary)
        xmax = oob_squish_any(flip ? coordB : coordR, xboundary)
        ymin = oob_squish_any(flip ? coordL : coordT, yboundary)
        ymax = oob_squish_any(flip ? coordR : coordB, yboundary)
        if (xmin > xmax) [xmin, xmax] = [xmax, xmin]
        if (ymin > ymax) [ymin, ymax] = [ymax, ymin]
        emit('selecting', { xmin, xmax, ymin, ymax }, theme)
    }
    e.target.onpointerup = (ev) => {
        ev.currentTarget.onpointerup = null
        ev.currentTarget.onpointermove = null
        if (config.buttons & 1) {
            ev.currentTarget.onclick = (event) => {
                event.currentTarget.onclick = null
                emit("click", event)
            }
        }
        if (config.buttons & 2) {
            ev.currentTarget.oncontextmenu = (event) => {
                event.currentTarget.onclick = null
                emit("contextmenu", event)
            }
        }
        if (!pointerMoved) return
        let res = {
            xmin, xmax, xreverse: Boolean(xreverse ^ model.value.xreverse),
            ymin, ymax, yreverse: Boolean(yreverse ^ model.value.yreverse)
        },
            event = new PointerEvent("select", e)
        model.value = dropNull(res)
        emit('selectend')
        emit('select', dropNull(res), event)
    }
}
</script>
<template>
    <g class="vvplot-interactive" v-if="borderBind">
        <rect v-for="bind, k in borderBind" fill="transparent" v-bind="bind" @pointerdown="selPointerdown($event, k)" />
    </g>
</template>
