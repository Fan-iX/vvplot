<script setup>
defineOptions({ inheritAttrs: false })
import { ref, computed, watch, inject, useTemplateRef, useId } from 'vue'
import { GPlot, GAxis } from '#base/js/plot'
import { unique, oob_squish_any, oob_squish_infinite, dropNull, emitEvent, plus } from '#base/js/utils'
import { reactiveComputed, useResizeObserver } from '@vueuse/core'
import CoreAxis from './axis/CoreAxis.vue'
import CoreGridH from './grid/CoreGridH.vue'
import CoreGridV from './grid/CoreGridV.vue'
import CoreLayer from './layer/CoreLayer.vue'
import CoreSelection from './CoreSelection.vue'
import CoreLegend from './CoreLegend.vue'
const vid = useId()
const {
    schema, theme,
    expandAdd, expandMult,
    coordLevels, levels, scales,
    flip, reverse, paddings,
    ...props
} = defineProps({
    schema: Object, layers: Array,
    minRange: Object, expandAdd: Object,
    flip: Boolean, reverse: Object, paddings: Object,
    expandMult: Object, coordLevels: Object,
    levels: Object, scales: Object,
    axes: { type: Array, default: () => [] },
    theme: Object,
    render: String, clip: Boolean,
    action: { type: Array, default: () => [] },
    selections: { type: Array, default: () => [] },
    legendTeleport: null,
})
const emit = defineEmits([
    'click', 'singleclick', 'dblclick', 'contextmenu', 'pointerdown', 'pointerup', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'wheel',
    'select', 'move', 'zoom', 'rescale', 'nudge',
])

const range = inject("range")

const rangePreview = inject('rangePreview')
const selectionPreview = defineModel('selectionPreview')
const selectionPreviewTheme = defineModel('selectionPreviewTheme')
function onselecting(modelValue, theme) {
    selectionPreview.value = modelValue
    selectionPreviewTheme.value = theme
}
const _selectionPreviewTheme = computed(() => Object.assign({}, theme?.selection, selectionPreviewTheme.value))
function onselectend() {
    selectionPreview.value = {}
}
const transition = defineModel('transition')

const svgRef = useTemplateRef('svg')
const layers = useTemplateRef('layers')
const width = ref(0), height = ref(0)

useResizeObserver(svgRef, entries => {
    let { width: w, height: h } = entries[0].contentRect
    width.value = w
    height.value = h
})

const gplot = computed(() => new GPlot(schema, props.layers))
const vplot = computed(() => {
    return gplot.value
        .useScales(scales, levels)
        .useCoordLevels(coordLevels)
        .render(range, expandAdd, props.minRange)
})

/**
  variable definition:
                right
  ┌─────────────────────────────┐
   l,left                          r
  ┌─────┐                       ┌─────┐
  ┌───────────────svg─────────────────┐ ┐        ┐
  │ plot margin                       │ │ top,t  │
  │     .--------panel----------.     │ ┘        │
  │     |                       |     │          │
  │     |                       |     │          │
  │     |                       |     │          │ bottom
  │     |                       |     │          │
  │     |                       |     │          │
  │     |                       |     │          │
  │     |                       |     │          │
  │     '-----------------------'     │ ┐        ┘
  │                                   │ │ b
  └───────────────────────────────────┘ ┘
 */
