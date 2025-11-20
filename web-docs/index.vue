<script setup>
import '#base/style.css'
import { ref, nextTick, onMounted } from 'vue'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
hljs.registerLanguage('html', xml)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)

const page = ref(window.location.hash.slice(1) || 'home')

import playground from './playground.vue'
import home from './home.vue'
import quick_start from './docs/quick-start.vue'
import layer from './docs/layer.vue'
import theme from './docs/theme.vue'
import gallery from './docs/gallery.vue'
import axis from './docs/axis.vue'
import scale from './docs/scale.vue'
import action from './docs/action.vue'

const pages = { home, quick_start, layer, theme, axis, scale, action, gallery, playground }

onMounted(() => {
    nextTick(() => hljs.highlightAll())
})

window.addEventListener('hashchange', () => {
    page.value = window.location.hash.slice(1) || 'home'
    nextTick(() => hljs.highlightAll())
})
</script>
<template>
    <div class="content" :class="{ 'h-screen': page == 'playground' }">
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

.doc-demo-table {
    .vvplot {
        width: 300px;
        height: 200px;
        margin: 0 auto;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding-inline: 8px;
    }

    th {
        padding-block: 8px;
    }
}
</style>
