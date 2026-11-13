<script setup>
import { ref } from 'vue'
import { vvscale } from '#src/index.ts'

import iris from '../data/iris.json'
import CO2 from '../data/CO2.json'
import UCBAdmissions from '../data/UCBAdmissions.json'
import letters_txt from '../data/sentences.txt?raw'
const letters = letters_txt.toLowerCase().replace(/[^a-z]/g, "").split("")
const vBind = { CO2, iris, UCBAdmissions, letters, vvscale }
const templates = ref({})
</script>
<template>
    <article>
        <section>
            <h2>Plot legend</h2>
            <p>
                In VVPlot, legends will be rendered in the DOM element specified by the
                <code>legend-teleport</code> prop of the <code>&lt;VVPlot&gt;</code> component.
            </p>
            <hr>
            <pre-highlight lang="html">{{templates[1] = `<VVPlot :data="CO2" :width="600" :height="400" legend-teleport="#legend-1">
    <VVGeomPoint :x="d => d.conc" :y="d => d.uptake"
        :color="d => d.Type" :shape="d => d.Treatment" />
    <VVGeomLine :x="d => d.conc" :y="d => d.uptake"
        :color="d => d.Type" :group="d => d.Plant" />
</VVPlot>
<div id="legend-1" class="p-1 border"></div>` }}</pre-highlight>
            <div class="flex flex-row items-start">
                <component :is="{ template: templates[1], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
            <p>
                Two different legend guide types are supported:
            </p>
            <ul>
                <li><code>legendkey</code>: A list of key-value pairs, where the key is the legend title and the value
                    is the list of items in the legend.</li>
                <li><code>gradientbar</code>: A continuous gradient bar that represents the range of values for a
                    continuous aesthetic. This is the default for
                    continuous <code>color</code>, <code>fill</code> and <code>alpha</code> aesthetics.</li>
            </ul>
            <hr>
            <pre-highlight lang="html">{{templates[2] = `<VVPlot :data="UCBAdmissions" :width="600" :height="400" legend-teleport="#legend-2">
    <VVGeomTile :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :alpha="d => d.Freq"
        :fill="d => d.Admit" :width="0.8" :height="0.8"
        :scales="{ fill: vvscale.color.manual({ values: ['lightgreen', 'lightcoral'] }) }" />
    <VVGeomText :x="d => d.Gender + '_' + d.Admit" :y="d => d.Dept" :label="d => d.Freq" />
</VVPlot>
<div id="legend-2"></div>` }}</pre-highlight>
            <div class="flex flex-row">
                <component :is="{ template: templates[2], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
            <p>
                Aesthetics mapping to the same categorical levels will be merged into a single guide entry.
            </p>
            <p>
                To split legends for different aesthetics with the same categorical levels,
                you can set different <code>key</code> properties for the scaling functions.
            </p>
            <p>
                The first available <code>title</code> property of the scaling function will be used as the title label
                of the legend guide.
                If none is set, the string representation of the aesthetic function will be used.
            </p>
            <hr>
            <pre-highlight lang="html">{{templates[3] = `<VVPlot :data="iris" :width="600" :height="400" :scales="{
        color: vvscale.color.default({ key: 'color', title: 'Color and Fill' }),
        fill: vvscale.fill.default({ key: 'color', alpha: 0.2 }),
        shape: vvscale.shape.default({ key: 'shape' })
    }" legend-teleport="#legend-3">
    <VVGeomEllipse :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
        :color="d => d.Species" :fill="d => d.Species" />
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
        :shape="Object.assign(d => d.Species, { title: 'Shape' })" />
</VVPlot>
<div id="legend-3"></div>` }}</pre-highlight>
            <div class="flex flex-row">
                <component :is="{ template: templates[3], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
            <p>
                Values of the same legend key appearance will be merged into a single legend entry, with labels joined
                by a semicolon.
            </p>
            <hr>
            <pre-highlight lang="html">{{templates[4] = `<VVPlot :data="letters" :width="600" :height="400" legend-teleport="#legend-4">
    <VVAxisY :min="0" :expand-mult="0" />
    <VVGeomBar :x="d => d" :fill="Object.assign(d => d, { title: 'Alphabet' })"
        :scales="{ fill: vvscale.fill.custom((v) => ['blue', 'gold'][v % 2]) }" />
    <template #panel>
        <div id="legend-4" class="absolute top-0 right-0"></div>
    </template>
</VVPlot>` }}</pre-highlight>
            <blockquote class="tip">
                Elements within the <code>#panel</code> slot will be slotted into an absolutely positioned div that
                covers the entire plot area.
            </blockquote>
            <component :is="{ template: templates[4], props: Object.keys(vBind) }" v-bind="vBind" />
        </section>
    </article>

</template>
