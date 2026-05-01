<script setup>
import { computed } from 'vue'
import CoreMarkdown from '../../element/CoreMarkdown.vue'
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
        x, xend, y, yend, size = 4, label, title,
        color, stroke, linewidth, linetype, alpha,
        'translate-x': translateX = 0, 'translate-y': translateY = 0,
        'anchor-x': anchorX, 'anchor-y': anchorY = 0.5,
        'font-family': fontFamily = "sans-serif", 'text-align': textAlign = 'start', inset = 0,
        class: className, style, $raw
    }) => {
        if (label == null) return null
        const { h: x1, v: y1 } = coord2pos({ x: x, y: y })
        const { h: x2, v: y2 } = coord2pos({ x: xend, y: yend })
        if (
            x1 < xlim_min && x2 < xlim_min || x1 > xlim_max && x2 > xlim_max ||
            y1 < ylim_min && y2 < ylim_min || y1 > ylim_max && y2 > ylim_max
        ) return null
        let radian = Math.atan2(y2 - y1, x2 - x1)
        let vbind = {
            text: String(label), title: String(title ?? label),
            color, alpha, size, stroke, linewidth, linetype,
            fontFamily, class: className, style,
        }
        let von = Object.fromEntries(
            events.map(evt => [evt, (e) => emit(evt, Object.assign(e, { _vhandled: true }), getCoord(e), $raw)])
        )
        let tx, ty
        switch (textAlign) {
            case "stretch":
                tx = (x1 + x2) / 2
                ty = (y1 + y2) / 2
                anchorX = 0.5
                vbind.textLength = Math.hypot(x2 - x1 || 0, y2 - y1 || 0)
                break
            case "center":
                tx = (x1 + x2) / 2
                ty = (y1 + y2) / 2
                anchorX ??= 0.5
                break
            case "pre":
                tx = x1
                ty = y1
                translateX -= Math.cos(radian) * inset
                translateY -= Math.sin(radian) * inset
                anchorX ??= 1
                break
            case "end":
                tx = x2
                ty = y2
                translateX -= Math.cos(radian) * inset
                translateY -= Math.sin(radian) * inset
                anchorX ??= 1
                break
            case "post":
                tx = x2
                ty = y2
                translateX += Math.cos(radian) * inset
                translateY += Math.sin(radian) * inset
                anchorX ??= 0
                break
            default:
                tx = x1
                ty = y1
                translateX += Math.cos(radian) * inset
                translateY += Math.sin(radian) * inset
                anchorX ??= 0
        }
        Object.assign(vbind, { x: tx, y: ty, translateX, translateY, anchorX, anchorY, angle: radian * 180 / Math.PI })
        return [vbind, von]
    }).filter(x => x != null))
})
</script>
<template>
    <g>
        <g v-for="group in binds" v-bind="{ class: groupClass, style: groupStyle }">
            <CoreMarkdown v-bind="vbind" v-on="von" v-for="[vbind, von] in group" />
        </g>
    </g>
</template>
