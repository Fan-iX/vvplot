<script setup>
import { createApp, ref, useTemplateRef, onMounted, computed, watch, nextTick } from 'vue'
import { components, vvscale, oob, vvbreak, vvlabel, vvtheme } from '#base/index.ts'
import DataTable from './components/DataTable.vue'
import DataConfig from './components/DataConfig.vue'
import LayerConfig from './components/LayerConfig.vue'
import { computedAsync } from '@vueuse/core'
const AsyncFunction = (async function () { }).constructor

function read_table(text, { header = true, sep = ',' } = {}) {
    function parse_value(v) {
        if (!isNaN(v)) return +v
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(v)) {
            let [y, m, d] = v.split('-').map(x => +x)
            return Date.UTC(y, m - 1, d)
        }
        return v
    }
    let lines = text.replace(/\r/g, '').split('\n').filter(l => l), columns
    if (header) {
        columns = lines.shift()?.split?.(sep) ?? []
    }
    let data = lines.map(l => l.split(sep).map(v => parse_value(v)))
    if (!header) {
        let ncol = data.map(r => r.length).reduce((a, b) => a > b ? a : b, 0)
        columns = Array.from({ length: ncol }, (_, i) => `V${i + 1}`)
    }
    return data.map(x => Object.fromEntries(columns.map((c, i) => [c, x[i]])))
}

import iris_text from '../data/iris.json?raw'
import UCBAdmissions_text from '../data/UCBAdmissions.json?raw'
import letters_text from '../data/sentences.txt?raw'
import mtcars_text from '../data/mtcars.json?raw'
import economics_text from '../data/economics.csv?raw'
import pigments_text from '../data/pigments.csv?raw'
const presets = {
    'iris.json': {
        text: iris_text,
        preprocessFunc: `return JSON.parse(text)`,
        templateText: `<VVAxisY :position="1.5" :extend="1">
    <VVAction :zoom="{ max: 10, min: -2 }" :move="{ min: -2 }" :rescale="{ max: 10 }" />
</VVAxisY>
<VVAxisX position="center" :extend="1">
    <VVAction move :nudge="{ shift: true }" :min="-2" :max="10" />
    <VVAction :zoom="{ min: -5 }" :rescale="{ max: 10 }" :min-range="4" />
</VVAxisX>
<VVAction zoom move />
<VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
    :shape="d => d.Species"
    :scales="{ color: vvscale.color.default({ key: 'Species' }), shape: vvscale.shape.default({ key: 'Species' }) }" />`
    },
    'UCBAdmissions.json': {
        text: UCBAdmissions_text,
        preprocessFunc: `return JSON.parse(text)`,
        templateText: `<VVGeomTile :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :fill="d => d.Freq" :width="0.8" :height="0.8" :alpha="0.4"
        :scales="{ fill: vvscale.color.gradient2({ midpoint: null, limits: [0, 500], breaks: [0, 250, 500] }) }" />
<VVGeomText :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :color="d => d.Freq" :label="d => d.Freq" />
<VVAction zoom move />`,
    },
    'letters.txt': {
        text: letters_text,
        preprocessFunc: `return text.toLowerCase().replace(/[^a-z]/g, "").split("")`,
        templateText: `<VVAxisY :min="0" :expand-mult="0" />
<VVGeomBar :x="d => d" :fill="d => d" :scales="{ fill: vvscale.fill.custom((v) => ['blue', 'gold'][v % 2]) }" />
<VVAction zoom move />`,
    },
    'mtcars.json': {
        text: mtcars_text,
        preprocessFunc: `const obj = JSON.parse(text);`,
        templateText: `<VVGeomPoint :x="d => d.wt" :y="d => d.mpg" shape="triangle" />
<VVGeomText :x="d => d.wt" :y="d => d.mpg" :label="d => d.model" :alpha="0.5" :angle="-15" :anchor-x="0" :anchor-y="0.5" :translate-x="6" :translate-y="-2" />
<VVGeomSegment :x="d => d.x1" :y="d => d.y1" :xend="d => d.x2" :yend="d => d.y2"
    :data="[{ x1: 2.62, x2: 3.57, y1: 21, y2: 15 }]" color="red" linetype="dashed" />`,
    },
    'economics.csv': {
        text: economics_text,
        preprocessFunc: `return read_table(text)`,
        templateText: `<VVAxisY :labels="vvlabel.default({scale:100,suffix:'%'})" :expand-mult="{ min: 0.2, max: 0.1 }" title="unemployment rate">
    <VVAction move rescale zoom />
</VVAxisY>
<VVAxisX position="10%" :theme="{ tick_length: 3, text_angle: 45, tick_anchor_x: 0 }"
    :show-grid="false" :extend="0.5">
    <VVAction move rescale zoom />
</VVAxisX>
<VVGeomLine :x="d => new Date(d.date)" :y="d => d.unemploy / d.pop" />
<VVAction zoom move />`,
    },
    'pigments.csv': {
        text: pigments_text,
        preprocessFunc: `return read_table(text)`,
        templateText: `<VVGeomLine :x="d => d.wave_length" :y="d => d.molar_extinction" :color="d => d.pigment" :group="d => d.pigment"
    :scales="{ color: vvscale.color.manual({ values: { beta_carotene: 'orangered', chlorophyll_a: 'limegreen', chlorophyll_b: 'royalblue' } }) }" />
<VVAction zoom move />`,
        recipe: [{ "operation": "gather", "name_to": "pigment", "value_to": "molar_extinction", "gather_name": ["chlorophyll_a", "chlorophyll_b", "beta_carotene"] }]
    }
}

