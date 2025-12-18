<script setup>
import iris from './data/iris.json'
import { useTemplateRef } from 'vue'
const plot = useTemplateRef('plot')

function exportSVG() {
    let blob = new Blob([plot.value.serialize()], { type: 'image/svg+xml;charset=utf-8' })
    let url = URL.createObjectURL(blob)
    const win = window.open(url, '_blank')
    if (win) {
        win.onload = () => URL.revokeObjectURL(url)
    } else {
        URL.revokeObjectURL(url)
    }
}
function exportPNG() {
    const img = new Image()
    img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => {
            let url = URL.createObjectURL(blob)
            const win = window.open(url, '_blank')
            if (win) {
                win.onload = () => URL.revokeObjectURL(url)
            } else {
                URL.revokeObjectURL(url)
            }
        }, 'image/png')
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(
        '<?xml version="1.0" standalone="no"?>\r\n' + plot.value.serialize()
    )))
}
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
            <pre-highlight lang="html">{{`<script setup>
    import iris from './data/iris.json'
</script>
<template>
    <div class="flex flex-row">
        <VVPlot :data="iris" :width="600" :height="400" legend-teleport="#legend-1">
            <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" :shape="d => d.Species" />
        </VVPlot>
        <div id="legend-1"></div>
    </div>
</template>` }}</pre-highlight>
            <p>Result:</p>
            <div class="flex flex-row">
                <VVPlot ref="plot" :data="iris" :width="600" :height="400" legend-teleport="#legend-1">
                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
                        :shape="d => d.Species" />
                </VVPlot>
                <div>
                    <div id="legend-1"></div>
                </div>
            </div>
            <p>
                The plot can be exported as
                <a href="javascript:void(0)" @click="exportSVG">SVG</a> or
                <a href="javascript:void(0)" @click="exportPNG">PNG</a>
            </p>
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
