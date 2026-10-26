<script setup>
import { computed, inject, useTemplateRef } from 'vue'
import { oob_squish_any } from '#src/js/utils.js'
import { dropNull, emitEvent } from '#src/core/utils.js'
import { resolveElement } from '../registry/element.js'
import CoreAxisLabel from './CoreAxisLabel.vue'
const { coord, ticks, title, mapping, layout, theme, action, position, activeTransform, transition } = defineProps({
    coord: String,
    ticks: { type: Array, default: () => [] }, title: String,
    mapping: Object, layout: Object,
    theme: { type: Object, default: () => ({}) },
    action: { type: Array, default: () => [] },
    position: null, activeTransform: Object, transition: String,
})
const width = computed(() => layout.width + layout.l + layout.r)
const height = computed(() => layout.height + layout.t + layout.b)

const rangeStore = inject('rangeStore')
const rangePreview = rangeStore.preview
const transform = computed(() => {
    let translate = 0
    let aln = { left: "0%", center: "50%", right: "100%" }[position] ?? position
    if (typeof aln == "string" && aln.endsWith("%")) {
        translate = width.value * aln.slice(0, -1) / 100
    } else {
        translate = activeTransform.translateH + mapping.coord2pos({ h: +aln }).h * activeTransform.scaleH + layout.left
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
        fill: theme.title_color,
        'font-family': "sans-serif",
        ...theme.title_style,
    }
})
const TitleElement = computed(() => resolveElement(theme.title_type) ?? resolveElement('text'))

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
        let { value, theme: $theme } = tick
        let pos = mapping.coord2pos({ v: value }).v
        let tsl = pos * (activeTransform.scaleV - 1) + activeTransform.translateV
        pos += layout.t
        if (pos + tsl < 0 || pos + tsl > height.value) continue
        let offset = ($theme.tick_position == "right" ? 1 : -1) * $theme.tick_length
        result.push({
            key: "line-" + tick.value,
            y1: pos, y2: pos,
            x1: 0, x2: offset,
            'stroke': tick.color ?? $theme.tick_color,
            'stroke-width': tick.width ?? $theme.tick_width,
            transform: tsl ? `translate(0,${tsl})` : null,
            style: { transition },
        })
    }
    return result.filter(t => t.stroke != null).sort((a, b) => a.y1 - b.y1)
})
const tickTexts = computed(() => {
    let result = []
    for (let tick of ticks) {
        let { type, value, label, title, theme: $theme, ...etc } = tick
        let isRight = ($theme.label_position ?? $theme.tick_position) == "right"
        let pos = mapping.coord2pos({ v: value }).v
        let tsl = pos * (activeTransform.scaleV - 1) + activeTransform.translateV
        pos += layout.t
        if (pos + tsl < 0 || pos + tsl > height.value) continue
        let offset = (isRight ? 1 : -1) * (($theme.label_offset ?? $theme.tick_length) + 3)
        let anchorX, anchorY, dockX, dockY
        if ($theme.label_anchor_x != null || $theme.label_anchor_y != null) {
            anchorX = $theme.label_anchor_x ?? (isRight ? 0 : 1)
            anchorY = $theme.label_anchor_y ?? 0.5
        } else {
            dockX = $theme.label_dock_x ?? (isRight ? 0 : 1)
            dockY = $theme.label_dock_y ?? 0.5
        }
        result.push({
            wrapper: {
                key: "text-" + value,
                transform: tsl ? `translate(0,${tsl})` : null,
                style: { transition },
            },
            text: {
                y: pos, x: offset,
                angle: $theme.label_angle,
                anchorX, anchorY, dockX, dockY,
                type: $theme.label_type,
                text: label, title: title ?? label,
                fontSize: $theme.label_size,
                fill: $theme.label_color,
                'font-family': "sans-serif",
                value,
                ...etc,
            }
        })
    }
    return result.filter(t => t.text.fill != null).sort((a, b) => a.text.y - b.text.y)
})