const panel = reactiveComputed(() => {
    let padding = Object.fromEntries(["left", "right", "top", "bottom"].map(p => [p, paddings[p] && theme.plot.padding[p] || 0]))
    let l = +theme.plot.margin.left + padding.left,
        r = +theme.plot.margin.right + padding.right,
        t = +theme.plot.margin.top + padding.top,
        b = +theme.plot.margin.bottom + padding.bottom
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
   variable definition:
         right
   ┌─────────────────┐
    l,left              r
   ┌─────┐           ┌─────┐
   .--------panel--------. ┐       ┐
   | axis expansion        | │ top,t │
   |     .┄innerRect┄.     | ┘       │
   |     ┆           ┆     |         │ bottom
   |     ┆           ┆     |         │
   |     ┆           ┆     |         │
   |    0'┄┄┄┄┄┄┄┄┄┄┄'     | ┐       ┘
   |     0                 | │ b
   '-----------------------' ┘
 */
const innerRect = reactiveComputed(() => {
    let scales = vplot.value.coordScales
    let mult = expandMult
    let { min: xmin, max: xmax } = getPadding(scales.x.range, mult.x)
    let { min: ymin, max: ymax } = getPadding(scales.y.range, mult.y)
    let [pl, pr, pb, pt] = flip ? [ymin, ymax, xmin, xmax] : [xmin, xmax, ymin, ymax]
    let { width: w, height: h } = panel
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

defineExpose({ vplot, panel, svg: svgRef })

const transformBind = computed(() => {
    let tslH = activeTransform.value.translateH + innerRect.left,
        tslV = activeTransform.value.translateV + innerRect.top,
        sclH = activeTransform.value.scaleH,
        sclV = activeTransform.value.scaleV,
        transform = []
    if (tslH != 0 || tslV != 0)
        transform.push(`translate(${tslH}, ${tslV})`)
    if (sclH != 1 || sclV != 1)
        transform.push(`scale(${sclH}, ${sclV})`)
    return { transform: transform.join(' ') || null }
})

function _pos2coord(
    { value, min, max },
    scale, rev, length
) {
    let result = {}
    if (value != null) result.value = scale.invert(rev ? 1 - value / length : value / length)
    if (rev) {
        if (max != null) result.min = scale.invert(1 - max / length)
        if (min != null) result.max = scale.invert(1 - min / length)
    } else {
        if (min != null) result.min = scale.invert(min / length)
        if (max != null) result.max = scale.invert(max / length)
    }
    return result
}

function pos2coord({
    h, hmin, hmax, v, vmin, vmax,
} = {}) {
    let scales = vplot.value.coordScales
    let { width, height } = innerRect
    let result = {}
    let [x, xmin, xmax] = flip ? [v, vmin, vmax] : [h, hmin, hmax]
    let [y, ymin, ymax] = flip ? [h, hmin, hmax] : [v, vmin, vmax]
    if (x != null || xmin != null || xmax != null) {
        let { value, min, max } = _pos2coord(
            { value: x, min: xmin, max: xmax },
            scales.x, flip != reverse.x, flip ? height : width
        )
        Object.assign(result, dropNull({ x: value, xmin: min, xmax: max }))
        if (flip) {
            Object.assign(result, dropNull({ v: value, vmin: min, vmax: max }))
        } else {
            Object.assign(result, dropNull({ h: value, hmin: min, hmax: max }))
        }
    }
    if (y != null || ymin != null || ymax != null) {
        let { value, min, max } = _pos2coord(
            { value: y, min: ymin, max: ymax },
            scales.y, flip == reverse.y, flip ? width : height
        )
        Object.assign(result, dropNull({ y: value, ymin: min, ymax: max }))
        if (flip) {
            Object.assign(result, dropNull({ h: value, hmin: min, hmax: max }))
        } else {
            Object.assign(result, dropNull({ v: value, vmin: min, vmax: max }))
        }
    }
    return result
}
function _coord2pos(
    { value, min, max } = {},
    { oob = oob_squish_infinite } = {},
    scale, rev, length, boundary
) {
    let result = {}
    if (value != null) {
        result.value = length ? oob(length * (rev ? 1 - scale(value) : scale(value)), boundary) : 0
    }
    if (min == null && max == null) return result
    if (rev) {
        if (max != null) result.min = length ? oob(length * (1 - scale(max)), boundary) : 0
        if (min != null) result.max = length ? oob(length * (1 - scale(min)), boundary) : 0
    } else {
        if (min != null) result.min = length ? oob(length * scale(min), boundary) : 0
        if (max != null) result.max = length ? oob(length * scale(max), boundary) : 0
    }
    return result
}
function coord2pos({
    h, hmin, hmax, v, vmin, vmax,
    x, xmin, xmax, y, ymin, ymax,
} = {},
    { limited = false, oob = oob_squish_infinite } = {}
) {
    let { width, height, l, r, t, b } = innerRect
    let result = {}
    let scales = vplot.value.coordScales
    let boundaryH = { min: -l, max: width + r },
        boundaryV = { min: -t, max: height + b }
    if (x != null || xmin != null || xmax != null) {
        if (flip) {
            [v, vmin, vmax] = [x, xmin, xmax]
        } else {
            [h, hmin, hmax] = [x, xmin, xmax]
        }
    }
    if (y != null || ymin != null || ymax != null) {
        if (flip) {
            [h, hmin, hmax] = [y, ymin, ymax]
        } else {
            [v, vmin, vmax] = [y, ymin, ymax]
        }
    }
    if (h != null || hmin != null || hmax != null) {
        let { value, min, max } = _coord2pos(
            { value: h, min: hmin, max: hmax },
            { oob },
            scales[flip ? 'y' : 'x'],
            reverse[flip ? 'y' : 'x'],
            width, boundaryH
        )
        Object.assign(result, dropNull({ h: value, hmin: min, hmax: max }))
    }
    if (v != null || vmin != null || vmax != null) {
        let { value, min, max } = _coord2pos(
            { value: v, min: vmin, max: vmax },
            { oob },
            scales[flip ? 'x' : 'y'],
            !reverse[flip ? 'x' : 'y'],
            height, boundaryV
        )
        Object.assign(result, dropNull({ v: value, vmin: min, vmax: max }))
    }
    if (limited) {
        if (result.hmin == null) result.hmin = boundaryH.min
        if (result.hmax == null) result.hmax = boundaryH.max
        if (result.vmin == null) result.vmin = boundaryV.min
        if (result.vmax == null) result.vmax = boundaryV.max
    }
    return result
}

function getPadding({ min: $min, max: $max } = {}, { min: mmin = 0, max: mmax = 0 } = {}) {
    let $interval = $max - $min
    let min = +$min - mmin * $interval,
        max = +$max + mmax * $interval,
        interval = max - min
    return {
        min: interval == 0 ? 0 : ($min - min) / interval,
        max: interval == 0 ? 0 : (max - $max) / interval,
    }
}

function getCoord(event) {
    let rect = svgRef.value.getBoundingClientRect()
    let l = Math.trunc(event.clientX) - (rect.left + panel.left + innerRect.left),
        t = Math.trunc(event.clientY) - (rect.top + panel.top + innerRect.top),
        r = rect.left + panel.left + innerRect.right - Math.trunc(event.clientX),
        b = rect.top + panel.top + innerRect.bottom - Math.trunc(event.clientY)
    let { x, y } = pos2coord({ h: l, v: t })
    return { l, t, r, b, x, y }
}
function isInPlot(event) {
    let rect = svgRef.value.getBoundingClientRect()
    return event.clientX > rect.left + panel.l &&
        event.clientX < rect.right - panel.r &&
        event.clientY > rect.top + panel.t &&
        event.clientY < rect.bottom - panel.b
}

function dispatchPointerEvent(e) {
    if (!layers.value || e._vhandled || !isInPlot(e)) return e
    let canvasLayers = Array.from(layers.value).filter(l => l.render == 'canvas')
    if (!canvasLayers.length) return e
    // clone event
    let options = {}
    for (let key in e) options[key] = e[key]
    options.bubbles = false
    let event = new PointerEvent(e.type, options)
    for (let key of Object.keys(e)) {
        let prop = Object.getOwnPropertyDescriptor(event, key)
        if (prop && !prop.writable && !prop.set) continue
        event[key] = e[key]
    }
    // dispatch to canvas layers
    for (let i = layers.value.length - 1; i >= 0; i--)
        if (layers.value[i].dispatchEvent(event) === false) e.preventDefault()
    for (let key of Object.keys(event)) {
        let prop = Object.getOwnPropertyDescriptor(event, key)
        if (prop && !prop.writable && !prop.set) continue
        e[key] = event[key]
    }
    return event._vhandled ? event : e
}

let moveTimer, movementX = 0, movementY = 0
function svgPointerdown(e) {
    let evt = dispatchPointerEvent(e), coord = getCoord(e)
    emit('pointerdown', evt, coord)
    if (evt.defaultPrevented) e.preventDefault()
    if (props.clip && !isInPlot(e)) return
    let svg = e.currentTarget
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
            let event = new PointerEvent("singleclick", ev)
            ev.target.dispatchEvent(event)
        }
    }, { once: true })
    let sel = props.selections.find(s => ["buttons", "ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => s[k] == e[k]))
    if (sel) {
        let { x = false, y = false, "min-range-x": mrx = 0, "min-range-y": mry = 0 } = sel
        e.target.setPointerCapture(e.pointerId)
        svg.style.userSelect = 'none'
        let xboundary = (({ xmin: min, xmax: max }) => ({ min, max }))(sel),
            yboundary = (({ ymin: min, ymax: max }) => ({ min, max }))(sel)
        e.target.onpointermove = (ev) => {
            if (!x && !y || !pointerMoved) return
            let coordMove = getCoord(ev)
            let res = {}
            if (x) {
                let xstart = oob_squish_any(coord.x, xboundary),
                    xend = oob_squish_any(oob_squish_any(coordMove.x, coordMove.x > xstart ?
                        { min: plus(xstart, mrx) } : { max: plus(xstart, -mrx) }), xboundary)
                res.xmin = xstart > xend ? xend : xstart
                res.xmax = xstart > xend ? xstart : xend
                res.xreverse = xstart > xend
            }
            if (y) {
                let ystart = oob_squish_any(coord.y, yboundary),
                    yend = oob_squish_any(oob_squish_any(coordMove.y, coordMove.y > ystart ?
                        { min: plus(ystart, mry) } : { max: plus(ystart, -mry) }), yboundary)
                res.ymin = ystart > yend ? yend : ystart
                res.ymax = ystart > yend ? ystart : yend
            }
            selectionPreview.value = res
            selectionPreviewTheme.value = sel.theme
        }
        e.target.onpointerup = (ev) => {
            ev.currentTarget.onpointerup = null
            ev.currentTarget.onpointermove = null
            svg.style.userSelect = null
            selectionPreview.value = {}
            if (pointerMoved && (x || y)) {
                if (sel.buttons & 1) {
                    ev.currentTarget.onclick = (event) => {
                        event.currentTarget.onclick = null
                        emitEvent(sel["onClick"], event)
                    }
                }
                if (sel.buttons & 2) {
                    ev.currentTarget.oncontextmenu = (event) => {
                        event.currentTarget.oncontextmenu = null
                        emitEvent(sel["onContextmenu"], event)
                    }
                }
                let coordEnd = getCoord(ev)
                let res = {}, event = new PointerEvent("select", e)
                if (x) {
                    let xstart = oob_squish_any(coord.x, xboundary),
                        xend = oob_squish_any(oob_squish_any(coordEnd.x, coordEnd.x > xstart ?
                            { min: plus(xstart, mrx) } : { max: plus(xstart, -mrx) }), xboundary)
                    if (xstart == xend) return
                    res.xmin = xstart > xend ? xend : xstart
                    res.xmax = xstart > xend ? xstart : xend
                    res.xreverse = xstart > xend
                }
                if (y) {
                    let ystart = oob_squish_any(coord.y, yboundary),
                        yend = oob_squish_any(oob_squish_any(coordEnd.y, coordEnd.y > ystart ?
                            { min: plus(ystart, mry) } : { max: plus(ystart, -mry) }), yboundary)
                    if (ystart == yend) return
                    res.ymin = ystart > yend ? yend : ystart
                    res.ymax = ystart > yend ? ystart : yend
                    res.yreverse = ystart > yend
                }
                sel["onUpdate:modelValue"]?.(res)
                if (!emitEvent(sel["onSelect"], dropNull(res), event)) {
                    emit('select', dropNull(res), event)
                }
            }
            if (!pointerMoved && sel.dismissible !== false) {
                if (ev.defaultPrevented) return
                let model = sel.modelValue
                if (sel.dismissible !== true && ["xmin", "xmax", "ymin", "ymax"].every(k => model?.[k] == null)) return
                let res = {}, event = new PointerEvent("select", e)
                sel["onUpdate:modelValue"]?.(res)
                if (!emitEvent(sel["onDismiss"], dropNull(res), event)) {
                    emit('select', dropNull(res), event)
                }
            }
        }
        return
    }
    let act = props.action.find(a => a.action == "move" && ["buttons", "ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => a[k] == e[k]))
    if (act) {
        e.target.setPointerCapture(e.pointerId)
        svg.style.userSelect = 'none'
        moveTimer = clearTimeout(moveTimer)
        let hmin0 = 0, hmax0 = innerRect.width,
            vmin0 = 0, vmax0 = innerRect.height,
            h1, h2, v1, v2
        let boundary = coord2pos(act)
        e.target.onpointermove = (ev) => {
            let { x = false, y = false } = act
            let [h, v] = flip ? [y, x] : [x, y]
            if (h) {
                movementX += ev.movementX
                let dh = oob_squish_any(-movementX, { min: boundary.hmin - hmin0, max: boundary.hmax - hmax0 })
                h1 = hmin0 + dh
                h2 = hmax0 + dh
            }
            if (v) {
                movementY += ev.movementY
                let dv = oob_squish_any(-movementY, { min: boundary.vmin - vmin0, max: boundary.vmax - vmax0 })
                v1 = vmin0 + dv
                v2 = vmax0 + dv
            }
            let { xmin, xmax, ymin, ymax } = pos2coord({ hmin: h1, hmax: h2, vmin: v1, vmax: v2 })
            Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
        }
        e.target.onpointerup = (ev) => {
            ev.currentTarget.onpointerup = null
            ev.currentTarget.onpointermove = null
            svg.style.userSelect = null
            moveTimer = setTimeout(() => {
                applyTransform(act, ev)
                movementX = movementY = 0
            }, 300)
        }
        return
    }
}
let wheelDelta = 0, wheelTimer
function svgWheel(e) {
    let evt = dispatchPointerEvent(e), coord = getCoord(e)
    emit('wheel', evt, coord)
    if (evt.defaultPrevented) e.preventDefault()
    if (props.clip && !isInPlot(e)) return
    let act = props.action.find(a => ["zoom", "nudge"].includes(a.action) && ["ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => a[k] == e[k]))
    if (!act || !act.x && !act.y) return
    wheelTimer = clearTimeout(wheelTimer)
    e.preventDefault()
    transition.value = 'transform 0.1s ease-out'
    wheelDelta += e.deltaY
    wheel(act, coord, wheelDelta)
    wheelTimer = setTimeout(() => {
        applyTransform(act, e)
        wheelDelta = 0
    }, 300)
}
function wheel(act, pos, delta) {
    if (act.action == "zoom") {
        let { x = false, y = false, "min-range-x": mrx = 0, "min-range-y": mry = 0, sensitivity = 1.25 } = act
        let lvl = sensitivity ** (wheelDelta / 100)
        let [h, v] = flip ? [y, x] : [x, y]
        let boundary = coord2pos(act)
        let hmin, hmax, vmin, vmax
        if (h) {
            hmin = Math.max(pos.l - Math.max(pos.l, 0) * lvl, boundary.hmin ?? -Infinity)
            hmax = Math.min(pos.l + Math.max(pos.r, 0) * lvl, boundary.hmax ?? Infinity)
        }
        if (v) {
            vmin = Math.max(pos.t - Math.max(pos.t, 0) * lvl, boundary.vmin ?? -Infinity)
            vmax = Math.min(pos.t + Math.max(pos.b, 0) * lvl, boundary.vmax ?? Infinity)
        }
        let { xmin, xmax, ymin, ymax } = pos2coord({ hmin, hmax, vmin, vmax })
        if (x && lvl < 1 && xmax - xmin < mrx) {
            let c = (xmax + xmin) / 2
            xmin = c - mrx / 2
            xmax = c + mrx / 2
        }
        if (y && lvl < 1 && ymax - ymin < mry) {
            let c = (ymax + ymin) / 2
            ymin = c - mry / 2
            ymax = c + mry / 2
        }
        Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
    }
    if (act.action == "nudge") {
        let { x = false, y = false, sensitivity = 0.1 } = act
        let [h, v] = flip ? [y, x] : [x, y]
        let boundary = coord2pos(act)
        let hmin0 = 0, hmax0 = innerRect.width,
            vmin0 = 0, vmax0 = innerRect.height,
            h1, h2, v1, v2
        if (h) {
            let movement = sensitivity * innerRect.width * (-delta / 120)
            let dh = oob_squish_any(-movement, { min: boundary.hmin - hmin0, max: boundary.hmax - hmax0 })
            h1 = hmin0 + dh
            h2 = hmax0 + dh
        }
        if (v) {
            let movement = sensitivity * innerRect.height * (-delta / 120)
            let dv = oob_squish_any(-movement, { min: boundary.vmin - vmin0, max: boundary.vmax - vmax0 })
            v1 = vmin0 + dv
            v2 = vmax0 + dv
        }
        let { xmin, xmax, ymin, ymax } = pos2coord({ hmin: h1, hmax: h2, vmin: v1, vmax: v2 })
        Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
    }
}
const activeTransform = computed(() => {
    let hmin0 = 0, hmax0 = innerRect.width,
        vmin0 = 0, vmax0 = innerRect.height,
        { hmin = hmin0, hmax = hmax0, vmin = vmin0, vmax = vmax0 } = coord2pos(rangePreview ?? {})
    let dh0 = hmax0 - hmin0, dh = hmax - hmin,
        dv0 = vmax0 - vmin0, dv = vmax - vmin

    return {
        scaleH: dh0 < 1 || dh < 1 || Math.abs(dh0 - dh) < 1 ? 1 : dh0 / dh,
        translateH: (hmin0 * hmax - hmin * hmax0) / (hmax - hmin) || 0,
        scaleV: dv0 < 1 || dv < 1 || Math.abs(dv0 - dv) < 1 ? 1 : dv0 / dv,
        translateV: (vmin0 * vmax - vmin * vmax0) / (vmax - vmin) || 0,
    }
})
watch(activeTransform, ({ translateH: dh, translateV: dv, scaleH: sh, scaleV: sv }) => { if (!dh && !dv && sh == 1 && sv == 1) transition.value = null }, { deep: true })
function applyTransform(act, event) {
    let coord = dropNull(rangePreview) ?? {}
    if (!Object.keys(coord).length) return
    let e = new PointerEvent(event.type, event)
    if (!emitEvent(act.emit, coord, e)) {
        emit(act.action, coord, e)
    }
    changerange(coord)
    let xmin, xmax, ymin, ymax
    Object.assign(rangePreview, { xmin, xmax, ymin, ymax })
}
const svgVOn = {
    pointerdown: svgPointerdown,
    pointerup(e) {
        let evt = dispatchPointerEvent(e), coord = getCoord(e)
        emit('pointerup', evt, coord)
        if (evt.defaultPrevented) e.preventDefault()
    },
    pointerover(e) { emit('pointerover', e, getCoord(e)) },
    pointerout(e) { emit('pointerout', e, getCoord(e)) },
    pointerenter(e) { emit('pointerenter', e, getCoord(e)) },
    pointerleave(e) { emit('pointerleave', e, getCoord(e)) },
    click(e) { emit('click', dispatchPointerEvent(e), getCoord(e)) },
    contextmenu(e) {
        let evt = dispatchPointerEvent(e), coord = getCoord(e)
        emit('contextmenu', evt, coord)
        if (evt.defaultPrevented) e.preventDefault()
    },
    singleclick(e) { emit('singleclick', dispatchPointerEvent(e), getCoord(e)) },
    dblclick(e) {
        let evt = dispatchPointerEvent(e), coord = getCoord(e)
        emit('dblclick', evt, coord)
        if (evt.defaultPrevented) e.preventDefault()
    },
    pointermove(e) {
        let evt = dispatchPointerEvent(e), coord = getCoord(e)
        emit('pointermove', evt, coord)
        if (evt.defaultPrevented) e.preventDefault()
    },
    wheel: svgWheel,
}

function changerange(coord) {
    let { xmin, xmax, ymin, ymax } = coord
    let { xmin: $xmin, xmax: $xmax, ymin: $ymin, ymax: $ymax } = range
    xmin = xmin != null ? plus(xmin, +expandAdd.x.min) : $xmin
    xmax = xmax != null ? plus(xmax, -expandAdd.x.max) : $xmax
    ymin = ymin != null ? plus(ymin, +expandAdd.y.min) : $ymin
    ymax = ymax != null ? plus(ymax, -expandAdd.y.max) : $ymax
    if (xmin == $xmin && xmax == $xmax && ymin == $ymin && ymax == $ymax) return
    Object.assign(range, { xmin, xmax, ymin, ymax })
}

const axisRange = reactiveComputed(() => {
    let xmin = rangePreview?.xmin ?? range?.xmin,
        xmax = rangePreview?.xmax ?? range?.xmax,
        ymin = rangePreview?.ymin ?? range?.ymin,
        ymax = rangePreview?.ymax ?? range?.ymax
    return {
        x: xmin || xmax ? { min: xmin, max: xmax, } : undefined,
        y: ymin || ymax ? { min: ymin, max: ymax, } : undefined,
    }
})
const gaxes = computed(() => {
    let coordScales = {
        x: vplot.value.coordScales.x,
        y: vplot.value.coordScales.y
    }
    return props.axes.filter(a => a.coord in coordScales)
        .filter(a => ["h", "v"].includes(a.orientation))
        .map(({
            coord, breaks, labels, titles, minorBreaks, ...etc
        }) => ({
            coord, axis: new GAxis(coordScales[coord], { breaks, labels, titles, minorBreaks }), etc
        }))
})
const vaxes = computed(() => gaxes.value.map(({ coord, axis, etc }) => {
    let { majorBreaks, minorBreaks, ticks } = axis.getBindings({
        range: axisRange[coord], expandMult: expandMult[coord]
    })
    let { showGrid, orientation, ...bind } = etc
    return {
        majorBreaks, minorBreaks, ticks,
        showGrid, coord, orientation,
        bind
    }
}))
const gridBreaks = computed(() => {
    let hAxes = vaxes.value.filter(a => a.showGrid && a.orientation == "v"),
        vAxes = vaxes.value.filter(a => a.showGrid && a.orientation == "h")
    return {
        h: {
            majorBreaks: unique(hAxes.flatMap(a => a.majorBreaks), x => x.position),
            minorBreaks: unique(hAxes.flatMap(a => a.minorBreaks), x => x.position),
        },
        v: {
            majorBreaks: unique(vAxes.flatMap(a => a.majorBreaks), x => x.position),
            minorBreaks: unique(vAxes.flatMap(a => a.minorBreaks), x => x.position),
        }
    }
})
const axes = computed(() => {
    return vaxes.value.map(({ orientation, coord, bind, ticks }) => {
        let {
            onMove: move = (...args) => emit('move', ...args),
            onZoom: zoom = (...args) => emit('zoom', ...args),
            onRescale: rescale = (...args) => emit('rescale', ...args),
            onNudge: nudge = (...args) => emit('nudge', ...args),
            ...etc
        } = bind
        return {
            orientation,
            bind: {
                coord, orientation, ticks,
                layout: innerRect,
                coord2pos, pos2coord,
                ...etc
            },
            on: { zoom, move, rescale, nudge, rangechange: changerange }
        }
    })
})
</script>
<template>
    <svg ref="svg" width="100%" height="100%" v-on="svgVOn" v-bind="$attrs">
        <defs>
            <clipPath :id="`${vid}-plot-clip`">
                <rect x="0" y="0" :width="panel.width" :height="panel.height" />
            </clipPath>
        </defs>
        <rect :transform="`translate(${panel.left}, ${panel.top})`" :width="panel.width" :height="panel.height"
            :fill="theme.plot.background" v-if="theme.plot.background"></rect>
        <g :transform="`translate(${panel.left}, ${panel.top})`" style="pointer-events: none;">
            <CoreGridH v-if="theme.grid.h" v-bind="gridBreaks.h" :layout="innerRect" :theme="theme.grid.h"
                :activeTransform="activeTransform" :coord2pos="coord2pos" :transition="transition" />
            <CoreGridV v-if="theme.grid.v" v-bind="gridBreaks.v" :layout="innerRect" :theme="theme.grid.v"
                :activeTransform="activeTransform" :coord2pos="coord2pos" :transition="transition" />
        </g>
        <g :transform="`translate(${panel.left}, ${panel.top})`"
            :clip-path="props.clip ? `url(#${vid}-plot-clip)` : null">
            <g v-bind="transformBind" :style="{ transition }">
                <CoreLayer ref="layers" v-for="layer in vplot.layers" :data="layer.data" v-bind="layer.vBind"
                    :layout="innerRect" :geom="layer.geom" :coord2pos="coord2pos" :getCoord="getCoord"
                    :default-render="props.render" />
                <CoreSelection :coord2pos="coord2pos" :pos2coord="pos2coord" :layout="innerRect"
                    @selecting="onselecting" @selectend="onselectend" v-bind="sel" v-for="sel in props.selections"
                    :flip />
                <CoreSelection :coord2pos="coord2pos" :pos2coord="pos2coord" :layout="innerRect"
                    :modelValue="selectionPreview" :theme="_selectionPreviewTheme" :flip />
            </g>
        </g>
        <g :transform="`translate(${panel.left}, ${panel.top})`">
            <CoreAxis v-for="axis in axes.filter(a => typeof a.bind.position !== 'number')" v-bind="axis.bind"
                v-on="axis.on" v-model:transition="transition" :activeTransform="activeTransform" />
            <g :clip-path="props.clip ? `url(#${vid}-plot-clip)` : null">
                <CoreAxis v-for="axis in axes.filter(a => typeof a.bind.position === 'number')" v-bind="axis.bind"
                    v-on="axis.on" v-model:transition="transition" :activeTransform="activeTransform" />
            </g>
        </g>
        <foreignObject v-if="props.legendTeleport">
            <Teleport defer :to="props.legendTeleport">
                <CoreLegend :scales="vplot?.scales" :theme="theme.legend" />
            </Teleport>
        </foreignObject>
    </svg>
</template>