const preset = ref('iris.json')
function onpresetchange() {
    let set = presets[preset.value]
    text.value = set.text
    preprocessFunc.value = set.preprocessFunc
    templateText.value = set.templateText
    recipe.value = set.recipe ?? []
    fileInput.value.files = new DataTransfer().files
}

const fileInput = useTemplateRef('file-input')
const width = ref(600), height = ref(400)
const fileChanged = async (e) => {
    if (e.target.files.length > 0) {
        preset.value = ""
        text.value = await e.target.files[0].text()
        preprocessFunc.value = "return read_table(text)"
        templateText.value = `
<VVAction zoom move />`
    }
}

let app, instance
async function buildPlot() {
    if (instance) app.unmount()
    let template = `<VVPlot ref="plot" :data="data" :width="${width.value}" :height="${height.value}" @resize="onresize" resize>
${layerText.value}
${templateText.value}
</VVPlot>`
    app = createApp({
        setup() {
            const plot = ref(null)
            return { data: dataConfig?.value?.output, plot, vvscale, vvtheme, vvbreak, vvlabel, oob, read_table }
        },
        methods: {
            onresize({ width: w, height: h }) {
                width.value = w
                height.value = h
            }
        },
        template
    })
    for (let c in components) {
        app.component(c, components[c])
    }
    try {
        instance = app.mount('#plot')
    } catch (e) {
        app.unmount()
    }
}

const format = ref("json")
const text = ref()
const preprocessFunc = ref("")
const templateText = ref("")
const header = ref(true)
const sep = ref(",")
const json_data = computed(() => {
    try {
        let json = JSON.parse(text.value)
        if (json instanceof Array) return json
        if (typeof json == "object") return Object.entries(json).map(([k, v]) => ({ $id: k, ...v }))
        return new Error("JSON must be an array or object")
    } catch (e) { return e }
})
const csv_data = computed(() => {
    try {
        return read_table(text.value, { header: header.value, sep: sep.value })
    } catch (e) { return e }
})
const custom_data = computedAsync(async () => {
    let scope = { read_table }
    try {
        let func = new AsyncFunction("text", ...Object.keys(scope), preprocessFunc.value)
        return await func(text.value, ...Object.values(scope))
    } catch (e) { return e }
}, [])
const data = computed(() => {
    if (format.value == "json") {
        return json_data.value instanceof Error ? [] : json_data.value
    } else if (format.value == "csv") {
        return csv_data.value instanceof Error ? [] : csv_data.value
    } else if (format.value == "custom") {
        return custom_data.value instanceof Error ? [] : custom_data.value
    }
    return []
})
const dataErrorMessage = computed(() => {
    if (format.value == "json") {
        return json_data.value instanceof Error ? `JSON parse error: ${json_data.value.message}` : null
    } else if (format.value == "csv") {
        return csv_data.value instanceof Error ? `CSV parse error: ${csv_data.value.message}` : null
    } else if (format.value == "custom") {
        return custom_data.value instanceof Error ? `Custom parse error: ${custom_data.value.message}` : null
    }
    return null
})
watch(text, (t) => {
    if (!(json_data.value instanceof Error))
        format.value = "json"
    else if (!(csv_data.value instanceof Error))
        format.value = "csv"
    else
        format.value = "custom"
})
const recipe = ref([])
const dataConfig = useTemplateRef('data-config')
const layers = ref([])
const layerText = computed(() => {
    return layers.value.map(l => {
        let binds = Object.entries(l.bind).filter(([_, col]) => col)
            .map(([aes, col]) => /^[_\$\p{L}][_\$\p{L}\p{N}]*$/u.test(col) ? `:${aes}="d => d.${col}"` : `:${aes}="d => d['${col}']"`)
        return `<${l.layer} ${binds.join(' ')} />`
    }).join('\n')
})
const tab = ref("plot")
onMounted(() => onpresetchange())
watch([tab, () => dataConfig?.value?.output, templateText, layerText], async ([t]) => {
    if (t == 'plot') nextTick(buildPlot)
}, { immediate: true })
function exportSVG() {
    let blob = new Blob([instance.plot.serialize()])
    let url = URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.href = url
    a.download = 'plot.svg'
    a.click()
    URL.revokeObjectURL(url)
}
function exportPNG() {
    const img = new Image()
    img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => {
            let url = URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            a.download = 'plot.png'
            a.click()
            URL.revokeObjectURL(url)
        }, 'image/png')
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(
        '<?xml version="1.0" standalone="no"?>\r\n' + instance.plot.serialize()
    )))
}
</script>

