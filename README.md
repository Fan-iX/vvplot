# VVPlot

[VVPlot](https://fan-ix.github.io/vvplot/) is a Vue based graphic library. It provides a grammar of graphics style API to create various types of plots.

## Usage

```vue
<template>
    <VVPlot :data="data">
        <VVGeomPoint :x="d => d.x" :y="d => d.y" />
    </VVPlot>
</template>

<script setup>
import { VVPlot, VVGeomPoint } from 'vvplot/components'

const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }]
</script>
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
