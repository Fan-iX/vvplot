<script setup>
import { computed, useTemplateRef } from 'vue'
import CoreText from '../element/CoreText.vue'
const { ticks, title, coord2pos, pos2coord, layout, theme, action, position } = defineProps({
    ticks: { type: Array, default: () => [] }, title: String,
    coord2pos: Function, pos2coord: Function,
    layout: Object,
    theme: { type: Object, default: () => ({}) },
    action: { type: Object, default: () => ({}) },
    position: null
})
const width = computed(() => layout.width + layout.l + layout.r)
const height = computed(() => layout.height + layout.t + layout.b)

const translateX = defineModel('translateX', { type: Number, default: 0 })
const translateY = defineModel('translateY', { type: Number, default: 0 })
const transcaleX = defineModel('transcaleX')
const transcaleY = defineModel('transcaleY')
const transform = computed(() => {
    let translate = 0
    let aln = { bottom: "0%", center: "50%", top: "100%" }[position] ?? position
    if (typeof aln == "string" && aln.endsWith("%")) {
        translate = height.value * (1 - aln.slice(0, -1) / 100)
    } else {
        translate = translateY.value + coord2pos({ y: +aln }).y + layout.top
        if (transcaleY.value?.ratio != null)
            translate = translate * transcaleY.value.ratio + (1 - transcaleY.value.ratio) * (transcaleY.value.origin ?? 0.5) * height.value
    }
    return `translate(0, ${translate})`
})
const axisTitle = computed(() => {
    let pos = theme.title_position ?? theme.ticks_position, aln = pos,
        dockX = theme.title_dock_x, dockY = theme.title_dock_y, offset = 0
    if (typeof pos != "number") {
        aln = { left: 0, bottom: 0.5, top: 0.5, right: 1 }[pos] ?? 0.5
        dockX = dockX ?? { left: 1, right: 0 }[pos] ?? 0.5
        dockY = dockY ?? { top: 0, bottom: 1 }[pos] ?? 0.5
        offset = ({ top: -1, bottom: 1 }[pos] ?? 0) * (theme.title_offset ?? 0)
    }
    return {
        x: width.value * aln, y: offset,
        angle: theme.title_angle,
        dockX, dockY,
        fontSize: theme.title_size,
        text: title,
        'fill': theme.title_color,
        ...theme.title_style,
    }
})
const axisLine = computed(() => {
    return {
        'stroke': theme.line_color,
        'stroke-width': theme.line_width,
        'stroke-dasharray': theme.line_dasharray,
        'style': theme.line_style
    }
})
const tickLines = computed(() => {
    let result = []
    for (let tick of ticks) {
        if (typeof tick == 'number') tick = { position: tick }
        let position = coord2pos({ x: tick.position }).x + layout.l + translateX.value
        if (transcaleX.value?.ratio != null)
            position = position * transcaleX.value.ratio + (1 - transcaleX.value.ratio) * (transcaleX.value.origin ?? 0.5) * width.value
        if (position < 0 || position > width.value) continue
        let offset = (theme.ticks_position == "top" ? -1 : 1) * (tick.length ?? theme.ticks_length)
        result.push({
            y1: 0, y2: offset,
            x1: position, x2: position,
            'stroke': tick.color ?? theme.ticks_color,
            'stroke-width': tick.width ?? theme.ticks_width,
        })
    }
    return result.filter(t => t.stroke != null)
})
const tickTexts = computed(() => {
    let isTop = theme.ticks_position == "top"
    let result = []
    for (let tick of ticks) {
        if (typeof tick == 'number') tick = { position: tick, label: tick }
        let position = coord2pos({ x: tick.position }).x + layout.l + translateX.value
        if (transcaleX.value?.ratio != null)
            position = position * transcaleX.value.ratio + (1 - transcaleX.value.ratio) * (transcaleX.value.origin ?? 0.5) * width.value
        if (position < 0 || position > width.value) continue
        let offset = (isTop ? -1 : 1) * ((tick.length ?? theme.ticks_length) + 3)
        let anchorX, anchorY, dockX, dockY
        if (theme.ticks_anchor_x != null || theme.ticks_anchor_y != null) {
            anchorX = theme.ticks_anchor_x ?? 0.5
            anchorY = theme.ticks_anchor_y ?? (isTop ? 0 : 1)
        } else {
            dockX = theme.ticks_dock_x ?? 0.5
            dockY = theme.ticks_dock_y ?? (isTop ? 0 : 1)
        }
        result.push({
            x: position,
            y: offset,
            angle: theme.text_angle,
            anchorX, anchorY, dockX, dockY,
            text: tick.label,
            title: tick.title ?? tick.label,
            fontSize: tick.size ?? theme.label_size,
            'fill': tick.color ?? theme.label_color,
        })
    }
    return result.filter(t => t.fill != null)
})

