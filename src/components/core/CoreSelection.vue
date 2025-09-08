<script setup>
import { computed } from 'vue';
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
    let { xmin, xmax, ymin, ymax } = coord2pos(selection.value),
        pos = coord2pos(selection.value, { unlimited: true })
    if (xmin != null && xmax != null) [xmin, xmax] = [xmin, xmax].sort((a, b) => a - b)
    if (ymin != null && ymax != null) [ymin, ymax] = [ymin, ymax].sort((a, b) => a - b)
    let width = xmax - xmin, height = ymax - ymin
    let binds = {
        // tblr: { x: xmin, y: ymin, width, height, fill: "black", 'fill-opacity': 0.1, class: "cursor-move" },
        "": { x: xmin, y: ymin, width, height, fill: "black", 'fill-opacity': 0.1, class: "pointer-events-none" }
    }
    if (action == null) return binds
    if (pos.xmin != null)
        binds.l = { x: xmin - size / 2, y: ymin, width: size, height, class: "cursor-ew-resize" }
    if (pos.xmax != null)
        binds.r = { x: xmax - size / 2, y: ymin, width: size, height, class: "cursor-ew-resize" }
    if (pos.ymin != null)
        binds.t = { x: xmin, y: ymin - size / 2, width, height: size, class: "cursor-ns-resize" }
    if (pos.ymax != null)
        binds.b = { x: xmin, y: ymax - size / 2, width, height: size, class: "cursor-ns-resize" }
    if (pos.xmin != null && pos.ymin != null)
        binds.tl = { x: xmin - size / 2, y: ymin - size / 2, width: size, height: size, class: "cursor-nwse-resize" }
    if (pos.xmax != null && pos.ymin != null)
        binds.tr = { x: xmax - size / 2, y: ymin - size / 2, width: size, height: size, class: "cursor-nesw-resize" }
    if (pos.xmin != null && pos.ymax != null)
        binds.bl = { x: xmin - size / 2, y: ymax - size / 2, width: size, height: size, class: "cursor-nesw-resize" }
    if (pos.xmax != null && pos.ymax != null)
        binds.br = { x: xmax - size / 2, y: ymax - size / 2, width: size, height: size, class: "cursor-nwse-resize" }
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
    let { xmin: x1, xmax: x2, ymin: y1, ymax: y2 } = pos0
    e.target.onpointermove = (ev) => {
        if (dir.includes('l') && x1 != null) x1 += ev.movementX
        if (dir.includes('r') && x2 != null) x2 += ev.movementX
        if (dir.includes('t') && y1 != null) y1 += ev.movementY
        if (dir.includes('b') && y2 != null) y2 += ev.movementY
        let [xmin, xmax] = x1 > x2 ? [x2, x1] : [x1, x2]
        let [ymin, ymax] = y1 > y2 ? [y2, y1] : [y1, y2]
        let coord = { xmin, xmax, ymin, ymax }
        emit('selecting', pos2coord(coord))
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        let [xmin, xmax] = x1 > x2 ? [x2, x1] : [x1, x2]
        let [ymin, ymax] = y1 > y2 ? [y2, y1] : [y1, y2]
        let coord = { xmin, xmax, ymin, ymax }
        let pos = pos2coord(coord)
        selection.value = pos
        let res = extractModifier(ev)
        res.type = "resize"
        Object.assign(res, pos)
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
