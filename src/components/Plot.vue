<script setup>
import { computed, watch, Fragment, useAttrs, useSlots, useTemplateRef, onMounted, reactive, provide } from 'vue'
import { reactiveComputed, useElementSize } from '@vueuse/core'
import { baseParse } from '@vue/compiler-core'
import { theme_base, theme_default, themeBuild, themeMerge, themePreprocess } from '../js/theme'
import { str_c, serializeSVG } from '../js/utils'
defineOptions({ inheritAttrs: false })

import CorePlot from '../core/CorePlot.vue'
import VVAction from './Action.vue'
import VVSelection from './Action.vue'
import * as geom_components from './geom'
import * as axis_components from './axis'
const components = {
    ...geom_components,
    ...axis_components,
    VVAction, VVSelection,
}

const opponents = {
    x: 'y', y: 'x', h: 'v', v: 'h',
    top: 'bottom', bottom: 'top', left: 'right', right: 'left'
}

function _isPropTruthy(v) {
    if (v == null) return v
    return v === "" || Boolean(v)
}

const emit = defineEmits(['resize', 'rangechange', 'select', 'update:range', 'update:rangePreview'])
const {
    data: $data, scales: $scales, aes: $aes,
    expandAdd: $expandAdd, expandMult: $expandMult, extend: $extend,
    levels: $levels, range: $range, minRange: $minRange, rangePreview: $rangePreview,
    axes: $axes, theme: $theme, action: $action, reverse: $reverse,
    flip, clip, resize, legendTeleport
} = defineProps({
    data: Array, scales: Object, aes: Object,
    expandAdd: Object, expandMult: Object, extend: Object,
    levels: Object, range: Object, minRange: Object, rangePreview: Object,
    axes: [Object, Array], theme: [Object, Array], action: [Object, Array], reverse: Object,
    flip: Boolean, clip: { type: Boolean, default: true }, resize: null,
    legendTeleport: null,
})
const selectionPreview = defineModel('selectionPreview', { default: () => ({}) })
const selectionPreviewTheme = defineModel('selectionPreviewTheme', { default: () => ({}) })
const transition = defineModel('transition')

function expandFragment(componentList) {
    if (componentList == null) return []
    return componentList.flatMap(layer => {
        if (layer.type == Fragment) {
            return expandFragment(layer.children)
        } else if (layer.type == "template") {
            return expandFragment(layer.children).map(c => {
                c.props = { ...c.props, ...layer.props }
                return c
            })
        }
        return layer
    })
}
function resolveComponent(ast) {
    let result = {
        props: Object.fromEntries(ast.props.map(p => {
            try {
                if (p.type == 7) {
                    // contextual function not supported yet
                    return [p.arg.content, new Function("return " + p.exp.content)()]
                } else if (p.type == 6) {
                    return [p.name, p.value?.content ?? ""]
                }
            } catch (e) { }
        }).filter(x => x != null)),
        children: ast.children.map(c => () => [resolveComponent(c)]),
        type: components[ast.tag],
    }
    return result
}
const $slots = useSlots()
const $attrs = useAttrs()

const vnodes = reactive({
    axis: {},
    layer: {},
    action: {},
    selection: {},
    dom: {},
})
for (let key in $slots) {
    watch(() => $slots[key]?.(), s => {
        let comps = expandFragment(s).flatMap(c => {
            if (c.type?.template) {
                let comp = baseParse(c.type.template, { decodeEntities: true })
                return comp.children.map(x => resolveComponent(x))
            } else {
                return c
            }
        }).filter(x => x != null)
        let res = Object.groupBy(comps, c => c.type.$_type ?? "dom")
        for (let type in res) {
            vnodes[type][key] = res[type]
        }
    }, { immediate: true })
}
const vlayer = computed(() => Object.values(vnodes.layer).flat())
const vaxis = computed(() => Object.values(vnodes.axis).flat())
const vaction = computed(() => Object.values(vnodes.action).flat())
const vselection = computed(() => Object.values(vnodes.selection).flat())
const vdom = computed(() => Object.keys(vnodes.dom).flatMap(k => k == 'panel' ? [] : vnodes.dom[k]))

