<script setup>
const { coord2pos, pos2coord, margin, padding, emit } = defineProps({
    coord2pos: Function,
    pos2coord: Function,
    margin: { type: Object, default: () => ({}) },
    padding: { type: Object, default: () => ({}) },
    emit: Function,
})
function getInnerPos(event) {
    let rect = event.currentTarget.getBoundingClientRect()
    return {
        x: event.pageX - (rect.left + margin.left + padding.left),
        y: event.pageY - (rect.top + margin.top + padding.top),
    }
}
function getCoord(event) {
    return pos2coord(getInnerPos(event))
}
function isInside(event) {
    let rect = event.currentTarget.getBoundingClientRect()
    return event.pageX > rect.left + margin.left &&
        event.pageX < rect.right - margin.right &&
        event.pageY > rect.top + margin.top &&
        event.pageY < rect.bottom - margin.bottom
}
const vBind = {
    onPointerup: function (e) { emit('pointerup', e, getCoord(e)) },
    onClick: function (e) { emit('click', e, getCoord(e)) },
    onContextmenu: function (e) { e.preventDefault(); emit('rightclick', e, getCoord(e)) },
    onPointerenter: function (e) { emit('pointerenter', e, getCoord(e)) },
    onPointerleave: function (e) { emit('pointerleave', e, getCoord(e)) },
    onDblclick: function (e) { emit('dblclick', e, getCoord(e)) },
}
</script>
<template>
    <slot v-bind="vBind"></slot>
</template>
