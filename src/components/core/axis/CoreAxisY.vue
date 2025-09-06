<script setup>
import { computed, useTemplateRef } from 'vue';
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
    let aln = { left: "0%", center: "50%", right: "100%" }[position] ?? position
    if (typeof aln == "string" && aln.endsWith("%")) {
        translate = width.value * aln.slice(0, -1) / 100
    } else {
        translate = translateX.value + coord2pos({ x: +aln }).x + layout.left
        if (transcaleX.value?.ratio != null)
            translate = translate * transcaleX.value.ratio + (1 - transcaleX.value.ratio) * (transcaleX.value.origin ?? 0.5) * width.value
    }
    return `translate(${translate}, 0)`
})
const axisTitle = computed(() => {
    let isRight = theme.ticks_position == "right"
    let x = (isRight ? 1 : -1) * (theme.title_offset ?? 0), y = height.value / 2
    return {
        x, y,
        'text-anchor': 'middle',
        'alignment-baseline': 'central',
        'font-size': theme.title_size,
        'color': theme.title_color,
        'transform': theme.title_angle ? `rotate(${theme.title_angle})` : "",
        'transform-origin': x + ' ' + y
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
        let position = coord2pos({ y: tick.position }).y + layout.t + translateY.value
        if (transcaleY.value?.ratio != null)
            position = position * transcaleY.value.ratio + (1 - transcaleY.value.ratio) * (transcaleY.value.origin ?? 0.5) * height.value
        if (position < 0 || position > height.value) continue
        let offset = (theme.ticks_position == "right" ? 1 : -1) * (tick.length ?? theme.ticks_length)
        result.push({
            y1: position, y2: position,
            x1: 0, x2: offset,
            'stroke': tick.color ?? theme.ticks_color,
            'stroke-width': tick.width ?? theme.ticks_width,
        })
    }
    return result.filter(t => t.stroke != null)
})
const tickTexts = computed(() => {
    let isRight = theme.ticks_position == "right"
    let result = []
    for (let tick of ticks) {
        if (typeof tick == 'number') tick = { position: tick }
        let position = coord2pos({ y: tick.position }).y + layout.t + translateY.value
        if (transcaleY.value?.ratio != null)
            position = position * transcaleY.value.ratio + (1 - transcaleY.value.ratio) * (transcaleY.value.origin ?? 0.5) * height.value
        if (position < 0 || position > height.value) continue
        let offset = (isRight ? 1 : -1) * ((tick.length ?? theme.ticks_length) + 3)
        result.push({
            bind: {
                y: position,
                x: offset,
                'text-anchor': isRight ? 'start' : 'end',
                'alignment-baseline': 'central',
                'font-size': tick.size ?? theme.label_size,
                'color': tick.color ?? theme.label_color,
            },
            text: tick.label,
            title: tick.title ?? tick.label
        })
    }
    return result.filter(t => t.bind.color != null)
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
        y: event.clientY - rect.top - layout.top,
        t: event.clientY - rect.top - layout.top,
        b: rect.top + layout.top + layout.height - event.clientY,
    }
}
const emit = defineEmits(['move', 'zoom', 'rescale', 'nudge'])
function axisPointerdown(e) {
    let act = action.find(a => a.action == "move")
    if (!act) return
    e.preventDefault()
    e.stopPropagation()
    e.target.style.cursor = 'grabbing'
    let boundary = coord2pos(act, { unlimited: true })
    let dymax = boundary.ymin == null ? Infinity : - boundary.ymin,
        dymin = boundary.ymax == null ? -Infinity : layout.height - boundary.ymax
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        translateY.value = oob_squish(translateY.value + ev.movementY, dymin, dymax)
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
    let { ymin, ymax, "min-range-y": mry = 0 } = act
    let { ymin: ymin0, ymax: ymax0 } = pos2coord({ ymin: layout.top, ymax: layout.top + layout.height })
    let { y } = getPos(e)
    let scalemin = layout.height / (layout.height - (coord2pos({ ymin, ymax }, { unlimited: true }).ymin ?? Infinity))
    let scalemax = layout.height / Math.abs(layout.height - (coord2pos({ ymin: ymax0 - mry, ymax: ymin0 + mry }).ymin))
    let dy = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        dy += ev.movementY
        let ratio = (layout.height - y - dy) / (layout.height - y)
        if (ratio < scalemin) ratio = scalemin
        if (ratio > scalemax) ratio = scalemax
        transcaleY.value = { ratio, origin: (layout.top + layout.height) / height.value }
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
    let { ymin, ymax, "min-range-y": mry = 0 } = act
    let { ymin: ymin0, ymax: ymax0 } = pos2coord({ ymin: layout.top, ymax: layout.top + layout.height })
    let { y } = getPos(e)
    let scalemin = layout.height / (coord2pos({ ymin, ymax }, { unlimited: true }).ymax ?? Infinity)
    let scalemax = layout.height / Math.abs(coord2pos({ ymin: ymax0 - mry, ymax: ymin0 + mry }).ymax)
    let dy = 0
    e.target.setPointerCapture(e.pointerId)
    e.target.onpointermove = (ev) => {
        dy += ev.movementY
        let ratio = (y + dy) / y
        if (ratio < scalemin) ratio = scalemin
        if (ratio > scalemax) ratio = scalemax
        transcaleY.value = { ratio, origin: layout.top / height.value }
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
        let { "min-range-y": mry = 0, sensitivity: lvl = 1.25 } = act
        lvl = lvl ** (delta / 100)
        let maxpos = coord2pos(act, { unlimited: true })
        let ymin = Math.max(pos.t - pos.t * lvl, maxpos.ymin ?? -Infinity),
            ymax = Math.min(pos.t + pos.b * lvl, maxpos.ymax ?? Infinity)
        if (lvl < 1) {
            let coord = pos2coord({ ymin, ymax })
            let dy = coord.ymax - coord.ymin, cy = (coord.ymax + coord.ymin) / 2
            if (dy < mry) {
                coord.ymin = cy - mry / 2
                coord.ymax = cy + mry / 2
            }
            ({ ymin, ymax } = coord2pos(coord))
        }
        if (Math.abs(layout.height - (ymax - ymin)) > 1) {
            transcaleY.value = {
                ratio: layout.height / (ymax - ymin),
                origin: (layout.t + (ymin * layout.height) / (layout.height - ymax + ymin)) / height.value
            }
        }
    }
    if (act.action == "nudge") {
        let movement = (act.ratio ?? 0.1) * layout.height * (delta / 120)
        let boundary = coord2pos(act, { unlimited: true })
        let dymax = boundary.ymin == null ? Infinity : - boundary.ymin,
            dymin = boundary.ymax == null ? -Infinity : layout.height - boundary.ymax
        translateY.value = oob_squish(movement, dymin, dymax)
    }
}
function applyTransform(act, event) {
    if (transcaleY.value == null && translateY.value == 0) return
    let ymin = 0, ymax = layout.height
    if (transcaleY.value) {
        let ratio = transcaleY.value.ratio,
            origin = transcaleY.value.origin * height.value - layout.t
        ymin = ymin / ratio + (1 - 1 / ratio) * origin
        ymax = ymax / ratio + (1 - 1 / ratio) * origin
    }
    if (translateY.value) {
        ymin -= translateY.value
        ymax -= translateY.value
    }
    emit(act.action, pos2coord({ ymin, ymax }), event)
    translateY.value = 0
    transcaleY.value = null
}
</script>
<template>
    <g :transform="transform">
        <line ref="i" :x1="0" :x2="0" :y1="0" :y2="height" v-bind="axisLine" />
        <line v-for="tick in tickLines" v-bind="tick" />
        <text v-for="tick in tickTexts" v-bind="tick.bind">
            <title>{{ tick.title }}</title>
            {{ tick.text }}
        </text>
        <g v-if="action.some?.(a => a.action == 'move' || a.action == 'zoom')" class="gb-interactive"
            fill="transparent">
            <rect :width="10" :height="height" :x="-5"
                :class="{ 'cursor-grab': action.some?.(a => a.action == 'move') }" @pointerdown="axisPointerdown"
                @wheel="axisWheel" />
        </g>
        <g v-if="action.some?.(a => a.action == 'rescale')" class="gb-interactive" fill="transparent">
            <rect :width="10" :height="20" :x="-5" class="cursor-ns-resize" @pointerdown="axisResizeTopPointerdown" />
            <rect :width="10" :height="20" :x="-5" :y="height - 20" class="cursor-ns-resize"
                @pointerdown="axisResizeBottomPointerdown" />
        </g>
        <text v-bind="axisTitle">{{ title }}</text>
    </g>
</template>
