<script setup>
import iris from './data/iris.json'

</script>
<template>
    <article>
        <section>
            <h2>Introduction</h2>
            <h3>What is VVPlot?</h3>
            <p>
                VVPlot is a data visualization library based on Vue.js that makes it easy to create complex plots and
                charts using a declarative syntax.
            </p>
            <p>
                VVPlot uses <i>Grammar of Graphics</i> principles to provide a powerful API for building visualizations.
            </p>
            <p>Here is a minimal example:</p>
            <pre class="code">{{`<script setup>
import iris from './data/iris.json'
</script>
<template>
    <div class="flex flex-row">
        <VVPlot :data="iris" :width="600" :height="400" legend-teleport="#legend-1">
            <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" :shape="d => d.Species" />
        </VVPlot>
        <div id="legend-1"></div>
    </div>
</template>` }}</pre>
            <p>Result:</p>
            <div class="flex flex-row">
                <VVPlot :data="iris" :width="600" :height="400" legend-teleport="#legend-1">
                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
                        :shape="d => d.Species" />
                </VVPlot>
                <div id="legend-1"></div>
            </div>
            <p>
                You may refer to the <a href="#quick_start">getting started</a> page to learn about how VVPlot
                works.
            </p>
        </section>
        <section>
            <h3>Try VVPlot</h3>
            <p>
                You can explore more examples and play with your own data in the <a href="#playground">playground</a>
                page.
            </p>
        </section>
    </article>
</template>
