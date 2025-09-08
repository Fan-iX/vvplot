<script setup>
import { ref } from 'vue'
import { VVPlot, VVAxisX, VVAxisY, VVGeomPoint, VVGeomText, VVGeomSegment, VVGeomTile, VVGeomPath, VVGeomLine, VVGeomBar, VVGeomHistogram, VVGeomPolygon } from '#base/components'
import vvscale from '#base/js/scale'

import iris from './data/iris.json'
import UCBAdmissions from './data/UCBAdmissions.json'
import letters_txt from './data/sentences.txt?raw'
const letters = letters_txt.toLowerCase().replace(/[^a-z]/g, "").split("")
import mtcars_json from './data/mtcars.json'
const mtcars = Object.entries(mtcars_json).map(([k, v]) => ({ model: k, ...v }))
import economics_txt from './data/economics.csv?raw'
const economics = parse_csv(economics_txt)
import pigments_txt from './data/pigments.csv?raw'
const pigments = parse_csv(pigments_txt).flatMap(({ wave_length, ...etc }) =>
    Object.entries(etc).map(([pigment, molar_extinction]) => ({ wave_length, pigment, molar_extinction }))
)

function parse_csv(text) {
    function parse_value(v) {
        if (!isNaN(v)) return +v
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(v)) {
            let [y, m, d] = v.split('-').map(x => +x)
            return Date.UTC(y, m - 1, d)
        }
        return v
    }
    let [header, ...lines] = text.replace(/\r/g, '').split('\n').filter(l => l)
    header = header.split(',')
    return lines.map(l => Object.fromEntries(l.split(',').map((v, i) => [header[i], parse_value(v)])))
}
const render = ref('canvas')
</script>
<template>
    <div>
        render:
        <select v-model="render">
            <option value="svg">svg</option>
            <option value="canvas">canvas</option>
        </select>
    </div>
    <div class="plot-container">
        <pre class="code">{{`<VVPlot :data="mtcars">
    <VVGeomPoint :x="d => d.wt" :y="d => d.mpg" shape="triangle" />
    <VVGeomText :x="d => d.wt" :y="d => d.mpg" :label="d => d.model" :alpha="0.5" />
    <VVGeomSegment :x="d => d.x1" :y="d => d.y1" :xend="d => d.x2" :yend="d => d.y2"
        :data="[{ x1: 2.62, x2: 3.57, y1: 21, y2: 15 }]" color="red" />
</VVPlot>`}}</pre>
        <VVPlot :data="mtcars">
            <VVGeomPoint :x="d => d.wt" :y="d => d.mpg" shape="triangle" :render />
            <VVGeomText :x="d => d.wt" :y="d => d.mpg" :label="d => d.model" :alpha="0.5" :render />
            <VVGeomSegment :x="d => d.x1" :y="d => d.y1" :xend="d => d.x2" :yend="d => d.y2"
                :data="[{ x1: 2.62, x2: 3.57, y1: 21, y2: 15 }]" color="red" :render />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="UCBAdmissions">
    <VVGeomTile :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :fill="d => d.Freq" :width="0.8"
        :height="0.8" :scales="{ fill: vvscale.color.gradient2({ midpoint: null }) }" />
    <VVGeomText :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :color="d => d.Freq" :label="d => d.Freq" />
</VVPlot>`}}</pre>
        <VVPlot :data="UCBAdmissions">
            <VVGeomTile :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :fill="d => d.Freq" :width="0.8"
                :height="0.8" :scales="{ fill: vvscale.color.gradient2({ midpoint: null }) }" :render />
            <VVGeomText :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :color="d => d.Freq" :label="d => d.Freq"
                :render />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="economics">
    <VVAxisX title="unemployment rate" />
    <VVAxisY title="personal savings rate" />
    <VVGeomPath :x="d => d.unemploy / d.pop" :y="d => d.psavert" :color="(d, i) => i"
        :scales="{ color: vvscale.color.hue() }" />
</VVPlot>`}}</pre>
        <VVPlot :data="economics">
            <VVAxisX title="unemployment rate" />
            <VVAxisY title="personal savings rate" />
            <VVGeomPath :x="d => d.unemploy / d.pop" :y="d => d.psavert" :color="(d, i) => i"
                :scales="{ color: vvscale.color.hue() }" :render />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="letters">
    <VVAxisY :min="0" :expand-mult="0" />
    <VVGeomBar :x="d => d" :fill="d => d" :scales="{ fill: vvscale.custom((v) => ['blue', 'gold'][v % 2]) }" />
</VVPlot>`}}</pre>
        <VVPlot :data="letters">
            <VVAxisY :min="0" :expand-mult="0" />
            <VVGeomBar :x="d => d" :fill="d => d" :scales="{ fill: vvscale.custom((v) => ['blue', 'gold'][v % 2]) }"
                :render />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="iris">
    <VVGeomHistogram :x="d => d.Petal_Width" :color="d => d.Species" :fill="d => d.Species" :alpha="0.5" :scales="{ color: vvscale.color.hue({ l: 45 }) }" />
</VVPlot>`}}</pre>
        <VVPlot :data="iris">
            <VVGeomHistogram :x="d => d.Petal_Width" :color="d => d.Species" :fill="d => d.Species" :alpha="0.5"
                :scales="{ color: vvscale.color.hue({ l: 45 }) }" :render />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="pigments">
    <VVGeomLine :x="d => d.wave_length" :y="d => d.molar_extinction" :color="d => d.pigment" :group="d => d.pigment"
        :scales="{ color: vvscale.color.manual({ values: { beta_carotene: 'orangered', chlorophyll_a: 'limegreen', chlorophyll_b: 'royalblue' } }) }" />
</VVPlot>`}}</pre>
        <VVPlot :data="pigments">
            <VVGeomLine :x="d => d.wave_length" :y="d => d.molar_extinction" :color="d => d.pigment"
                :group="d => d.pigment"
                :scales="{ color: vvscale.color.manual({ values: { beta_carotene: 'orangered', chlorophyll_a: 'limegreen', chlorophyll_b: 'royalblue' } }) }"
                :render />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="iris">
    <VVGeomPolygon :points="d => [
        { x: d.Petal_Width - 0.1, y: d.Sepal_Length },
        { x: d.Petal_Width, y: d.Sepal_Length - 0.1 },
        { x: d.Petal_Width + 0.1, y: d.Sepal_Length },
        { x: d.Petal_Width, y: d.Sepal_Length + 0.1 },
    ]" :color="d => d.Species" :fill="d => d.Species" />
</VVPlot>`}}</pre>
        <VVPlot :data="iris">
            <VVGeomPolygon :points="d => [
                { x: d.Petal_Width - 0.1, y: d.Sepal_Length },
                { x: d.Petal_Width, y: d.Sepal_Length - 0.1 },
                { x: d.Petal_Width + 0.1, y: d.Sepal_Length },
                { x: d.Petal_Width, y: d.Sepal_Length + 0.1 },
            ]" :color="d => d.Species" :fill="d => d.Species" :render />
        </VVPlot>
        <hr>
    </div>
</template>
<style scoped>
.vvplot {
    width: 600px;
    height: 400px;
}
</style>
