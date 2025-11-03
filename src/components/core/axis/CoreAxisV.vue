<script setup>
import { computed, useTemplateRef } from 'vue'
import { oob_squish_any, emitEvent } from '#base/js/utils'
import CoreText from '../element/CoreText.vue'
const { ticks, title, coord2pos, pos2coord, layout, theme, action, position } = defineProps({
    ticks: { type: Array, default: () => [] }, title: String,
    coord2pos: Function, pos2coord: Function,
    layout: Object,
    theme: { type: Object, default: () => ({}) },
    action: { type: Array, default: () => [] },
    position: null
})
const width = computed(() => layout.width + layout.l + layout.r)
const height = computed(() => layout.height + layout.t + layout.b)

const translateH = defineModel('translateH', { type: Number, default: 0 })
const translateV = defineModel('translateV', { type: Number, default: 0 })
const transcaleH = defineModel('transcaleH')
const transcaleV = defineModel('transcaleV')
const transform = computed(() => {
    let translate = 0
    let aln = { left: "0%", center: "50%", right: "100%" }[position] ?? position
    if (typeof aln == "string" && aln.endsWith("%")) {
        translate = width.value * aln.slice(0, -1) / 100
    } else {
        translate = translateH.value + coord2pos({ h: +aln }).h + layout.left
        if (transcaleH.value?.ratio != null)
            translate = translate * transcaleH.value.ratio + (1 - transcaleH.value.ratio) * (transcaleH.value.origin ?? 0.5) * width.value
    }
    return `translate(${translate}, 0)`
})
const axisTitle = computed(() => {
    let pos = theme.title_position ?? theme.tick_position, aln = pos,
        dockX = theme.title_dock_x, dockY = theme.title_dock_y, offset = 0
    if (typeof pos != "number") {
        aln = { bottom: 0, left: 0.5, right: 0.5, top: 1 }[pos] ?? 0.5
        dockX = dockX ?? { left: 1, right: 0 }[pos] ?? 0.5
        dockY = dockY ?? { top: 0, bottom: 1 }[pos] ?? 0.5
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
        let position = coord2pos({ v: tick.position }).v + layout.t + translateV.value
        if (transcaleV.value?.ratio != null)
            position = position * transcaleV.value.ratio + (1 - transcaleV.value.ratio) * (transcaleV.value.origin ?? 0.5) * height.value
        if (position < 0 || position > height.value) continue
        let offset = (theme.tick_position == "right" ? 1 : -1) * (tick.length ?? theme.tick_length)
        result.push({
            y1: position, y2: position,
            x1: 0, x2: offset,
            'stroke': tick.color ?? theme.tick_color,
            'stroke-width': tick.width ?? theme.tick_width,
        })
    }
    return result.filter(t => t.stroke != null)
})
const tickTexts = computed(() => {
    let isRight = theme.tick_position == "right"
    let result = []
    for (let tick of ticks) {
        if (typeof tick == 'number') tick = { position: tick }
        let position = coord2pos({ v: tick.position }).v + layout.t + translateV.value
        if (transcaleV.value?.ratio != null)
            position = position * transcaleV.value.ratio + (1 - transcaleV.value.ratio) * (transcaleV.value.origin ?? 0.5) * height.value
        if (position < 0 || position > height.value) continue
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
            y: position,
            x: offset,
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

const iRef = useTemplateRef("i")
function getCoord(event) {
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
    'move', 'zoom', 'rescale', 'nudge',
])
function axisMovePointerdown(e) {
    let coord = getCoord(e)
    emit('pointerdown', e, coord)
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
            let coord = getCoord(ev)
            emit('singleclick', new PointerEvent("singleclick", ev), coord)
        }
    }, { once: true })
    let act = action.find(a => a.action == "move")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    e.target.style.cursor = 'grabbing'
    let boundary = coord2pos(act, { unlimited: true })
    let range = {
        min: boundary.vmax == null ? -Infinity : layout.height - boundary.vmax,
        max: boundary.vmin == null ? Infinity : - boundary.vmin
    }
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        translateV.value = oob_squish_any(translateV.value + ev.movementY, range)
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        e.target.style.cursor = null
        applyTransform(act, ev)
    }
}
function axisResizeTopPointerdown(e) {
    let act = action.find(a => a.action == "rescale")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    let { vmin, vmax, "min-range-v": mrv = 0 } = act
    let { vmin: vmin0, vmax: vmax0 } = pos2coord({ vmin: layout.top, vmax: layout.top + layout.height })
    let v = e.clientY - iRef.value.getBoundingClientRect().top - layout.top
    let scalemin = layout.height / (layout.height - (coord2pos({ vmin, vmax }, { unlimited: true }).vmin ?? Infinity))
    let scalemax = layout.height / Math.abs(layout.height - (coord2pos({ vmin: vmax0 - mrv, vmax: vmin0 + mrv }).vmin))
    let dv = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        dv += ev.movementY
        let ratio = 1 - dv / (layout.height - v)
        if (ratio < scalemin) ratio = scalemin
        if (ratio > scalemax) ratio = scalemax
        transcaleV.value = { ratio, origin: (layout.top + layout.height) / height.value }
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        applyTransform(act, ev)
    }
}
function axisResizeBottomPointerdown(e) {
    let act = action.find(a => a.action == "rescale")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    let { vmin, vmax, "min-range-v": mrv = 0 } = act
    let { vmin: vmin0, vmax: vmax0 } = pos2coord({ vmin: layout.top, vmax: layout.top + layout.height })
    let v = e.clientY - iRef.value.getBoundingClientRect().top - layout.top
    let scalemin = layout.height / (coord2pos({ vmin, vmax }, { unlimited: true }).vmax ?? Infinity)
    let scalemax = layout.height / Math.abs(coord2pos({ vmin: vmax0 - mrv, vmax: vmin0 + mrv }).vmax)
    let dv = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        dv += ev.movementY
        let ratio = 1 + dv / v
        if (ratio < scalemin) ratio = scalemin
        if (ratio > scalemax) ratio = scalemax
        transcaleV.value = { ratio, origin: layout.top / height.value }
    }
    e.target.onpointerup = (ev) => {
        e.target.onpointermove = null
        e.target.onpointerup = null
        applyTransform(act, ev)
    }
}
let wheelDelta = 0, wheelTimer
function axisWheel(e) {
    let coord = getCoord(e)
    emit('wheel', e, coord)
    let act = action.find(a => ["zoom", "nudge"].includes(a.action) && ["ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => a[k] == e[k]))
    if (!act) return
    wheelTimer = clearTimeout(wheelTimer)
    e.preventDefault()
    e.stopPropagation()
    wheelDelta += e.deltaY
    wheel(act, coord, wheelDelta)
    wheelTimer = setTimeout(() => {
        applyTransform(act, e)
        wheelDelta = 0
    }, 300)
}
function wheel(act, pos, delta) {
    if (act.action == "zoom") {
        let { "min-range-v": mrv = 0, sensitivity = 1.25 } = act
        let lvl = sensitivity ** (delta / 100)
        let maxpos = coord2pos(act, { unlimited: true })
        let vmin = Math.max(pos.t - pos.t * lvl, maxpos.vmin ?? -Infinity),
            vmax = Math.min(pos.t + pos.b * lvl, maxpos.vmax ?? Infinity)
        if (lvl < 1) {
            let { vmin: min, vmax: max } = pos2coord({ vmin, vmax })
            let c = (max + min) / 2
            if (max - min < mrv) {
                min = c - mrv / 2
                max = c + mrv / 2
            }
            ({ vmin, vmax } = coord2pos({ vmin: min, vmax: max }))
        }
        if (vmax - vmin > 0 && Math.abs(layout.height - (vmax - vmin)) > 1) {
            transcaleV.value = {
                ratio: layout.height / (vmax - vmin),
                origin: (layout.t + (vmin * layout.height) / (layout.height - vmax + vmin)) / height.value
            }
        }
    }
    if (act.action == "nudge") {
        let { sensitivity = 0.1 } = act
        let movement = sensitivity * layout.height * (-delta / 120)
        let boundary = coord2pos(act, { unlimited: true })
        let range = {
            min: boundary.vmax == null ? -Infinity : layout.height - boundary.vmax,
            max: boundary.vmin == null ? Infinity : - boundary.vmin,
        }
        translateV.value = oob_squish_any(movement, range)
    }
}
function applyTransform(act, event) {
    if (transcaleV.value == null && translateV.value == 0) return
    let vmin = 0, vmax = layout.height
    if (transcaleV.value) {
        let ratio = transcaleV.value.ratio,
            origin = transcaleV.value.origin * height.value - layout.t
        vmin = vmin / ratio + (1 - 1 / ratio) * origin
        vmax = vmax / ratio + (1 - 1 / ratio) * origin
    }
    if (translateV.value) {
        vmin -= translateV.value
        vmax -= translateV.value
    }
    let { vmin: min, vmax: max, ...coord } = pos2coord({ vmin, vmax })
    if (!emitEvent(act.emit, coord, event)) {
        emit(act.action, coord, event)
    }
    emit('rangechange', coord)
    translateV.value = 0
    transcaleV.value = null
}
const axisVOn = {
    pointerup(e) { emit('pointerup', e, getCoord(e)) },
    pointerover(e) { emit('pointerover', e, getCoord(e)) },
    pointerout(e) { emit('pointerout', e, getCoord(e)) },
    pointerenter(e) { emit('pointerenter', e, getCoord(e)) },
    pointerleave(e) { emit('pointerleave', e, getCoord(e)) },
    dblclick(e) { emit('dblclick', e, getCoord(e)) },
    click(e) { emit('click', e, getCoord(e)) },
    contextmenu(e) { emit('contextmenu', e, getCoord(e)) },
    pointermove(e) { emit('pointermove', e, getCoord(e)) },
    pointerdown: axisMovePointerdown,
    wheel: axisWheel
}
</script>
<template>
    <g :transform="transform">
        <line ref="i" :x1="0" :x2="0" :y1="0" :y2="height" v-bind="axisLine" />
        <line v-for="tick in tickLines" v-bind="tick" />
        <CoreText v-for="tick in tickTexts" v-bind="tick" />
        <g class="vv-interactive" fill="transparent">
            <rect :width="10" :height="height" :x="-5" v-on="axisVOn"
                :class="{ 'cursor-grab': action.some?.(a => a.action == 'move') }" />
        </g>
        <g v-if="action.some?.(a => a.action == 'rescale')" class="vv-interactive" fill="transparent">
            <rect :width="10" :height="20" :x="-5" class="cursor-ns-resize" @pointerdown="axisResizeTopPointerdown" />
            <rect :width="10" :height="20" :x="-5" :y="height - 20" class="cursor-ns-resize"
                @pointerdown="axisResizeBottomPointerdown" />
        </g>
        <CoreText v-bind="axisTitle" />
    </g>
</template>
