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
    let aln = { bottom: "0%", center: "50%", top: "100%" }[position] ?? position
    if (typeof aln == "string" && aln.endsWith("%")) {
        translate = height.value * (1 - aln.slice(0, -1) / 100)
    } else {
        translate = activeTransform.translateV + coord2pos({ v: +aln }).v * activeTransform.scaleV + layout.top
    }
    return `translate(0, ${translate})`
})
const axisTitle = computed(() => {
    let pos = theme.title_position ?? theme.tick_position, aln = pos,
        dockX = theme.title_dock_x, dockY = theme.title_dock_y, offset = 0
    if (typeof pos != "number") {
        aln = { left: 0, bottom: 0.5, top: 0.5, right: 1 }[pos] ?? 0.5
        dockX ??= { left: 1, right: 0 }[pos] ?? 0.5
        dockY ??= { top: 0, bottom: 1 }[pos] ?? 0.5
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
        let pos = coord2pos({ h: tick.position }).h
        let tsl = pos * (activeTransform.scaleH - 1) + activeTransform.translateH
        let position = pos + layout.l
        if (position + tsl < 0 || position + tsl > width.value) continue
        let offset = (theme.tick_position == "top" ? -1 : 1) * (tick.length ?? theme.tick_length)
        result.push({
            key: "line-" + tick.position,
            y1: 0, y2: offset,
            x1: position, x2: position,
            'stroke': tick.color ?? theme.tick_color,
            'stroke-width': tick.width ?? theme.tick_width,
            transform: tsl ? `translate(${tsl},0)` : null,
            style: { transition },
        })
    }
    return result.filter(t => t.stroke != null)
})
const tickTexts = computed(() => {
    let isTop = theme.tick_position == "top"
    let result = []
    for (let tick of ticks) {
        if (typeof tick == 'number') tick = { position: tick, label: tick }
        let pos = coord2pos({ h: tick.position }).h
        let tsl = pos * (activeTransform.scaleH - 1) + activeTransform.translateH
        let position = pos + layout.l
        if (position + tsl < 0 || position + tsl > width.value) continue
        let offset = (isTop ? -1 : 1) * ((tick.length ?? theme.tick_length) + 3)
        let anchorX, anchorY, dockX, dockY
        if (theme.tick_anchor_x != null || theme.tick_anchor_y != null) {
            anchorX = theme.tick_anchor_x ?? 0.5
            anchorY = theme.tick_anchor_y ?? (isTop ? 0 : 1)
        } else {
            dockX = theme.tick_dock_x ?? 0.5
            dockY = theme.tick_dock_y ?? (isTop ? 0 : 1)
        }
        result.push({
            wrapper: {
                key: "text-" + tick.position,
                transform: tsl ? `translate(${tsl},0)` : null,
                style: { transition },
            },
            text: {
                x: position,
                y: offset,
                angle: theme.text_angle,
                anchorX, anchorY, dockX, dockY,
                text: tick.label,
                title: tick.title ?? tick.label,
                fontSize: tick.size ?? theme.label_size,
                'fill': tick.color ?? theme.label_color
            },
        })
    }
    return result.filter(t => t.text.fill != null)
})

