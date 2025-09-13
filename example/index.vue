<script setup>
import '#base/style.css'
import { ref } from 'vue'
const page = ref('geom')

import geom from './geom.vue'
import theme from './theme.vue'
import axis from './axis.vue'
import action from './action.vue'

const pages = { geom, theme, axis, action }
</script>
<template>
    <div class="content">
        <div>
            example:
            <select v-model="page">
                <option v-for="(v, k) in pages" :key="k" :value="k">{{ k }}</option>
            </select>
        </div>
        <component :is="pages[page]" />
    </div>
</template>
<style>
.content {
    display: flex;
    flex-direction: column;
}

input {
    field-sizing: content;
    display: inline-block;
}

select {
    field-sizing: content;
    display: inline-block;
}

hr {
    margin: 1em 0;
    color: #ccc;
    width: 80%;
}

pre.code {
    background: #f0f0f0;
    padding: 1em;
    overflow: auto;
    border-radius: 1em;
    width: 80%;
    overflow-x: auto;
}

.plot-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
