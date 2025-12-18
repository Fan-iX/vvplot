<script setup>
import { computed } from 'vue'
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
        x, xend, y, yend, size = 4, label, title,
        color, stroke, linewidth, linetype, alpha,
        'translate-x': translateX = 0, 'translate-y': translateY = 0,
        'text-length': textLength, $raw
    }) => {
        if (label == null) return null
        const { h: x1, v: y1 } = coord2pos({ x: x, y: y })
        const { h: x2, v: y2 } = coord2pos({ x: xend, y: yend })
        if (
            x1 < xlim_min && x2 < xlim_min || x1 > xlim_max && x2 > xlim_max ||
            y1 < ylim_min && y2 < ylim_min || y1 > ylim_max && y2 > ylim_max
        ) return null
        let parts = splitLabel(String(label))
        let dx = (xend - x) / (parts.length - 1 || 1),
            dy = (yend - y) / (parts.length - 1 || 1)
        let content = parts.map((label, i) => {
            let $x = x + i * dx, $y = y + i * dy
            const { h: tx, v: ty } = coord2pos({ x: $x, y: $y })
            if (typeof (textLength) == "object") {
                let { x: lx = 0, y: ly = 0 } = textLength
                let { h: h1, v: v1 } = coord2pos({ x: $x + lx / 2, y: $y + ly / 2 }),
                    { h: h2, v: v2 } = coord2pos({ x: $x - lx / 2, y: $y - ly / 2 })
                textLength = Math.hypot(h1 - h2 || 0, v1 - v2 || 0)
            }
            let vbind = {
                x: tx, y: ty,
                'text-anchor': 'middle',
                'alignment-baseline': 'central',
                textLength,
                lengthAdjust: textLength ? 'spacingAndGlyphs' : null,
            }
            return [vbind, label]
        })
        let vbind = {
            fill: color,
            'font-size': size * 4,
            stroke: stroke,
            'stroke-width': linewidth,
            'stroke-dasharray': linetype,
            'fill-opacity': alpha,
            'stroke-opacity': alpha,
            transform: (translateX || translateY) ? `translate(${translateX}, ${translateY})` : null,
        }
        let von = Object.fromEntries(
            events.map(evt => [evt, (e) => emit(evt, Object.assign(e, { _vhandled: true }), $raw)])
        )
        return [vbind, von, content, String(title ?? label)]
    }).filter(x => x != null))
})
/**
 * split label into parts, use \x01 and \x02 to represent start and end of a segment
 * @param {string} label 
 * @returns {Array}
 */
function splitLabel(label) {
    let result = []
    for (let i = 0; i < label.length; i++) {
        if (label[i] == '\x01') {
            let j = i + 1
            while (j < label.length && label[j] != '\x02') j++
            result.push(label.slice(i + 1, j))
            i = j
        } else {
            result.push(label[i])
        }
    }
    return result
}
</script>
<template>
    <g>
        <g v-for="group in binds">
            <template v-for="[vbind, von, content, title] in group">
                <text v-bind="vbind" v-on="von">
                    <title>{{ title }}</title>
                    <template v-for="[vbind, label] in content">
                        <tspan v-if="label" v-bind="vbind">{{ label }}</tspan>
                    </template>
                </text>
            </template>
        </g>
    </g>
</template>
