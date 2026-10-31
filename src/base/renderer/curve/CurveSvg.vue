<script setup>
import { computed } from 'vue'
import { pointerEvents } from '#src/core/utils.js'
import ElementCurve from '#src/elements/ElementCurve.vue'
const { extendX, extendY, data, mapping, layout, groupClass, groupStyle } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, mapping: Object, layout: Object, options: Object,
    groupClass: null, groupStyle: null,
})
const emit = defineEmits(pointerEvents)

const binds = computed(() => {
    let xlim_min = -layout.fullWidth * extendX - layout.l,
        xlim_max = layout.fullWidth * (1 + extendX) - layout.l,
        ylim_min = -layout.fullHeight * extendY - layout.t,
        ylim_max = layout.fullHeight * (1 + extendY) - layout.t
    return Object.values(Object.groupBy(data, d => d.$group)).map(group => group.map(({
        points, interpolate, fill, color, linewidth, linetype, alpha, title,
        translateX = 0, translateY = 0,
        markerStart, markerEnd,
        class: className, style, $raw,
    }) => {
        points = points.map(p => (({ h: x, v: y }) => ({ x, y }))(mapping.coord2pos(p)))
        if (
            points.every(p => p.x < xlim_min) || points.every(p => p.x > xlim_max) ||
            points.every(p => p.y < ylim_min) || points.every(p => p.y > ylim_max)
        ) return null
        let vbind = {
            points, fill, color, linetype, linewidth, alpha, title,
            translateX, translateY,
            'marker-start': markerStart, 'marker-end': markerEnd,
            class: className, style, interpolate,
        }
        let von = Object.fromEntries(pointerEvents.map(
            evt => [evt, (e) => emit(evt, Object.assign(e, { _vhandled: true }), mapping.getCoord(e), $raw)]
        ))
        return [vbind, von]
    }).filter(x => x != null))
})
</script>
<template>
    <g class="vvplot-layer vvplot-layer-curve">
        <g class="vvplot-group" v-for="group in binds" v-bind="{ class: groupClass, style: groupStyle }">
            <ElementCurve v-bind="vbind" v-on="von" v-for="[vbind, von] in group" />
        </g>
    </g>
</template>
