<script setup>
import { ref, computed, watch, useTemplateRef, useAttrs, nextTick } from 'vue';
defineOptions({ inheritAttrs: false })
const { scale, geom } = defineProps({
    scale: Function,
    geom: { type: Array, default: () => [] },
    breaks: Array
})
const values = computed(() => {
    if (scale == null) return []
    if (scale.level) {
        let vs = Array.from(scale.level)
        vs.level = scale.level
        vs.extent = scale.extent
        return vs
    } else {
        let n = 5
        let vs = new Array(n).fill(0)
            .map((_, i) => (scale.extent.max - scale.extent.min) * i / n + scale.extent.min)
        vs.extent = scale.extent
        return vs
    }
})
const guides = computed(() => scale(values.value).map((v, i) => {
    return {
        [scale.aesthetics]: v,
        label: String(values.value[i]),
    }
}))
const show = computed(() => {
    return {
        text: ["text"].some(g => geom.includes(g)),
        line: ["line", "linerange"].some(g => geom.includes(g)),
        circle: ["point"].some(g => geom.includes(g)),
        rect: ["rect", "tile", "polygon"].some(g => geom.includes(g)),
    }
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
const attrs = useAttrs()
const listeners = computed(() => {
    return Object.fromEntries(Object.entries(attrs).filter(([k, v]) => k.startsWith('on')))
})
const width = ref(0)
const svgRef = useTemplateRef('svg')
watch(guides, async () => {
    await nextTick()
    let bbox = svgRef.value?.getBBox?.()
    if (!bbox) return
    width.value = bbox.width + bbox.x
}, { immediate: true })
</script>
<template>
    {{ scale.title }}
    <svg :height="guides.length * 20" :width="width" ref="svg">
        <g v-for="guide, i in guides" :transform="`translate(0, ${i * 20})`">
            <text v-if="show.text" x="10" y="10" :fill="guide.color" alignment-baseline="central"
                text-anchor="middle">a</text>
            <line v-if="show.line" :stroke="guide.color ?? 'black'" :x1="5" :x2="15" :y1="10" :y2="10"
                :stroke-width="guide.linewidth ?? 1" :stroke-opacity="guide.alpha"
                :stroke-dasharray="parseLineType(guide.linetype)" />
            <circle v-if="show.circle" cx="10" cy="10" :r="(guide.size ?? 6) / 2" :fill="guide.color ?? 'none'"
                :stroke="guide.stroke" :stroke-width="guide.linewidth" :stroke-opacity="guide.alpha"
                :fill-opacity="guide.alpha" />
            <rect v-if="show.rect" x="5" y="5" width="10" height="10" :fill="guide.fill" :stroke="guide.color"
                :stroke-width="guide.linewidth" :stroke-opacity="guide.alpha" :fill-opacity="guide.alpha" />
            <text x="20" y="10" alignment-baseline="central">{{ guide.label }}</text>
        </g>
    </svg>
</template>
