<script setup>
defineOptions({ inheritAttrs: false })
import { ref, computed, watch, useTemplateRef, useId } from 'vue'
import { GPlot } from '#base/js/plot'
import { unique, extractModifier } from '#base/js/utils'
import { reactiveComputed, useElementSize } from '@vueuse/core'
import CoreAxis from './axis/CoreAxis.vue'
import CoreGridX from './grid/CoreGridX.vue'
import CoreGridY from './grid/CoreGridY.vue'
import CoreLayer from './layer/CoreLayer.vue'
import CoreSelection from './CoreSelection.vue'
import CoreLegend from './CoreLegend.vue'
const vid = useId()
const props = defineProps({
    schema: Object, layers: Array,
    coordScale: Object, coordDisplay: Object, coordLevels: Object,
    levels: Object, scales: Object,
    axes: { type: Array, default: () => [] },
    theme: Object,
    action: { type: Array, default: () => [] },
    legendTeleport: null,
})
const range = defineModel('range')
const selection = defineModel('selection')
const emit = defineEmits([
    'click', 'dblclick', 'contextmenu', 'pointerdown', 'pointerup', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove',
    'wheel', 'select', 'move', 'zoom', 'rescale', 'nudge', 'rangechange'
])
const theme = reactiveComputed(() => props.theme)

const coordExpandAdd = ref(props.coordScale?.expandAdd || {})
watch(() => props.coordScale, (v) => {
    range.value = v.range
    coordExpandAdd.value = v.expandAdd
}, { immediate: true })
const activeSelection = defineModel('activeSelection')
const translateX = defineModel('translateX', { type: Number, default: 0 })
const translateY = defineModel('translateY', { type: Number, default: 0 })
const transcaleX = defineModel('transcaleX')
const transcaleY = defineModel('transcaleY')

const expandAdd = reactiveComputed(() => {
    let x = coordExpandAdd.value.x ?? 0
    if (Array.isArray(x)) x = { min: x[0], max: x[1] }
    else if (typeof x == 'number') x = { min: x, max: x }
    let y = coordExpandAdd.value.y ?? 0
    if (Array.isArray(y)) y = { min: y[0], max: y[1] }
    else if (typeof y == 'number') y = { min: y, max: y }
    return { x, y }
})
const expandMult = reactiveComputed(() => {
    let x = props.coordDisplay?.expandMult?.x ?? 0
    if (Array.isArray(x)) x = { min: x[0], max: x[1] }
    else if (typeof x == 'number') x = { min: x, max: x }
    let y = props.coordDisplay?.expandMult?.y ?? 0
    if (Array.isArray(y)) y = { min: y[0], max: y[1] }
    else if (typeof y == 'number') y = { min: y, max: y }
    return { x, y }
})
const reverse = reactiveComputed(() => {
    return {
        x: props.coordDisplay?.reverse?.x ?? false,
        y: props.coordDisplay?.reverse?.y ?? false,
    }
})
const action = reactiveComputed(() => props.action)

const svgRef = useTemplateRef('svg')
const layers = useTemplateRef('layers')
const { width, height } = useElementSize(svgRef)
const gplot = computed(() => new GPlot(props.schema, props.layers))

const outerRect = reactiveComputed(() => {
    let padding = Object.fromEntries(["left", "right", "top", "bottom"].map(p => [p, props.axes.some(a => a.position == p) ? (theme.plot.padding[p] || 0) : 0]))
    let l = theme.plot.margin.left + padding.left,
        r = theme.plot.margin.right + padding.right,
        t = theme.plot.margin.top + padding.top,
        b = theme.plot.margin.bottom + padding.bottom
    if (t + b > height.value) {
        t = height.value * (t / (t + b))
        b = height.value - t
    }
    if (l + r > width.value) {
        l = width.value * (l / (l + r))
        r = width.value - l
    }
    return {
        l, r, t, b,
        left: l, right: width.value - r,
        top: t, bottom: height.value - b,
        width: width.value - l - r,
        height: height.value - t - b,
    }
})
/**
 * layout variable definition:
 *               right
 * ┌─────────────────────────────┐
 *  l,left                          r
 * ┌─────┐                       ┌─────┐
 * ┌───────────────svg─────────────────┐ ┐        ┐
 * │ plot margin                       │ │ top,t │
 * │     .-------outerRect-------.     │ ┘        │
 * │     |                       |     │          │
 * │     |                       |     │          │
 * │     |                       |     │          │ bottom
 * │     |                       |     │          │
 * │     |                       |     │          │
 * │     |                       |     │          │
 * │     |                       |     │          │
 * │     '-----------------------'     │ ┐        ┘
 * │                                   │ │ b
 * └───────────────────────────────────┘ ┘
 */

