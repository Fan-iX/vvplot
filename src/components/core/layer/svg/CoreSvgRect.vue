<script setup>
import { computed } from 'vue'
import CoreTile from '../../element/CoreTile.vue'
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
        xmin, xmax, ymin, ymax,
        fill = 'black', color, linewidth, linetype, alpha,
        'translate-x': translateX = 0, 'translate-y': translateY = 0, $raw
    }) => {
        const { hmin: x1, hmax: x2, vmin: y1, vmax: y2 } = coord2pos({ xmin, xmax, ymin, ymax })
        if (
            x1 < xlim_min && x2 < xlim_min || x1 > xlim_max && x2 > xlim_max ||
            y1 < ylim_min && y2 < ylim_min || y1 > ylim_max && y2 > ylim_max
        ) return null
        let result = {
            x: (x1 + x2) / 2, width: x2 - x1,
            y: (y1 + y2) / 2, height: y2 - y1,
            fill, color, linetype, linewidth, alpha,
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
            <CoreTile v-bind="item" v-for="item in group" />
        </g>
    </g>
</template>