const vBind = computed(() => {
    let plot = {}
    let wrapper = {}
    for (let key in $attrs) {
        if (key.startsWith('on')) {
            let arr = Array.isArray($attrs[key]) ? $attrs[key] : [$attrs[key]]
            plot[key] = arr.filter(f => typeof f === 'function')
            wrapper[key] = arr.filter(f => typeof f !== 'function')
        } else {
            wrapper[key] = $attrs[key]
        }
    }
    return { plot, wrapper }
})

const theme = computed(() => {
    let themes = [theme_base, theme_default].concat($theme ?? [])
    return themeBuild(themePreprocess(themeMerge(...themes), flip))
}, { deep: true })

const primaryAxis = reactiveComputed(() => {
    let allAxes = vaxis.value.map(c => ({ ...c.type.$_props, ...c.props }))
    let xAxes = allAxes.filter(c => c.coord === 'x')
    let yAxes = allAxes.filter(c => c.coord === 'y')
    return {
        x: xAxes.find(c => _isPropTruthy(c.primary)) ?? xAxes.find(c => c.primary == null && !_isPropTruthy(c.secondary)),
        y: yAxes.find(c => _isPropTruthy(c.primary)) ?? yAxes.find(c => c.primary == null && !_isPropTruthy(c.secondary))
    }
})

const primaryAxisConfig = {
    levels: reactive({}),
    extend: reactive({}),
    ['min-range']: reactive({}),
    ['expand-add']: reactive({}),
    ['expand-mult']: reactive({}),
    boundary: reactive({}),
    reverse: reactive({}),
    min: reactive({}),
    max: reactive({}),
    ['min-preview']: reactive({}),
    ['max-preview']: reactive({}),
}

watch(primaryAxis, v => {
    for (let ori of ['x', 'y']) {
        for (let key in primaryAxisConfig) {
            primaryAxisConfig[key][ori] = v?.[ori]?.[key]
        }
    }
}, { immediate: true })

const actionBoundary = reactiveComputed(() => {
    let boundary = {}
    for (let ori of ['x', 'y']) {
        let bound = primaryAxisConfig.boundary[ori]
        boundary[ori] = {
            min: bound?.min ?? bound?.[0],
            max: bound?.max ?? bound?.[1]
        }
    }
    return boundary
})

/* schema:
    global data and data transformation of the plot.
    schema<data, aes, extendX, extendY>
*/
const schema = computed(() => {
    return {
        data: $data,
        aes: $aes,
        extendX: primaryAxisConfig.extend.x ?? $extend?.x ?? 0,
        extendY: primaryAxisConfig.extend.y ?? $extend?.y ?? 0
    }
})
/* layers
    data and data transformation of each layer.
    [ layer<geom, stat, data, aes, attrs, scales, vBind> ]
*/
const layers = computed(() => {
    return vlayer.value.map(layer => {
        let { geom, stat, scales, data, 'extend-x': extendX, 'extend-y': extendY, ...etc } = { ...layer.type.$_props, ...layer.props }
        let argnames = layer.type.$_argnames || []
        let aes = {}, args = {}, attrs = {}
        let vBind = {}
        for (let key in etc) {
            if (key == "key") continue
            if (argnames.includes(key)) {
                args[key] = etc[key]
            } else if (key.startsWith('on')) {
                vBind[key] = etc[key]
            } else if (typeof etc[key] === 'function') {
                aes[key] = etc[key]
            } else {
                if (["class", 'style', 'render'].includes(key)) {
                    vBind[key] = etc[key]
                } else {
                    attrs[key] = etc[key]
                }
            }
        }
        return {
            geom, stat, data, aes, attrs, scales, args, extendX, extendY, vBind
        }
    })
})

