<script setup>
import { ref, computed, useTemplateRef, watch, shallowRef, compile } from 'vue'
import { useTextareaAutosize, useElementSize, asyncComputed, useStorage } from '@vueuse/core'
import { read_csv } from './script/utils'

import vvscale from '#base/js/scale'
import vvtheme from '#base/js/theme'
import vvbreak from '#base/js/break'

import iris from './data/iris.json'
import UCBAdmissions from './data/UCBAdmissions.json'
import letters_txt from './data/sentences.txt?raw'
const letters = letters_txt.toLowerCase().replace(/[^a-z]/g, "").split("")
import mtcars_json from './data/mtcars.json'
const mtcars = Object.entries(mtcars_json).map(([k, v]) => ({ model: k, ...v }))
import economics_txt from './data/economics.csv?raw'
const economics = read_csv(economics_txt).map((x, _, a) => Object.fromEntries(a.columns.map((c, i) => [c, x[i]])))
import pigments_txt from './data/pigments.csv?raw'
const pigments = read_csv(pigments_txt)
    .map((x, _, a) => Object.fromEntries(a.columns.map((c, i) => [c, x[i]])))
    .flatMap(({ wave_length, ...etc }) =>
        Object.entries(etc).map(([pigment, molar_extinction]) => ({ wave_length, pigment, molar_extinction }))
    )

const templates = {
    iris: `<VVAxisY :position="0" :extend="1">
    <VVAction :zoom="{ max: 10, min: -2 }" :move="{ min: -2 }" :rescale="{ max: 10 }" />
</VVAxisY>
<VVAxisX position="center" :extend="1">
    <VVAction move :nudge="{ shift: true }" :min="-2" :max="10" />
    <VVAction :zoom="{ min: -5 }" :rescale="{ max: 10 }" :min-range="4" />
</VVAxisX>
<VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
    :shape="d => d.Species"
    :scales="{ color: vvscale.color.default({ key: 'Species' }), shape: vvscale.shape.default({ key: 'Species' }) }" />`,
    mtcars: `<VVGeomPoint :x="d => d.wt" :y="d => d.mpg" shape="triangle" />
<VVGeomText :x="d => d.wt" :y="d => d.mpg" :label="d => d.model" :alpha="0.5" :angle="-15" :anchor-x="0" :anchor-y="0.5" :translate-x="6" :translate-y="-2" />
<VVGeomSegment :x="d => d.x1" :y="d => d.y1" :xend="d => d.x2" :yend="d => d.y2"
    :data="[{ x1: 2.62, x2: 3.57, y1: 21, y2: 15 }]" color="red" linetype="dashed" />`,
    letters: `<VVAxisY :min="0" :expand-mult="0" />
<VVGeomBar :x="d => d" :fill="d => d" :scales="{ fill: vvscale.custom((v) => ['blue', 'gold'][v % 2]) }" />`,
    pigments: `<VVGeomLine :x="d => d.wave_length" :y="d => d.molar_extinction" :color="d => d.pigment" :group="d => d.pigment"
    :scales="{ color: vvscale.color.manual({ values: { beta_carotene: 'orangered', chlorophyll_a: 'limegreen', chlorophyll_b: 'royalblue' } }) }" />`,
    UCBAdmissions: `<VVGeomTile :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :fill="d => d.Freq" :width="0.8" :height="0.8" :alpha="0.4"
        :scales="{ fill: vvscale.color.gradient2({ midpoint: null, limits: [0, 500], breaks: [0, 250, 500] }) }" />
<VVGeomText :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :color="d => d.Freq" :label="d => d.Freq" />`,
    economics: `<VVAxisY :labels="v => \`\${v * 100}%\`" :expand-mult="{ min: 0.2, max: 0.1 }" title="unemployment rate">
    <VVAction move rescale zoom />
</VVAxisY>
<VVAxisX position="10%" :theme="{ ticks_length: 3, text_angle: 45, ticks_anchor_x: 0 }"
    :show-grid="false" :extend="0.5">
    <VVAction move rescale zoom />
</VVAxisX>
<VVGeomLine :x="d => new Date(d.date)" :y="d => d.unemploy / d.pop" />`,
}

const plotRef = useTemplateRef('plot')
const { width, height } = useElementSize(plotRef)
const fileInputRef = useTemplateRef('file-input')
const file = ref(null)
const fileText = asyncComputed(() => file.value?.text?.(), null)

const dataset = { iris, mtcars, UCBAdmissions, letters, economics, pigments }
const dataOptions = Object.keys(dataset)
const dataKey = ref("iris")

const { textarea, input } = useTextareaAutosize()
input.value = templates[dataKey.value]

