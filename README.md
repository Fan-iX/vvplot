# VVPlot

[VVPlot](https://fan-ix.github.io/vvplot/) is a Vue based graphic library. It provides a grammar of graphics style API to create various types of plots.

## Usage

### ES Module (Vue SFC)

```vue
<template>
    <VVPlot :data="data" :width="600" :height="400">
        <VVGeomPoint :x="d => d.x" :y="d => d.y" />
    </VVPlot>
</template>

<script setup>
import { VVPlot, VVGeomPoint } from 'vvplot'

const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }]
</script>
```

### CDN

```html
<html>
<head>
    <link rel="stylesheet" href="https://unpkg.com/vvplot@latest/dist/style.css">
</head>
<body>
    <div id="plot" style="display:flex">
        <v-v-plot :data="data" :width="600" :height="400" legend-teleport="#legend">
            <v-v-geom-point :x="d => d.Weight_in_lbs" :y="d => d.Miles_per_Gallon"
                :color="d => d.Origin"></v-v-geom-point>
        </v-v-plot>
        <div id="legend"></div>
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://unpkg.com/vvplot@latest/dist/vvplot.global.js"></script>
    <script>
        const { createApp, ref } = Vue
        const { components } = VVPlot
        const data = ref([])
        fetch("https://cdn.jsdelivr.net/npm/vega-datasets@latest/data/cars.json")
            .then(response => response.json())
            .then(json => data.value = json)
        let app = createApp({
            setup() { return { data } }
        })
        for (let c in components) {
            app.component(c, components[c])
        }
        app.mount('#plot')
    </script>
</body>
</html>
```

## Development

`node` and `npm` are required for development.

to start a development server, run:

```sh
npm install
npm run dev
```

to compile the library, run:

```sh
npm run build
```
