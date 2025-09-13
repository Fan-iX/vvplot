<script setup>
import { computed, watch, Fragment, useAttrs, useSlots, useTemplateRef, onMounted } from 'vue'
import { reactiveComputed, useElementSize } from '@vueuse/core'
import { baseParse } from '@vue/compiler-core'
import { theme_base, theme_default, themeBuild, themeMerge } from '../js/theme'
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

const emit = defineEmits(['resize'])
const $props = defineProps({
    width: Number, height: Number,
    data: Array, scales: Object, aes: Object,
    axes: Object, expandAdd: Object, expandMult: Object, levels: Object, range: Object,
    theme: { type: Object, default: () => theme_default },
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
    let xAxes = allAxes.filter(c => c.type === 'x')
    let yAxes = allAxes.filter(c => c.type === 'y')
    return {
        x: xAxes.find(c => c.primary || c.primary == '') ?? xAxes.find(c => !('secondary' in c)),
        y: yAxes.find(c => c.primary || c.primary == '') ?? yAxes.find(c => !('secondary' in c))
    }
})

const selection = defineModel('selection')

const activeSelection = defineModel('activeSelection')
const translateX = defineModel('translateX')
const translateY = defineModel('translateY')
const transcaleX = defineModel('transcaleX')
const transcaleY = defineModel('transcaleY')

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
        let { geom, stat, scales, data, 'extend-x': extendX, 'extend-y': extendY, ...ect } = { ...layer.type.$_props, ...layer.props }
        let argnames = layer.type.$_argnames || []
        let aes = {}, args = {}, attrs = {}
        let vBind = {}
        for (let key in ect) {
            if (key == "key") continue
            if (argnames.includes(key)) {
                args[key] = ect[key]
            } else if (typeof ect[key] === 'function') {
                if (key.startsWith('on')) {
                    if (vBind[key] == null) {
                        vBind[key] = ect[key]
                    } else if (Array.isArray(vBind[key])) {
                        vBind[key].push(args[key])
                    } else {
                        vBind[key] = [vBind[key], args[key]]
                    }
                } else {
                    aes[key] = ect[key]
                }
            } else {
                if (["class", 'style', 'render'].includes(key)) {
                    vBind[key] = ect[key]
                } else {
                    attrs[key] = ect[key]
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
    }
})
const buttonsMap = { left: 1, right: 2, middle: 4, X1: 8, X2: 16 }
const axes = computed(() => {
    let allAxes = vnodes.axis.map(c => {
        let ax = { ...c.type.$_props, ...c.props }
        let axis = (({ type, title, position, offset, breaks, labels, 'minor-breaks': minorBreaks, theme }) => ({ type, title, position, offset, breaks, labels, minorBreaks, theme }))(ax)
        if (axis.position == null) {
            axis.position = { x: "bottom", y: "left" }[axis.type]
        }
        axis.showGrid = ax['show-grid'] !== false
        axis.extend = ax.extend ?? primaryAxis?.[axis.type]?.extend
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
                            [ax.type + "min"]: props[act].min ?? props.min,
                            [ax.type + "max"]: props[act].max ?? props.max,
                            ["min-range-" + ax.type]: props[act]["min-range"] ?? props["min-range"],
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
    })
    if (allAxes.every(ax => ax?.type != 'x'))
        allAxes.push({ type: 'x', position: 'bottom', showGrid: true })
    if (allAxes.every(ax => ax?.type != 'y'))
        allAxes.push({ type: 'y', position: 'left', showGrid: true })
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
const theme = reactiveComputed(() => themeBuild(themeMerge(theme_base, theme_default, $props.theme)), { deep: true })
// size control
const wrapperRef = useTemplateRef('wrapper')
const plotRef = useTemplateRef('plot')
onMounted(() => {
    watch(() => $props.width, (v) => {
        wrapperRef.value.style.width = str_c(v, 'px')
    }, { immediate: true })
    watch(() => $props.height, (v) => {
        wrapperRef.value.style.height = str_c(v, 'px')
    }, { immediate: true })
})
const { width: w, height: h } = useElementSize(plotRef)
watch([w, h], ([width, height]) => { if (width > 0 && height > 0) emit('resize', { width, height }) })

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
            v-model:selection="selection" v-model:active-selection="activeSelection" v-model:transcale-x="transcaleX"
            v-model:transcale-y="transcaleY" v-model:translate-x="translateX" v-model:translate-y="translateY"
            v-bind="vBind.plot" :action="action" :legendTeleport="$props.legendTeleport" />
        <div class="absolute right-4 top-4 flex flex-row">
            <slot name="toolbar"></slot>
        </div>
        <slot name="tooltip"></slot>
    </div>
</template>
