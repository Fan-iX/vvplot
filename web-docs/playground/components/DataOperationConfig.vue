<script setup>
import { computed, reactive, ref, watch } from 'vue'
const { data } = defineProps({ data: { type: Array, default: () => [] } })
const recipe = defineModel({ default: () => reactive({}) })
const emit = defineEmits(['change'])
const colnames = computed(() => Array.from(new Set(data.flatMap(obj => Object.keys(obj)))))
const varnames = computed(() => colnames.value.map(x => {
    if (/[^\p{L}\p{N}_$]/gu.test(x)) return `'${x}': ${x.replace(/[^\p{L}\p{N}_$]/gu, '_')}`
    if (/^\d/.test(x)) return `$${x}: ${x}`
    return x
}))
watch(recipe, () => emit('change', recipe.value), { deep: true })
watch(colnames, (arr) => {
    if (recipe.value.operation == 'gather' && recipe.value.gather_name.every(n => !arr.includes(n)))
        recipe.value.gather_name = arr.slice()
})
watch([() => recipe.value.operation, colnames], ([op, arr], [oldop]) => {
    if (op == "assign") {
        if (!recipe.value.name || arr.includes(recipe.value.name)) {
            let i = 1
            while (arr.some(c => c == `col${i}`)) i++
            recipe.value.name = `col${i}`
        }
        recipe.value.value_func ??= `({
    ${varnames.value.join(',\n    ')}
} = {}, i) => true`
    } else if (op == "filter") {
        recipe.value.value_func ??= `({
    ${varnames.value.join(',\n    ')}
} = {}, i) => true`
    } else if (op == "gather") {
        recipe.value.name_to ??= "key"
        recipe.value.value_to ??= "value"
        recipe.value.gather_name = arr.filter(n => recipe.value.gather_name?.includes?.(n))
        if (recipe.value.gather_name.length == 0)
            recipe.value.gather_name = colnames.value.slice()
    }
}, { immediate: true })
function inputchange(e, opt) {
    if (e.target.checked) {
        if (!recipe.value.gather_name.includes(opt)) recipe.value.gather_name.push(opt)
    } else {
        recipe.value.gather_name = recipe.value.gather_name.filter(n => n != opt)
    }
}
</script>
<template>
    <div>
        <select v-model="recipe.operation" class="border-b outline-none">
            <option value="assign">assign</option>
            <option value="filter">filter</option>
            <option value="gather">gather</option>
        </select>
        <template v-if="recipe.operation == 'assign'">
            to
            <input v-model.lazy="recipe.name" class="border-b outline-none" />
        </template>
        <slot name="summary"></slot>
        <textarea v-model.lazy="recipe.value_func" autosize
            class="overflow-auto whitespace-nowrap w-full font-mono field-sizing-content outline-none border border-gray-300"
            v-if="recipe.operation == 'assign' || recipe.operation == 'filter'"></textarea>
        <div class="flex flex-col p-2" v-if="recipe.operation == 'gather'">
            <label v-for="opt in colnames">
                <input type="checkbox" :checked="recipe.gather_name.includes(opt)" @change="inputchange($event, opt)" />
                {{ opt }}
            </label>
            <div>
                name to
                <input v-model.lazy="recipe.name_to" class="border-b outline-none" />
                , value to
                <input v-model.lazy="recipe.value_to" class="border-b outline-none" />
            </div>
        </div>
    </div>
</template>
