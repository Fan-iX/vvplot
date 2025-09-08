<script setup>
import { VVPlot, VVAxisX, VVAxisY, VVGeomPoint, VVAction } from '#base/components'
import iris from './data/iris.json'
</script>
<template>
    <div class="plot-container">
        <pre class="code">{{`<VVPlot :data="iris" resize>
    <VVAxisY :position="0" :extend="1">
        <VVAction :zoom="{ max: 10, min: -2 }" :move="{ min: -2 }" :rescale="{ max: 10 }" />
    </VVAxisY>
    <VVAxisX position="center" :extend="1">
        <VVAction move :nudge="{ shift: true }" :min="-2" :max="10" />
        <VVAction :zoom="{ min: -5 }" :rescale="{ max: 10 }" :min-range="4" />
    </VVAxisX>
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
</VVPlot>`}}</pre>
        <VVPlot :data="iris" resize>
            <VVAxisY :position="0" :extend="1">
                <VVAction :zoom="{ max: 10, min: -2 }" :move="{ min: -2 }" :rescale="{ max: 10 }" />
            </VVAxisY>
            <VVAxisX position="center" :extend="1">
                <VVAction move :nudge="{ shift: true }" :min="-2" :max="10" />
                <VVAction :zoom="{ min: -5 }" :rescale="{ max: 10 }" :min-range="4" />
            </VVAxisX>
            <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="iris" resize>
    <VVAxisX position="0%" :min="0" :max="8" :expand-add="1" :extend="2" />
    <VVAxisY position="0%" :min="0" :max="8" :extend="1" />
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
    <template #action>
        <VVAction select />
        <VVAction nudge shift />
        <VVAction :move="{ button: 'right' }" :xmin="-2" :xmax="10" :ymin="-2" />
        <VVAction :zoom="{ xmin: -5, xmax: 10 }" :ymin="-2" :ymax="10" />
    </template>
</VVPlot>`}}</pre>
        <VVPlot :data="iris" resize>
            <VVAxisX position="0%" :min="0" :max="8" :expand-add="1" :extend="2" />
            <VVAxisY position="0%" :min="0" :max="8" :extend="1" />
            <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
            <template #action>
                <VVAction select />
                <VVAction nudge x shift />
                <VVAction :move="{ button: 'right' }" :xmin="-2" :xmax="10" :ymin="-2" />
                <VVAction :zoom="{ xmin: -5, xmax: 10 }" :ymin="-2" :ymax="10" />
            </template>
        </VVPlot>
    </div>
</template>
<style scoped>
.vvplot {
    width: 600px;
    height: 400px;
}
</style>
