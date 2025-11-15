<script setup>
import { computed } from 'vue'
import CoreText from '../../element/CoreText.vue'
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
        x, y, size = 4, label, title,
        color, stroke, linewidth, linetype, alpha,
        'anchor-x': anchorX, 'anchor-y': anchorY,
        'dock-x': dockX, 'dock-y': dockY,
        'translate-x': translateX = 0, 'translate-y': translateY = 0,
        angle, 'text-length': textLength, $raw
    }) => {
        const { h: tx, v: ty } = coord2pos({ x, y })
        if (tx < xlim_min || tx > xlim_max || ty < ylim_min || ty > ylim_max) return null
        if (typeof (textLength) == "object") {
            let { x: lx = 0, y: ly = 0 } = textLength
            let { h: h1, v: v1 } = coord2pos({ x: x + lx / 2, y: y + ly / 2 }),
                { h: h2, v: v2 } = coord2pos({ x: x - lx / 2, y: y - ly / 2 })
            textLength = Math.hypot(h1 - h2 || 0, v1 - v2 || 0)
        }
        let result = {
            x: tx, y: ty, text: String(label), title: String(title ?? label),
            size, color, stroke, linetype, linewidth, alpha,
            angle, translateX, translateY,
            anchorX, anchorY, dockX, dockY, textLength,
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
    }).filter(x => x?.text != null))
})
</script>
<template>
    <g>
        <g v-for="group in binds">
            <CoreText v-bind="item" v-for="item in group" />
        </g>
    </g>
</template>