<template>
    <div
        class="grid grid-cols-[2fr_1fr] grid-rows-[2fr_1fr] overflow-auto flex-1 gap-2 [&>div]:overflow-auto grid-flow-col p-2">
        <div class="flex flex-col">
            <div>
                <label v-for="t in ['data', 'plot']" class="hover:bg-current/5 rounded-md px-2 py-1 inline-block"
                    :class="tab == t ? 'hover:bg-current/15 bg-current/10' : ''">
                    <input type="radio" v-model="tab" :value="t" hidden>{{ t }}
                </label>
            </div>
            <div class="overflow-auto flex-1">
                <DataTable v-if="tab == 'data'" :data="dataConfig?.output"
                    class="w-max whitespace-nowrap [&>thead>tr>th]:sticky [&>thead>tr>th]:top-0 [&>thead>tr>th]:bg-white [&>thead>tr>th:first-child]:z-2" />
                <div id="plot" v-if="tab == 'plot'"></div>
            </div>
        </div>
        <div>
            <pre class="font-mono leading-none flex flex-col h-[99%] w-full whitespace-pre-wrap">&lt;VVPlot :data="data" :width="{{ width }}" :height="{{ height }}" resize&gt;
<div class="ml-[4ch]">{{ layerText }}</div>
<textarea class="ml-[4ch] flex-1 resize-none overflow-auto" v-model="templateText"></textarea>&lt;/VVPlot&gt;</pre>
        </div>
        <div class="row-span-full flex flex-col gap-2">
            <details open>
                <summary class="bg-current/10">data</summary>
                select preset <select v-model="preset" @change="onpresetchange" class="border-b min-w-10">
                    <option v-for="k in Object.keys(presets)" :value="k">{{ k }}</option>
                    <option value="">&nbsp;</option>
                </select> or
                <input type="file" ref="file-input" @change="fileChanged" class="cursor-pointer">
                <textarea v-model.lazy="text" :readonly="fileInput?.files?.length > 0 && text.length > 1e4"
                    class="border-2 border-gray-300 font-mono w-full break-anywhere resize-none leading-none"
                    rows="15"></textarea>
                <div>file format:
                    <select v-model="format" class="border-b outline-none">
                        <option value="json">json</option>
                        <option value="csv">csv</option>
                        <option value="custom">custom</option>
                    </select>
                </div>
                <template v-if="format == 'csv'">
                    <label><input type="checkbox" v-model="header">header</label>
                    <br>
                    <label>separator: <input type="text" v-model="sep"
                            class="font-mono min-w-[1em] border-b outline-none"></label>
                </template>
                <pre class="w-full h-full font-mono leading-none flex-1 flex flex-col" v-if="format == 'custom'">async function(text) {
    <textarea v-model="preprocessFunc" class="ml-[4ch] resize-none overflow-auto field-sizing-content"></textarea>}
</pre>
                <div class="flex flex-row justify-between whitespace-nowrap">
                    <span class="text-red-500 truncate">{{ dataErrorMessage }}</span>
                </div>
            </details>
            <details open>
                <summary class="bg-current/10">data process</summary>
                <DataConfig :data="data" v-model="recipe" ref="data-config" />
            </details>
            <details open>
                <summary class="bg-current/10">layers</summary>
                <LayerConfig :data="data" v-model="layers" ref="layer-config" />
            </details>
            <details open>
                <summary class="bg-current/10">export</summary>
                <button @click="exportSVG" class="cursor-pointer">
                    <span class="font-emoji">⬇</span> download as SVG
                </button>
                <button @click="exportPNG" class="cursor-pointer">
                    <span class="font-emoji">⬇</span> download as PNG
                </button>
            </details>
        </div>
    </div>
</template>
