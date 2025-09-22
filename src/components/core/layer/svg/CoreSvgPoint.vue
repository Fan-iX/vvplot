<script setup>
import { computed } from 'vue'
import CorePoint from '../../element/CorePoint.vue'
const { extendX, extendY, data, coord2pos, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, layout: Object
})
const emit = defineEmits(['click', 'contextmenu', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup'])

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
        let result = {
            x: cx, y: cy, shape, size, color, stroke, linetype, linewidth, alpha,
            angle, translateX, translateY,
            onClick: (e) => emit('click', e, $raw),
            onContextmenu: (e) => emit('contextmenu', e, $raw),
            onPointerover: (e) => emit('pointerover', e, $raw),
            onPointerout: (e) => emit('pointerout', e, $raw),
            onPointerenter: (e) => emit('pointerenter', e, $raw),
            onPointerleave: (e) => emit('pointerleave', e, $raw),
            onPointerdown: (e) => emit('pointerdown', e, $raw),
            onPointerup: (e) => emit('pointerup', e, $raw),
            onPointermove: (e) => emit('pointermove', e, $raw),
        }
        return result
    }).filter(x => x != null))
})
</script>
<template>
    <g>
        <g v-for="group in binds">
            <CorePoint v-bind="item" v-for="item in group" />
        </g>
    </g>
</template>