const levels = computed(() => (({ x, y, ...etc }) => etc)($levels ?? {}))
const coordLevels = computed(() => {
    let levels = {}
    for (let ori of ['x', 'y']) {
        levels[ori] = primaryAxisConfig.levels[ori] ?? $levels?.[ori]
    }
    return levels
})

const coordRange = computed(() => {
    let result = {}
    for (let ori of ['x', 'y']) {
        let min = primaryAxisConfig.min[ori] ?? $range?.[ori + "min"]
        let max = primaryAxisConfig.max[ori] ?? $range?.[ori + "max"]
        result[ori + "min"] = isFinite(min) && !Number.isNaN(min) ? min : null
        result[ori + "max"] = isFinite(max) && !Number.isNaN(max) ? max : null
    }
    return result
})

const coordRangePreview = computed(() => {
    let result = {}
    for (let ori of ['x', 'y']) {
        let min = primaryAxisConfig['min-preview'][ori] ?? $rangePreview?.[ori + "min"]
        let max = primaryAxisConfig['max-preview'][ori] ?? $rangePreview?.[ori + "max"]
        result[ori + "min"] = isFinite(min) && !Number.isNaN(min) ? min : null
        result[ori + "max"] = isFinite(max) && !Number.isNaN(max) ? max : null
    }
    return result
})
const rangeUpdate = reactiveComputed(() => {
    return {
        xmin: primaryAxis?.x?.["onUpdate:min"],
        xmax: primaryAxis?.x?.["onUpdate:max"],
        ymin: primaryAxis?.y?.["onUpdate:min"],
        ymax: primaryAxis?.y?.["onUpdate:max"],
    }
})
const rangePreviewUpdate = reactiveComputed(() => {
    return {
        xmin: primaryAxis?.x?.["onUpdate:minPreview"],
        xmax: primaryAxis?.x?.["onUpdate:maxPreview"],
        ymin: primaryAxis?.y?.["onUpdate:minPreview"],
        ymax: primaryAxis?.y?.["onUpdate:maxPreview"],
    }
})

const range = reactive({}), rangePreview = reactive({})
watch(coordRange, (newRange, oldRange) => {
    if (newRange?.xmin !== oldRange?.xmin)
        range.xmin = newRange.xmin
    if (newRange?.xmax !== oldRange?.xmax)
        range.xmax = newRange.xmax
    if (newRange?.ymin !== oldRange?.ymin)
        range.ymin = newRange.ymin
    if (newRange?.ymax !== oldRange?.ymax)
        range.ymax = newRange.ymax
}, { immediate: true })
watch(coordRangePreview, (newRange, oldRange) => {
    if (newRange?.xmin !== oldRange?.xmin)
        rangePreview.xmin = newRange.xmin
    if (newRange?.xmax !== oldRange?.xmax)
        rangePreview.xmax = newRange.xmax
    if (newRange?.ymin !== oldRange?.ymin)
        rangePreview.ymin = newRange.ymin
    if (newRange?.ymax !== oldRange?.ymax)
        rangePreview.ymax = newRange.ymax
}, { immediate: true })

watch(() => ({ ...range }), (newRange, oldRange) => {
    for (let key in rangeUpdate) {
        rangeUpdate[key]?.(newRange[key])
    }
    emit('rangechange', { ...newRange }, { ...oldRange })
    emit('update:range', { ...newRange })
}, { deep: true })
watch(() => rangePreview, (newRange) => {
    for (let key in rangePreviewUpdate) {
        rangePreviewUpdate[key]?.(newRange[key])
    }
    emit('update:rangePreview', { ...newRange })
}, { deep: true })
provide('range', range)
provide('rangePreview', rangePreview)

