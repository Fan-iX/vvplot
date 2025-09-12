<script setup>
import { computed } from 'vue';
const { extendX, extendY, data, coord2pos, layout } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, layout: Object
})
const emit = defineEmits(['click', 'contextmenu', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup'])

const paths = {
    triangle: s => `M0-${s * 2 / 3}L${s * 0.577},${s / 3}L-${s * 0.577},${s / 3}Z`,
    diamond: s => `M0-${s * 0.707}L${s * 0.707},0L0,${s * 0.707}L-${s * 0.707},0Z`,
    square: s => `M-${s / 2}-${s / 2}H${s / 2}V${s / 2}H-${s / 2}Z`,
    plus: s => `M-${s / 10}-${s / 2}V-${s / 10}H-${s / 2}V${s / 10}H-${s / 10}V${s / 2}H${s / 10}V${s / 10}H${s / 2}V-${s / 10}H${s / 10}V-${s / 2}H-${s / 10}Z`,
}
const binds = computed(() => {
    let xlim_min = -layout.fullWidth * extendX - layout.l,
        xlim_max = layout.fullWidth * (1 + extendX) - layout.l,
        ylim_min = -layout.fullHeight * extendY - layout.t,
        ylim_max = layout.fullHeight * (1 + extendY) - layout.t
    return data.map(group => group.map(({
        x, y, size = 6,
        shape, color, stroke, linewidth, alpha,
        'translate-x': translateX = 0, 'translate-y': translateY = 0, $raw
    }) => {
        let { x: cx, y: cy } = coord2pos({ x, y })
        if (cx < xlim_min || cx > xlim_max || cy < ylim_min || cy > ylim_max) return null
        let result = {
            fill: color,
            stroke: stroke,
            'stroke-width': linewidth,
            'fill-opacity': alpha,
            'stroke-opacity': alpha,
            transform: (translateX || translateY) ? `translate(${translateX}, ${translateY})` : null,
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
        if (String(shape).startsWith("path:")) {
            result.transform = `translate(${cx},${cy}) scale(${size})`
            result.d = shape.slice(5)
        } else if (shape in paths) {
            result.transform = `translate(${cx},${cy})`
            result.d = paths[shape](size)
        } else {
            result.cx = cx
            result.cy = cy
            result.r = size / 2
        }
        return result
    }).filter(x => x != null))
})
</script>
<template>
    <g>
        <g v-for="group in binds">
            <template v-for="item in group">
                <path v-if="item.d" v-bind="item" />
                <circle v-else v-bind="item" />
            </template>
        </g>
    </g>
</template>
