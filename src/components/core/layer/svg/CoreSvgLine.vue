<script setup>
import { computed } from 'vue'
import CoreLine from '../../element/CoreLine.vue'
const { extendX, extendY, data, coord2pos, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, layout: Object
})
const emit = defineEmits(['click', 'contextmenu', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'wheel'])

const binds = computed(() => {
    let xlim_min = -layout.fullWidth * extendX - layout.l,
        xlim_max = layout.fullWidth * (1 + extendX) - layout.l,
        ylim_min = -layout.fullHeight * extendY - layout.t,
        ylim_max = layout.fullHeight * (1 + extendY) - layout.t
    return data.map(group => group.map(({
        x, y, xend, yend,
        color = 'black', linewidth, linetype, alpha,
        'translate-x': translateX = 0, 'translate-y': translateY = 0, $raw
    }) => {
        const { h: x1, v: y1 } = coord2pos({ x: x, y: y })
        const { h: x2, v: y2 } = coord2pos({ x: xend, y: yend })
        if (
            x1 < xlim_min && x2 < xlim_min || x1 > xlim_max && x2 > xlim_max ||
            y1 < ylim_min && y2 < ylim_min || y1 > ylim_max && y2 > ylim_max
        ) return null
        let result = {
            x1, x2, y1, y2, color, linetype, linewidth, alpha,
            translateX, translateY,
            onClick: (e) => emit('click', e, $raw),
            onContextmenu: (e) => emit('contextmenu', e, $raw),
            onPointerover: (e) => emit('pointerover', e, $raw),
            onPointerout: (e) => emit('pointerout', e, $raw),
            onPointerenter: (e) => emit('pointerenter', e, $raw),
            onPointerleave: (e) => emit('pointerleave', e, $raw),
            onPointerdown: (e) => emit('pointerdown', e, $raw),
            onPointerup: (e) => emit('pointerup', e, $raw),
            onPointermove: (e) => emit('pointermove', e, $raw),
            onWheel: (e) => emit('wheel', e, $raw),
        }
        return result
    }).filter(x => x != null))
})
</script>
<template>
    <g>
        <g v-for="group in binds">
            <CoreLine v-bind="item" v-for="item in group" />
        </g>
    </g>
</template>