const minRange = computed(() => ({
    x: primaryAxisConfig["min-range"].x ?? $minRange?.x ?? 0,
    y: primaryAxisConfig["min-range"].y ?? $minRange?.y ?? 0,
}))
const expandAdd = computed(() => {
    let x = primaryAxisConfig['expand-add'].x ?? $expandAdd?.x ?? 0,
        y = primaryAxisConfig['expand-add'].y ?? $expandAdd?.y ?? 0
    if (Array.isArray(x)) x = { min: x[0], max: x[1] }
    else if (typeof x == 'number') x = { min: x, max: x }
    if (Array.isArray(y)) y = { min: y[0], max: y[1] }
    else if (typeof y == 'number') y = { min: y, max: y }
    return { x, y }
})
const expandMult = computed(() => {
    let x = primaryAxisConfig['expand-mult'].x ?? $expandMult?.x ?? 0.05,
        y = primaryAxisConfig['expand-mult'].y ?? $expandMult?.y ?? 0.05
    if (Array.isArray(x)) x = { min: x[0], max: x[1] }
    else if (typeof x == 'number') x = { min: x, max: x }
    if (Array.isArray(y)) y = { min: y[0], max: y[1] }
    else if (typeof y == 'number') y = { min: y, max: y }
    return { x, y }
})
const reverse = reactiveComputed(() => ({
    x: _isPropTruthy(primaryAxisConfig.reverse.x) ?? $reverse?.x ?? false,
    y: _isPropTruthy(primaryAxisConfig.reverse.y) ?? $reverse?.y ?? false,
}))

