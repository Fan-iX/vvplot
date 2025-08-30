<script setup>
import { VVPlot, VVGeomPoint } from '#base/components'
import vvtheme from '#base/js/theme'
import iris from './data/iris.json'
</script>
<template>
    <div class="plot-container">
        <h4>default</h4>
        <VVPlot :data="iris">
            <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
        </VVPlot>
        <h4>light</h4>
        <VVPlot :data="iris" :theme="vvtheme.light">
            <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
        </VVPlot>
        <h4>classic</h4>
        <VVPlot :data="iris" :theme="vvtheme.classic">
            <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
        </VVPlot>
    </div>
</template>
<style scoped>
.vvplot {
    width: 600px;
    height: 400px;
}
</style>
