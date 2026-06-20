<script setup>
import { computed, reactive, ref, watch } from 'vue'
import DragList from './DragList.vue'
import DataOperationConfig from './DataOperationConfig.vue'
defineOptions({ inheritAttrs: false })
const { data: $data } = defineProps({ data: { type: Array, default: () => [] } })
const recipe = defineModel({ default: () => reactive([]) })

function addoperation() {
    recipe.value.push({ operation: "assign" })
}

function evalStep(data, { operation, ...args }) {
    if (operation == "assign") {
        let { name, value_func } = args
        try {
            let fn = new Function("return " + value_func)()
            return data.map(({ ...row }, i) => {
                try { row[name] = fn(row, i) } catch { }
                return row
            })
        } catch { return data }
    } else if (operation == "filter") {
        let { value_func } = args
        try {
            let fn = new Function("return " + value_func)()
            return data.filter((row, i) => {
                try { return fn(row, i) } catch { return false }
            })
        } catch { return [] }
    } else if (operation == "gather") {
        let { name_to, value_to, gather_name = [] } = args
        let colnames = Array.from(new Set(data.flatMap(obj => Object.keys(obj))))
        gather_name = gather_name.filter(n => colnames.includes(n))
        if (gather_name.length == 0) return data
        return data.flatMap(row => {
            let names = gather_name.filter(n => n in row)
            let remains = colnames.filter(c => !gather_name.includes(c))
            return names.map(name => ({
                ...Object.fromEntries(remains.map(c => [c, row[c]])),
                [name_to]: name,
                [value_to]: row[name],
            }))
        })
    }
    return data
}
const data = ref()
const output = ref($data)
function onchange(i) {
    for (let j = i; j < recipe.value.length; j++) {
        data.value[j + 1] = evalStep(data.value[j], recipe.value[j])
    }
    output.value = data.value.at(-1)
}
function ondrop(i) {
    recipe.value.splice(i, 1)
    data.value.splice(i + 1, 1)
    if (i == 0) output.value = data.value.at(-1)
    else onchange(i - 1)
}
function onreorder(from, to) {
    recipe.value.splice(to, 0, ...recipe.value.splice(from, 1))
    onchange(Math.min(from, to))
}
watch(() => $data, () => {
    data.value = [$data]
    onchange(0)
}, { immediate: true })
defineExpose({ output })
</script>

<template>
    <DragList @reorder="onreorder">
        <DataOperationConfig v-for="_, i in recipe" ref="operation" v-model="recipe[i]" :data="data[i]" class="flex-1"
            @change="onchange(i)">
            <template #summary>
                <span class="cursor-pointer font-emoji float-right hover:text-red-500" @click="ondrop(i)">×</span>
            </template>
        </DataOperationConfig>
    </DragList>
    <button @click="addoperation" class="cursor-pointer block justify-self-center">
        <span class="font-emoji">➕</span> add process step
    </button>
</template>
