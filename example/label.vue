<script setup>
import { VVPlot, VVAxisX, VVAxisY, VVGeomLine, VVAction } from '#base/components'
import vvlabel from '#base/js/label'

import economics_txt from './data/economics.csv?raw'
const economics = parse_csv(economics_txt)

function parse_csv(text) {
    function parse_value(v) {
        if (!isNaN(v)) return +v
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(v)) {
            let [y, m, d] = v.split('-').map(x => +x)
            return Date.UTC(y, m - 1, d)
        }
        return v
    }
    let [header, ...lines] = text.replace(/\r/g, '').split('\n').filter(l => l)
    header = header.split(',')
    return lines.map(l => Object.fromEntries(l.split(',').map((v, i) => [header[i], parse_value(v)])))
}
</script>
<template>
    <div class="plot-container">
        <pre class="code">{{`<VVPlot :data="economics">
    <VVAxisY :labels="v => \`\${v * 100}%\`" :min-range="0" />
    <VVAxisX>
        <VVAction move rescale zoom />
    </VVAxisX>
    <VVGeomLine :x="d => new Date(d.date)" :y="d => d.unemploy / d.pop" />
</VVPlot>`}}</pre>
        <VVPlot :data="economics">
            <VVAxisY :labels="v => `${v * 100}%`" :min-range="0" />
            <VVAxisX>
                <VVAction move rescale zoom />
            </VVAxisX>
            <VVGeomLine :x="d => new Date(d.date)" :y="d => d.unemploy / d.pop" />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="economics">
    <VVAxisX :labels="vvlabel.timestamp({ format: 'yyyy/MM/dd' })" />
    <VVGeomLine :x="d => new Date(d.date)" :y="d => d.pop" />
</VVPlot>`}}</pre>
        <VVPlot :data="economics">
            <VVAxisX :labels="vvlabel.timestamp({ format: 'yyyy/MM/dd' })" />
            <VVGeomLine :x="d => new Date(d.date)" :y="d => d.pop" />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="economics">
    <VVAxisX :labels="vvlabel.timestamp()" :extend="2">
        <VVAction move rescale zoom />
    </VVAxisX>
    <VVAxisY :labels="vvlabel.default()" :min="0" :expand-mult="0" />
    <VVGeomLine :x="d => d.date" :y="d => d.unemploy" />
</VVPlot>`}}</pre>
        <VVPlot :data="economics">
            <VVAxisX :labels="vvlabel.timestamp()" :extend="2">
                <VVAction move rescale zoom />
            </VVAxisX>
            <VVAxisY :labels="vvlabel.default()" :min="0" :expand-mult="0" />
            <VVGeomLine :x="d => d.date" :y="d => d.unemploy" />
        </VVPlot>
    </div>
</template>
<style scoped>
.vvplot {
    width: 600px;
    height: 400px;
}
</style>
