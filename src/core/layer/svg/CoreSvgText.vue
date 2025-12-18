<script setup>
import { computed } from 'vue'
import CoreText from '../../element/CoreText.vue'
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
        x, y, size = 4, label, title,
        color, stroke, linewidth, linetype, alpha,
        'anchor-x': anchorX, 'anchor-y': anchorY,
        'dock-x': dockX, 'dock-y': dockY,
        'translate-x': translateX = 0, 'translate-y': translateY = 0,
        angle, 'text-length': textLength, $raw
    }) => {
        if (label == null) return null
        const { h: tx, v: ty } = coord2pos({ x, y })
        if (tx < xlim_min || tx > xlim_max || ty < ylim_min || ty > ylim_max) return null
        if (typeof (textLength) == "object") {
            let { x: lx = 0, y: ly = 0 } = textLength
            let { h: h1, v: v1 } = coord2pos({ x: x + lx / 2, y: y + ly / 2 }),
                { h: h2, v: v2 } = coord2pos({ x: x - lx / 2, y: y - ly / 2 })
            textLength = Math.hypot(h1 - h2 || 0, v1 - v2 || 0)
        }
        let vbind = {
            x: tx, y: ty, text: String(label), title: String(title ?? label),
            size, color, stroke, linetype, linewidth, alpha,
            angle, translateX, translateY,
            anchorX, anchorY, dockX, dockY, textLength,
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
            <CoreText v-bind="vbind" v-on="von" v-for="[vbind, von] in group" />
        </g>
    </g>
</template>
