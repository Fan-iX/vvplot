<script setup>
import { computed, watch, Fragment, useAttrs, useSlots, useTemplateRef, onMounted } from 'vue'
import { reactiveComputed, useElementSize } from '@vueuse/core'
import { baseParse } from '@vue/compiler-core'
import { theme_base, theme_default, themeBuild, themeMerge, themePreprocess } from '../js/theme'
import { str_c } from '../js/utils'
import CorePlot from './core/CorePlot.vue'
import VVAction from './Action.vue'
import * as geom_components from './geom'
import * as axis_components from './axis'
const components = {
    ...geom_components,
    ...axis_components,
    VVAction,
}

function _isFalse(v) {
    return v == null || v === false
}

const emit = defineEmits(['resize'])
const $props = defineProps({
    data: Array, scales: Object, aes: Object,
    axes: Object, expandAdd: Object, expandMult: Object, levels: Object, range: Object,
    theme: { type: Object, default: () => theme_default },
    flip: Boolean,
    resize: null,
    legendTeleport: null,
})
defineOptions({ inheritAttrs: false })

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
const vnodes = reactiveComputed(() => {
    let comps = Object.keys($slots).filter(s => s != "toolbar")
        .flatMap(s => expandFragment($slots[s]()))
        .flatMap(c => {
            if (c.type?.template) {
                let comp = baseParse(c.type.template, { decodeEntities: true })
                return comp.children.map(x => resolveComponent(x))
            } else {
                return c
            }
        }).filter(x => x != null)
    let res = Object.groupBy(comps.filter(c => c.type.$_type != undefined), c => c.type.$_type)
    res.axis = res.axis ?? []
    res.layer = res.layer ?? []
    res.action = res.action ?? []
    return res
})

const vBind = computed(() => {
    let plot = {}
    let wrapper = {}
    for (let key in $attrs) {
        if (typeof $attrs[key] === 'function' && key.startsWith('on')) {
            if (Array.isArray(plot[key])) {
                plot[key].push($attrs[key])
            } else {
                plot[key] = [$attrs[key]]
            }
        } else {
            wrapper[key] = $attrs[key]
        }
    }
    let vns = vnodes.axis.filter(c => c.children).flatMap(c => Object.keys(c.children)
        .filter(s => typeof c.children[s] == "function")
        .flatMap(s => expandFragment(c.children[s]()))
    ).concat(vnodes.axis).concat(vnodes.action)
    for (let vn of vns) {
        for (let key in vn.props) {
            if (typeof vn.props[key] === 'function' && key.startsWith('on')) {
                if (Array.isArray(plot[key])) {
                    plot[key].push(vn.props[key])
                } else {
                    plot[key] = [vn.props[key]]
                }
            }
        }
    }
    return { plot, wrapper }
})

const primaryAxis = reactiveComputed(() => {
    let allAxes = vnodes.axis.map(c => ({ ...c.type.$_props, ...c.props }))
    let xAxes = allAxes.filter(c => c.coord === 'x')
    let yAxes = allAxes.filter(c => c.coord === 'y')
    return {
        x: xAxes.find(c => !_isFalse(c.primary)) ?? xAxes.find(c => c.primary !== false && _isFalse(c.secondary)),
        y: yAxes.find(c => !_isFalse(c.primary)) ?? yAxes.find(c => c.primary !== false && _isFalse(c.secondary))
    }
})

const selection = defineModel('selection')

const activeSelection = defineModel('activeSelection')
const translateH = defineModel('translateH')
const translateV = defineModel('translateV')
const transcaleH = defineModel('transcaleH')
const transcaleV = defineModel('transcaleV')

