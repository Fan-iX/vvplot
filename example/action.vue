<script setup>
import { useTemplateRef } from 'vue'
import { VVPlot, VVAxisX, VVAxisY, VVGeomPoint, VVAction } from '#base/components'
import iris from './data/iris.json'

const legend = useTemplateRef("legend")
</script>
<template>
    <div class="flex p-4">
        <VVPlot :data="iris" :width="600" :height="400" resize :legend-teleport="legend">
            <template #y-axis>
                <VVAxisY position="none" :min="0" :max="8" reverse />
                <VVAxisY position="left" secondary>
                    <VVAction :zoom="{ max: 10, min: -2 }" :move="{ min: -2 }" :rescale="{ max: 10 }" />
                </VVAxisY>
                <VVAxisY position="right" secondary />
            </template>
            <template #x-axis>
                <VVAxisX position="none" :min="0" :max="8" :expand-add="1" />
                <VVAxisX position="bottom" secondary>
                    <VVAction move :nudge="{ shift: true }" :min="-2" :max="10" />
                    <VVAction :zoom="{ max: 10 }" :rescale="{ max: 10 }" :min-range="4" />
                </VVAxisX>
            </template>
            <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
            <template #action>
                <VVAction select x y />
                <VVAction nudge shift x y />
                <VVAction :move="{ button: 'right' }" x y :xmin="-2" :xmax="10" :ymin="-2" />
                <VVAction zoom x y :xmax="10" :ymin="-2" :ymax="10" />
            </template>
        </VVPlot>
        <div ref="legend"></div>
    </div>
</template>
