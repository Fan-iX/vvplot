<script setup>
import { createApp, ref, useTemplateRef, onMounted, computed } from 'vue'
import { useTextareaAutosize, asyncComputed, useStorage } from '@vueuse/core'

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

import * as components from '#base/components'
import vvscale, { oob } from '#base/js/scale'
import vvtheme from '#base/js/theme'
import vvbreak from '#base/js/break'
import vvlabel from '#base/js/label'

import iris_text from './data/iris.json?raw'
import UCBAdmissions_text from './data/UCBAdmissions.json?raw'
import letters_txt from './data/sentences.txt?raw'
import mtcars_text from './data/mtcars.json?raw'
import economics_txt from './data/economics.csv?raw'
import pigments_txt from './data/pigments.csv?raw'

const textFiles = {
    iris: new File([iris_text], "iris.json", { type: 'application/json' }),
    UCBAdmissions: new File([UCBAdmissions_text], "UCBAdmissions.json", { type: 'application/json' }),
    letters: new File([letters_txt], "sentences.txt", { type: 'text/plain' }),
    mtcars: new File([mtcars_text], "mtcars.json", { type: 'application/json' }),
    economics: new File([economics_txt], "economics.csv", { type: 'text/csv' }),
    pigments: new File([pigments_txt], "pigments.csv", { type: 'text/csv' }),
}
const preprocessFuncs = {
    iris: `return JSON.parse(text)`,
    UCBAdmissions: `return JSON.parse(text)`,
    letters: `return text.toLowerCase().replace(/[^a-z]/g, "").split("")`,
    mtcars: `const obj = JSON.parse(text);
return Object.entries(obj).map(([k, v]) => ({ model: k, ...v }))`,
    economics: `return read_table(text)`,
    pigments: `return read_table(text)
    .flatMap(({ wave_length, ...etc }) =>
        Object.entries(etc).map(([pigment, molar_extinction]) => ({ wave_length, pigment, molar_extinction }))
    )`,
}
const templates = {
    iris: `<VVAxisY :position="0" :extend="1">
    <VVAction :zoom="{ max: 10, min: -2 }" :move="{ min: -2 }" :rescale="{ max: 10 }" />
</VVAxisY>
<VVAxisX position="center" :extend="1">
    <VVAction move :nudge="{ shift: true }" :min="-2" :max="10" />
    <VVAction :zoom="{ min: -5 }" :rescale="{ max: 10 }" :min-range="4" />
</VVAxisX>
<VVAction zoom move />
<VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
    :shape="d => d.Species"
    :scales="{ color: vvscale.color.default({ key: 'Species' }), shape: vvscale.shape.default({ key: 'Species' }) }" />`,
    mtcars: `<VVGeomPoint :x="d => d.wt" :y="d => d.mpg" shape="triangle" />
<VVGeomText :x="d => d.wt" :y="d => d.mpg" :label="d => d.model" :alpha="0.5" :angle="-15" :anchor-x="0" :anchor-y="0.5" :translate-x="6" :translate-y="-2" />
<VVGeomSegment :x="d => d.x1" :y="d => d.y1" :xend="d => d.x2" :yend="d => d.y2"
    :data="[{ x1: 2.62, x2: 3.57, y1: 21, y2: 15 }]" color="red" linetype="dashed" />`,
    letters: `<VVAxisY :min="0" :expand-mult="0" />
<VVGeomBar :x="d => d" :fill="d => d" :scales="{ fill: vvscale.fill.custom((v) => ['blue', 'gold'][v % 2]) }" />
<VVAction zoom move />`,
    pigments: `<VVGeomLine :x="d => d.wave_length" :y="d => d.molar_extinction" :color="d => d.pigment" :group="d => d.pigment"
    :scales="{ color: vvscale.color.manual({ values: { beta_carotene: 'orangered', chlorophyll_a: 'limegreen', chlorophyll_b: 'royalblue' } }) }" />
<VVAction zoom move />`,
    UCBAdmissions: `<VVGeomTile :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :fill="d => d.Freq" :width="0.8" :height="0.8" :alpha="0.4"
        :scales="{ fill: vvscale.color.gradient2({ midpoint: null, limits: [0, 500], breaks: [0, 250, 500] }) }" />
<VVGeomText :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :color="d => d.Freq" :label="d => d.Freq" />
<VVAction zoom move />`,
    economics: `<VVAxisY :labels="vvlabel.default({scale:100,suffix:'%'})" :expand-mult="{ min: 0.2, max: 0.1 }" title="unemployment rate">
    <VVAction move rescale zoom />
</VVAxisY>
<VVAxisX position="10%" :theme="{ tick_length: 3, text_angle: 45, tick_anchor_x: 0 }"
    :show-grid="false" :extend="0.5">
    <VVAction move rescale zoom />
</VVAxisX>
<VVGeomLine :x="d => new Date(d.date)" :y="d => d.unemploy / d.pop" />
<VVAction zoom move />`,
}