function oob_squish(value, min, max) {
    if (value < min) return min
    if (value > max) return max
    return value
}
const iRef = useTemplateRef("i")
function getPos(event) {
    let rect = iRef.value.getBoundingClientRect()
    return {
        x: event.clientX - rect.left - layout.left,
        l: event.clientX - rect.left - layout.left,
        r: rect.left + layout.left + layout.width - event.clientX,
    }
}
const emit = defineEmits(['move', 'zoom', 'rescale', 'nudge'])
function axisMovePointerdown(e) {
    let act = action.find(a => a.action == "move")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    e.target.style.cursor = 'grabbing'
    let boundary = coord2pos(act, { unlimited: true })
    let dxmax = boundary.xmin == null ? Infinity : - boundary.xmin,
        dxmin = boundary.xmax == null ? -Infinity : layout.width - boundary.xmax
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        translateX.value = oob_squish(translateX.value + ev.movementX, dxmin, dxmax)
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        e.target.style.cursor = null
        applyTransform(act, ev)
    }
}
function axisRescaleLeftPointerdown(e) {
    let act = action.find(a => a.action == "rescale")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    let { xmin, xmax, "min-range-x": mrx = 0 } = act
    let { xmin: xmin0, xmax: xmax0 } = pos2coord({ xmin: layout.left, xmax: layout.left + layout.width })
    let { x } = getPos(e)
    let scalemin = layout.width / (layout.width - (coord2pos({ xmin, xmax }, { unlimited: true }).xmin ?? Infinity))
    let scalemax = layout.width / Math.abs(layout.width - (coord2pos({ xmin: xmax0 - mrx, xmax: xmin0 + mrx }).xmin))
    let dx = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        dx += ev.movementX
        let ratio = (layout.width - x - dx) / (layout.width - x)
        if (ratio < scalemin) ratio = scalemin
        if (ratio > scalemax) ratio = scalemax
        transcaleX.value = { ratio, origin: (layout.left + layout.width) / width.value }
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        applyTransform(act, ev)
    }
}
function axisRescaleRightPointerdown(e) {
    let act = action.find(a => a.action == "rescale")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    let { xmin, xmax, "min-range-x": mrx = 0 } = act
    let { xmin: xmin0, xmax: xmax0 } = pos2coord({ xmin: layout.left, xmax: layout.left + layout.width })
    let { x } = getPos(e)
    let scalemin = layout.width / (coord2pos({ xmin, xmax }, { unlimited: true }).xmax ?? Infinity)
    let scalemax = layout.width / Math.abs(coord2pos({ xmin: xmax0 - mrx, xmax: xmin0 + mrx }).xmax)
    let dx = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        dx += ev.movementX
        let ratio = (x + dx) / x
        if (ratio < scalemin) ratio = scalemin
        if (ratio > scalemax) ratio = scalemax
        transcaleX.value = { ratio, origin: layout.left / width.value }
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        applyTransform(act, ev)
    }
}
let wheelDelta = 0, wheelTimer
function axisWheel(e) {
    let act = action.find(a => ["zoom", "nudge"].includes(a.action) && ["ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => a[k] == e[k]))
    if (!act) return
    wheelTimer = clearTimeout(wheelTimer)
    e.preventDefault()
    e.stopPropagation()
    wheelDelta += e.deltaY
    wheel(act, getPos(e), wheelDelta)
    wheelTimer = setTimeout(() => {
        applyTransform(act, e)
        wheelDelta = 0
    }, 300)
}
function wheel(act, pos, delta) {
    if (act.action == "zoom") {
        let { "min-range-x": mrx = 0, sensitivity: lvl = 1.25 } = act
        lvl = lvl ** (delta / 100)
        let maxpos = coord2pos(act, { unlimited: true })
        let xmin = Math.max(pos.l - pos.l * lvl, maxpos.xmin ?? -Infinity),
            xmax = Math.min(pos.l + pos.r * lvl, maxpos.xmax ?? Infinity)
        if (lvl < 1) {
            let coord = pos2coord({ xmin, xmax })
            let dx = coord.xmax - coord.xmin, cx = (coord.xmax + coord.xmin) / 2
            if (dx > 0) {
                if (dx < mrx) {
                    coord.xmin = cx - mrx / 2
                    coord.xmax = cx + mrx / 2
                }
                ({ xmin, xmax } = coord2pos(coord))
            }
        }
        if (Math.abs(layout.width - (xmax - xmin)) > 1) {
            transcaleX.value = {
                ratio: layout.width / (xmax - xmin),
                origin: (layout.l + (xmin * layout.width) / (layout.width - xmax + xmin)) / width.value
            }
        }
    }
    if (act.action == "nudge") {
        let { sensitivity = 0.1 } = act
        let movement = sensitivity * layout.width * (-delta / 120)
        let boundary = coord2pos(act, { unlimited: true })
        let dxmax = boundary.xmin == null ? Infinity : - boundary.xmin,
            dxmin = boundary.xmax == null ? -Infinity : layout.width - boundary.xmax
        translateX.value = oob_squish(movement, dxmin, dxmax)
    }
}
function applyTransform(act, event) {
    if (transcaleX.value == null && translateX.value == 0) return
    let xmin = 0, xmax = layout.width
    if (transcaleX.value) {
        let ratio = transcaleX.value.ratio,
            origin = transcaleX.value.origin * width.value - layout.l
        xmin = xmin / ratio + (1 - 1 / ratio) * origin
        xmax = xmax / ratio + (1 - 1 / ratio) * origin
    }
    if (translateX.value) {
        xmin -= translateX.value
        xmax -= translateX.value
    }
    emit(act.action, pos2coord({ xmin, xmax }), event)
    translateX.value = 0
    transcaleX.value = null
}
</script>
<template>
    <g :transform="transform">
        <line ref="i" :x1="0" :x2="width" :y1="0" :y2="0" v-bind="axisLine" />
        <line v-for="tick in tickLines" v-bind="tick" />
        <CoreText v-for="tick in tickTexts" v-bind="tick" />
        <g v-if="action.some?.(a => a.action == 'move' || a.action == 'zoom')" class="vv-interactive"
            fill="transparent">
            <rect :width="width" :height="10" :y="-5" :class="{ 'cursor-grab': action.some?.(a => a.action == 'move') }"
                @pointerdown="axisMovePointerdown" @wheel="axisWheel" />
        </g>
        <g v-if="action.some?.(a => a.action == 'rescale')" class="vv-interactive" fill="transparent">
            <rect :width="20" :height="10" :y="-5" class="cursor-ew-resize" @pointerdown="axisRescaleLeftPointerdown" />
            <rect :width="20" :height="10" :y="-5" :x="width - 20" class="cursor-ew-resize"
                @pointerdown="axisRescaleRightPointerdown" />
        </g>
        <CoreText v-bind="axisTitle" />
    </g>
</template>
