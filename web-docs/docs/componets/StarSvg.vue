<script setup>
import { computed } from 'vue'
import { parseLinetype } from '#src/core/utils.js'
const {
    extendX, extendY, data, mapping, layout, groupClass, groupStyle
} = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, mapping: Object, layout: Object,
    groupClass: null, groupStyle: null,
})
let events = [
    'click', 'contextmenu', 'singleclick',
    'pointerover', 'pointerout', 'pointerenter', 'pointerleave',
    'pointermove', 'pointerdown', 'pointerup', 'wheel'
]
const emit = defineEmits([
    'click', 'contextmenu', 'singleclick',
    'pointerover', 'pointerout', 'pointerenter', 'pointerleave',
    'pointermove', 'pointerdown', 'pointerup', 'wheel'
])

const binds = computed(() => {
    let xlim_min = -layout.fullWidth * extendX - layout.l,
        xlim_max = layout.fullWidth * (1 + extendX) - layout.l,
        ylim_min = -layout.fullHeight * extendY - layout.t,
        ylim_max = layout.fullHeight * (1 + extendY) - layout.t
    return Object.values(Object.groupBy(data, d => d.$group)).map(group => group.map(({
        x, y, points = 5, size = 6, inner = 0.4,
        color, fill, linetype, linewidth, alpha, title,
        'translate-x': translateX = 0, 'translate-y': translateY = 0, angle,
        class: className, style, $raw
    }) => {
        const { h: cx, v: cy } = mapping.coord2pos({ x, y })
        if (cx < xlim_min || cx > xlim_max || cy < ylim_min || cy > ylim_max) return null
        const d = Array.from({ length: points * 2 }, (_, i) => {
            let r = size * (i % 2 ? inner : 1)
            let angle = -Math.PI / 2 + i * Math.PI / points
            return `${i ? 'L' : 'M'}${r * Math.cos(angle)},${r * Math.sin(angle)}`
        }).join('') + 'Z'
        let transform = [], tslX = cx + translateX, tslY = cy + translateY
        if (tslX !== 0 || tslY !== 0) transform.push(`translate(${tslX},${tslY})`)
        if (angle) transform.push(`rotate(${angle})`)
        let vbind = {
            d,
            transform: transform.join(' ') || null,
            fill,
            'fill-opacity': alpha == 1 ? null : alpha,
            stroke: color, 'stroke-width': linewidth,
            'stroke-opacity': alpha == 1 ? null : alpha,
            'stroke-dasharray': parseLinetype(linetype).join(' ') || null,
            class: className, style
        }
        let von = Object.fromEntries(events.map(
            evt => [evt, (e) => emit(evt, Object.assign(e, { _vhandled: true }), mapping.getCoord(e), $raw)]
        ))
        return [vbind, von, title]
    }).filter(x => x != null))
})
</script>
<template>
    <g class="vvplot-layer">
        <g class="vvplot-group" v-for="group in binds" v-bind="{ class: groupClass, style: groupStyle }">
            <path v-bind="vbind" v-on="von" v-for="[vbind, von, title] in group">
                <title v-if="title">{{ title }}</title>
            </path>
        </g>
    </g>
</template>