const file = ref(null)
const fileInput = useTemplateRef('file-input')
const textInput = ref("")
const AsyncFunction = (async function () { }).constructor
function useData(d) {
    file.value = textFiles[d]
    preprocessFunc.value = preprocessFuncs[d]
    templateText.value = templates[d]
    if (fileInput.value) {
        let dataTransfer = new DataTransfer();
        dataTransfer.items.add(textFiles[d]);
        fileInput.value.files = dataTransfer.files;
    }
    buildPlot()
}
const dataInputMode = ref("file")
const preprocessFunc = ref("")
const templateText = ref("")

const fileContentLoading = ref(false)
const fileContent = asyncComputed(() => file.value?.text?.() ?? "", "", { evaluating: fileContentLoading })

const processedData = asyncComputed(async () => {
    let text = dataInputMode.value === "file" ? fileContent.value : textInput.value
    let scope = { read_table }
    try {
        let func = new AsyncFunction("text", ...Object.keys(scope), preprocessFunc.value)
        return await func(text, ...Object.values(scope))
    } catch (e) {
        return e
    }
}, [])
const data = computed(() => processedData.value instanceof Error ? [] : processedData.value)
const dataErrorMessage = computed(() => processedData.value instanceof Error ? `Error: ${processedData.value.message}` : null)

function textBlur() {
    if (textInput.value.trim() === "") return
    dataInputMode.value = 'text'
    preprocessFunc.value = "return read_table(text)"
    templateText.value = ""
}
const fileChanged = (e) => {
    if (e.target.files.length > 0) {
        file.value = e.target.files?.[0]
    }
    preprocessFunc.value = "return read_table(text)"
    templateText.value = `
<VVAction zoom move />`
}

