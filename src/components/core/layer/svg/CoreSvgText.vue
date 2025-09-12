<script setup>
import { computed } from 'vue';
import CoreText from '../../CoreText.vue'
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
        x, y,
        color, size = 4, label, title, stroke, linewidth, linetype, alpha,
        'anchor-x': anchorX, 'anchor-y': anchorY,
        'dock-x': dockX, 'dock-y': dockY,
        'translate-x': translateX = 0, 'translate-y': translateY = 0, angle, $raw
    }) => {
        let { x: tx, y: ty } = coord2pos({ x, y })
        if (tx < xlim_min || tx > xlim_max || ty < ylim_min || ty > ylim_max) return null
        return {
            bind: {
                x: tx, y: ty,
                fill: color,
                text: String(label), title,
                fontSize: size * 4,
                angle, anchorX, anchorY, dockX, dockY,
                stroke,
                'stroke-width': linewidth,
                'stroke-dasharray': parseLineType(linetype),
                'fill-opacity': alpha,
                'stroke-opacity': alpha,
                onClick: (e) => emit('click', e, $raw),
                onContextmenu: (e) => emit('contextmenu', e, $raw),
                onPointerover: (e) => emit('pointerover', e, $raw),
                onPointerout: (e) => emit('pointerout', e, $raw),
                onPointerenter: (e) => emit('pointerenter', e, $raw),
                onPointerleave: (e) => emit('pointerleave', e, $raw),
                onPointerdown: (e) => emit('pointerdown', e, $raw),
                onPointerup: (e) => emit('pointerup', e, $raw),
                onPointermove: (e) => emit('pointermove', e, $raw),
            },
            transform: (translateX || translateY) ? `translate(${translateX}, ${translateY})` : null,
        }
    }).filter(x => x.bind?.text != null))
})
function parseLineType(linetype) {
    if (linetype == null) return null
    if (linetype === 'solid') return null
    if (linetype === 'dashed') return '4 4'
    if (linetype === 'dotted') return '1 3'
    if (linetype === 'dotdash') return '1 3 4 3'
    if (linetype === 'longdash') return '8 4'
    if (linetype === 'twodash') return '2 2 6 2'
    if (linetype.includes(' ')) return linetype
    return linetype.split('').map(v => +('0x' + v)).join(' ')
}
</script>
<template>
    <g>
        <g v-for="group in binds">
            <template v-for="item in group">
                <g v-if="item.transform" :transform="item.transform">
                    <CoreText v-bind="item.bind" />
                </g>
                <CoreText v-else v-bind="item.bind" />
            </template>
        </g>
    </g>
</template>
