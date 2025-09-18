<script setup>
import iris from '../data/iris.json'
const demo_point = [
    { x: -2, y: -2 },
    { x: -1, y: 1 },
    { x: 2, y: 2 },
    { x: 1, y: -1 },
]
</script>
<template>
    <article>
        <section>
            <h3>List of available geom layers</h3>
            <div class="w-full overflow-auto">
                <table class="w-full whitespace-nowrap" id="doc-axis-table">
                    <thead>
                        <tr>
                            <th>Axis property</th>
                            <th>Syntax</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tr>
                        <td><code>limits</code></td>
                        <td>
                            <code>{ <br> min: &lt;Number&gt;, <br> max: &lt;Number&gt; <br> }</code>
                            | <br>
                            <code>[&lt;Number&gt;, &lt;Number&gt;]</code>
                        </td>
                        <td>Range limit by coordinate</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX :limits="{ min: 0, max: 4 }" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>levels</code></td>
                        <td>
                            <code>&lt;String[]&gt;</code>
                        </td>
                        <td>Subset and reorder discrete values</td>
                        <td>
                            <VVPlot :data="iris">
                                <VVGeomPoint :x="d => d.Species" :xnudge="d => Math.random() - 0.5"
                                    :y="d => d.Petal_Width" />
                                <VVAxisX :levels="['virginica', 'setosa']" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>expand-mult</code></td>
                        <td>
                            <code>&lt;Number&gt;</code> |
                            <code>{ <br> min: &lt;Number&gt;, <br> max: &lt;Number&gt; <br> }</code>
                            | <br>
                            <code>[&lt;Number&gt;, &lt;Number&gt;]</code>
                        </td>
                        <td>Expand axis limits by ratio</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX :expand-mult="{ min: 0.5, max: 1 }" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>expand-add</code></td>
                        <td>
                            <code>&lt;Number&gt;</code> |
                            <code>{ <br> min: &lt;Number&gt;, <br> max: &lt;Number&gt; <br> }</code>
                            | <br>
                            <code>[&lt;Number&gt;, &lt;Number&gt;]</code>
                        </td>
                        <td>Expand axis limits by coordinate value</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX :expand-add="{ min: 0.5, max: 1 }" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>extend</code></td>
                        <td>
                            <code>&lt;Number&gt;</code> |
                            <code>{ <br> min: &lt;Number&gt;, <br> max: &lt;Number&gt; <br> }</code>
                            | <br>
                            <code>[&lt;Number&gt;, &lt;Number&gt;]</code>
                        </td>
                        <td>Reserve extra space outside the plot view</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX :extend="5">
                                    <VVAction move />
                                </VVAxisX>
                                <VVAxisY>
                                    <VVAction move />
                                </VVAxisY>
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>title</code></td>
                        <td><code>&lt;String&gt;</code></td>
                        <td>Axis title</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX title="x" />
                                <VVAxisY title="y" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="4"><code>position</code></td>
                        <td><code>&lt;Number&gt;</code></td>
                        <td>
                            Axis position by data coordinate
                            <br>
                            Move with the plot view
                        </td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX :position="0">
                                    <VVAction move />
                                </VVAxisX>
                                <VVAxisY :position="0">
                                    <VVAction move />
                                </VVAxisY>
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>"&lt;Number&gt;%"</code></td>
                        <td>
                            Axis position relative to plot
                            <br>
                            Fixed during plot move/zoom
                        </td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX position="50%">
                                    <VVAction move />
                                </VVAxisX>
                                <VVAxisY position="50%">
                                    <VVAction move />
                                </VVAxisY>
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            y-axis: <code>"left"</code> | <code>"right"</code>
                            <br>
                            x-axis: <code>"top"</code> | <code>"bottom"</code>
                        </td>
                        <td>
                            Axis position at the edge of plot
                            <br>
                            Extra space will be reserved at the edge
                        </td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX position="top" />
                                <VVAxisY position="right" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>"none"</code></td>
                        <td>
                            The axis will not be drawn
                            <br>
                            Coordinate properties will still apply
                        </td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisY position="none" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2"><code>breaks</code></td>
                        <td><code>&lt;Number[]&gt;</code></td>
                        <td rowspan="2">Coordinate position of ticks</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX :breaks="[-2, 0, 1]" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>({min, max}) => &lt;Number[]&gt;</code></td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX
                                    :breaks="({ min, max }) => Array.from({ length: 6 }, (_, i) => i * (max - min) / 5 + min)" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2"><code>minor-breaks</code></td>
                        <td><code>&lt;Number[]&gt;</code></td>
                        <td rowspan="2">Coordinate position of minor grid line</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX :minor-breaks="[-0.5, -0.25, 0.25, 0.5]" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>({min, max}) => &lt;Number[]&gt;</code></td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX
                                    :minor-breaks="({ min, max }) => Array.from({ length: 21 }, (_, i) => i * (max - min) / 20 + min)" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2"><code>labels</code></td>
                        <td><code>&lt;String[]&gt;</code></td>
                        <td rowspan="2">Tick text</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX :breaks="[-2, -1, 1, 2]" :labels="['A', 'B', 'C', 'D']" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>(x, i, breaks) => &lt;String&gt;</code></td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                <VVAxisX :labels="x => x.toFixed(1)" />
                            </VVPlot>
                        </td>
                    </tr>
                </table>
            </div>
        </section>
    </article>
</template>
<style>
#doc-axis-table {
    .vvplot {
        width: 200px;
        height: 120px;
        margin: 0 auto;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding-inline: 8px;
    }

    th {
        padding-block: 8px;
    }
}
</style>