const transformBind = computed(() => {
    let transform = [], origin = null
    let tslX = translateX.value + innerRect.left,
        tslY = translateY.value + innerRect.top
    if (tslX != 0 || tslY != 0)
        transform.push(`translate(${tslX}, ${tslY})`)
    let sclX = transcaleX.value?.ratio ?? 1,
        sclY = transcaleY.value?.ratio ?? 1
    if (sclX != 1 || sclY != 1) {
        transform.push(`scale(${sclX}, ${sclY})`)
        origin = `${(transcaleX.value?.origin ?? 0.5) * outerRect.width - innerRect.left} ${(transcaleY.value?.origin ?? 0.5) * outerRect.height - innerRect.top}`
    }
    return {
        transform: transform.join(' '),
        'transform-origin': origin
    }
})
/**
 * variable definition:
 *       right
 * ┌─────────────────┐
 *  l,left              r
 * ┌─────┐           ┌─────┐
 * .-------outerRect-------. ┐       ┐
 * | axis expansion        | │ top,t │
 * |     .┄innerRect┄.     | ┘       │
 * |     ┆           ┆     |         │ bottom
 * |     ┆           ┆     |         │
 * |     ┆           ┆     |         │
 * |     '┄┄┄┄┄┄┄┄┄┄┄'     | ┐       ┘
 * |                       | │ b
 * '-----------------------' ┘
 */
const vplot = computed(() => {
    return gplot.value
        .useScales(props.scales, props.levels)
        .useCoordLevels(props.coordLevels)
        .render(
            range.value, expandAdd, expandMult,
            props.axes, props.coordScale.minRange
        )
})
defineExpose({ vplot })

function pos2coord({ x, y, xmin, xmax, ymin, ymax } = {}) {
    let scales = vplot.value.coordScales
    let { width, height } = innerRect
    let result = {}
    if (x != null) result.x = scales.x.invert(reverse.x ? 1 - x / width : x / width)
    if (y != null) result.y = scales.y.invert(reverse.y ? y / height : 1 - y / height)
    if (reverse.x) {
        if (xmax != null) result.xmin = scales.x.invert(1 - xmax / width)
        if (xmin != null) result.xmax = scales.x.invert(1 - xmin / width)
    } else {
        if (xmin != null) result.xmin = scales.x.invert(xmin / width)
        if (xmax != null) result.xmax = scales.x.invert(xmax / width)
    }
    if (reverse.y) {
        if (ymax != null) result.ymax = scales.y.invert(ymax / height)
        if (ymin != null) result.ymin = scales.y.invert(ymin / height)
    } else {
        if (ymin != null) result.ymax = scales.y.invert(1 - ymin / height)
        if (ymax != null) result.ymin = scales.y.invert(1 - ymax / height)
    }
    return result
}
function coord2pos({ x, y, xmin, xmax, ymin, ymax } = {}, { unlimited = false, oob = oob_squish_infinite } = {}) {
    let scales = vplot.value.coordScales
    let { l, r, t, b, width, height } = innerRect
    let result = {}
    let rangeX = { min: -l, max: width + r },
        rangeY = { min: -t, max: height + b }
    if (x != null) {
        result.x = oob(width * (reverse.x ? 1 - scales.x(x) : scales.x(x)), rangeX)
    }
    if (y != null) {
        result.y = oob(height * (reverse.y ? scales.y(y) : 1 - scales.y(y)), rangeY)
    }
    if ([xmin, xmax, ymin, ymax].every(v => v == null)) return result
    if (reverse.x) {
        if (xmax != null) result.xmin = oob(width * (1 - scales.x(xmax)), rangeX)
        if (xmin != null) result.xmax = oob(width * (1 - scales.x(xmin)), rangeX)
    } else {
        if (xmin != null) result.xmin = oob(width * scales.x(xmin), rangeX)
        if (xmax != null) result.xmax = oob(width * scales.x(xmax), rangeX)
    }
    if (reverse.y) {
        if (ymin != null) result.ymin = oob(height * scales.y(ymin), rangeY)
        if (ymax != null) result.ymax = oob(height * scales.y(ymax), rangeY)
    } else {
        if (ymax != null) result.ymin = oob(height * (1 - scales.y(ymax)), rangeY)
        if (ymin != null) result.ymax = oob(height * (1 - scales.y(ymin)), rangeY)
    }
    if (!unlimited) {
        if (result.xmin == null) result.xmin = -l
        if (result.xmax == null) result.xmax = width + r
        if (result.ymin == null) result.ymin = -t
        if (result.ymax == null) result.ymax = height + b
    }
    return result
}

