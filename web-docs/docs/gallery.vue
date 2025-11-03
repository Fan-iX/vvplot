<script setup>
import { ref } from 'vue'
import { read_csv } from '../script/utils'
import vvscale from '#base/js/scale'
import vvtheme from '#base/js/theme'
import vvbreak from '#base/js/break'
import vvlabel from '#base/js/label'

import iris from '../data/iris.json'
import UCBAdmissions from '../data/UCBAdmissions.json'
import letters_txt from '../data/sentences.txt?raw'
const letters = letters_txt.toLowerCase().replace(/[^a-z]/g, "").split("")
import mtcars_json from '../data/mtcars.json'
const mtcars = Object.entries(mtcars_json).map(([k, v]) => ({ model: k, ...v }))
import economics_txt from '../data/economics.csv?raw'
const economics = read_csv(economics_txt).map((x, _, a) => Object.fromEntries(a.columns.map((c, i) => [c, x[i]])))
import pigments_txt from '../data/pigments.csv?raw'
const pigments = read_csv(pigments_txt)
    .map((x, _, a) => Object.fromEntries(a.columns.map((c, i) => [c, x[i]])))
    .flatMap(({ wave_length, ...etc }) =>
        Object.entries(etc).map(([pigment, molar_extinction]) => ({ wave_length, pigment, molar_extinction }))
    )

