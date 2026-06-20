<script setup>
import { computed, reactive } from 'vue'
import DragList from './DragList.vue'
defineOptions({ inheritAttrs: false })
import { vvgeom, vvstat, components as vvcomponents } from '#base/index.ts'
const vvlayers = {}
for (let c in vvcomponents) {
    if (vvcomponents[c].$_type == "layer" && vvcomponents[c].$_props?.stat) {
        vvlayers[c] = vvcomponents[c]
    }
}

const { data } = defineProps({ data: Array, default: () => [] })
const layers = defineModel({ default: () => reactive([]) }) // { layer, bind }

const vvlayerattrs = {}, vvlayerargs = {}
for (let layer in vvlayers) {
    let { $_props: { stat, geom } = {}, $_argnames: args = [] } = vvlayers[layer] ?? {}
    if (stat && geom) {
        vvlayerattrs[layer] = [...vvstat[stat].core_attrs, ...vvgeom[geom].scale_attrs, "group"]
        vvlayerargs[layer] = args
    }
}

function reorder(arr, from, to) {
    arr.splice(to, 0, ...arr.splice(from, 1))
}
function addlayer() {
    layers.value.push({ layer: "VVGeomPoint", bind: {} })
}
const colnames = computed(() => Array.from(new Set(data.flatMap(obj => Object.keys(obj)))))
</script>

<template>
    <DragList @reorder="(i, j) => reorder(layers, i, j)">
        <div v-for="l, i in layers" class="flex-1 min-w-0">
            <div>
                <select v-model="l.layer" class="border-b outline-none">
                    <option v-for="_, layer in vvlayers" :value="layer">{{ layer }}</option>
                </select>
                <span class="cursor-pointer font-emoji float-right hover:text-red-500"
                    @click="layers.splice(i, 1)">×</span>
            </div>
            <div class="grid grid-cols-[auto_1fr_auto_1fr] gap-x-2 gap-y-1">
                <template v-for="aes in vvlayerattrs[l.layer]">
                    <span class="text-right">{{ aes }} :</span>
                    <select v-model="l.bind[aes]" class="border-b min-w-0 appearance-none">
                        <option :value="c" v-for="c in colnames">{{ c }}</option>
                        <option></option>
                    </select>
                </template>
                <template v-for="arg in vvlayerargs[l.layer]">
                    <span class="text-right">{{ arg }} :</span>
                    <input v-model.lazy="l.bind[arg]" class="border-b min-w-0">
                </template>
            </div>
        </div>
    </DragList>
    <button @click="addlayer" class="cursor-pointer block justify-self-center">
        <span class="font-emoji">➕</span> add layer
    </button>
</template>