const buttonsMap = { left: 1, right: 2, middle: 4, X1: 8, X2: 16 }
const axes = computed(() => {
    let ori = flip ? { x: 'v', y: 'h' } : { x: 'h', y: 'v' }
    let allAxes = vaxis.value.map(c => ({ ...c.type.$_props, ...c.props, $_children: c.children })).concat($axes ?? [])
    if (allAxes.every(ax => ax?.coord != 'x')) allAxes.push({ coord: 'x' })
    if (allAxes.every(ax => ax?.coord != 'y')) allAxes.push({ coord: 'y' })
    return allAxes.map(({
        coord, position, title, breaks, labels, titles,
        'minor-breaks': minorBreaks, 'show-grid': showGrid,
        theme: $$theme = [], extend, boundary, action: $$action,
        // preserved properties
        primary, secondary, 'expand-mult': em, 'expand-add': ea,
        levels, limits, min, max, 'onUpdate:min': oum, 'onUpdate:max': ouM,
        $_children, ...etc
    }) => {
        let orientation = ori[coord]
        position = position ?? "start"
        if (position == "start") {
            position = { h: "bottom", v: "left" }[orientation]
            if (reverse[opponents[coord]]) position = opponents[position]
        } else if (position == "end") {
            position = { h: "top", v: "right" }[orientation]
            if (reverse[opponents[coord]]) position = opponents[position]
        }
        let action = Object.values($_children ?? {})
            .filter(s => typeof s == "function")
            .flatMap(s => expandFragment(s()))
            .map(c => ({ ...c.type.$_props, ...c.props }))
            .concat($$action ?? [])
            .flatMap(props => {
                let res = []
                for (let a of ["move", "nudge", "zoom", "rescale"]) {
                    let act = props[a]
                    if (act == null || act === false) continue
                    let eventName = 'on' + a.charAt(0).toUpperCase() + a.slice(1)
                    res.push({
                        action: a,
                        [orientation + "min"]: act.min ?? props.min ?? boundary?.min ?? boundary?.[0] ?? actionBoundary?.[coord]?.min,
                        [orientation + "max"]: act.max ?? props.max ?? boundary?.max ?? boundary?.[1] ?? actionBoundary?.[coord]?.max,
                        ["min-range-" + orientation]: act["min-range"] ?? props["min-range"],
                        ctrlKey: Boolean(act.ctrl ?? _isPropTruthy(props.ctrl)),
                        shiftKey: Boolean(act.shift ?? _isPropTruthy(props.shift)),
                        altKey: Boolean(act.alt ?? _isPropTruthy(props.alt)),
                        metaKey: Boolean(act.meta ?? _isPropTruthy(props.meta)),
                        buttons: act.buttons ?? buttonsMap[act.button] ?? props.buttons ?? buttonsMap[props.button] ?? 1,
                        emit: props[eventName]
                    })
                }
                return res
            })
        return {
            coord, orientation, position, title, breaks, labels, titles, minorBreaks,
            showGrid: _isPropTruthy(showGrid) ?? position !== "none",
            extend: extend ?? primaryAxisConfig.extend[coord],
            theme: Object.assign({}, ...[theme.value?.axis?.[position] ?? theme.value?.axis?.[orientation]].concat($$theme)),
            action, ...etc,
        }
    }).filter(ax => ax != null)
})
const paddings = reactive({})
watch(axes, ax => {
    for (let p of ["left", "right", "top", "bottom"]) {
        paddings[p] = ax.some(a => a.position == p)
    }
}, { immediate: true })
const action = computed(() => {
    return vaction.value.map(c => ({ ...c.type.$_props, ...c.props })).concat($action ?? [])
        .flatMap(props => {
            let res = []
            for (let a of ["select", "move", "nudge", "zoom"]) {
                let act = props[a]
                if (act == null || act === false) continue
                let xy = act.x == null && act.y == null && props.x == null && props.y == null
                let eventName = 'on' + a.charAt(0).toUpperCase() + a.slice(1)
                res.push({
                    action: a,
                    x: xy || Boolean(act.x ?? _isPropTruthy(props.x)),
                    y: xy || Boolean(act.y ?? _isPropTruthy(props.y)),
                    xmin: act.xmin ?? props.xmin ?? actionBoundary?.x?.min,
                    xmax: act.xmax ?? props.xmax ?? actionBoundary?.x?.max,
                    ymin: act.ymin ?? props.ymin ?? actionBoundary?.y?.min,
                    ymax: act.ymax ?? props.ymax ?? actionBoundary?.y?.max,
                    "min-range-x": act["min-range-x"] ?? props["min-range-x"],
                    "min-range-y": act["min-range-y"] ?? props["min-range-y"],
                    ctrlKey: Boolean(act.ctrl ?? _isPropTruthy(props.ctrl)),
                    shiftKey: Boolean(act.shift ?? _isPropTruthy(props.shift)),
                    altKey: Boolean(act.alt ?? _isPropTruthy(props.alt)),
                    metaKey: Boolean(act.meta ?? _isPropTruthy(props.meta)),
                    buttons: act.buttons ?? buttonsMap[act.button] ?? props.buttons ?? buttonsMap[props.button] ?? 1,
                    emit: props[eventName]
                })
            }
            return res
        })
})
const selections = computed(() => {
    return vselection.value.map(c => ({ ...c.type.$_props, ...c.props }))
        .map(({
            once, move, dismissible, resize, x, y,
            xmin, xmax, ymin, ymax,
            ctrl, shift, alt, meta,
            button, buttons, modelValue, "onUpdate:modelValue": onUpdate,
            theme: $$theme = [], ...etc
        }) => {
            let xy = x == null && y == null
            if (_isPropTruthy(once)) {
                modelValue = reactive({})
                onUpdate = null
            } else if (onUpdate == null) {
                modelValue = reactive(modelValue ?? {})
                onUpdate = $event => {
                    for (let key in modelValue) delete modelValue[key]
                    Object.assign(modelValue, $event)
                }
            }
            return {
                move: Boolean(_isPropTruthy(move)),
                dismissible: dismissible == undefined ? undefined : dismissible !== false,
                resize: Boolean(_isPropTruthy(resize)),
                x: xy || Boolean(_isPropTruthy(x)),
                y: xy || Boolean(_isPropTruthy(y)),
                xmin: xmin ?? actionBoundary?.x?.min,
                xmax: xmax ?? actionBoundary?.x?.max,
                ymin: ymin ?? actionBoundary?.y?.min,
                ymax: ymax ?? actionBoundary?.y?.max,
                ctrlKey: Boolean(_isPropTruthy(ctrl)),
                shiftKey: Boolean(_isPropTruthy(shift)),
                altKey: Boolean(_isPropTruthy(alt)),
                metaKey: Boolean(_isPropTruthy(meta)),
                buttons: buttons ?? buttonsMap[button] ?? 1,
                modelValue, "onUpdate:modelValue": onUpdate,
                theme: Object.assign({}, ...[theme.value?.selection].concat($$theme)),
                onSelect: (d, e) => emit('select', d, e),
                ...etc
            }
        })
})
// size control
const wrapperRef = useTemplateRef('wrapper')
const plotRef = useTemplateRef('plot')
const width = defineModel('width')
const height = defineModel('height')
onMounted(() => {
    watch(width, (v) => {
        wrapperRef.value.style.width = str_c(v, 'px') ?? null
    }, { immediate: true })
    watch(height, (v) => {
        wrapperRef.value.style.height = str_c(v, 'px') ?? null
    }, { immediate: true })
})
const { width: w, height: h } = useElementSize(plotRef)
watch([w, h], ([w, h], [ow, oh]) => {
    if (wrapperRef.value.style.width) width.value = w
    if (wrapperRef.value.style.height) height.value = h
    if ((w > 0 || h > 0) && (ow > 0 || oh > 0))
        emit('resize', { width: w, height: h }, { width: ow, height: oh })
})
const panelStyle = computed(() => {
    return {
        position: 'absolute',
        left: str_c(plotRef.value?.panel?.left, 'px'),
        top: str_c(plotRef.value?.panel?.top, 'px'),
        width: str_c(plotRef.value?.panel?.width, 'px'),
        height: str_c(plotRef.value?.panel?.height, 'px'),
    }
})