const templates = ref({})
const vBind = {
    iris, mtcars, UCBAdmissions, letters, economics, pigments,
    vvscale, vvtheme, vvbreak, vvlabel
}
</script>
<template>
    <article>
        <section>
            <h2>Gallery</h2>
            <pre class="code">{{templates[1] = `<VVPlot :data="mtcars">
    <VVGeomPoint :x="d => d.wt" :y="d => d.mpg" shape="triangle" />
    <VVGeomText :x="d => d.wt" :y="d => d.mpg" :label="d => d.model" :alpha="0.5" :angle="-15" :anchor-x="0" :anchor-y="0.5" :translate-x="6" :translate-y="-2" />
    <VVGeomSegment :x="d => d.x1" :y="d => d.y1" :xend="d => d.x2" :yend="d => d.y2"
        :data="[{ x1: 2.62, x2: 3.57, y1: 21, y2: 15 }]" color="red" linetype="dashed" />
</VVPlot>`}}</pre>
            <div class="flex flex-row">
                <component :is="{ template: templates[1], props: Object.keys(vBind) }" v-bind="vBind" />
                <div id="legend-1"></div>
            </div>
            <hr>
            <pre class="code">{{templates[2] = `<VVPlot :data="UCBAdmissions" legend-teleport="#legend-2">
    <VVGeomTile :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :fill="d => d.Freq" :width="0.8" :height="0.8" :alpha="0.4"
        :scales="{ fill: vvscale.color.gradient2({ midpoint: null, limits: [0, 500], breaks: [0, 250, 500] }) }" />
    <VVGeomText :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :color="d => d.Freq" :label="d => d.Freq" />
</VVPlot>`}}</pre>
            <div class="flex flex-row">
                <component :is="{ template: templates[2], props: Object.keys(vBind) }" v-bind="vBind" />
                <div id="legend-2"></div>
            </div>
            <hr>
            <pre class="code">{{templates[3] = `<VVPlot :data="economics" legend-teleport="#legend-3">
    <VVAxisX title="unemployment rate" />
    <VVAxisY title="personal savings rate" />
    <VVGeomPath :x="d => d.unemploy / d.pop" :y="d => d.psavert" :color="(d, i) => i" :linewidth="d => d.pop" linetype="22"
        :scales="{ color: vvscale.color.hue({ guide: 'legendkey', key: 'pop' }), linetype: vvscale.linetype.default({ key: 'pop' }) }" />
</VVPlot>`}}</pre>
            <div class="flex flex-row">
                <component :is="{ template: templates[3], props: Object.keys(vBind) }" v-bind="vBind" />
                <div id="legend-3"></div>
            </div>
            <hr>
            <pre class="code">{{templates[4] = `<VVPlot :data="letters" legend-teleport="#legend-4">
    <VVAxisY :min="0" :expand-mult="0" />
    <VVGeomBar :x="d => d" :fill="d => d" :scales="{ fill: vvscale.custom((v) => ['blue', 'gold'][v % 2]) }" />
</VVPlot>`}}</pre>
            <div class="flex flex-row">
                <component :is="{ template: templates[4], props: Object.keys(vBind) }" v-bind="vBind" />
                <div id="legend-4"></div>
            </div>
            <hr>
            <pre class="code">{{templates[5] = `<VVPlot :data="iris" legend-teleport="#legend-5">
    <VVGeomHistogram :x="d => d.Petal_Width" :color="d => d.Species" :fill="d => d.Species" :alpha="0.5" 
        :scales="{ color: vvscale.color.hue({ l: 45, key: 'Species' }), fill: vvscale.fill.default({ key: 'Species' }) }" />
    <VVGeomDensity :x="d => d.Petal_Width" :color="d => d.Species"
        :scales="{ color: vvscale.fill.default({ key: 'Species' }) }" />
</VVPlot>`}}</pre>
            <div class="flex flex-row">
                <component :is="{ template: templates[5], props: Object.keys(vBind) }" v-bind="vBind" />
                <div id="legend-5"></div>
            </div>
            <hr>
            <pre class="code">{{templates[6] = `<VVPlot :data="pigments" legend-teleport="#legend-6">
    <VVGeomLine :x="d => d.wave_length" :y="d => d.molar_extinction" :color="d => d.pigment" :group="d => d.pigment"
        :scales="{ color: vvscale.color.manual({ values: { beta_carotene: 'orangered', chlorophyll_a: 'limegreen', chlorophyll_b: 'royalblue' } }) }" />
</VVPlot>`}}</pre>
            <div class="flex flex-row">
                <component :is="{ template: templates[6], props: Object.keys(vBind) }" v-bind="vBind" />
                <div id="legend-6"></div>
            </div>
            <hr>
            <pre class="code">{{templates[7] = `<VVPlot :data="iris">
    <VVGeomPolygon :points="d => [
        { x: d.Petal_Width - 0.1, y: d.Sepal_Length },
        { x: d.Petal_Width, y: d.Sepal_Length - 0.1 },
        { x: d.Petal_Width + 0.1, y: d.Sepal_Length },
        { x: d.Petal_Width, y: d.Sepal_Length + 0.1 },
    ]" :color="d => d.Species" :fill="d => d.Species" />
</VVPlot>`}}</pre>
            <div class="flex flex-row">
                <component :is="{ template: templates[7], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
            <pre class="code">{{templates[8] = `<VVPlot :data="iris" legend-teleport="#legend-8" flip :clip="false">
    <VVAxisY :position="0" :extend="1">
        <VVAction :zoom="{ max: 10, min: -2 }" :move="{ min: -2 }" :rescale="{ max: 10 }" />
    </VVAxisY>
    <VVAxisX position="center" :extend="1">
        <VVAction move :nudge="{ shift: true }" :min="-2" :max="10" />
        <VVAction :zoom="{ min: -5 }" :rescale="{ max: 10 }" :min-range="4" />
    </VVAxisX>
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" :shape="d => d.Species"
         :scales="{ color: vvscale.color.default({ key: 'Species' }), shape: vvscale.shape.default({ key: 'Species' }) }" />
    <VVSelection x />
    <VVAction nudge shift />
    <VVAction :move="{ button: 'right' }" :xmin="-2" :xmax="10" :ymin="-2" />
    <VVAction :zoom="{ xmin: -5, xmax: 10 }" :ymin="-2" :ymax="10" :min-range-y="4"/>
</VVPlot>`}}</pre>
            <div class="flex flex-row">
                <component :is="{ template: templates[8], props: Object.keys(vBind) }" v-bind="vBind" />
                <div id="legend-8"></div>
            </div>
            <hr>
            <pre class="code">{{templates[9] = `<VVPlot :data="economics" :theme="{ plot: { margin_right: 50 } }">
        <VVAxisY :labels="v => \`\${v * 100}%\`" :expand-mult="{ min: 0.2, max: 0.1 }" title="unemployment rate"
            :theme="{ title_color: 'gray' }">
            <VVAction move rescale zoom />
        </VVAxisY>
        <VVAxisX position="10%"
            :theme="{ tick_length: 3, title_position: 'right', title_size: 16, text_angle: 45, tick_anchor_x: 0 }"
            :show-grid="false" title="date" :extend="0.5">
            <VVAction move rescale zoom />
        </VVAxisX>
        <VVGeomLine :x="d => new Date(d.date)" :y="d => d.unemploy / d.pop" />
    </VVPlot>`}}</pre>
            <component :is="{ template: templates[9], props: Object.keys(vBind) }" v-bind="vBind" />
            <hr>
            <pre class="code">{{templates[10] = `<VVPlot :data="economics">
        <VVAxisX :labels="vvlabel.timestamp({ format: 'yyyy/MM' })" position="top" />
        <VVAxisY position="left" primary />
        <VVAxisY position="right" />
        <VVAxisX position="bottom" secondary />
        <VVGeomLine :x="d => new Date(d.date)" :y="d => d.pop" />
    </VVPlot>`}}</pre>
            <component :is="{ template: templates[10], props: Object.keys(vBind) }" v-bind="vBind" />
            <hr>
            <pre class="code">{{templates[11] = `<VVPlot :data="[{ x: 2, y: -1 }, { x: -1, y: 2 }]">
        <VVAxisX :position="0" :expand-mult="1" :breaks="vvbreak.number({ step: 1 })" title="x"
            :theme="{ title_position: 'right', title_size: 16 }">
            <VVAction move rescale zoom />
        </VVAxisX>
        <VVAxisY :position="0" :expand-mult="1" :extend="1" title="y"
            :theme="{ title_position: 'top', title_dock_x: 0, title_size: 16, title_angle: 0 }">
            <VVAction move rescale zoom />
        </VVAxisY>
        <VVGeomPoint :x="d => d.x" :y="d => d.y" />
    </VVPlot>`}}</pre>
            <component :is="{ template: templates[11], props: Object.keys(vBind) }" v-bind="vBind" />
            <hr>
            <pre class="code">{{templates[12] = `<VVPlot :data="letters">
        <VVAxisX :expand-add="1" :expand-mult="0" :levels="['x', 'y', 'z', '', 'a', 'b', 'c']" :position="0" />
        <VVAxisY position="center" :theme="{ tick_anchor_y: 1 }" />
        <VVGeomBar :x="d => d" />
    </VVPlot>`}}</pre>
            <component :is="{ template: templates[12], props: Object.keys(vBind) }" v-bind="vBind" />
        </section>
    </article>
</template>
<style scoped>
.vvplot {
    width: 600px;
    height: 400px;
}
</style>
