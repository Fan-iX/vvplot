<script setup>
import { computed } from 'vue'
import CorePoint from '../../element/CorePoint.vue'
const { extendX, extendY, data, coord2pos, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, layout: Object
})
let events = ['click', 'contextmenu', 'singleclick', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'wheel']
const emit = defineEmits(['click', 'contextmenu', 'singleclick', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'wheel'])

const binds = computed(() => {
    let xlim_min = -layout.fullWidth * extendX - layout.l,
        xlim_max = layout.fullWidth * (1 + extendX) - layout.l,
        ylim_min = -layout.fullHeight * extendY - layout.t,
        ylim_max = layout.fullHeight * (1 + extendY) - layout.t
    return data.map(group => group.map(({
        x, y, shape, size = 6,
        color, stroke, linetype, linewidth, alpha,
        'translate-x': translateX = 0, 'translate-y': translateY = 0, angle, $raw
    }) => {
        const { h: cx, v: cy } = coord2pos({ x, y })
        if (cx < xlim_min || cx > xlim_max || cy < ylim_min || cy > ylim_max) return null
        let vbind = {
            x: cx, y: cy, shape, size, color, stroke, linetype, linewidth, alpha,
            angle, translateX, translateY,
        }
        let von = Object.fromEntries(
            events.map(evt => [evt, (e) => emit(evt, Object.assign(e, { _vhandled: true }), $raw)])
        )
        return [vbind, von]
    }).filter(x => x != null))
})
</script>
<template>
    <g>
        <g v-for="group in binds">
            <CorePoint v-bind="vbind" v-on="von" v-for="[vbind, von] in group" />
        </g>
    </g>
</template>