const wrapperStyle = computed(() => {
    let style = { overflow: 'hidden', boxSizing: 'border-box' }
    if (resize === "both" || resize === true || resize === "") {
        Object.assign(style, { resize: "both" })
    } else if (resize === "horizontal" || resize === "x" && !flip || resize === "y" && flip) {
        Object.assign(style, { resize: "horizontal" })
    } else if (resize === "vertical" || resize === "y" && !flip || resize === "x" && flip) {
        Object.assign(style, { resize: "vertical" })
    }
    return style
})

defineExpose({
    get svg() { return plotRef.value.svg },
    serialize() { return serializeSVG(plotRef.value.svg) },
})
</script>
<template>
    <div ref="wrapper" class="vvplot" :style="wrapperStyle" v-bind="vBind.wrapper">
        <CorePlot ref="plot" :paddings="paddings" :schema="schema" :layers="layers" :min-range="minRange"
            :expand-add="expandAdd" :expand-mult="expandMult" :reverse="reverse" :flip="flip"
            :coord-levels="coordLevels" :levels="levels" :scales="$scales" :axes="axes" :theme="theme"
            :selections="selections" v-model:transition="transition" v-bind="vBind.plot"
            v-model:selection-preview="selectionPreview" v-model:selection-preview-theme="selectionPreviewTheme"
            :action="action" :clip="clip" :legendTeleport="legendTeleport" @select="(d, e) => emit('select', d, e)" />
        <div class="vvplot-panel-container" :style="panelStyle">
            <div class="vvplot-panel" v-if="vnodes.dom.panel?.length">
                <component v-for="c in vnodes.dom.panel" :is="c" />
            </div>
        </div>
        <component v-for="c in vdom" :is="c" />
    </div>
</template>
