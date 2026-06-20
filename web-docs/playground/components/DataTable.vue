<script setup>
import { reactive, computed, useTemplateRef } from 'vue'
const { data: $data } = defineProps({ data: { type: Array, default: () => [] } })
const sort = defineModel("sort", { default: () => reactive([]) })
const colnames = computed(() => Array.from(new Set($data.flatMap(obj => Object.keys(obj)))))
const icons = computed(() => Object.fromEntries(sort.value.map(({ col, order }) => [col, order == 1 ? '⬆' : '⬇'])))
function onsort(colname) {
    let item = sort.value.find(s => s.col == colname)
    if (!item) sort.value.push({ col: colname, order: 1 })
    else if (item.order == 1) item.order = -1
    else sort.value.splice(sort.value.findIndex(s => s.col == colname), 1)
}
const naturalCompare = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare
const data = computed(() => $data.toSorted((a, b) => {
    for (let { col, order = 0 } of sort.value) {
        let res = naturalCompare(a[col], b[col]) * order
        if (res) return res
    }
    return 0
}))
</script>

<template>
    <table
        class="[&_:is(td,th)]:px-2 [&_:is(td,th)]:py-1 [&_:is(td,th)]:ring-[0.5px] [&_:is(td,th)]:ring-gray-200 [&_:is(td,th)]:ring-inset whitespace-nowrap">
        <thead>
            <tr>
                <th v-for="colname in colnames">
                    {{ colname }}
                    <span @click="onsort(colname)" class="cursor-pointer font-emoji">{{ icons[colname] ?? '↕' }}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data">
                <td v-for="colname in colnames">{{ row[colname] }}</td>
            </tr>
        </tbody>
    </table>
</template>
