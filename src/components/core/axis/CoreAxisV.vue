<script setup>
import { computed, inject, useTemplateRef } from 'vue'
import { oob_squish_any, emitEvent, dropNull } from '#base/js/utils'
import CoreText from '../element/CoreText.vue'
const { coord, ticks, title, coord2pos, pos2coord, layout, theme, action, position, activeTransform, transition } = defineProps({
    coord: String,
    ticks: { type: Array, default: () => [] }, title: String,
    coord2pos: Function, pos2coord: Function,
    layout: Object,
    theme: { type: Object, default: () => ({}) },
    action: { type: Array, default: () => [] },
    position: null, activeTransform: Object, transition: String,
})
const width = computed(() => layout.width + layout.l + layout.r)
const height = computed(() => layout.height + layout.t + layout.b)

const rangePreview = inject('rangePreview')
const transform = computed(() => {
    let translate = 0
    let aln = { left: "0%", center: "50%", right: "100%" }[position] ?? position
    if (typeof aln == "string" && aln.endsWith("%")) {
        translate = width.value * aln.slice(0, -1) / 100
    } else {
        translate = activeTransform.translateH + coord2pos({ h: +aln }).h * activeTransform.scaleH + layout.left
    }
    return `translate(${translate}, 0)`
})
const axisTitle = computed(() => {
    let pos = theme.title_position ?? theme.tick_position, aln = pos,
        dockX = theme.title_dock_x, dockY = theme.title_dock_y, offset = 0
    if (typeof pos != "number") {
        aln = { bottom: 0, left: 0.5, right: 0.5, top: 1 }[pos] ?? 0.5
        dockX ??= { left: 1, right: 0 }[pos] ?? 0.5
        dockY ??= { top: 0, bottom: 1 }[pos] ?? 0.5
        offset = ({ left: -1, right: 1 }[pos] ?? 0) * (theme.title_offset ?? 0)
    }
    return {
        x: offset, y: height.value * (1 - aln),
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
        'style': theme.line_style,
    }
})
const tickLines = computed(() => {
    let result = []
    for (let tick of ticks) {
        if (typeof tick == 'number') tick = { position: tick }
        let pos = coord2pos({ v: tick.position }).v
        let tsl = pos * (activeTransform.scaleV - 1) + activeTransform.translateV
        let position = pos + layout.t
        if (position + tsl < 0 || position + tsl > height.value) continue
        let offset = (theme.tick_position == "right" ? 1 : -1) * (tick.length ?? theme.tick_length)
        result.push({
            key: "line-" + tick.position,
            y1: position, y2: position,
            x1: 0, x2: offset,
            'stroke': tick.color ?? theme.tick_color,
            'stroke-width': tick.width ?? theme.tick_width,
            transform: tsl ? `translate(0,${tsl})` : null,
            style: { transition },
        })
    }
    return result.filter(t => t.stroke != null).sort((a, b) => a.y1 - b.y1)
})
const tickTexts = computed(() => {
    let isRight = theme.tick_position == "right"
    let result = []
    for (let tick of ticks) {
        if (typeof tick == 'number') tick = { position: tick }
        let pos = coord2pos({ v: tick.position }).v
        let tsl = pos * (activeTransform.scaleV - 1) + activeTransform.translateV
        let position = pos + layout.t
        if (position + tsl < 0 || position + tsl > height.value) continue
        let offset = (isRight ? 1 : -1) * ((tick.length ?? theme.tick_length) + 3)
        let anchorX, anchorY, dockX, dockY
        if (theme.tick_anchor_x != null || theme.tick_anchor_y != null) {
            anchorX = theme.tick_anchor_x ?? (isRight ? 0 : 1)
            anchorY = theme.tick_anchor_y ?? 0.5
        } else {
            dockX = theme.tick_dock_x ?? (isRight ? 0 : 1)
            dockY = theme.tick_dock_y ?? 0.5
        }
        result.push({
            wrapper: {
                key: "text-" + tick.position,
                transform: tsl ? `translate(0,${tsl})` : null,
                style: { transition },
            },
            text: {
                y: position,
                x: offset,
                angle: theme.text_angle,
                anchorX, anchorY, dockX, dockY,
                text: tick.label,
                title: tick.title ?? tick.label,
                fontSize: tick.size ?? theme.label_size,
                'fill': tick.color ?? theme.label_color,
            }
        })
    }
    return result.filter(t => t.text.fill != null).sort((a, b) => a.text.y - b.text.y)
})

