<script setup>
import { computed } from 'vue'
import CoreTile from '../../element/CoreTile.vue'
import CorePoint from '../../element/CorePoint.vue';
import CoreLine from '../../element/CoreLine.vue';
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
        x, xmin, xmax, y, ymin, ymax,
        lwisker, Q1, median, Q3, uwisker, outliers,
        $xmin, $xmax, $ymin, $ymax,
        fill = 'white', color = "black", linewidth, linetype, alpha,
        'translate-x': translateX = 0, 'translate-y': translateY = 0, $raw
    }) => {
        const { hmin: x1, hmax: x2, vmin: y1, vmax: y2 } = coord2pos({ xmin: $xmin, xmax: $xmax, ymin: $ymin, ymax: $ymax })
        if (
            x1 < xlim_min && x2 < xlim_min || x1 > xlim_max && x2 > xlim_max ||
            y1 < ylim_min && y2 < ylim_min || y1 > ylim_max && y2 > ylim_max
        ) return null
        const { hmin: rx1, hmax: rx2, vmin: ry1, vmax: ry2 } = coord2pos(x == null ? { ymin, ymax, xmin: Q1, xmax: Q3 } : { xmin, xmax, ymin: Q1, ymax: Q3 })
        const { h: lx1, v: ly1 } = coord2pos(x == null ? { y, x: lwisker } : { x, y: lwisker })
        const { h: lx2, v: ly2 } = coord2pos(x == null ? { y, x: uwisker } : { x, y: uwisker })
        const { h: mx1, v: my1 } = coord2pos(x == null ? { y: ymin, x: median } : { x: xmin, y: median })
        const { h: mx2, v: my2 } = coord2pos(x == null ? { y: ymax, x: median } : { x: xmax, y: median })
        const { h: uwx1, v: uwy1 } = coord2pos(x == null ? { y: ymin * 0.25 + ymax * 0.75, x: uwisker } : { x: xmin * 0.25 + xmax * 0.75, y: uwisker })
        const { h: uwx2, v: uwy2 } = coord2pos(x == null ? { y: ymin * 0.75 + ymax * 0.25, x: uwisker } : { x: xmin * 0.75 + xmax * 0.25, y: uwisker })
        const { h: lwx1, v: lwy1 } = coord2pos(x == null ? { y: ymin * 0.25 + ymax * 0.75, x: lwisker } : { x: xmin * 0.25 + xmax * 0.75, y: lwisker })
        const { h: lwx2, v: lwy2 } = coord2pos(x == null ? { y: ymin * 0.75 + ymax * 0.25, x: lwisker } : { x: xmin * 0.75 + xmax * 0.25, y: lwisker })
        let result = {
            rect: {
                x: (rx1 + rx2) / 2, width: rx2 - rx1,
                y: (ry1 + ry2) / 2, height: ry2 - ry1,
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
            },
            line: {
                x1: lx1, y1: ly1, x2: lx2, y2: ly2,
                color, linetype, linewidth, alpha,
                translateX, translateY,
            },
            midline: {
                x1: mx1, y1: my1, x2: mx2, y2: my2,
                color, linetype, linewidth: (linewidth ?? 1) * 2, alpha,
                translateX, translateY,
            },
            uwisker: {
                x1: uwx1, y1: uwy1, x2: uwx2, y2: uwy2,
                color, linetype, linewidth, alpha,
                translateX, translateY,
            },
            lwisker: {
                x1: lwx1, y1: lwy1, x2: lwx2, y2: lwy2,
                color, linetype, linewidth, alpha,
                translateX, translateY,
            },
            outliers: outliers?.map(({ x, y, $raw }) => {
                const { h: cx, v: cy } = coord2pos({ x, y })
                return {
                    x: cx, y: cy, shape: 'circle', size: 4, color, alpha,
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
            }),
        }
        return result
    }).filter(x => x != null))
})
</script>
<template>
    <g>
        <g v-for="group in binds">
            <g v-for="item in group">
                <CoreLine v-bind="item.line" />
                <CoreTile v-bind="item.rect" />
                <CoreLine v-bind="item.midline" />
                <CoreLine v-bind="item.uwisker" />
                <CoreLine v-bind="item.lwisker" />
                <CorePoint v-bind="outlier" v-for="outlier in item.outliers" />
            </g>
        </g>
    </g>
</template>