let app, instance
async function buildPlot() {
    if (instance) app.unmount()
    let template = `<VVPlot ref="plot" :data="data" ${attrsText.value}
${templateText.value}
</VVPlot>`
    app = createApp({
        setup() {
            const plot = ref(null)
            return { data, plot, vvscale, vvtheme, vvbreak, vvlabel, oob, read_table }
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

const dialog = useTemplateRef('dialog')
const dialogContent = ref()
const dialogContentColumns = ref()
function closeDialog() {
    dialog.value.close()
}
function previewFile() {
    dialogContentColumns.value = null
    if (fileContent.value?.length < 5000) {
        dialogContent.value = fileContent.value
    } else {
        dialogContent.value = fileContent.value.slice(0, 5000) + "..."
    }
    dialog.value.showModal()
}
function previewData() {
    dialogContent.value = data.value.slice(0, 25)
    dialogContentColumns.value = Array.from(new Set(dialogContent.value.flatMap(d => typeof d == "object" ? Object.keys(d) : [])))
    dialog.value.showModal()
}

const { textarea: attrsTextarea, input: attrsText } = useTextareaAutosize()
attrsText.value = `:width="600" :height="400" resize>`

function exportSVG() {
    let blob = new Blob([instance.plot.serialize()])
    let url = URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.href = url
    a.download = 'plot.svg'
    a.click()
    URL.revokeObjectURL(url)
}

onMounted(() => { useData('iris') })
</script>

<template>
    <div class="grid grid-cols-2 grid-rows-3 grid-flow-col overflow-auto flex-1 gap-2 p-2">
        <div class="flex flex-col border">
            <h4>1. data</h4>
            <label><input type="radio" name="data-input-mode" value="file" v-model="dataInputMode"> file</label>
            <div class="flex flex-row justify-between whitespace-nowrap">
                <input type="file" ref="file-input" @change="fileChanged" class="cursor-pointer">
                <button @click="previewFile" class="cursor-pointer">preview file content</button>
            </div>
            <div v-if="dataInputMode == 'file'">
                presets:
                <div class="inline-flex gap-2 flex-row">
                    <span v-for="_, d in textFiles" class="cursor-pointer hover:text-current/50" @click="useData(d)">
                        {{ d }}
                    </span>
                </div>
            </div>
            <label><input type="radio" name="data-input-mode" value="text" v-model="dataInputMode"> text</label>
            <textarea v-model="textInput" @blur="textBlur"
                class="border-2 border-[#cccccc] rounded-lg flex-1 resize-none"></textarea>
        </div>
        <div class="flex flex-col border">
            <h4>2. preprocess</h4>
            <pre class="w-full h-full font-mono leading-none flex-1 flex flex-col">async function(text) {
<textarea v-model="preprocessFunc" class="ml-[4ch] resize-none overflow-x flex-1"></textarea>}</pre>
            <div class="flex flex-row justify-between whitespace-nowrap">
                <span class="text-red-500 truncate">{{ dataErrorMessage }}</span>
                <button @click="previewData" class="cursor-pointer">preview processed data</button>
            </div>
        </div>
        <div class="flex flex-col border">
            <h4>3. plot definition</h4>
            <pre class="w-full h-full font-mono leading-none flex flex-col">&lt;VVPlot :data="data"
<textarea ref="attrsTextarea" v-model="attrsText" class="ml-[2ch] resize-none"></textarea>
<textarea class="ml-[4ch] flex-1 resize-none overflow-auto" v-model="templateText"></textarea>&lt;/VVPlot&gt;</pre>
        </div>
        <div class="border overflow-auto row-span-2">
            <div id="plot"></div>
        </div>
        <div class="border flex flex-col">
            <div>
                <button @click="buildPlot">refresh plot</button>
                <button @click="exportSVG">download as SVG</button>
            </div>
        </div>
    </div>
    <dialog ref="dialog" class="w-2/3 h-2/3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="flex flex-col overflow-auto h-full p-4">
            <h4>data</h4>
            <div v-if="dialogContentColumns?.length" class="overflow-auto font-mono">
                <table
                    class="whitespace-nowrap w-full [&_th,&_td]:p-1 [&_th,&_td]:text-center [&_td]:shadow-[-0.5px_-0.5px_0_0_black,_-0.5px_-0.5px_0_0_black_inset] [&_th]:sticky [&_th]:bg-white">
                    <thead>
                        <tr>
                            <th
                                class="top-0 left-0 z-50 shadow-[0.5px_0.5px_0_0_black_inset,_-0.5px_-0.5px_0_0_black_inset]">
                                #</th>
                            <th v-for="col in dialogContentColumns"
                                class="top-0 shadow-[0_0.5px_0_0_black_inset,_-0.5px_-0.5px_0_0_black_inset]">
                                {{ col }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row, i in dialogContent">
                            <th class="left-0 z-40 shadow-[0.5px_0_0_0_black_inset,_-0.5px_-0.5px_0_0_black_inset]">
                                {{ i }}
                            </th>
                            <td v-for="col in dialogContentColumns" class="text-center">
                                {{ row[col] }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <pre v-else class="overflow-auto flex-1 whitespace-pre-wrap">{{ dialogContent }}</pre>
            <div>
                <button @click="closeDialog">close</button>
            </div>
        </div>
    </dialog>
</template>
