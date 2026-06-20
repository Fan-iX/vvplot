<script setup>
import { Fragment, Comment, ref, computed, useId, useSlots, useTemplateRef } from 'vue'
const vid = useId()
const $slots = useSlots()
const vnodes = computed(() => {
    let vn = $slots.default?.() ?? []
    vn = vn.flatMap(c => c.type == Fragment ? c.children : c)
    return vn.filter(c => c.type != Comment)
})
const itemRefs = useTemplateRef('items')
const draggingIndex = ref(null)
function onItemDragstart(e, i) {
    e.dataTransfer.setData('draglist-' + vid, vid)
    draggingIndex.value = i
}
const emit = defineEmits(['reorder'])
function onListDrop(e) {
    if (!e.dataTransfer.types.includes("draglist-" + vid)) return
    let ele = itemRefs.value.find(x => x.contains(e.target))
    ele.style.boxShadow = null
    let i = itemRefs.value.indexOf(ele)
    if (ele.getBoundingClientRect().top + ele.getBoundingClientRect().height / 2 < e.clientY) i++
    let j = draggingIndex.value
    if (j != null) {
        let n = vnodes.value.length
        emit('reorder', j, i)
    }
    draggingIndex.value = null
}
function onListDragover(e) {
    if (!e.dataTransfer.types.includes("draglist-" + vid)) return
    e.preventDefault()
    let ele = itemRefs.value.find(x => x.contains(e.target))
    if (!ele) return
    if (ele.getBoundingClientRect().top + ele.getBoundingClientRect().height / 2 < e.clientY) {
        ele.style.boxShadow = '0px 1px 0px 0px black, 0px -1px 0px 0px black inset'
    } else {
        ele.style.boxShadow = '0px -1px 0px 0px black, 0px 1px 0px 0px black inset'
    }
}
function onListDragleave(e) {
    if (!e.dataTransfer.types.includes("draglist-" + vid)) return
    let ele = itemRefs.value.find(x => x.contains(e.target))
    if (ele) ele.style.boxShadow = null
}
</script>
<template>
    <div @dragover="onListDragover" @dragleave="onListDragleave" @drop="onListDrop" class="flex flex-col">
        <div v-for="s, i in vnodes" ref="items" class="flex w-full py-1 flex-row">
            <div class="cursor-move inline-block box-content border-gray-300 flex-0 w-2 border-l-8" draggable="true"
                @dragstart="onItemDragstart($event, i)">&nbsp;</div>
            <component :is="s" />
        </div>
    </div>
</template>
