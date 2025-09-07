<script setup>
import { VVPlot, VVAxisX, VVAxisY, VVGeomLine, VVGeomBar, VVGeomPoint, VVAction } from '#base/components'
import vvbreak from '#base/js/break'
import vvlabel from '#base/js/label'

import letters_txt from './data/sentences.txt?raw'
const letters = letters_txt.toLowerCase().replace(/[^a-z]/g, "").split("")
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
    <VVAxisY :labels="v => \`\${v * 100}%\`" :expand-mult="{ min: 0.2, max: 0.1 }" title="unemployment rate">
        <VVAction move rescale zoom />
    </VVAxisY>
    <VVAxisX position="10%" :theme="{ ticks_length: 3 }" :show-grid="false" title="date">
        <VVAction move rescale zoom />
    </VVAxisX>
    <VVGeomLine :x="d => new Date(d.date)" :y="d => d.unemploy / d.pop" />
</VVPlot>`}}</pre>
        <VVPlot :data="economics">
            <VVAxisY :labels="v => `${v * 100}%`" :expand-mult="{ min: 0.2, max: 0.1 }" title="unemployment rate">
                <VVAction move rescale zoom />
            </VVAxisY>
            <VVAxisX position="10%" :theme="{ ticks_length: 3 }" :show-grid="false" title="date" :extend="0.5">
                <VVAction move rescale zoom />
            </VVAxisX>
            <VVGeomLine :x="d => new Date(d.date)" :y="d => d.unemploy / d.pop" />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="economics">
    <VVAxisX :labels="vvlabel.timestamp({ format: 'yyyy/MM' })" position="top" />
    <VVAxisY position="left" primary />
    <VVAxisY position="right" />
    <VVGeomLine :x="d => new Date(d.date)" :y="d => d.pop" />
</VVPlot>`}}</pre>
        <VVPlot :data="economics">
            <VVAxisX :labels="vvlabel.timestamp({ format: 'yyyy/MM' })" position="top" />
            <VVAxisY position="left" primary />
            <VVAxisY position="right" />
            <VVGeomLine :x="d => new Date(d.date)" :y="d => d.pop" />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="economics">
    <VVAxisX :labels="vvlabel.timestamp()" :extend="2" :position="0" />
    <VVAxisY :labels="vvlabel.default()" :expand-mult="0" />
    <VVGeomLine :x="d => new Date(d.date)" :y="(d, i, data) => d.unemploy - (data[i - 1] ?? d)?.unemploy" color="#ccc" />
</VVPlot>`}}</pre>
        <VVPlot :data="economics">
            <VVAxisX :labels="vvlabel.timestamp()" :extend="2" :position="0" />
            <VVAxisY :labels="vvlabel.default()" :expand-mult="0" />
            <VVGeomLine :x="d => new Date(d.date)" :y="(d, i, data) => d.unemploy - (data[i - 1] ?? d)?.unemploy"
                color="#ccc" />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="[{ x: 2, y: -1 }, { x: -1, y: 2 }]">
    <VVAxisX :position="0" :expand-mult="1" :breaks="vvbreak.number({ step: 1 })">
        <VVAction move rescale zoom />
    </VVAxisX>
    <VVAxisY :position="0" :expand-mult="1" :extend="1">
        <VVAction move rescale zoom />
    </VVAxisY>
    <VVGeomPoint :x="d => d.x" :y="d => d.y" />
</VVPlot>`}}</pre>
        <VVPlot :data="[{ x: 2, y: -1 }, { x: -1, y: 2 }]">
            <VVAxisX :position="0" :expand-mult="1" :breaks="vvbreak.number({ step: 1 })">
                <VVAction move rescale zoom />
            </VVAxisX>
            <VVAxisY :position="0" :expand-mult="1" :extend="1">
                <VVAction move rescale zoom />
            </VVAxisY>
            <VVGeomPoint :x="d => d.x" :y="d => d.y" />
        </VVPlot>
        <hr>
        <pre class="code">{{`<VVPlot :data="letters">
    <VVAxisX :expand-add="1" :expand-mult="0" :levels="['x', 'y', 'z', '', 'a', 'b', 'c']" :position="0" />
    <VVGeomBar :x="d => d" />
</VVPlot>`}}</pre>
        <VVPlot :data="letters">
            <VVAxisX :expand-add="1" :expand-mult="0" :levels="['x', 'y', 'z', '', 'a', 'b', 'c']" :position="0" />
            <VVAxisY position="center" />
            <VVGeomBar :x="d => d" />
        </VVPlot>
    </div>
</template>
<style scoped>
.vvplot {
    width: 600px;
    height: 400px;
}
</style>
