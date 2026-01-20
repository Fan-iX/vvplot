<script setup>
import { computed } from 'vue'
import CorePolygon from '../../element/CorePolygon.vue'
const { extendX, extendY, data, coord2pos, getCoord, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, getCoord: Function, layout: Object
})
let events = ['click', 'contextmenu', 'singleclick', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'wheel']
const emit = defineEmits(['click', 'contextmenu', 'singleclick', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'wheel'])

const binds = computed(() => {
    let xlim_min = -layout.fullWidth * extendX - layout.l,
        xlim_max = layout.fullWidth * (1 + extendX) - layout.l,
        ylim_min = -layout.fullHeight * extendY - layout.t,
        ylim_max = layout.fullHeight * (1 + extendY) - layout.t
    return data.map(group => group.map(({
        points, fill, color, linewidth, linetype, alpha,
        'translate-x': translateX = 0, 'translate-y': translateY = 0, $raw
    }) => {
        points = points.map(p => (({ h: x, v: y }) => ({ x, y }))(coord2pos(p)))
        if (
            points.every(p => p.x < xlim_min) || points.every(p => p.x > xlim_max) ||
            points.every(p => p.y < ylim_min) || points.every(p => p.y > ylim_max)
        ) return null
        let vbind = {
            points, fill, color, linewidth, linetype, alpha,
            translateX, translateY,
        }
        let von = Object.fromEntries(
            events.map(evt => [evt, (e) => emit(evt, Object.assign(e, { _vhandled: true }), getCoord(e), $raw)])
        )
        return [vbind, von]
    }).filter(x => x != null))
})
</script>
<template>
    <g>
        <g v-for="group in binds">
            <CorePolygon v-bind="vbind" v-on="von" v-for="[vbind, von] in group" />
        </g>
    </g>
</template>