/* schema:
    global data and data transformation of the plot.
    schema<data, aes, extendX, extendY>
*/
const schema = computed(() => {
    return {
        data: $props.data,
        aes: $props.aes,
        extendX: primaryAxis?.x?.extend ?? $props.extend?.x ?? 0,
        extendY: primaryAxis?.y?.extend ?? $props.extend?.y ?? 0
    }
})
/* layers
    data and data transformation of each layer.
    [ layer<geom, stat, data, aes, attrs, scales, vBind> ]
*/
const layers = computed(() => {
    return vnodes.layer.map(layer => {
        let { geom, stat, scales, data, 'extend-x': extendX, 'extend-y': extendY, ...etc } = { ...layer.type.$_props, ...layer.props }
        let argnames = layer.type.$_argnames || []
        let aes = {}, args = {}, attrs = {}
        let vBind = {}
        for (let key in etc) {
            if (key == "key") continue
            if (argnames.includes(key)) {
                args[key] = etc[key]
            } else if (typeof etc[key] === 'function') {
                if (key.startsWith('on')) {
                    if (vBind[key] == null) {
                        vBind[key] = etc[key]
                    } else if (Array.isArray(vBind[key])) {
                        vBind[key].push(args[key])
                    } else {
                        vBind[key] = [vBind[key], args[key]]
                    }
                } else {
                    aes[key] = etc[key]
                }
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

const levels = computed(() => (({ x, y, ...etc }) => ({ ...etc }))($props.levels ?? {}))
const coordLevels = computed(() => {
    let levels = {}
    for (let ori of ['x', 'y']) {
        if (primaryAxis[ori]) {
            let ax = primaryAxis[ori]
            levels[ori] = ax.levels ?? $props.levels?.[ori]
        }
    }
    return levels
})

const coordScale = computed(() => {
    let range = {}
    let expandAdd = { x: 0, y: 0 }
    let minRange = { x: 0, y: 0 }
    for (let ori of ['x', 'y']) {
        if (primaryAxis[ori]) {
            let ax = primaryAxis[ori]
            range[ori + "min"] = ax.min ?? ax.limits?.min ?? ax.limits?.[0]
            range[ori + "max"] = ax.max ?? ax.limits?.max ?? ax.limits?.[1]
            if (Number.isNaN(range[ori + "min"])) range[ori + "min"] = null
            if (Number.isNaN(range[ori + "max"])) range[ori + "max"] = null
            let level = coordLevels.value[ori]
            if (level != null) {
                range[ori + "min"] = (range[ori + "min"] ?? 0) - 0.5
                range[ori + "max"] = (range[ori + "max"] ?? level.length ?? Math.max(Object.values(level))) - 0.5
            }
            expandAdd[ori] = ax['expand-add'] ?? 0
            minRange[ori] = ax['min-range'] ?? 0
        }
    }
    return {
        range: { ...$props.range, ...range },
        minRange: { ...$props.minRange, ...minRange },
        expandAdd: { ...$props.expandAdd, ...expandAdd }
    }
})

const coordDisplay = computed(() => {
    let expandMult = { x: 0.05, y: 0.05 }
    let reverse = { x: false, y: false }
    for (let ori of ['x', 'y']) {
        if (primaryAxis[ori]) {
            let ax = primaryAxis[ori]
            reverse[ori] = ax.reverse === "" || ax.reverse == true
            expandMult[ori] = ax['expand-mult'] ?? 0.05
        }
    }
    return {
        reverse: { ...$props.reverse, ...reverse },
        expandMult: { ...$props.expandMult, ...expandMult },
        flip: $props.flip
    }
})
const buttonsMap = { left: 1, right: 2, middle: 4, X1: 8, X2: 16 }
const axes = computed(() => {
    let orientation = $props.flip ? { x: 'v', y: 'h' } : { x: 'h', y: 'v' }
    let defaultPos = $props.flip ? { x: 'left', y: 'bottom' } : { x: 'bottom', y: 'left' }
    let allAxes = vnodes.axis.map(c => {
        let ax = { ...c.type.$_props, ...c.props }
        let axis = (({ coord, title, position, offset, breaks, labels, 'minor-breaks': minorBreaks, theme }) => ({ coord, title, position, offset, breaks, labels, minorBreaks, theme }))(ax)
        if (axis.position == null) {
            axis.position = defaultPos[axis.coord]
        }
        axis.orientation = orientation[axis.coord]
        axis.showGrid = ax['show-grid'] !== false
        axis.extend = ax.extend ?? primaryAxis?.[axis.coord]?.extend
        if (c.children) {
            axis.action = Object.keys(c.children)
                .filter(s => typeof c.children[s] == "function")
                .flatMap(s => expandFragment(c.children[s]()))
                .map(c => ({ ...c.type.$_props, ...c.props }))
                .flatMap(props => {
                    let res = []
                    for (let act of ["move", "nudge", "zoom", "rescale"]) {
                        if (!props[act] && props[act] != "") continue
                        res.push({
                            action: act,
                            [axis.orientation + "min"]: props[act].min ?? props.min,
                            [axis.orientation + "max"]: props[act].max ?? props.max,
                            ["min-range-" + axis.orientation]: props[act]["min-range"] ?? props["min-range"],
                            ctrlKey: Boolean(props[act].ctrl ?? (props.ctrl || props.ctrl === "")),
                            shiftKey: Boolean(props[act].shift ?? (props.shift || props.shift === "")),
                            altKey: Boolean(props[act].alt ?? (props.alt || props.alt === "")),
                            metaKey: Boolean(props[act].meta ?? (props.meta || props.meta === "")),
                            buttons: props[act].buttons ?? buttonsMap[props[act].button] ?? props.buttons ?? buttonsMap[props.button] ?? 1
                        })
                    }
                    return res
                })
        }
        return axis
    }).filter(ax => ax != null)
    if (allAxes.every(ax => ax?.coord != 'x'))
        allAxes.push({ coord: 'x', position: defaultPos.x, orientation: orientation.x, showGrid: true })
    if (allAxes.every(ax => ax?.coord != 'y'))
        allAxes.push({ coord: 'y', position: defaultPos.y, orientation: orientation.y, showGrid: true })
    return allAxes.filter(ax => ax != null)
})
const action = computed(() => {
    return vnodes.action.map(c => ({ ...c.type.$_props, ...c.props }))
        .flatMap(props => {
            let res = []
            for (let a of ["select", "move", "nudge", "zoom"]) {
                let act = props[a]
                if (act == null || act === false) continue
                let xy = act.x == null && act.y == null && props.x == null && props.y == null
                res.push({
                    action: a,
                    once: act.once ?? props.once,
                    dismissible: (act.dismissible ?? props.dismissible) !== false,
                    x: xy || Boolean(act.x ?? (props.x || props.x === "")),
                    y: xy || Boolean(act.y ?? (props.y || props.y === "")),
                    xmin: act.xmin ?? props.xmin,
                    xmax: act.xmax ?? props.xmax,
                    ymin: act.ymin ?? props.ymin,
                    ymax: act.ymax ?? props.ymax,
                    "min-range-x": act["min-range-x"] ?? props["min-range-x"],
                    "min-range-y": act["min-range-y"] ?? props["min-range-y"],
                    ctrlKey: Boolean(act.ctrl ?? (props.ctrl || props.ctrl === "")),
                    shiftKey: Boolean(act.shift ?? (props.shift || props.shift === "")),
                    altKey: Boolean(act.alt ?? (props.alt || props.alt === "")),
                    metaKey: Boolean(act.meta ?? (props.meta || props.meta === "")),
                    buttons: act.buttons ?? buttonsMap[act.button] ?? props.buttons ?? buttonsMap[props.button] ?? 1
                })
            }
            return res
        })
})
const theme = reactiveComputed(() => themeBuild(themePreprocess(themeMerge(theme_base, theme_default, $props.theme), $props.flip)), { deep: true })
// size control
const wrapperRef = useTemplateRef('wrapper')
const plotRef = useTemplateRef('plot')
const width = defineModel('width')
const height = defineModel('height')
onMounted(() => {
    watch(width, (v) => {
        wrapperRef.value.style.width = str_c(v, 'px')
    }, { immediate: true })
    watch(height, (v) => {
        wrapperRef.value.style.height = str_c(v, 'px')
    }, { immediate: true })
})
const { width: w, height: h } = useElementSize(plotRef)
watch([w, h], ([w, h]) => {
    if (w < 0 || h < 0) return
    width.value = w
    height.value = h
    emit('resize', { width: w, height: h })
})

const wrapperClass = computed(() => {
    if ($props.resize == "x") {
        return ["resize-x", "overflow-auto"]
    }
    if ($props.resize == "y") {
        return ["resize-y", "overflow-auto"]
    }
    if ($props.resize == true || $props.resize == "both" || $props.resize == "") {
        return ["resize", "overflow-auto"]
    }
    return []
})
</script>
<template>
    <div ref="wrapper" class="vvplot relative overflow-hidden" :class="wrapperClass" v-bind="vBind.wrapper">
        <CorePlot ref="plot" :schema="schema" :layers="layers" :coord-scale="coordScale" :coord-display="coordDisplay"
            :coord-levels="coordLevels" :levels="levels" :scales="$props.scales" :axes="axes" :theme="theme"
            v-model:selection="selection" v-model:active-selection="activeSelection" v-model:transcale-h="transcaleH"
            v-model:transcale-v="transcaleV" v-model:translate-h="translateH" v-model:translate-v="translateV"
            v-bind="vBind.plot" :action="action" :legendTeleport="$props.legendTeleport" />
        <div class="absolute right-4 top-4 flex flex-row">
            <slot name="toolbar"></slot>
        </div>
        <slot name="tooltip"></slot>
    </div>
</template>
