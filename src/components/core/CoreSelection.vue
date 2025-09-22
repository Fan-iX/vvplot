<script setup>
import { computed } from 'vue'
import { extractModifier } from '#base/js/utils'
const selection = defineModel("selection")
const { coord2pos, pos2coord, layout, action } = defineProps({
    coord2pos: Function,
    pos2coord: Function,
    layout: Object,
    action: Array,
})

const borderBind = computed(() => {
    if (selection.value == null || selection.value.hidden) return {}
    if (['xmin', 'xmax', 'ymin', 'ymax'].every(k => selection.value?.[k] == null)) return {}
    let size = 10
    let { hmin, hmax, vmin, vmax } = coord2pos(selection.value, { limited: true }),
        pos = coord2pos(selection.value)
    if (hmin != null && hmax != null) [hmin, hmax] = [hmin, hmax].sort((a, b) => a - b)
    if (vmin != null && vmax != null) [vmin, vmax] = [vmin, vmax].sort((a, b) => a - b)
    let width = hmax - hmin, height = vmax - vmin
    let binds = {
        // tblr: { x: xmin, y: ymin, width, height, fill: "black", 'fill-opacity': 0.1, class: "cursor-move" },
        "": { x: hmin, y: vmin, width, height, fill: "black", 'fill-opacity': 0.1, class: "pointer-events-none" }
    }
    if (action == null) return binds
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
    return binds
})

const emit = defineEmits(['select', 'selecting'])
function selPointerdown(e, dir) {
    let act = action.find(a => a.action == "select" && ["buttons", "ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => a[k] == e[k]))
    if (!act) return
    e.stopPropagation()
    e.preventDefault()
    e.target.setPointerCapture(e.pointerId)
    let pos0 = coord2pos(selection.value, { unlimited: true })
    let { hmin: x1, hmax: x2, vmin: y1, vmax: y2 } = pos0
    e.target.onpointermove = (ev) => {
        if (dir.includes('l') && x1 != null) x1 += ev.movementX
        if (dir.includes('r') && x2 != null) x2 += ev.movementX
        if (dir.includes('t') && y1 != null) y1 += ev.movementY
        if (dir.includes('b') && y2 != null) y2 += ev.movementY
        let [hmin, hmax] = x1 > x2 ? [x2, x1] : [x1, x2]
        let [vmin, vmax] = y1 > y2 ? [y2, y1] : [y1, y2]
        emit('selecting', pos2coord({ hmin, hmax, vmin, vmax }))
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        let [hmin, hmax] = x1 > x2 ? [x2, x1] : [x1, x2]
        let [vmin, vmax] = y1 > y2 ? [y2, y1] : [y1, y2]
        let coord = pos2coord({ hmin, hmax, vmin, vmax })
        selection.value = coord
        let res = extractModifier(ev)
        res.type = "resize"
        Object.assign(res, coord)
        emit('selecting', null)
        emit('select', res)
    }
}
</script>
<template>
    <g class="vv-interactive">
        <rect v-for="bind, k in borderBind" fill="transparent" v-bind="bind" @pointerdown="selPointerdown($event, k)" />
    </g>
</template>