function getPadding({ min: $min, max: $max } = {}, { min: mmin = 0, max: mmax = 0 } = {}) {
    let $interval = $max - $min
    let min = $min - mmin * $interval,
        max = $max + mmax * $interval,
        interval = max - min
    return {
        min: interval == 0 ? 0 : ($min - min) / interval,
        max: interval == 0 ? 0 : (max - $max) / interval,
    }
}

const innerRect = reactiveComputed(() => {
    let scales = vplot.value.coordScales
    let mult = expandMult
    let { min: pl, max: pr } = getPadding(scales.x.range, mult.x)
    let { min: pb, max: pt } = getPadding(scales.y.range, mult.y)
    let { width: w, height: h } = outerRect
    return {
        left: w * pl || 0,
        right: w * (1 - pr) || 0,
        top: h * pt || 0,
        bottom: h * (1 - pb) || 0,
        l: w * pl || 0,
        r: w * pr || 0,
        t: h * pt || 0,
        b: h * pb || 0,
        width: w * (1 - pl - pr),
        height: h * (1 - pt - pb),
        fullWidth: w, fullHeight: h,
    }
})
function getCoord(event, target) {
    target = target || event.currentTarget
    let rect = target.getBoundingClientRect()
    return pos2coord({
        x: event.clientX - (rect.left + outerRect.left + innerRect.left),
        y: event.clientY - (rect.top + outerRect.top + innerRect.top),
    })
}
function getInnerPos(event, target) {
    target = target || event.currentTarget
    let rect = target.getBoundingClientRect()
    return {
        x: event.clientX - (rect.left + outerRect.left + innerRect.left),
        y: event.clientY - (rect.top + outerRect.top + innerRect.top),
    }
}
function getInnerPosEx(event, target) {
    target = target || event.currentTarget
    let rect = target.getBoundingClientRect()
    return {
        l: event.clientX - (rect.left + outerRect.left + innerRect.left),
        t: event.clientY - (rect.top + outerRect.top + innerRect.top),
        r: rect.left + outerRect.left + innerRect.right - event.clientX,
        b: rect.top + outerRect.top + innerRect.bottom - event.clientY,
    }
}
function isInPlot(event) {
    let rect = svgRef.value.getBoundingClientRect()
    return event.clientX > rect.left + outerRect.l &&
        event.clientX < rect.right - outerRect.r &&
        event.clientY > rect.top + outerRect.t &&
        event.clientY < rect.bottom - outerRect.b
}

