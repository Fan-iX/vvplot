<script setup>
import '#base/style.css'
import { ref } from 'vue'
const page = ref(window.location.hash.slice(1) || 'home')

import playground from './playground.vue'
import home from './home.vue'
import quick_start from './docs/quick-start.vue'
import layer from './docs/layer.vue'
import theme from './docs/theme.vue'
import gallery from './docs/gallery.vue'
import axis from './docs/axis.vue'
import action from './docs/action.vue'

const pages = { home, quick_start, layer, theme, axis, action, gallery, playground }

window.addEventListener('hashchange', () => {
    page.value = window.location.hash.slice(1) || 'home'
})
</script>
<template>
    <div class="content">
        <nav class="flex flex-row gap-4 p-4 sticky top-0 bg-white border-b border-gray-200 z-20">
            <a :href="'#' + k" :key="k" v-for="(v, k) in pages">{{ k.replace(/_/g, " ") }}</a>
        </nav>
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

.plot-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
