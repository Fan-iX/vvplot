<script setup>
defineOptions({ inheritAttrs: false })
import { ref, computed, watch, useTemplateRef, useId } from 'vue'
import { GPlot } from '#base/js/plot'
import { unique, oob_squish_any, oob_squish_infinite, dropNull, emitEvent } from '#base/js/utils'
import { reactiveComputed, useElementSize } from '@vueuse/core'
import CoreAxis from './axis/CoreAxis.vue'
import CoreGridH from './grid/CoreGridH.vue'
import CoreGridV from './grid/CoreGridV.vue'
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
    clip: Boolean,
    action: { type: Array, default: () => [] },
    selections: { type: Array, default: () => [] },
    legendTeleport: null,
})
const range = defineModel('range')
const emit = defineEmits([
    'click', 'singleclick', 'dblclick', 'contextmenu', 'pointerdown', 'pointerup', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'wheel',
    'select', 'move', 'zoom', 'rescale', 'nudge', 'rangechange',
    'update:xmin', 'update:xmax', 'update:ymin', 'update:ymax',
])
const theme = reactiveComputed(() => props.theme)

const coordExpandAdd = ref(props.coordScale?.expandAdd || {})
watch(() => props.coordScale, (v) => {
    range.value = v.range
    coordExpandAdd.value = v.expandAdd
}, { immediate: true })
const activeSelection = defineModel('activeSelection')
const translateH = defineModel('translateH', { type: Number, default: 0 })
const translateV = defineModel('translateV', { type: Number, default: 0 })
const transcaleH = defineModel('transcaleH')
const transcaleV = defineModel('transcaleV')

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
const flip = computed(() => props.coordDisplay?.flip ?? false)

const svgRef = useTemplateRef('svg')
const layers = useTemplateRef('layers')
const { width, height } = useElementSize(svgRef)
const gplot = computed(() => new GPlot(props.schema, props.layers))

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
const transformBind = computed(() => {
    let transform = [], origin = null
    let tslX = translateH.value + innerRect.left,
        tslY = translateV.value + innerRect.top
    if (tslX != 0 || tslY != 0)
        transform.push(`translate(${tslX}, ${tslY})`)
    let sclX = transcaleH.value?.ratio ?? 1,
        sclY = transcaleV.value?.ratio ?? 1
    if (sclX != 1 || sclY != 1) {
        transform.push(`scale(${sclX}, ${sclY})`)
        origin = `${(transcaleH.value?.origin ?? 0.5) * panel.width - innerRect.left} ${(transcaleV.value?.origin ?? 0.5) * panel.height - innerRect.top}`
    }
    return {
        transform: transform.join(' '),
        'transform-origin': origin
    }
})