function switchData(d) {
    file.value = null
    dataKey.value = d
    input.value = templates[d]
    doRender()
}

function onchange(e) {
    if (e.target.files.length > 0) {
        file.value = e.target.files?.[0]
        dataKey.value = "data"
    }
}
function onpaste(e) {
    if (e.clipboardData.files.length > 0) {
        file.value = e.clipboardData.files[0]
        dataKey.value = "data"
    } else if (e.clipboardData.types.includes('text/plain')) {
        const text = e.clipboardData.getData('text/plain')
        file.value = new File([text], "clipboard.txt", { type: 'text/plain' })
        dataKey.value = "data"
    }
}

const csvHeader = ref(true)
const csvSeparator = ref(',')
const fileData = computed(() => read_csv(fileText.value ?? "", { header: csvHeader.value, separator: new RegExp(csvSeparator.value) }))
const columns = ref([])
watch(fileData, (v, ov) => {
    columns.value = fileData.value.columns ?? []
    if (columns.value.length >= 2) {
        input.value = `<VVGeomPoint :x="d => d['${columns.value[0]}']" :y="d => d['${columns.value[1]}']" />`
        doRender()
    }
})

const data = computed(() => {
    if (dataKey.value === "data") return fileData.value.map(x => Object.fromEntries(columns.value.map((c, i) => [c, x[i]])))
    return dataset[dataKey.value]
})
const colnames = computed(() => Object.keys(data.value?.[0] || {}))

const errMessage = ref("")
const bind = shallowRef()
watch(data, doRender, { immediate: true })

function doRender() {
    let vBind = { vvscale, vvbreak, vvtheme, data: data.value }
    errMessage.value = ""
    try {
        compile(input.value, { decodeEntities: true })(vBind, {})
    } catch (e) {
        errMessage.value = `${e.constructor.name}: ${e.message}`
        console.error(e)
        return
    }
    bind.value = {
        is: {
            template: `<VVPlot :width="600" :height="400" :data="data" resize legend-teleport="#legend">${input.value}</VVPlot>`,
            props: Object.keys(vBind),
        },
        vBind
    }
}
</script>

<template>
    <article class="flex flex-col gap-1">
        <h2>VVPlot playgroud</h2>
        <div class="flex flex-row gap-4">
            choose a data preset:
            <button v-for="d in dataOptions" class="cursor-pointer hover:text-current/50" @click="switchData(d)">
                {{ d }}
            </button>
        </div>
        <div class="flex">
            <component :is="bind.is" v-bind="bind.vBind" ref="plot" key="plot" />
            <div id="legend" key="legend"></div>
        </div>
        or try with your own data:
        <div>
            <div>
                <button @click="fileInputRef?.click?.()" class="cursor-pointer">pick</button>
                or
                <span tabindex="0"
                    class="focus:outline-dashed focus:outline-black focus:outline-2 italic text-gray-500 focus:text-inherit"
                    @paste="onpaste">paste</span>
                a csv file/text
                {{ file?.name }}
                <input type="file" ref="file-input" @change="onchange" hidden>
            </div>
            <div class="flex gap-2" v-if="file">
                <label><input type="checkbox" v-model="csvHeader">header</label>
                <label>separator: <input type="text" v-model="csvSeparator"
                        class="min-w-4 outline-none border-b border-black"></label>
            </div>
            <div class="flex gap-2" v-if="file">
                column names:
                <input type="text" v-model="columns[i]" v-for="col, i in columns" :key="i"
                    class="min-w-4 outline-none border-b border-black">
            </div>
        </div>

        <pre class="code leading-none">{{ `<VVPlot :width="${width}" :height="${height}" :data="${dataKey}">\n` }}<textarea
            ref="textarea" v-model="input" class="pl-[4ch] w-full resize-none"></textarea>{{ `\n</VVPlot>` }}</pre>
        <div class="flex justify-between">
            <div class="text-red-500">{{ errMessage }}</div>
            <button @click="doRender()"
                class="border border-current rounded-md px-4 py-1 hover:bg-gray-500/10">apply</button>
        </div>

        <details open>
            <summary>data preview</summary>
            <div class="overflow-auto">
                <table class="table-auto border-collapse">
                    <tr>
                        <th v-for="col in colnames" class="p-1 border border-slate-400">{{ col }}</th>
                    </tr>
                    <tr v-for="row in data.slice(0, 5)">
                        <td v-for="col in colnames" class="p-1 border border-slate-400 text-center">{{ row[col] }}</td>
                    </tr>
                </table>
            </div>
        </details>
    </article>
</template>
