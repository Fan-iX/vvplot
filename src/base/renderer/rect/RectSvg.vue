<script setup>
import { computed } from 'vue'
import { pointerEvents } from '#src/core/utils.js'
import ElementTile from '#src/elements/ElementTile.vue'
const { extendX, extendY, data, mapping, layout, groupClass, groupStyle } = defineProps({
    extendX: { type: Number, default: 0 },
    extendY: { type: Number, default: 0 },
    data: Object, mapping: Object, layout: Object, options: Object,
    groupClass: null, groupStyle: null,
})
const emit = defineEmits(pointerEvents)

const binds = computed(() => {
    let xlim_min = -layout.fullWidth * extendX - layout.l,
        xlim_max = layout.fullWidth * (1 + extendX) - layout.l,
        ylim_min = -layout.fullHeight * extendY - layout.t,
        ylim_max = layout.fullHeight * (1 + extendY) - layout.t
    return Object.values(Object.groupBy(data, d => d.$group)).map(group => group.map(({
        xmin, xmax, ymin, ymax,
        fill, color, linewidth, linetype, alpha, title,
        'translate-x': translateX = 0, 'translate-y': translateY = 0,
        class: className, style, $raw
    }) => {
        const { hmin: x1, hmax: x2, vmin: y1, vmax: y2 } = mapping.coord2pos({ xmin, xmax, ymin, ymax })
        if (
            x1 < xlim_min && x2 < xlim_min || x1 > xlim_max && x2 > xlim_max ||
            y1 < ylim_min && y2 < ylim_min || y1 > ylim_max && y2 > ylim_max
        ) return null
        let vbind = {
            x: (x1 + x2) / 2, width: x2 - x1,
            y: (y1 + y2) / 2, height: y2 - y1,
            fill, color, linetype, linewidth, alpha, title,
            translateX, translateY,
            class: className, style,
        }
        let von = Object.fromEntries(pointerEvents.map(
            evt => [evt, (e) => emit(evt, Object.assign(e, { _vhandled: true }), mapping.getCoord(e), $raw)]
        ))
        return [vbind, von]
    }).filter(x => x != null))
})
</script>
<template>
    <g class="vvplot-layer">
        <g class="vvplot-group" v-for="group in binds" v-bind="{ class: groupClass, style: groupStyle }">
            <ElementTile v-bind="vbind" v-on="von" v-for="[vbind, von] in group" />
        </g>
    </g>
</template>