const iRef = useTemplateRef("i")
function getPosition(event) {
    let rect = iRef.value.getBoundingClientRect()
    let scaleY = rect.height / iRef.value.getBBox().height
    let offsetY = event.clientY - rect.top
    let t = offsetY / scaleY - layout.top,
        b = layout.top + layout.height - offsetY / scaleY
    let result = { t, b }
    let { x, y } = mapping.pos2coord({ v: t })
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
    let act = action.find(a => a.action == "move")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    e.target.style.cursor = 'grabbing'
    moveTimer = clearTimeout(moveTimer)
    let vmin0 = 0, vmax0 = layout.height
    let boundary = mapping.coord2pos(act)
    let rect = iRef.value.getBoundingClientRect()
    let scaleY = rect.height / iRef.value.getBBox().height
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        movementY += ev.movementY
        if (!pointerMoved) return
        let dv = oob_squish_any(-movementY / scaleY, { min: boundary.vmin - vmin0, max: boundary.vmax - vmax0 })
        let { xmin, xmax, ymin, ymax } = mapping.pos2coord({ vmin: vmin0 + dv, vmax: vmax0 + dv })
        rangeStore.updatePreview({ xmin, xmax, ymin, ymax })
    }
    e.target.addEventListener('pointerup', function (ev) {
        e.target.onpointermove = null
        e.target.style.cursor = null
        if (!pointerMoved) return
        moveTimer = setTimeout(() => {
            applyTransform(act, ev)
            movementY = 0
        }, 300)
    }, { once: true })
}
function axisRescaleTopPointerdown(e) {
    let act = action.find(a => a.action == "rescale")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    let { "min-range-v": mrv = 0 } = act
    let position = getPosition(e), v = mapping.coord2pos(position).v,
        vmin = v - position.t, vmax = v + position.b
    let coord0 = mapping.pos2coord({ vmin, vmax })
    let boundary = {
        min: mapping.coord2pos(act).vmin,
        max: mapping.coord2pos({ vmin: coord0.vmax - mrv, vmax: coord0.vmin + mrv }).vmin,
    }
    let rect = iRef.value.getBoundingClientRect()
    let scaleY = rect.height / iRef.value.getBBox().height
    let movementY = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        movementY += ev.movementY
        let { xmin, xmax, ymin, ymax } = mapping.pos2coord({
            vmin: oob_squish_any(vmax - (vmax - vmin) * position.b / Math.max(position.b - movementY / scaleY, 1), boundary),
            vmax,
        })
        rangeStore.updatePreview({ xmin, xmax, ymin, ymax })
    }
    e.target.addEventListener('pointerup', function (ev) {
        e.target.onpointermove = null
        applyTransform(act, ev)
    }, { once: true })
}
function axisRescaleBottomPointerdown(e) {
    let act = action.find(a => a.action == "rescale")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    let { "min-range-v": mrv = 0 } = act
    let position = getPosition(e), v = mapping.coord2pos(position).v,
        vmin = v - position.t, vmax = v + position.b
    let coord0 = mapping.pos2coord({ vmin, vmax })
    let boundary = {
        min: mapping.coord2pos({ vmin: coord0.vmax - mrv, vmax: coord0.vmin + mrv }).vmax,
        max: mapping.coord2pos(act).vmax,
    }
    let rect = iRef.value.getBoundingClientRect()
    let scaleY = rect.height / iRef.value.getBBox().height
    let movementY = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        movementY += ev.movementY
        let { xmin, xmax, ymin, ymax } = mapping.pos2coord({
            vmin,
            vmax: oob_squish_any(vmin + (vmax - vmin) * position.t / Math.max(position.t + movementY / scaleY, 1), boundary),
        })
        rangeStore.updatePreview({ xmin, xmax, ymin, ymax })
    }
    e.target.addEventListener('pointerup', function (ev) {
        e.target.onpointermove = null
        applyTransform(act, ev)
    }, { once: true })
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
        let boundary = mapping.coord2pos(act)
        let vmin = Math.max(pos.t - Math.max(pos.t, 0) * lvl, boundary.vmin ?? -Infinity),
            vmax = Math.min(pos.t + Math.max(pos.b, 0) * lvl, boundary.vmax ?? Infinity)
        let { [coord + 'min']: min, [coord + 'max']: max } = mapping.pos2coord({ vmin, vmax })
        if (lvl < 1 && max - min < mrv) {
            let c = (max + min) / 2
            min = c - mrv / 2
            max = c + mrv / 2
        }
        rangeStore.updatePreview({
            [coord + 'min']: min,
            [coord + 'max']: max,
        })
    }
    if (act.action == "nudge") {
        let { sensitivity = 0.1 } = act
        let boundary = mapping.coord2pos(act)
        let vmin0 = 0, vmax0 = layout.height
        let movement = sensitivity * layout.height * (-delta / 120)
        let dv = oob_squish_any(-movement, { min: boundary.vmin - vmin0, max: boundary.vmax - vmax0 })
        let { xmin, xmax, ymin, ymax } = mapping.pos2coord({ vmin: vmin0 + dv, vmax: vmax0 + dv })
        rangeStore.updatePreview({ xmin, xmax, ymin, ymax })
    }
}
function applyTransform(act, event) {
    let coord = dropNull(rangePreview) ?? {}
    if (!Object.keys(coord).length) return
    let e = new PointerEvent(event.type, event)
    if (!emitEvent(act.emit, coord, e)) {
        emit(act.action, coord, e)
    }
    emit('rangechange', coord)
    rangeStore.clearPreview()
}
const axisVOn = {
    pointerup(e) { emit('pointerup', e, getPosition(e)) },
    pointerover(e) { emit('pointerover', e, getPosition(e)) },
    pointerout(e) { emit('pointerout', e, getPosition(e)) },
    pointerenter(e) { emit('pointerenter', e, getPosition(e)) },
    pointerleave(e) { emit('pointerleave', e, getPosition(e)) },
    click(e) { emit('click', e, getPosition(e)) },
    singleclick(e) { emit('singleclick', e, getPosition(e)) },
    dblclick(e) { emit('dblclick', e, getPosition(e)) },
    contextmenu(e) { emit('contextmenu', e, getPosition(e)) },
    pointermove(e) { emit('pointermove', e, getPosition(e)) },
    wheel: axisWheel
}
</script>
<template>
    <g :transform="transform" :style="{ transition }">
        <line :x1="0" :x2="0" :y1="0" :y2="height" v-bind="axisLine" v-if="axisLine.stroke != null" />
        <line v-for="tick in tickLines" v-bind="tick" />
        <g v-for="tick in tickTexts" v-bind="tick.wrapper">
            <CoreAxisLabel v-bind="tick.text" :getPosition />
        </g>
        <g class="vvplot-interactive" fill="transparent">
            <rect ref="i" :width="10" :height="height" :x="-5" v-on="axisVOn" @pointerdown="axisMovePointerdown"
                :cursor="action.some?.(a => a.action == 'move') ? 'grab' : null" />
        </g>
        <g v-if="action.some?.(a => a.action == 'rescale')" class="vvplot-interactive" fill="transparent">
            <rect :width="10" :height="20" :x="-5" style="cursor:ns-resize;" v-on="axisVOn"
                @pointerdown="axisRescaleTopPointerdown" />
            <rect :width="10" :height="20" :x="-5" :y="height - 20" style="cursor:ns-resize;" v-on="axisVOn"
                @pointerdown="axisRescaleBottomPointerdown" />
        </g>
        <template v-if="axisTitle.text">
            <component :is="TitleElement" v-bind="axisTitle" />
        </template>
    </g>
</template>
