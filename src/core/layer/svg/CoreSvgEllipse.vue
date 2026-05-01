<script setup>
import { computed } from 'vue'
import CoreEllipse from '../../element/CoreEllipse.vue'
const { extendX, extendY, data, coord2pos, getCoord, layout, groupClass, groupStyle } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, coord2pos: Function, getCoord: Function, layout: Object,
    groupClass: null, groupStyle: null,
})
let events = ['click', 'contextmenu', 'singleclick', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'wheel']
const emit = defineEmits(['click', 'contextmenu', 'singleclick', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointermove', 'pointerdown', 'pointerup', 'wheel'])

const binds = computed(() => {
    let xlim_min = -layout.fullWidth * extendX - layout.l,
        xlim_max = layout.fullWidth * (1 + extendX) - layout.l,
        ylim_min = -layout.fullHeight * extendY - layout.t,
        ylim_max = layout.fullHeight * (1 + extendY) - layout.t
    return data.map(group => group.map(({
        cx, cy, A, B, C,
        fill = "none", color = 'black', linewidth, linetype, alpha, title,
        'translate-x': translateX = 0, 'translate-y': translateY = 0,
        class: className, style, $raw
    }) => {
        let dx = Math.sqrt(C / (A * C - B * B)),
            dy = Math.sqrt(A / (A * C - B * B))
        const { h: ch, v: cv } = coord2pos({ x: cx, y: cy })
        let { h: h1, v: v1 } = coord2pos({ x: cx - dx, y: cy - dy }),
            { h: h2, v: v2 } = coord2pos({ x: cx + dx, y: cy + dy })
        if (
            h1 < xlim_min && h2 < xlim_min ||
            h2 > xlim_max && h1 > xlim_max ||
            v1 < ylim_min && v2 < ylim_min ||
            v2 > ylim_max && v1 > ylim_max
        ) return null
        let scaleX = (h2 - h1) / (2 * dx), scaleY = (v2 - v1) / (2 * dy)
        A /= scaleX * scaleX
        B /= scaleX * scaleY
        C /= scaleY * scaleY
        const tr = A + C, det = A * C - B * B
        const disc = Math.sqrt(Math.max(0, tr * tr / 4 - det))
        let vbind = {
            cx: ch, cy: cv,
            rx: 1 / Math.sqrt(tr / 2 + disc) || 0, ry: 1 / Math.sqrt(tr / 2 - disc) || 0,
            angle: Math.atan2(2 * B, A - C) / 2 * 180 / Math.PI || 0,
            fill, color, linetype, linewidth, alpha, title,
            translateX, translateY,
            class: className, style,
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
        <g v-for="group in binds" v-bind="{ class: groupClass, style: groupStyle }">
            <CoreEllipse v-bind="vbind" v-on="von" v-for="[vbind, von] in group" />
        </g>
    </g>
</template>