const iRef = useTemplateRef("i")
function getPosition(event) {
    let rect = iRef.value.getBoundingClientRect()
    let l = Math.trunc(event.clientX) - rect.left - layout.left,
        r = rect.left + layout.left + layout.width - Math.trunc(event.clientX)
    let result = { l, r }
    let { x, y } = pos2coord({ h: l })
    if (x) result.x = x
    if (y) result.y = y
    return result
}
const emit = defineEmits([
    'click', 'dblclick', 'contextmenu', 'pointerdown', 'pointerup', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'wheel', 'singleclick',
    'move', 'zoom', 'rescale', 'nudge', 'rangechange',
    'update:transition'
])
let moveTimer, movementX = 0
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
    let hmin0 = 0, hmax0 = layout.width
    let boundary = coord2pos(act)
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        movementX += ev.movementX
        let dh = oob_squish_any(-movementX, { min: boundary.hmin - hmin0, max: boundary.hmax - hmax0 })
        let { xmin, xmax, ymin, ymax } = pos2coord({ hmin: hmin0 + dh, hmax: hmax0 + dh })
        Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        e.target.style.cursor = null
        moveTimer = setTimeout(() => {
            applyTransform(act, ev)
            movementX = 0
        }, 300)
    }
}
function axisRescaleLeftPointerdown(e) {
    let act = action.find(a => a.action == "rescale")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    let { "min-range-h": mrh = 0 } = act
    let position = getPosition(e), h = coord2pos(position).h,
        hmin = h - position.l, hmax = h + position.r
    let coord0 = pos2coord({ hmin, hmax })
    let boundary = {
        min: coord2pos(act).hmin,
        max: coord2pos({ hmin: coord0.hmax - mrh, hmax: coord0.hmin + mrh }).hmin,
    }
    let movementX = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        movementX += ev.movementX
        let { xmin, xmax, ymin, ymax } = pos2coord({
            hmin: oob_squish_any(hmax - (hmax - hmin) * position.r / Math.max(position.r - movementX, 1), boundary),
            hmax,
        })
        Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
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
    let { "min-range-h": mrh = 0 } = act
    let position = getPosition(e), h = coord2pos(position).h,
        hmin = h - position.l, hmax = h + position.r
    let coord0 = pos2coord({ hmin, hmax })
    let boundary = {
        min: coord2pos({ hmin: coord0.hmax - mrh, hmax: coord0.hmin + mrh }).hmax,
        max: coord2pos(act).hmax,
    }
    let movementX = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        movementX += ev.movementX
        let { xmin, xmax, ymin, ymax } = pos2coord({
            hmin,
            hmax: oob_squish_any(hmin + (hmax - hmin) * position.l / Math.max(position.l + movementX, 1), boundary),
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
        let { "min-range-h": mrh = 0, sensitivity = 1.25 } = act
        let lvl = sensitivity ** (delta / 100)
        let boundary = coord2pos(act)
        let hmin = Math.max(pos.l - Math.max(pos.l, 0) * lvl, boundary.hmin ?? -Infinity),
            hmax = Math.min(pos.l + Math.max(pos.r, 0) * lvl, boundary.hmax ?? Infinity)
        let { [coord + 'min']: min, [coord + 'max']: max } = pos2coord({ hmin, hmax })
        if (lvl < 1 && max - min < mrh) {
            let c = (max + min) / 2
            min = c - mrh / 2
            max = c + mrh / 2
        }
        rangePreview[coord + 'min'] = min
        rangePreview[coord + 'max'] = max
    }
    if (act.action == "nudge") {
        let { sensitivity = 0.1 } = act
        let boundary = coord2pos(act)
        let hmin0 = 0, hmax0 = layout.width
        let movement = sensitivity * layout.width * (-delta / 120)
        let dh = oob_squish_any(-movement, { min: boundary.hmin - hmin0, max: boundary.hmax - hmax0 })
        let { xmin, xmax, ymin, ymax } = pos2coord({ hmin: hmin0 + dh, hmax: hmax0 + dh })
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
        <line ref="i" :x1="0" :x2="width" :y1="0" :y2="0" v-bind="axisLine" />
        <line v-for="tick in tickLines" v-bind="tick" />
        <g v-for="tick in tickTexts" v-bind="tick.wrapper">
            <CoreText v-bind="tick.text" />
        </g>
        <g class="vvplot-interactive" fill="transparent">
            <rect :width="width" :height="10" :y="-5" v-on="axisVOn"
                :cursor="action.some?.(a => a.action == 'move') ? 'grab' : null" />
        </g>
        <g v-if="action.some?.(a => a.action == 'rescale')" class="vvplot-interactive" fill="transparent">
            <rect :width="20" :height="10" :y="-5" style="cursor:ew-resize;"
                @pointerdown="axisRescaleLeftPointerdown" />
            <rect :width="20" :height="10" :y="-5" :x="width - 20" style="cursor:ew-resize;"
                @pointerdown="axisRescaleRightPointerdown" />
        </g>
        <CoreText v-bind="axisTitle" v-if="axisTitle.text" />
    </g>
</template>