function oob_squish(value, { min, max }) {
    if (value < min) return min
    if (value > max) return max
    return value
}
function oob_squish_infinite(value, { min, max }) {
    if (value == -Infinity) return min
    if (value == Infinity) return max
    return value
}
let moveTimer
function svgPointerdown(e) {
    if (!isInPlot(e)) return
    let coord = getCoord(e)
    emit('pointerdown', e, coord)
    let svg = e.currentTarget
    let pointerMoved = false
    function detectMove(ev) {
        pointerMoved = pointerMoved || (Math.abs(ev.screenX - e.screenX) > 3 || Math.abs(ev.screenY - e.screenY) > 3)
    }
    function oncapturerelease(ev) {
        ev.preventDefault()
        e.target.removeEventListener('pointermove', detectMove)
        e.target.removeEventListener('pointerup', oncapturerelease)
        if (!pointerMoved) {
            if (ev.button == 2) emit('contextmenu', ev, getCoord(ev))
            if (ev.button == 0) {
                emit('click', ev, getCoord(ev))
                if (isInPlot(e))
                    layers.value.forEach(layer => layer.dispatchEvent(new PointerEvent("click", ev)))
            }
        }
        svg.style.userSelect = null
    }
    e.target.addEventListener('pointermove', detectMove, { passive: true })
    e.target.addEventListener('pointerup', oncapturerelease)
    let act = props.action.find(a => ["move", "select"].includes(a.action) && ["buttons", "ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => a[k] == e[k]))
    if (!act) return
    svg.style.userSelect = 'none'
    e.target.setPointerCapture(e.pointerId)
    if (act.action == "select") {
        e.target.onpointermove = (ev) => {
            let { x = false, y = false } = act
            let coordMove = getCoord(ev, svg)
            if (x || y) activeSelection.value = {
                xmin: x ? Math.min(coord.x, coordMove.x) : undefined,
                xmax: x ? Math.max(coord.x, coordMove.x) : undefined,
                ymin: y ? Math.min(coord.y, coordMove.y) : undefined,
                ymax: y ? Math.max(coord.y, coordMove.y) : undefined,
            }
        }
        e.target.onpointerup = (ev) => {
            ev.currentTarget.onpointerup = null
            ev.currentTarget.onpointermove = null
            let { x = false, y = false, once = false } = act
            activeSelection.value = null
            if (pointerMoved && (x || y)) {
                let coordEnd = getCoord(ev, svg)
                let res = extractModifier(ev)
                res.type = "select"
                if (x) {
                    res.xstart = coord.x
                    res.xend = coordEnd.x
                    res.xmin = Math.min(coord.x, coordEnd.x)
                    res.xmax = Math.max(coord.x, coordEnd.x)
                }
                if (y) {
                    res.ystart = coord.y
                    res.yend = coordEnd.y
                    res.ymin = Math.min(coord.y, coordEnd.y)
                    res.ymax = Math.max(coord.y, coordEnd.y)
                }
                if (!once) {
                    selection.value = {
                        xmin: res.xmin, xmax: res.xmax,
                        ymin: res.ymin, ymax: res.ymax,
                    }
                }
                emit('select', res)
            }
            if (!pointerMoved && act.dismissible) {
                selection.value = {}
                let res = extractModifier(ev)
                res.type = "cancel"
                emit('select', res)
            }
        }
    } else if (act.action == "move") {
        moveTimer = clearTimeout(moveTimer)
        let boundary = coord2pos(act, { unlimited: true })
        let rangeX = {
            min: boundary.xmax == null ? -Infinity : innerRect.width - boundary.xmax,
            max: boundary.xmin == null ? Infinity : - boundary.xmin,
        },
            rangeY = {
                min: boundary.ymax == null ? -Infinity : innerRect.height - boundary.ymax,
                max: boundary.ymin == null ? Infinity : - boundary.ymin,
            }
        e.target.onpointermove = (ev) => {
            let { x = false, y = false } = act
            if (x) translateX.value = oob_squish(translateX.value + ev.movementX, rangeX)
            if (y) translateY.value = oob_squish(translateY.value + ev.movementY, rangeY)
        }
        e.target.onpointerup = (ev) => {
            ev.currentTarget.onpointerup = null
            ev.currentTarget.onpointermove = null
            moveTimer = setTimeout(() => applyTransform(act, ev), 300)
        }
    }
}
function applyTransform(act, event) {
    if (transcaleX.value != null || translateX.value != 0 ||
        transcaleY.value != null || transcaleY.value != 0) {
        let xmin, ymin, xmax, ymax
        if (act.x) {
            xmin = 0, xmax = innerRect.width
            if (transcaleX.value) {
                let ratio = transcaleX.value.ratio,
                    origin = transcaleX.value.origin * outerRect.width - innerRect.l
                xmin = xmin / ratio + (1 - 1 / ratio) * origin
                xmax = xmax / ratio + (1 - 1 / ratio) * origin
            }
            if (translateX.value) {
                xmin -= translateX.value
                xmax -= translateX.value
            }
        }
        if (act.y) {
            ymin = 0, ymax = innerRect.height
            if (transcaleY.value) {
                let ratio = transcaleY.value.ratio,
                    origin = transcaleY.value.origin * outerRect.height - innerRect.t
                ymin = ymin / ratio + (1 - 1 / ratio) * origin
                ymax = ymax / ratio + (1 - 1 / ratio) * origin
            }
            if (translateY.value) {
                ymin -= translateY.value
                ymax -= translateY.value
            }
        }
        setRange(pos2coord({ xmin, xmax, ymin, ymax }), act.action, event)
    }
    translateX.value = translateY.value = 0
    transcaleX.value = transcaleY.value = null
}
let wheelDelta = 0, wheelTimer
function svgWheel(e) {
    if (!isInPlot(e)) return
    let act = action.find(a => ["zoom", "nudge"].includes(a.action) && ["ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => a[k] == e[k]))
    if (!act || !act.x && !act.y) return
    wheelTimer = clearTimeout(wheelTimer)
    e.preventDefault()
    emit('wheel', e, getCoord(e))
    wheelDelta += e.deltaY
    wheel(act, getInnerPosEx(e), wheelDelta)
    wheelTimer = setTimeout(() => {
        applyTransform(act, e)
        wheelDelta = 0
    }, 300)
}
function wheel(act, pos, delta) {
    if (act.action == "zoom") {
        let { x = false, y = false, "min-range-x": mrx = 0, "min-range-y": mry = 0, sensitivity: lvl = 1.25 } = act
        lvl = lvl ** (wheelDelta / 100)
        let maxpos = coord2pos(act, { unlimited: true })
        let xmin, xmax, ymin, ymax
        if (x) {
            xmin = Math.max(pos.l - pos.l * lvl, maxpos.xmin ?? -Infinity)
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
            if (Math.abs(innerRect.width - (xmax - xmin)) > 1) {
                transcaleX.value = {
                    ratio: innerRect.width / (xmax - xmin),
                    origin: (innerRect.l + (xmin * innerRect.width) / (innerRect.width - xmax + xmin)) / outerRect.width
                }
            }
        }
        if (y) {
            ymin = Math.max(pos.t - pos.t * lvl, maxpos.ymin ?? -Infinity)
            ymax = Math.min(pos.t + pos.b * lvl, maxpos.ymax ?? Infinity)
            if (lvl < 1) {
                let coord = pos2coord({ ymin, ymax })
                let dy = coord.ymax - coord.ymin, cy = (coord.ymax + coord.ymin) / 2
                if (dy > 0) {
                    if (dy < mry) {
                        coord.ymin = cy - mry / 2
                        coord.ymax = cy + mry / 2
                    }
                    ({ ymin, ymax } = coord2pos(coord))
                }
            }
            if (Math.abs(innerRect.height - (ymax - ymin)) > 1) {
                transcaleY.value = {
                    ratio: innerRect.height / (ymax - ymin),
                    origin: (innerRect.t + (ymin * innerRect.height) / (innerRect.height - ymax + ymin)) / outerRect.height
                }
            }
        }
    }
    if (act.action == "nudge") {
        let { x = false, y = false, sensitivity = 0.1 } = act
        let boundary = coord2pos(act, { unlimited: true })
        if (x) {
            let movement = sensitivity * innerRect.width * (-delta / 120)
            let rangeX = {
                min: boundary.xmax == null ? -Infinity : innerRect.width - boundary.xmax,
                max: boundary.xmin == null ? Infinity : - boundary.xmin,
            }
            translateX.value = oob_squish(movement, rangeX)
        }
        if (y) {
            let movement = sensitivity * innerRect.height * (-delta / 120)
            let rangeY = {
                min: boundary.ymax == null ? -Infinity : innerRect.height - boundary.ymax,
                max: boundary.ymin == null ? Infinity : - boundary.ymin,
            }
            translateY.value = oob_squish(movement, rangeY)
        }
    }
}
function svgPointerup(e) {
    emit('pointerup', e, getCoord(e))
}
function svgPointerover(e) {
    emit('pointerover', e, getCoord(e))
}
function svgPointerout(e) {
    emit('pointerout', e, getCoord(e))
}
function svgPointerenter(e) {
    emit('pointerenter', e, getCoord(e))
}
function svgPointerleave(e) {
    emit('pointerleave', e, getCoord(e))
}
function svgDblclick(e) {
    emit('dblclick', e, getCoord(e))
}

function setRange(coord, emition = 'rescale', event) {
    let flag = false
    let newrange = {}
    for (const k of ['xmin', 'xmax', 'ymin', 'ymax']) {
        if (coord[k] == null) {
            newrange[k] = range.value[k]
        } else {
            newrange[k] = coord[k]
            if (newrange[k] != range.value[k]) flag = true
        }
    }
    if (flag) {
        coordExpandAdd.value = { x: 0, y: 0 }
        range.value = newrange
        emit(emition, coord, event)
        emit('rangechange', newrange)
    }
}

const gridBreaks = computed(() => {
    let xAxes = vplot.value.axes.filter(a => a.type == "x"),
        yAxes = vplot.value.axes.filter(a => a.type == "y")
    return {
        x: {
            majorBreaks: unique(xAxes.flatMap(x => x.majorBreaks)),
            minorBreaks: unique(xAxes.flatMap(x => x.minorBreaks)),
        },
        y: {
            majorBreaks: unique(yAxes.flatMap(y => y.majorBreaks)),
            minorBreaks: unique(yAxes.flatMap(y => y.minorBreaks)),
        }
    }
})
const axes = computed(() => {
    return vplot.value.axes.map(axis => {
        let { type, position, title, ticks, action, theme: $theme } = axis
        return {
            type,
            bind: {
                title, ticks, action,
                layout: innerRect,
                theme: Object.assign({}, theme.axis?.[position] ?? theme.axis?.[type] ?? {}, $theme),
                position,
                coord2pos, pos2coord
            },
            on: {
                zoom: (e) => setRange(e, 'zoom'),
                move: (e) => setRange(e, 'move'),
                rescale: (e) => setRange(e, 'rescale'),
                nudge: (e) => setRange(e, 'nudge'),
            }
        }
    })
})
</script>
<template>
    <svg ref="svg" width="100%" height="100%" @wheel="svgWheel" @pointerdown="svgPointerdown" @pointerup="svgPointerup"
        @pointerover="svgPointerover" @pointerout="svgPointerout" @pointerenter="svgPointerenter"
        @pointerleave="svgPointerleave" @dblclick="svgDblclick" @click="svgClick" @dragstart.prevent
        @contextmenu.prevent v-bind="$attrs">
        <defs>
            <clipPath :id="`${vid}-plot-clip`">
                <rect x="0" y="0" :width="outerRect.width" :height="outerRect.height" />
            </clipPath>
        </defs>
        <rect :transform="`translate(${outerRect.left}, ${outerRect.top})`" :width="outerRect.width"
            :height="outerRect.height" :fill="theme.plot.background"></rect>
        <g :transform="`translate(${outerRect.left}, ${outerRect.top})`">
            <CoreGridX v-if="theme.grid.x" v-bind="gridBreaks.x" :layout="innerRect" :theme="theme.grid.x"
                :translate="translateX" :transcale="transcaleX" :coord2pos="coord2pos" />
            <CoreGridY v-if="theme.grid.y" v-bind="gridBreaks.y" :layout="innerRect" :theme="theme.grid.y"
                :translate="translateY" :transcale="transcaleY" :coord2pos="coord2pos" />
        </g>
        <g :transform="`translate(${outerRect.left}, ${outerRect.top})`" :clip-path="`url(#${vid}-plot-clip)`">
            <g v-bind="transformBind">
                <CoreLayer ref="layers" v-for="layer in vplot.layers" :data="layer.data" v-bind="layer.vBind"
                    :layout="innerRect" :geom="layer.geom" :coord2pos="coord2pos" />
                <CoreSelection v-model:selection="selection" :coord2pos="coord2pos" :pos2coord="pos2coord"
                    :layout="innerRect" @select="emit('select', $event)" @selecting=" activeSelection = $event"
                    :action="props.action" />
                <CoreSelection v-model:selection="activeSelection" :coord2pos="coord2pos" :pos2coord="pos2coord"
                    :layout="innerRect" />
            </g>
        </g>
        <g :transform="`translate(${outerRect.left}, ${outerRect.top})`">
            <CoreAxis v-for="axis in axes.filter(a => a.type == 'x' || a.type == 'y')" v-bind="axis.bind" v-on="axis.on"
                v-model:translateX="translateX" v-model:transcaleX="transcaleX" v-model:translateY="translateY"
                v-model:transcaleY="transcaleY" />
        </g>
        <foreignObject v-if="props.legendTeleport">
            <Teleport defer :to="props.legendTeleport">
                <CoreLegend :scales="vplot?.scales" :theme="theme.legend" />
            </Teleport>
        </foreignObject>
    </svg>
</template>
