<script setup>
import { ref } from 'vue'
import vvscale from '#base/js/scale'

import iris from '../data/iris.json'
import CO2 from '../data/CO2.json'
const vBind = { CO2, iris, vvscale }
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
    <VVGeomPoint :x="d => d.conc" :y="d => d.uptake" :color="d => d.Type" :shape="d => d.Treatment" />
    <VVGeomLine :x="d => d.conc" :y="d => d.uptake" :color="d => d.Type" :group="d => d.Plant" />
</VVPlot>
<div id="legend-1" class="p-1 border"></div>` }}</pre-highlight>
            <div class="flex flex-row items-start">
                <component :is="{ template: templates[1], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
            <p>
                Discrete aesthetics mapping to the same categorical levels will be merged into a single guide entry.
            </p>
            <hr>
            <pre-highlight lang="html">{{templates[2] = `<VVPlot :data="iris" :width="600" :height="400" legend-teleport="#legend-2">
    <VVGeomEllipse :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
        :color="d => d.Species" :fill="d => d.Species"
        :scales="{ fill: vvscale.fill.default({ alpha: 0.2 }) }" />
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
        :color="d => d.Species" :shape="d => d.Species" />
</VVPlot>
<div id="legend-2"></div>` }}</pre-highlight>
            <div class="flex flex-row">
                <component :is="{ template: templates[2], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
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
        :shape="Object.assign(d => d.Species, { toString: () => 'Shape' })" />
</VVPlot>
<div id="legend-3"></div>` }}</pre-highlight>
            <div class="flex flex-row">
                <component :is="{ template: templates[3], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
            <p>
                You can put the legend element in the <code>#panel</code> slot of the <code>&lt;VVPlot&gt;</code>
                component to place it relatively to the plot area.
            </p>
            <blockquote class="info">
                Elements within the <code>#panel</code> slot will be slotted into an absolutely positioned div that
                covers the entire plot area.
            </blockquote>
            <hr>
            <pre-highlight lang="html">{{templates[4] = `<VVPlot :data="iris" :width="600" :height="400" legend-teleport="#legend-4">
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
        :color="d => d.Species" :shape="d => d.Species" />
    <template #panel>
        <div id="legend-4" class="absolute bottom-0 right-0"></div>
    </template>
</VVPlot>` }}</pre-highlight>
            <component :is="{ template: templates[4], props: Object.keys(vBind) }" v-bind="vBind" />
        </section>
    </article>

</template>