const vplot = computed(() => {
    return gplot.value
        .useScales(props.scales, props.levels)
        .useCoordLevels(props.coordLevels)
        .render(
            range.value, expandAdd, expandMult,
            props.axes, props.coordScale.minRange
        )
})
defineExpose({ vplot, panel })

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
    let [x, xmin, xmax] = flip.value ? [v, vmin, vmax] : [h, hmin, hmax]
    let [y, ymin, ymax] = flip.value ? [h, hmin, hmax] : [v, vmin, vmax]
    if (x != null || xmin != null || xmax != null) {
        let { value, min, max } = _pos2coord(
            { value: x, min: xmin, max: xmax },
            scales.x, flip.value != reverse.x, flip.value ? height : width
        )
        Object.assign(result, dropNull({ x: value, xmin: min, xmax: max }))
        if (flip.value) {
            Object.assign(result, dropNull({ v: value, vmin: min, vmax: max }))
        } else {
            Object.assign(result, dropNull({ h: value, hmin: min, hmax: max }))
        }
    }
    if (y != null || ymin != null || ymax != null) {
        let { value, min, max } = _pos2coord(
            { value: y, min: ymin, max: ymax },
            scales.y, flip.value == reverse.y, flip.value ? width : height
        )
        Object.assign(result, dropNull({ y: value, ymin: min, ymax: max }))
        if (flip.value) {
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
    scale, rev, length, range
) {
    let result = {}
    if (value != null) {
        result.value = oob(length * (rev ? 1 - scale(value) : scale(value)), range)
    }
    if (min == null && max == null) return result
    if (rev) {
        if (max != null) result.min = oob(length * (1 - scale(max)), range)
        if (min != null) result.max = oob(length * (1 - scale(min)), range)
    } else {
        if (min != null) result.min = oob(length * scale(min), range)
        if (max != null) result.max = oob(length * scale(max), range)
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
    let rangeH = { min: -l, max: width + r },
        rangeV = { min: -t, max: height + b }
    if (x != null || xmin != null || xmax != null) {
        if (flip.value) {
            [v, vmin, vmax] = [x, xmin, xmax]
        } else {
            [h, hmin, hmax] = [x, xmin, xmax]
        }
    }
    if (y != null || ymin != null || ymax != null) {
        if (flip.value) {
            [h, hmin, hmax] = [y, ymin, ymax]
        } else {
            [v, vmin, vmax] = [y, ymin, ymax]
        }
    }
    if (h != null || hmin != null || hmax != null) {
        let { value, min, max } = _coord2pos(
            { value: h, min: hmin, max: hmax },
            { oob },
            scales[flip.value ? 'y' : 'x'],
            reverse[flip.value ? 'y' : 'x'],
            width, rangeH
        )
        Object.assign(result, dropNull({ h: value, hmin: min, hmax: max }))
    }
    if (v != null || vmin != null || vmax != null) {
        let { value, min, max } = _coord2pos(
            { value: v, min: vmin, max: vmax },
            { oob },
            scales[flip.value ? 'x' : 'y'],
            !reverse[flip.value ? 'x' : 'y'],
            height, rangeV
        )
        Object.assign(result, dropNull({ v: value, vmin: min, vmax: max }))
    }
    if (limited) {
        if (result.hmin == null) result.hmin = rangeH.min
        if (result.hmax == null) result.hmax = rangeH.max
        if (result.vmin == null) result.vmin = rangeV.min
        if (result.vmax == null) result.vmax = rangeV.max
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
    let { min: xmin, max: xmax } = getPadding(scales.x.range, mult.x)
    let { min: ymin, max: ymax } = getPadding(scales.y.range, mult.y)
    let [pl, pr, pb, pt] = flip.value ? [ymin, ymax, xmin, xmax] : [xmin, xmax, ymin, ymax]
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

let moveTimer
function svgPointerdown(e) {
    let coord = getCoord(e)
    emit('pointerdown', e, coord)
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
            let coord = getCoord(ev)
            emit('singleclick', new PointerEvent("singleclick", ev), coord)
            if (isInPlot(e) && layers.value) {
                if (ev.button == 0) {
                    layers.value.forEach(layer => layer.dispatchEvent(new PointerEvent("click", ev)))
                }
            }
        }
    }, { once: true })
    if (props.clip && !isInPlot(e)) return
    let sel = props.selections.find(s => ["buttons", "ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => s[k] == e[k]))
    if (sel) {
        let { x = false, y = false } = sel
        e.target.setPointerCapture(e.pointerId)
        svg.style.userSelect = 'none'
        let xboundary = (({ xmin: min, xmax: max }) => ({ min, max }))(sel),
            yboundary = (({ ymin: min, ymax: max }) => ({ min, max }))(sel)
        e.target.onpointermove = (ev) => {
            let coordMove = getCoord(ev)
            if (!x && !y) return
            let res = {}
            if (x) {
                let xstart = oob_squish_any(coord.x, xboundary),
                    xend = oob_squish_any(coordMove.x, xboundary)
                res.xmin = Math.min(xstart, xend)
                res.xmax = Math.max(xstart, xend)
            }
            if (y) {
                let ystart = oob_squish_any(coord.y, yboundary),
                    yend = oob_squish_any(coordMove.y, yboundary)
                res.ymin = Math.min(ystart, yend)
                res.ymax = Math.max(ystart, yend)
            }
            activeSelection.value = { modelValue: res, theme: sel.theme }
        }
        e.target.onclick = (ev) => {
            ev.currentTarget.onclick = null
            ev.currentTarget.onpointermove = null
            svg.style.userSelect = null
            activeSelection.value = null
            if (pointerMoved && (x || y)) {
                let coordEnd = getCoord(ev)
                let res = {}, event = new PointerEvent("select", e)
                if (x) {
                    let xstart = oob_squish_any(coord.x, xboundary),
                        xend = oob_squish_any(coordEnd.x, xboundary)
                    if (xstart == xend) return
                    res.xmin = Math.min(xstart, xend)
                    res.xmax = Math.max(xstart, xend)
                    res.xreverse = xstart > xend
                }
                if (y) {
                    let ystart = oob_squish_any(coord.y, yboundary),
                        yend = oob_squish_any(coordEnd.y, yboundary)
                    if (ystart == yend) return
                    res.ymin = Math.min(ystart, yend)
                    res.ymax = Math.max(ystart, yend)
                    res.yreverse = ystart > yend
                }
                sel["onUpdate:modelValue"]?.(res)
                if (!emitEvent(sel["onSelect"], dropNull(res), event)) {
                    emit('select', dropNull(res), event)
                }
            }
            if (!pointerMoved && sel.dismissible !== false) {
                if (ev.defaultPrevented || ev.handled) return
                let model = sel.modelValue
                if (sel.dismissible !== true && ["xmin", "xmax", "ymin", "ymax"].every(k => model?.[k] == null)) return
                let res = {}, event = new PointerEvent("select", e)
                sel["onUpdate:modelValue"]?.(res)
                if (!emitEvent(sel["onCancel"], dropNull(res), event)) {
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
        let boundary = coord2pos(act, { unlimited: true })
        let rangeH = {
            min: boundary.hmax == null ? -Infinity : innerRect.width - boundary.hmax,
            max: boundary.hmin == null ? Infinity : - boundary.hmin,
        },
            rangeV = {
                min: boundary.vmax == null ? -Infinity : innerRect.height - boundary.vmax,
                max: boundary.vmin == null ? Infinity : - boundary.vmin,
            }
        e.target.onpointermove = (ev) => {
            let { x = false, y = false } = act
            let [h, v] = flip.value ? [y, x] : [x, y]
            if (h) translateH.value = oob_squish_any(translateH.value + ev.movementX, rangeH)
            if (v) translateV.value = oob_squish_any(translateV.value + ev.movementY, rangeV)
        }
        e.target.onpointerup = (ev) => {
            ev.currentTarget.onpointerup = null
            ev.currentTarget.onpointermove = null
            svg.style.userSelect = null
            moveTimer = setTimeout(() => applyTransform(act, ev), 300)
        }
        return
    }
}
function applyTransform(act, event) {
    let { x = false, y = false } = act
    let [h, v] = flip.value ? [y, x] : [x, y]
    if (transcaleH.value != null || translateH.value ||
        transcaleV.value != null || translateV.value) {
        let hmin, hmax, vmin, vmax
        if (h) {
            hmin = 0, hmax = innerRect.width
            if (transcaleH.value) {
                let ratio = transcaleH.value.ratio,
                    origin = transcaleH.value.origin * panel.width - innerRect.l
                hmin = hmin / ratio + (1 - 1 / ratio) * origin
                hmax = hmax / ratio + (1 - 1 / ratio) * origin
            }
            if (translateH.value) {
                hmin -= translateH.value
                hmax -= translateH.value
            }
        }
        if (v) {
            vmin = 0, vmax = innerRect.height
            if (transcaleV.value) {
                let ratio = transcaleV.value.ratio,
                    origin = transcaleV.value.origin * panel.height - innerRect.t
                vmin = vmin / ratio + (1 - 1 / ratio) * origin
                vmax = vmax / ratio + (1 - 1 / ratio) * origin
            }
            if (translateV.value) {
                vmin -= translateV.value
                vmax -= translateV.value
            }
        }
        let { xmin, xmax, ymin, ymax } = pos2coord({ hmin, hmax, vmin, vmax }),
            coord = { xmin, xmax, ymin, ymax }
        if (!emitEvent(act.emit, dropNull(coord), event)) {
            emit(act.action, dropNull(coord), event)
        }
        changerange(coord)
    }
    translateH.value = translateV.value = 0
    transcaleH.value = transcaleV.value = null
}
let wheelDelta = 0, wheelTimer
function svgWheel(e) {
    let coord = getCoord(e)
    emit('wheel', e, coord)
    if (props.clip && !isInPlot(e)) return
    let act = props.action.find(a => ["zoom", "nudge"].includes(a.action) && ["ctrlKey", "shiftKey", "altKey", "metaKey"].every(k => a[k] == e[k]))
    if (!act || !act.x && !act.y) return
    wheelTimer = clearTimeout(wheelTimer)
    e.preventDefault()
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
        let [h, v, mrh, mrv] = flip.value ? [y, x, mry, mrx] : [x, y, mrx, mry]
        let maxpos = coord2pos(act, { unlimited: true })
        let hmin, hmax, vmin, vmax
        if (h) {
            hmin = Math.max(pos.l - pos.l * lvl, maxpos.hmin ?? -Infinity)
            hmax = Math.min(pos.l + pos.r * lvl, maxpos.hmax ?? Infinity)
            if (lvl < 1) {
                let { hmin: min, hmax: max } = pos2coord({ hmin, hmax })
                let c = (max + min) / 2
                if (max - min < mrh) {
                    min = c - mrh / 2
                    max = c + mrh / 2
                }
                ({ hmin, hmax } = coord2pos({ hmin: min, hmax: max }))
            }
            if (hmax - hmin > 0 && Math.abs(innerRect.width - (hmax - hmin)) > 1) {
                transcaleH.value = {
                    ratio: innerRect.width / (hmax - hmin),
                    origin: (innerRect.l + (hmin * innerRect.width) / (innerRect.width - hmax + hmin)) / panel.width
                }
            }
        }
        if (v) {
            vmin = Math.max(pos.t - pos.t * lvl, maxpos.vmin ?? -Infinity)
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
            if (vmax - vmin > 0 && Math.abs(innerRect.height - (vmax - vmin)) > 1) {
                transcaleV.value = {
                    ratio: innerRect.height / (vmax - vmin),
                    origin: (innerRect.t + (vmin * innerRect.height) / (innerRect.height - vmax + vmin)) / panel.height
                }
            }
        }
    }
    if (act.action == "nudge") {
        let { x = false, y = false, sensitivity = 0.1 } = act
        let [h, v] = flip.value ? [y, x] : [x, y]
        let boundary = coord2pos(act, { unlimited: true })
        if (h) {
            let movement = sensitivity * innerRect.width * (-delta / 120)
            let range = {
                min: boundary.hmax == null ? -Infinity : innerRect.width - boundary.hmax,
                max: boundary.hmin == null ? Infinity : - boundary.hmin,
            }
            translateH.value = oob_squish_any(movement, range)
        }
        if (v) {
            let movement = sensitivity * innerRect.height * (-delta / 120)
            let range = {
                min: boundary.vmax == null ? -Infinity : innerRect.height - boundary.vmax,
                max: boundary.vmin == null ? Infinity : - boundary.vmin,
            }
            translateV.value = oob_squish_any(movement, range)
        }
    }
}
const svgVOn = {
    pointerdown: svgPointerdown,
    pointerup(e) { emit('pointerup', e, getCoord(e)) },
    pointerover(e) { emit('pointerover', e, getCoord(e)) },
    pointerout(e) { emit('pointerout', e, getCoord(e)) },
    pointerenter(e) { emit('pointerenter', e, getCoord(e)) },
    pointerleave(e) { emit('pointerleave', e, getCoord(e)) },
    dblclick(e) { emit('dblclick', e, getCoord(e)) },
    click(e) { emit('click', e, getCoord(e)) },
    contextmenu(e) { emit('contextmenu', e, getCoord(e)) },
    pointermove(e) { emit('pointermove', e, getCoord(e)) },
    wheel: svgWheel,
}

function changerange(coord) {
    let { xmin, xmax, ymin, ymax } = coord
    let { xmin: $xmin, xmax: $xmax, ymin: $ymin, ymax: $ymax } = range.value
    xmin = xmin ?? $xmin
    xmax = xmax ?? $xmax
    ymin = ymin ?? $ymin
    ymax = ymax ?? $ymax
    if (xmin == $xmin && xmax == $xmax && ymin == $ymin && ymax == $ymax) return
    let newrange = { xmin, xmax, ymin, ymax }
    if (xmin != null) emit('update:xmin', xmin + expandAdd.x.min)
    if (xmax != null) emit('update:xmax', xmax - expandAdd.x.max)
    if (ymin != null) emit('update:ymin', ymin + expandAdd.y.min)
    if (ymax != null) emit('update:ymax', ymax - expandAdd.y.max)
    range.value = newrange
    emit('rangechange', dropNull(newrange))
    coordExpandAdd.value = { x: 0, y: 0 }
}

const gridBreaks = computed(() => {
    let hAxes = vplot.value.axes.filter(a => a.orientation == "v"),
        vAxes = vplot.value.axes.filter(a => a.orientation == "h")
    return {
        h: {
            majorBreaks: unique(hAxes.flatMap(a => a.majorBreaks)),
            minorBreaks: unique(hAxes.flatMap(a => a.minorBreaks)),
        },
        v: {
            majorBreaks: unique(vAxes.flatMap(a => a.majorBreaks)),
            minorBreaks: unique(vAxes.flatMap(a => a.minorBreaks)),
        }
    }
})
const axes = computed(() => {
    return vplot.value.axes.map(axis => {
        let { position, title, ticks, action, orientation, ...bind } = axis
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
                title, ticks, action, orientation, position,
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
            :fill="theme.plot.background"></rect>
        <g :transform="`translate(${panel.left}, ${panel.top})`">
            <CoreGridH v-if="theme.grid.h" v-bind="gridBreaks.h" :layout="innerRect" :theme="theme.grid.h"
                :translate="translateV" :transcale="transcaleV" :coord2pos="coord2pos" />
            <CoreGridV v-if="theme.grid.v" v-bind="gridBreaks.v" :layout="innerRect" :theme="theme.grid.v"
                :translate="translateH" :transcale="transcaleH" :coord2pos="coord2pos" />
        </g>
        <g :transform="`translate(${panel.left}, ${panel.top})`"
            :clip-path="props.clip ? `url(#${vid}-plot-clip)` : null">
            <g v-bind="transformBind">
                <CoreLayer ref="layers" v-for="layer in vplot.layers" :data="layer.data" v-bind="layer.vBind"
                    :layout="innerRect" :geom="layer.geom" :coord2pos="coord2pos" />
                <CoreSelection :coord2pos="coord2pos" :pos2coord="pos2coord" :layout="innerRect"
                    @selecting="activeSelection = $event" v-bind="{ onSelect: (d, e) => emit('select', d, e), ...sel }"
                    v-for="sel in props.selections" />
                <CoreSelection :coord2pos="coord2pos" :pos2coord="pos2coord" :layout="innerRect"
                    v-bind="activeSelection" />
            </g>
        </g>
        <g :transform="`translate(${panel.left}, ${panel.top})`">
            <CoreAxis v-for="axis in axes.filter(a => a.orientation == 'v' || a.orientation == 'h')" v-bind="axis.bind"
                v-on="axis.on" v-model:translateH="translateH" v-model:transcaleH="transcaleH"
                v-model:translateV="translateV" v-model:transcaleV="transcaleV" />
        </g>
        <foreignObject v-if="props.legendTeleport">
            <Teleport defer :to="props.legendTeleport">
                <CoreLegend :scales="vplot?.scales" :theme="theme.legend" />
            </Teleport>
        </foreignObject>
    </svg>
</template>
