<script setup>
import { ref } from 'vue'
import vvscale from '#base/js/scale'
import iris from '../data/iris.json'
const demo_point = [
    { x: 1, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 4 },
    { x: 2, y: 3 },
]
const demo_polygon = [
    { points: [{ x: 1.5, y: 1 }, { x: 2, y: 3 }, { x: 2.5, y: 2.5 }] },
    { points: [{ x: 3, y: 3.5 }, { x: 4, y: 4 }, { x: 2.5, y: 4 }, { x: 3, y: 2 }] },
]
const demo_markdown = [
    { x: 2, y: 0, label: '***a***' },
    { x: 0, y: 1.5, label: '**<font color="red">b</font>**' },
    { x: 1, y: 2, label: '*c*<sup>2</sup>=*a*<sup>2</sup>+*b*<sup>2</sup>' },
]
function summarize1(data) {
    return Object.entries(Object.groupBy(data, d => d.Species)).map(([Species, group]) => ({
        Species,
        Petal_Length: group.reduce((sum, d) => sum + d.Petal_Length, 0) / group.length,
        Petal_Width: group.reduce((sum, d) => sum + d.Petal_Width, 0) / group.length
    }))
}
const render = ref('svg')
</script>
<template>
    <article>
        <section>
            <h2>Graphic Layers</h2>
            rendering mode: <select v-model="render">
                <option value="svg">SVG</option>
                <option value="canvas">Canvas</option>
            </select>
            <p>
                Graphic layers are the basic building blocks of a plot. Each layer represents a set of graphical
                elements
                that correspond to the data. By combining different graphic layers, you can create complex and
                informative
                visualizations.
            </p>
            <VVPlot :data="iris" :width="600" :height="400">
                <VVGeomPoint :x="d => d.Petal_Length" :y="d => d.Petal_Width" :color="d => d.Species" />
                <VVGeomMarkdown :data="summarize1" :x="d => d.Petal_Length" :y="d => d.Petal_Width"
                    :label="d => `*Iris ${d.Species}*`" />
            </VVPlot>
            <p>
                Each graphic layer has its own set of aesthetics, geometric elements, and statistical transformations.
                The aesthetics define how data variables are mapped to visual properties, the geometric elements
                determine the shape of the graphical representation, and the statistical transformations specify how the
                data is processed before being visualized.
            </p>
            <h3>Graphic layers and their aesthetics</h3>
            <p>
                <code>Required aesthetics</code> are determined by the statistical transformation of the layer.
                For example, a layer with a <code>boxplot</code> stat requires <code>x</code> and <code>y</code>
                aesthetics, while a layer with a <code>histogram</code> stat requires only an <code>x</code> aesthetic.
                If the required aesthetics are not provided, a error will be thrown and the layer will not be rendered.
            </p>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th>Layer</th>
                            <th title="Aesthetic Mappings">Required Aesthetics</th>
                            <th title="Geometric Element">Geom</th>
                            <th title="Statistical Transformation">Stat</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowspan="2"><code>&lt;VVGeomBar /&gt;</code></td>
                            <td><code>x</code></td>
                            <td rowspan="2">rectangle</td>
                            <td rowspan="2">count</td>
                            <td rowspan="2">
                                <VVPlot :data="['a', 'b', 'b', 'c', 'a', 'b']">
                                    <VVGeomBar :x="d => d" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>y</code></td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomBlank /&gt;</code></td>
                            <td>
                                <code>x</code> <br> <code>y</code>
                            </td>
                            <td>blank</td>
                            <td>identity</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomBlank :x="d => d.Species" :y="d => d.Petal_Width" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomBoxplot /&gt;</code></td>
                            <td>
                                <code>x</code> <br> <code>y</code>
                            </td>
                            <td>boxplot</td>
                            <td>boxplot</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomBoxplot :x="d => d.Species" :y="d => d.Petal_Width" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2"><code>&lt;VVGeomCurve /&gt;</code></td>
                            <td><code>points</code></td>
                            <td rowspan="2">curve</td>
                            <td rowspan="2">identity (curve)</td>
                            <td rowspan="2">
                                <VVPlot :data="demo_point">
                                    <VVGeomCurve :x="d => d.x" :y="d => d.y" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>x</code> <br> <code>y</code></td>
                        </tr>
                        <tr>
                            <td rowspan="2"><code>&lt;VVGeomDensity /&gt;</code></td>
                            <td><code>x</code></td>
                            <td rowspan="2">curve</td>
                            <td rowspan="2">density</td>
                            <td rowspan="2">
                                <VVPlot :data="iris">
                                    <VVGeomDensity :x="d => d.Petal_Width" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>y</code></td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomEllipse /&gt;</code></td>
                            <td>
                                <code>x</code> <br> <code>y</code>
                            </td>
                            <td>ellipse</td>
                            <td>ellipse</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomEllipse :x="d => d.Petal_Length" :y="d => d.Petal_Width"
                                        :group="d => d.Species" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2"><code>&lt;VVGeomHistogram /&gt;</code></td>
                            <td><code>x</code></td>
                            <td rowspan="2">rectangle</td>
                            <td rowspan="2">histogram</td>
                            <td rowspan="2">
                                <VVPlot :data="iris">
                                    <VVGeomHistogram :x="d => d.Petal_Width" :bins="5" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>y</code></td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomLine /&gt;</code></td>
                            <td><code>x</code> <br> <code>y</code></td>
                            <td>line</td>
                            <td>sort</td>
                            <td>
                                <VVPlot :data="demo_point">
                                    <VVGeomLine :x="d => d.x" :y="d => d.y" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2"><code>&lt;VVGeomLinerange /&gt;</code></td>
                            <td><code>x</code> <br> <code>ymin</code> <br> <code>ymax</code></td>
                            <td rowspan="2">line</td>
                            <td rowspan="2">identity (linerange)</td>
                            <td rowspan="2">
                                <VVPlot :data="[{ xmin: 1, xmax: 3, y: 'a' }, { xmin: 2.5, xmax: 4, y: 'b' }]">
                                    <VVGeomLinerange :xmin="d => d.xmin" :xmax="d => d.xmax" :y="d => d.y" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>y</code> <br> <code>xmin</code> <br> <code>xmax</code></td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomMarkdown /&gt;</code></td>
                            <td><code>x</code> <br> <code>y</code> <br> <code>label</code></td>
                            <td>markdown</td>
                            <td>identity</td>
                            <td>
                                <VVPlot :data="demo_markdown">
                                    <VVGeomMarkdown :x="d => d.x" :y="d => d.y" :label="d => d.label" :render />
                                    <VVAxisX :expand-mult="0.2" />
                                    <VVAxisY :expand-mult="0.2" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomPath /&gt;</code></td>
                            <td><code>x</code> <br> <code>y</code></td>
                            <td>line</td>
                            <td>path</td>
                            <td>
                                <VVPlot :data="demo_point">
                                    <VVGeomPath :x="d => d.x" :y="d => d.y" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomPoint /&gt;</code></td>
                            <td><code>x</code> <br> <code>y</code> <br> <code>shape</code></td>
                            <td>point</td>
                            <td>identity</td>
                            <td>
                                <VVPlot :data="demo_point">
                                    <VVGeomPoint :x="d => d.x" :y="d => d.y" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2"><code>&lt;VVGeomPolygon /&gt;</code></td>
                            <td><code>points</code></td>
                            <td rowspan="2">polygon</td>
                            <td rowspan="2">identity (polygon)</td>
                            <td rowspan="2">
                                <VVPlot :data="demo_polygon">
                                    <VVGeomPolygon :points="d => d.points" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>x</code> <br> <code>y</code></td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomRect /&gt;</code></td>
                            <td>
                                <code>xmin</code> <br> <code>xmax</code> <br>
                                <code>ymin</code> <br> <code>ymax</code>
                            </td>
                            <td>rectangle</td>
                            <td>identity</td>
                            <td>
                                <VVPlot :data="demo_polygon">
                                    <VVGeomRect :xmin="d => d.points[0].x" :xmax="d => d.points[1].x"
                                        :ymin="d => d.points[0].y" :ymax="d => d.points[1].y" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomSegment /&gt;</code></td>
                            <td>
                                <code>x</code> <br> <code>y</code> <br>
                                <code>xend</code> <br> <code>yend</code>
                            </td>
                            <td>line</td>
                            <td>identity</td>
                            <td>
                                <VVPlot :data="demo_polygon">
                                    <VVGeomSegment :x="d => d.points[0].x" :y="d => d.points[0].y"
                                        :xend="d => d.points[1].x" :yend="d => d.points[1].y" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomStick /&gt;</code></td>
                            <td>
                                <code>x</code> <br> <code>y</code> <br>
                                <code>dx</code> <br> <code>dy</code>
                            </td>
                            <td>line</td>
                            <td>identity (stick)</td>
                            <td>
                                <VVPlot :data="demo_point">
                                    <VVGeomStick :x="d => d.x" :y="d => d.y" :dx="0.5" :dy="0.5" :render />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomText /&gt;</code></td>
                            <td><code>x</code> <br> <code>y</code> <br> <code>label</code></td>
                            <td>text</td>
                            <td>identity</td>
                            <td>
                                <VVPlot :data="demo_point">
                                    <VVGeomText :x="d => d.x" :y="d => d.y" :label="(_, i) => i + 1" :render />
                                    <VVAxisX :expand-mult="0.2" />
                                    <VVAxisY :expand-mult="0.2" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomTextsegment /&gt;</code></td>
                            <td>
                                <code>x</code> <br> <code>y</code> <br>
                                <code>xend</code> <br> <code>yend</code> <br>
                                <code>label</code>
                            </td>
                            <td>text</td>
                            <td>identity</td>
                            <td>
                                <VVPlot>
                                    <VVGeomTextsegment :x="1" :xend="2" :y="2" :yend="1" label="VVPlot" :render />
                                    <VVAxisX :expand-mult="0.2" />
                                    <VVAxisY :expand-mult="0.2" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>&lt;VVGeomTile /&gt;</code></td>
                            <td>
                                <code>x</code> <br> <code>y</code> <br>
                                <code>width</code> <br> <code>height</code>
                            </td>
                            <td>rectangle</td>
                            <td>identity (tile)</td>
                            <td>
                                <VVPlot :data="demo_point">
                                    <VVGeomTile :x="d => d.x" :y="d => d.y" :width="1" :height="1" :render />
                                </VVPlot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Geometric aesthetics</h3>
            <p>
                <code>Geometric aesthetics</code> are determined by the geometric element type of the layer.
                For example, a layer with a <code>point</code> geom can use aesthetics like <code>color</code>,
                <code>size</code>, and <code>shape</code>, while a layer with a <code>line</code> geom can use
                aesthetics like <code>color</code>, <code>linewidth</code>, and <code>linetype</code>.
            </p>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th title="Geometric Element">Geom</th>
                            <th title="Geometric Aesthetics">Aesthetics</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowspan="6">point</td>
                            <td><code>shape</code></td>
                            <td>
                                shape of the points. options are:
                                <ul>
                                    <li><code>"circle"</code> (default)</li>
                                    <li><code>"square"</code></li>
                                    <li><code>"triangle"</code></li>
                                    <li><code>"diamond"</code></li>
                                    <li><code>"plus"</code></li>
                                    <li><code>"cross"</code></li>
                                </ul>
                                or a custom SVG path string prefixed with <code>path:</code>,
                                e.g. <code>"path:M-0.5,0L0.5,0.5L0.5,-0.5Z"</code>
                            </td>
                            <td>
                                <VVPlot :render
                                    :data="['circle', 'square', 'triangle', 'diamond', 'plus', 'cross', 'path:M-0.5,0L0.5,0.5L0.5,-0.5Z']"
                                    :scales="{ shape: vvscale.shape.identity() }">
                                    <VVAxisY
                                        :levels="['circle', 'square', 'triangle', 'diamond', 'plus', 'cross', 'path:M-0.5,0L0.5,0.5L0.5,-0.5Z'].reverse()"
                                        :labels="d => String(d).replace(/:.*/, ': …')" />
                                    <VVGeomPoint :y="d => d" x="shape" :shape="d => d" :title="d => `shape='${d}'`" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td>size of the points (default: 6)</td>
                            <td rowspan="5">
                                <VVPlot :render>
                                    <VVAxisY
                                        :levels="['normal', 'size', 'color', 'stroke', 'linewidth', 'linetype'].reverse()" />
                                    <VVGeomPoint x="point" y="normal" />
                                    <VVGeomPoint x="point" y="color" color="red" title="color='red'" />
                                    <VVGeomPoint x="point" y="size" :size="10" title="size=10" />
                                    <VVGeomPoint x="point" y="stroke" stroke="red" title="stroke='red'" />
                                    <VVGeomPoint x="point" y="linewidth" stroke="red" :linewidth="2"
                                        title="linewidth=2" />
                                    <VVGeomPoint x="point" y="linetype" stroke="red" linetype="1 1"
                                        title="linetype='1 1'" />
                                    color="transparent" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>color</code></td>
                            <td>color of the points (default: black)</td>
                        </tr>
                        <tr>
                            <td><code>stroke</code></td>
                            <td>color of the outline (default: none)</td>
                        </tr>
                        <tr>
                            <td><code>linewidth</code></td>
                            <td>line width of the outline (default: 1)</td>
                        </tr>
                        <tr>
                            <td><code>linetype</code></td>
                            <td>line type of the outline (default: solid)</td>
                        </tr>
                        <tr>
                            <td rowspan="4">curve<br>polygon<br>rectangle</td>
                            <td>
                                <code>fill</code>
                            </td>
                            <td>fill color of the element (default: black)</td>
                            <td rowspan="4">
                                <VVPlot :render>
                                    <VVAxisY :levels="['normal', 'fill', 'color', 'linewidth', 'linetype'].reverse()" />
                                    <VVGeomTile x="rectangle" y="normal" :height="0.5" />
                                    <VVGeomTile x="rectangle" y="fill" :height="0.5" fill="red" title="fill='red'" />
                                    <VVGeomTile x="rectangle" y="color" :height="0.5" color="red" title="color='red'" />
                                    <VVGeomTile x="rectangle" y="linewidth" :height="0.5" color="red" :linewidth="2"
                                        title="linewidth=2" />
                                    <VVGeomTile x="rectangle" y="linetype" :height="0.5" color="red" linetype="dashed"
                                        title="linetype='dashed'" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>color</code></td>
                            <td>color of the outline (default: none)</td>
                        </tr>
                        <tr>
                            <td><code>linewidth</code></td>
                            <td>line width of the outline (default: 1)</td>
                        </tr>
                        <tr>
                            <td><code>linetype</code></td>
                            <td>line type of the outline (default: solid)</td>
                        </tr>
                        <tr>
                            <td rowspan="3">line</td>
                            <td><code>color</code></td>
                            <td>color of the line (default: black)</td>
                            <td rowspan="3">
                                <VVPlot :render>
                                    <VVAxisX :levels="['start', 'end']" />
                                    <VVAxisY :levels="['normal', 'color', 'linewidth', 'linetype'].reverse()" />
                                    <VVGeomLinerange xmin="start" xmax="end" y="normal" />
                                    <VVGeomLinerange xmin="start" xmax="end" y="color" color="red"
                                        title="color='red'" />
                                    <VVGeomLinerange xmin="start" xmax="end" y="linewidth" :linewidth="2"
                                        title="linewidth=2" />
                                    <VVGeomLinerange xmin="start" xmax="end" y="linetype" linetype="dashed"
                                        title="linetype='dashed'" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>linewidth</code></td>
                            <td>line width of the line (default: 1)</td>
                        </tr>
                        <tr>
                            <td><code>linetype</code></td>
                            <td>line type of the line (default: solid)</td>
                        </tr>
                        <tr>
                            <td rowspan="8">text</td>
                            <td><code>text-length</code></td>
                            <td>
                                length of the text (default: none)
                                <ul>
                                    <li>
                                        If a number is provided, the text will be scaled to fit the specified pixel
                                        length.
                                    </li>
                                    <li>
                                        If an object with an <code>x</code> and <code>y</code> property is provided, the
                                        text will be scaled to fit the specified length in the x and y directions in
                                        data coordinates.
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <VVPlot :render resize>
                                    <VVAxisY :levels="['normal', 'fixed', 'dynamic'].reverse()" />
                                    <VVGeomText x="text" y="normal" label="text" />
                                    <VVGeomText x="text" y="fixed" label="text" :text-length="48"
                                        title="text-length=48" />
                                    <VVGeomText x="text" y="dynamic" label="text" :text-length="{ x: 1 }"
                                        title="text-length={ x: 1 }" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>anchor-x</code><br><code>anchor-y</code></td>
                            <td rowspan="2">
                                anchor point of the text. (default: (0.5, 0.5))
                                <ul>
                                    <li>
                                        <code>anchor-x</code>/<code>anchor-y</code> set the position of the anchor point
                                        in the text bounding box.
                                    </li>
                                    <li>
                                        <code>dock-x</code>/<code>dock-y</code> set the position of the anchor point
                                        relative to the docking container (outer rectangle).
                                    </li>
                                </ul>
                                Only one anchor method can be used at a time. If both are provided,
                                <code>dock-x</code>/<code>dock-y</code> will take precedence.
                                For both anchor coordinates, (0, 0) is the top-left corner and (1, 1) is the
                                bottom-right corner.
                            </td>
                            <td rowspan="2">
                                <VVPlot :render resize>
                                    <VVAxisY :expand-add="0.5" />
                                    <VVGeomPoint :x="['anchor-x', 'anchor-x', 'anchor-x', 'dock-x', 'dock-x', 'dock-x']"
                                        :y="[0, 0.5, 1, 0, 0.5, 1]" color="red" />
                                    <VVGeomText x="anchor-x" label="text" :angle="45" :y="0" :anchor-x="0"
                                        title="anchor-x=0" />
                                    <VVGeomText x="anchor-x" label="text" :angle="45" :y="0.5" :anchor-x="0.5"
                                        title="anchor-x=0.5" />
                                    <VVGeomText x="anchor-x" label="text" :angle="45" :y="1" :anchor-x="1"
                                        title="anchor-x=1" />
                                    <VVGeomText x="dock-x" label="text" :angle="45" :y="0" :dock-x="0"
                                        title="dock-x=0" />
                                    <VVGeomText x="dock-x" label="text" :angle="45" :y="0.5" :dock-x="0.5"
                                        title="dock-x=0.5" />
                                    <VVGeomText x="dock-x" label="text" :angle="45" :y="1" :dock-x="1"
                                        title="dock-x=1" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>dock-x</code><br><code>dock-y</code></td>
                        </tr>
                        <tr>
                            <td><code>color</code></td>
                            <td>color of the text (default: black)</td>
                            <td rowspan="5">
                                <VVPlot :render>
                                    <VVAxisY
                                        :levels="['normal', 'size', 'color', 'stroke', 'linewidth', 'linetype'].reverse()" />
                                    <VVGeomText x="text" y="normal" label="text" />
                                    <VVGeomText x="text" y="size" label="text" :size="6" title="size=6" />
                                    <VVGeomText x="text" y="color" label="text" color="red" title="color='red'" />
                                    <VVGeomText x="text" y="stroke" label="text" stroke="red" title="stroke='red'" />
                                    <VVGeomText x="text" y="linewidth" label="text" stroke="red" :linewidth="2"
                                        title="linewidth=2" />
                                    <VVGeomText x="text" y="linetype" label="text" stroke="red" linetype="1 1"
                                        title="linetype='1 1'" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td>size of the text (default: 4)</td>
                        </tr>
                        <tr>
                            <td><code>stroke</code></td>
                            <td>color of the outline (default: none)</td>
                        </tr>
                        <tr>
                            <td><code>linewidth</code></td>
                            <td>line width of the outline (default: 1)</td>
                        </tr>
                        <tr>
                            <td><code>linetype</code></td>
                            <td>line type of the outline (default: solid)</td>
                        </tr>
                        <tr>
                            <td rowspan="7">textsegment</td>
                            <td><code>text-align</code></td>
                            <td>
                                alignment of text contents. options are:
                                <ul>
                                    <li><code>"justify"</code> (default)</li>
                                    <li><code>"pre"</code></li>
                                    <li><code>"start"</code></li>
                                    <li><code>"center"</code></li>
                                    <li><code>"end"</code></li>
                                    <li><code>"post"</code></li>
                                    <li><code>"stretch"</code></li>
                                </ul>
                            </td>
                            <td rowspan="2">
                                <VVPlot :render resize>
                                    <VVAxisX :levels="['start', 'end']" />
                                    <VVAxisY
                                        :levels="['justify', 'pre', 'start', 'center', 'end', 'post', 'stretch'].reverse()" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="justify"
                                        text-align="justify" title="text-align='justify'" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="pre" :inset="10"
                                        text-align="pre" title="text-align='pre'" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="start" :inset="10"
                                        text-align="start" title="text-align='start'" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="center" text-align="center"
                                        title="text-align='center'" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="end" :inset="10"
                                        text-align="end" title="text-align='end'" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="post" :inset="10"
                                        text-align="post" title="text-align='post'" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="stretch"
                                        text-align="stretch" title="text-align='stretch'" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>inset</code></td>
                            <td>
                                inset distance of the text to the anchor points, in pixels (default: 0).
                                Only applicable when <code>text-align</code> is set to
                                <code>"pre"</code>, <code>"start"</code>, <code>"end"</code> or <code>"post"</code>.
                            </td>
                        </tr>
                        <tr>
                            <td><code>color</code></td>
                            <td>color of the text (default: black)</td>
                            <td rowspan="5">
                                <VVPlot :render>
                                    <VVAxisX :levels="['start', 'end']" />
                                    <VVAxisY
                                        :levels="['normal', 'size', 'color', 'stroke', 'linewidth', 'linetype'].reverse()" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="normal" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="size" :size="6"
                                        title="size=6" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="color" color="red"
                                        title="color='red'" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="stroke" stroke="red"
                                        title="stroke='red'" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="linewidth" stroke="red"
                                        :linewidth="2" title="linewidth=2" />
                                    <VVGeomTextsegment x="start" xend="end" label="text" y="linetype" stroke="red"
                                        linetype="1 1" title="linetype='1 1'" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td>size of the text (default: 4)</td>
                        </tr>
                        <tr>
                            <td><code>stroke</code></td>
                            <td>color of the outline (default: none)</td>
                        </tr>
                        <tr>
                            <td><code>linewidth</code></td>
                            <td>line width of the outline (default: 1)</td>
                        </tr>
                        <tr>
                            <td><code>linetype</code></td>
                            <td>line type of the outline (default: solid)</td>
                        </tr>
                        <tr>
                            <td rowspan="5">markdown</td>
                            <td><code>color</code></td>
                            <td>color of the text (default: black)</td>
                            <td rowspan="5">
                                <VVPlot :render>
                                    <VVAxisY
                                        :levels="['normal', 'size', 'color', 'stroke', 'linewidth', 'linetype'].reverse()" />
                                    <VVGeomMarkdown x="markdown" y="normal"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" />
                                    <VVGeomMarkdown x="markdown" y="size"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" :size="6"
                                        title="size=6" />
                                    <VVGeomMarkdown x="markdown" y="color"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" color="red"
                                        title="color='red'" />
                                    <VVGeomMarkdown x="markdown" y="stroke"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" stroke="red"
                                        title="stroke='red'" />
                                    <VVGeomMarkdown x="markdown" y="linewidth"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" stroke="red"
                                        :linewidth="2" title="linewidth=2" />
                                    <VVGeomMarkdown x="markdown" y="linetype"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" stroke="red"
                                        linetype="1 1" title="linetype='1 1'" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td>size of the text (default: 4)</td>
                        </tr>
                        <tr>
                            <td><code>stroke</code></td>
                            <td>color of the outline (default: none)</td>
                        </tr>
                        <tr>
                            <td><code>linewidth</code></td>
                            <td>line width of the outline (default: 1)</td>
                        </tr>
                        <tr>
                            <td><code>linetype</code></td>
                            <td>line type of the outline (default: solid)</td>
                        </tr>
                        <tr>
                            <td rowspan="7">markdownsegment</td>
                            <td><code>text-align</code></td>
                            <td>
                                alignment of text contents. options are:
                                <ul>
                                    <li><code>"pre"</code></li>
                                    <li><code>"start"</code> (default)</li>
                                    <li><code>"center"</code></li>
                                    <li><code>"end"</code></li>
                                    <li><code>"post"</code></li>
                                    <li><code>"stretch"</code></li>
                                </ul>
                            </td>
                            <td rowspan="2">
                                <VVPlot :render resize>
                                    <VVAxisX :levels="['start', 'end']" />
                                    <VVAxisY :levels="['pre', 'start', 'center', 'end', 'post', 'stretch'].reverse()" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="pre" :inset="5"
                                        text-align="pre" title="text-align='pre'" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="start" :inset="5"
                                        text-align="start" title="text-align='start'" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="center"
                                        text-align="center" title="text-align='center'" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="end" :inset="5"
                                        text-align="end" title="text-align='end'" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="post" :inset="5"
                                        text-align="post" title="text-align='post'" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="stretch"
                                        text-align="stretch" title="text-align='stretch'" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>inset</code></td>
                            <td>
                                inset distance of the text to the anchor points, in pixels (default: 0).
                                Only applicable when <code>text-align</code> is set to
                                <code>"pre"</code>, <code>"start"</code>, <code>"end"</code> or <code>"post"</code>.
                            </td>
                        </tr>
                        <tr>
                            <td><code>color</code></td>
                            <td>color of the text (default: black)</td>
                            <td rowspan="5">
                                <VVPlot :render>
                                    <VVAxisX :levels="['start', 'end']" />
                                    <VVAxisY
                                        :levels="['normal', 'size', 'color', 'stroke', 'linewidth', 'linetype'].reverse()" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="normal" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="size" :size="6"
                                        title="size=6" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="color"
                                        color="red" title="color='red'" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="stroke"
                                        stroke="red" title="stroke='red'" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="linewidth"
                                        stroke="red" :linewidth="2" title="linewidth=2" />
                                    <VVGeomMarkdownsegment x="start" xend="end"
                                        label="<font color='blue'>**mark**</font><sub>*down*</sub>" y="linetype"
                                        stroke="red" linetype="1 1" title="linetype='1 1'" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td>size of the text (default: 4)</td>
                        </tr>
                        <tr>
                            <td><code>stroke</code></td>
                            <td>color of the outline (default: none)</td>
                        </tr>
                        <tr>
                            <td><code>linewidth</code></td>
                            <td>line width of the outline (default: 1)</td>
                        </tr>
                        <tr>
                            <td><code>linetype</code></td>
                            <td>line type of the outline (default: solid)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Additional aesthetics</h3>
            <p>
                Some additional aesthetics that can be used across different graphic layers.
            </p>
            <ul>
                <li>
                    <code>alpha</code> controls the transparency of the geometric elements.
                    The value should be between 0 and 1, where 0 is fully transparent and 1 is fully opaque.
                </li>
                <li>
                    <code>title</code> sets the tooltip text for the geometric elements.
                    The tooltip will be shown when hovering over the elements.
                    This aesthetic is only supported in the SVG rendering mode.
                </li>
                <li>
                    <code>translate-x</code> and <code>translate-y</code>
                    are used to shift the position of geometric elements in the unit of pixels.
                    Note that the translation is fixed in the screen space, so positive <code>translate-y</code> values
                    will always shift the elements downward, regardless of the orientation of the y axis.
                </li>
                <li>
                    <code>xnudge</code> and <code>ynudge</code> are used to shift the position of geometric elements in
                    the unit of the data coordinates.
                    Note that the nudging will not affect the limits of the plot, so the nudged elements may become
                    outside of the plot area.
                </li>
            </ul>
            <div class="flex flex-row">
                <VVPlot :render :width="600" :height="400" resize>
                    <VVAxisY :levels="['title', 'alpha', 'translate-x', 'translate-y', 'xnudge', 'ynudge'].reverse()" />
                    <VVAxisX :levels="['point', 'line', 'rectangle', 'text']"
                        :labels="['point', 'line', 'rectangle/ellipse/\ncurve/polygon', 'text/\nmarkdown']"
                        :theme="{ label_type: 'markdown' }" />
                    <VVGeomPoint x="point" y="title" title="point" />
                    <VVGeomPoint x="point" y="alpha" :alpha="0.5" />
                    <VVGeomPoint x="point" y="translate-x" :translate-x="5" />
                    <VVGeomPoint x="point" y="translate-y" :translate-y="5" />
                    <VVGeomPoint x="point" y="xnudge" :xnudge="0.1" />
                    <VVGeomPoint x="point" y="ynudge" :ynudge="0.1" />
                    <VVGeomTile x="rectangle" :width="0.5" :height="0.5" y="title" title="rectangle" />
                    <VVGeomTile x="rectangle" :width="0.5" :height="0.5" y="alpha" :alpha="0.5" />
                    <VVGeomTile x="rectangle" :width="0.5" :height="0.5" y="translate-x" :translate-x="5" />
                    <VVGeomTile x="rectangle" :width="0.5" :height="0.5" y="translate-y" :translate-y="5" />
                    <VVGeomTile x="rectangle" :width="0.5" :height="0.5" y="xnudge" :xnudge="0.1" />
                    <VVGeomTile x="rectangle" :width="0.5" :height="0.5" y="ynudge" :ynudge="0.1" />
                    <VVGeomStick x="line" :dx="0.1" :dy="0.1" y="title" title="line" />
                    <VVGeomStick x="line" :dx="0.1" :dy="0.1" y="alpha" :alpha="0.5" />
                    <VVGeomStick x="line" :dx="0.1" :dy="0.1" y="translate-x" :translate-x="5" />
                    <VVGeomStick x="line" :dx="0.1" :dy="0.1" y="translate-y" :translate-y="5" />
                    <VVGeomStick x="line" :dx="0.1" :dy="0.1" y="xnudge" :xnudge="0.1" />
                    <VVGeomStick x="line" :dx="0.1" :dy="0.1" y="ynudge" :ynudge="0.1" />
                    <VVGeomText x="text" label="text" y="title" title="text" />
                    <VVGeomText x="text" label="text" y="alpha" :alpha="0.5" />
                    <VVGeomText x="text" label="text" y="translate-x" :translate-x="5" />
                    <VVGeomText x="text" label="text" y="translate-y" :translate-y="5" />
                    <VVGeomText x="text" label="text" y="xnudge" :xnudge="0.1" />
                    <VVGeomText x="text" label="text" y="ynudge" :ynudge="0.1" />
                </VVPlot>
            </div>
            <h4>Class and style forwarding</h4>
            <p>
                Mordern browsers support styling SVG elements with CSS, which allows for more flexible and powerful
                styling options.
            </p>
            <p>
                In VVPlot, you can pass CSS classes and styles to geometric elements with the following component
                properties:
            </p>
            <ul>
                <li>
                    The <code>class</code> and <code>style</code> attributes will be directly forwarded to the SVG
                    layer.
                </li>
                <li>
                    The <code>group-class</code> and <code>group-style</code> attributes will be applied to geometric
                    groups (defined by the <code>group</code> aesthetic).
                </li>
                <li>
                    The <code>item-class</code> and <code>item-style</code> will be applied to individual geometric
                    elements.
                </li>
            </ul>
            <hr>
            <pre-highlight lang="html">{{`<VVPlot ref="plot" :data="iris" :width="600" :height="400">
    <VVGeomEllipse :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
        item-style="fill: currentColor; fill-opacity: 0.2;" />
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
        :shape="d => d.Species" :group="d => d.Species" :linewidth="0.2"
        class="cursor-pointer stroke-current" group-class="hover:stroke-[black]" />
</VVPlot>` }}</pre-highlight>
            <blockquote class="tip">
                <p>
                    Hover over the points to see the style.
                </p>
            </blockquote>
            <VVPlot ref="plot" :data="iris" :width="600" :height="400">
                <VVGeomEllipse :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
                    item-style="fill: currentColor; fill-opacity: 0.2;" />
                <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
                    :shape="d => d.Species" :group="d => d.Species" :linewidth="0.2"
                    class="cursor-pointer stroke-current" group-class="hover:stroke-[black]" />
            </VVPlot>
        </section>
    </article>
</template>