const iRef = useTemplateRef("i")
function getPosition(event) {
    let rect = iRef.value.getBoundingClientRect()
    let t = Math.trunc(event.clientY) - rect.top - layout.top,
        b = rect.top + layout.top + layout.height - Math.trunc(event.clientY)
    let result = { t, b }
    let { x, y } = pos2coord({ v: t })
    if (x) result.x = x
    if (y) result.y = y
    return result
}
const emit = defineEmits([
    'click', 'dblclick', 'contextmenu', 'pointerdown', 'pointerup', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'wheel', 'singleclick',
    'move', 'zoom', 'rescale', 'nudge', 'rangechange',
    'update:transition'
])
let moveTimer, movementY = 0
function axisMovePointerdown(e) {
    let position = getPosition(e)
    emit('pointerdown', e, position)
    let pointerMoved = false
    function detectMove(ev) {
        if (Math.abs(ev.screenX - e.screenX) > 3 || Math.abs(ev.screenY - e.screenY) > 3) {
            pointerMoved = true
            ev.currentTarget.removeEventListener('pointermove', detectMove)
        }
    }
    e.target.addEventListener('pointermove', detectMove, { passive: true })
    e.target.addEventListener('pointerup', function (ev) {
        e.target.removeEventListener('pointermove', detectMove)
        if (!pointerMoved) {
            let position = getPosition(ev)
            emit('singleclick', new PointerEvent("singleclick", ev), position)
        }
    }, { once: true })
    let act = action.find(a => a.action == "move")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    e.target.style.cursor = 'grabbing'
    moveTimer = clearTimeout(moveTimer)
    let vmin0 = 0, vmax0 = layout.height
    let boundary = coord2pos(act)
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        movementY += ev.movementY
        if (!pointerMoved) return
        let dv = oob_squish_any(-movementY, { min: boundary.vmin - vmin0, max: boundary.vmax - vmax0 })
        let { xmin, xmax, ymin, ymax } = pos2coord({ vmin: vmin0 + dv, vmax: vmax0 + dv })
        Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        e.target.style.cursor = null
        if (!pointerMoved) return
        moveTimer = setTimeout(() => {
            applyTransform(act, ev)
            movementY = 0
        }, 300)
    }
}
function axisRescaleTopPointerdown(e) {
    let act = action.find(a => a.action == "rescale")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    let { "min-range-v": mrv = 0 } = act
    let position = getPosition(e), v = coord2pos(position).v,
        vmin = v - position.t, vmax = v + position.b
    let coord0 = pos2coord({ vmin, vmax })
    let boundary = {
        min: coord2pos(act).vmin,
        max: coord2pos({ vmin: coord0.vmax - mrv, vmax: coord0.vmin + mrv }).vmin,
    }
    let movementY = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        movementY += ev.movementY
        let { xmin, xmax, ymin, ymax } = pos2coord({
            vmin: oob_squish_any(vmax - (vmax - vmin) * position.b / Math.max(position.b - movementY, 1), boundary),
            vmax,
        })
        Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        applyTransform(act, ev)
    }
}
function axisRescaleBottomPointerdown(e) {
    let act = action.find(a => a.action == "rescale")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    let { "min-range-v": mrv = 0 } = act
    let position = getPosition(e), v = coord2pos(position).v,
        vmin = v - position.t, vmax = v + position.b
    let coord0 = pos2coord({ vmin, vmax })
    let boundary = {
        min: coord2pos({ vmin: coord0.vmax - mrv, vmax: coord0.vmin + mrv }).vmax,
        max: coord2pos(act).vmax,
    }
    let movementY = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        movementY += ev.movementY
        let { xmin, xmax, ymin, ymax } = pos2coord({
            vmin,
            vmax: oob_squish_any(vmin + (vmax - vmin) * position.t / Math.max(position.t + movementY, 1), boundary),
        })
        Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        applyTransform(act, ev)
    }
}
let wheelDelta = 0, wheelTimer
function axisWheel(e) {
    let position = getPosition(e)
    emit('wheel', e, position)
    let act = action.find(a => ["zoom", "nudge"].includes(a.action) && ["ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => a[k] == e[k]))
    if (!act) return
    wheelTimer = clearTimeout(wheelTimer)
    e.preventDefault()
    e.stopPropagation()
    emit('update:transition', 'transform 0.1s ease-out')
    wheelDelta += e.deltaY
    wheel(act, position, wheelDelta)
    wheelTimer = setTimeout(() => {
        applyTransform(act, e)
        wheelDelta = 0
    }, 300)
}
function wheel(act, pos, delta) {
    if (act.action == "zoom") {
        let { "min-range-v": mrv = 0, sensitivity = 1.25 } = act
        let lvl = sensitivity ** (delta / 100)
        let boundary = coord2pos(act)
        let vmin = Math.max(pos.t - Math.max(pos.t, 0) * lvl, boundary.vmin ?? -Infinity),
            vmax = Math.min(pos.t + Math.max(pos.b, 0) * lvl, boundary.vmax ?? Infinity)
        let { [coord + 'min']: min, [coord + 'max']: max } = pos2coord({ vmin, vmax })
        if (lvl < 1 && max - min < mrv) {
            let c = (max + min) / 2
            min = c - mrv / 2
            max = c + mrv / 2
        }
        rangePreview[coord + 'min'] = min
        rangePreview[coord + 'max'] = max
    }
    if (act.action == "nudge") {
        let { sensitivity = 0.1 } = act
        let boundary = coord2pos(act)
        let vmin0 = 0, vmax0 = layout.height
        let movement = sensitivity * layout.height * (-delta / 120)
        let dv = oob_squish_any(-movement, { min: boundary.vmin - vmin0, max: boundary.vmax - vmax0 })
        let { xmin, xmax, ymin, ymax } = pos2coord({ vmin: vmin0 + dv, vmax: vmax0 + dv })
        Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
    }
}
function applyTransform(act, event) {
    if (!Object.keys(dropNull(rangePreview) ?? {}).length) return
    if (!emitEvent(act.emit, rangePreview, event)) {
        emit(act.action, rangePreview, event)
    }
    emit('rangechange', rangePreview)
    let xmin, xmax, ymin, ymax
    Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
}
const axisVOn = {
    pointerup(e) { emit('pointerup', e, getPosition(e)) },
    pointerover(e) { emit('pointerover', e, getPosition(e)) },
    pointerout(e) { emit('pointerout', e, getPosition(e)) },
    pointerenter(e) { emit('pointerenter', e, getPosition(e)) },
    pointerleave(e) { emit('pointerleave', e, getPosition(e)) },
    dblclick(e) { emit('dblclick', e, getPosition(e)) },
    click(e) { emit('click', e, getPosition(e)) },
    contextmenu(e) { emit('contextmenu', e, getPosition(e)) },
    pointermove(e) { emit('pointermove', e, getPosition(e)) },
    pointerdown: axisMovePointerdown,
    wheel: axisWheel
}
</script>
<template>
    <g :transform="transform" :style="{ transition }">
        <line ref="i" :x1="0" :x2="0" :y1="0" :y2="height" v-bind="axisLine" />
        <line v-for="tick in tickLines" v-bind="tick" />
        <g v-for="tick in tickTexts" v-bind="tick.wrapper">
            <CoreText v-bind="tick.text" />
        </g>
        <g class="vvplot-interactive" fill="transparent">
            <rect :width="10" :height="height" :x="-5" v-on="axisVOn"
                :cursor="action.some?.(a => a.action == 'move') ? 'grab' : null" />
        </g>
        <g v-if="action.some?.(a => a.action == 'rescale')" class="vvplot-interactive" fill="transparent">
            <rect :width="10" :height="20" :x="-5" style="cursor:ns-resize;" @pointerdown="axisRescaleTopPointerdown" />
            <rect :width="10" :height="20" :x="-5" :y="height - 20" style="cursor:ns-resize;"
                @pointerdown="axisRescaleBottomPointerdown" />
        </g>
        <CoreText v-bind="axisTitle" v-if="axisTitle.text" />
    </g>
</template>
