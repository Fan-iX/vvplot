<script setup>
import { ref } from 'vue'

import iris from '../data/iris.json'
const demo_point = [
    { x: -2, y: -2 },
    { x: -1, y: 1 },
    { x: 2, y: 2 },
    { x: 1, y: -1 },
]
const vBind = { iris }
const templates = ref({})
</script>
<template>
    <article>
        <section>
            <h2>Plot axes</h2>
            <h3>Primary and secondary axes</h3>
            <p>
                The plot axes are represented by <code>&lt;VVAxis&gt;</code> components.
            </p>
            <p>
                <code>&lt;VVAxisX&gt;</code> and <code>&lt;VVAxisY&gt;</code> declare
                the x-axis and y-axis for the Cartesian coordinate system.
            </p>
            <p>
                Boolean axis properties <code>primary</code> and <code>secondary</code> are used to define whether
                an axis is primary or secondary.
                For each coordinate direction, the first axis with the <code>primary</code> property will be treated as
                the <strong>primary axis</strong>.
                If no truthy <code>primary</code> property is present, the first axis declared without a truthy
                <code>secondary</code> property will be used.
                Other axes are treated as <strong>secondary axes</strong>.
            </p>
            <p>
                Primary axes will affect the mapping of coordinate aesthetic attributes for geometric elements.
                Secondary axes are only for display.
            </p>
            <h3>Coordinate properties for primary axis</h3>
            <p>
                The <code>min</code> and <code>max</code> property for primary axes sets the coordinate range of the
                plot explicitly.
            </p>
            <p>
                If not set, the coordinate range will be determined by the data range of the mapped aesthetic
                attributes.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre><code class="html">{{templates[1] = `<VVPlot :data="iris">
    <VVGeomPoint :x="d => d.Petal_Width"
        :y="d => d.Petal_Length"
        :color="d => d.Species" />
    <VVAxisX :min="0" :max="5" />
</VVPlot>` }}</code></pre>
                <component :is="{ template: templates[1], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <p>
                For discrete axes, the <code>levels</code> property are used to subset and reorder the discrete
                values.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre><code class="html">{{templates[2] = `<VVPlot :data="iris">
    <VVGeomPoint :x="d => d.Species"
        :xnudge="d => Math.random() - 0.5"
        :y="d => d.Petal_Width"
        :color="d => d.Species" />
    <VVAxisX :levels="['virginica', 'setosa']" />
</VVPlot>` }}</code></pre>
                <component :is="{ template: templates[2], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
            <p>
                The <code>expand-mult</code> and <code>expand-add</code> properties can be used to expand the axis
                limits by a ratio or a fixed value in the data coordinate.
            </p>
            <p>
                They can be a single number, a two-element array, or an object with <code>min</code> and
                <code>max</code> properties.
                The default value for <code>expand-mult</code> is <code>0.05</code> (5% expansion on both sides).
                To remove the default expansion, set it to <code>0</code>.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre><code class="html">{{templates[3] = `<VVPlot :data="iris">
    <VVGeomPoint :x="d => d.Petal_Width"
        :y="d => d.Petal_Length"
        :color="d => d.Species" />
    <VVAxisX :expand-mult="{ min:0, max:0.5 }"/>
    <VVAxisY :min="1" :max="7" :expand-add="1" />
</VVPlot>` }}</code></pre>
                <component :is="{ template: templates[3], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
            <p>
                The <code>extend</code> property declares how much extra space are reserve outside the plot area.
                Geometric elements outside the reserved area will not be omitted.
            </p>
            <p>
                This property can be useful for interactive plots.
                You may drag the plot to see the different render behavior for elements outside the plot area in x and y
                direction in the demo below.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre><code class="html">{{templates[4] = `<VVPlot :data="iris">
    <VVGeomPoint :x="d => d.Petal_Width"
        :y="d => d.Petal_Length"
        :color="d => d.Species" />
    <VVAxisX :min="1.5" :max="2" />
    <VVAxisY :min="4" :max="5" :extend="2"/>
    <VVAction move />
</VVPlot>` }}</code></pre>
                <component :is="{ template: templates[4], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <h3>Axis layout properties</h3>
            <p>
                The <code>title</code> property sets the axis title.
                Axis theme property <code>title_position</code>, <code>title_size</code>, <code>title_color</code>
                and <code>title_offset</code> can be used to adjust the title appearance.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre><code class="html">{{templates[5] = `<VVPlot :data="iris">
    <VVGeomPoint :x="d => d.Petal_Width"
        :y="d => d.Petal_Length"
        :color="d => d.Species" />
    <VVAxisX title="Petal Width" 
        :theme="{ title_size: 14 }" />
</VVPlot>` }}</code></pre>
                <component :is="{ template: templates[5], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <hr>
            <p>
                The <code>position</code> property specifies where the axis should be drawn. It can be:
            </p>
            <ul>
                <li>
                    A number, at which coordinate position (of the other coordinate direction) the axis will be drawn.
                    <ul>
                        <li>The axis will move when the during plot move/zoom</li>
                    </ul>
                </li>
                <li>A percentage string, at which percentage (of the other coordinate direction) the axis will be drawn.
                    <ul>
                        <li>The axis position is fixed during plot move/zoom</li>
                    </ul>
                </li>
                <li>One of the edge preset strings below:
                    <ul>
                        <li><code>"top"</code>: The axis will be drawn at the top of the plot area.</li>
                        <li><code>"bottom"</code>: The axis will be drawn at the bottom of the plot area.</li>
                        <li><code>"left"</code>: The axis will be drawn at the left of the plot area.</li>
                        <li><code>"right"</code>: The axis will be drawn at the right of the plot area.</li>
                    </ul>
                </li>
                <li><code>"center"</code>, same as <code>"50%"</code>.</li>
                <li><code>"none"</code>, the axis will not be drawn.</li>
            </ul>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre><code class="html">{{templates[6] = `<VVPlot :data="iris">
    <VVGeomPoint :x="d => d.Petal_Width"
        :y="d => d.Petal_Length"
        :color="d => d.Species" />
    <VVAxisX position="top" primary :extend="1" />
    <VVAxisX :position="3" />
    <VVAxisY position="30%" :extend="1"/>
    <VVAction move />
</VVPlot>` }}</code></pre>
                <component :is="{ template: templates[6], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <p>
                If no <code>&lt;VVAxis&gt;</code> is declared for a coordinate direction, a primary axis will be
                created automatically at the bottom (x) or left (y) of the plot area.
                To hide the axis, declare an axis with <code>position="none"</code>.
            </p>
            <hr>
            <p>
                The <code>breaks</code> and <code>minor-breaks</code> properties set the coordinate positions of the
                major ticks and minor grid lines, respectively.
                They can be an array of numbers or a function that takes the current axis limits
                (<code>{ min, max }</code>) as input and returns an array of numbers.
            </p>
            <p>
                The <code>labels</code> property sets the tick text.
                It can be an array of strings that matches the length of <code>breaks</code>,
                or a function that will be applied to each tick value (via <code>Array.prototype.map</code>).
            </p>
            <p>
                Boolean property <code>show-grid</code> controls whether to show the grid lines for the axis.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre><code class="html">{{templates[7] = `<VVPlot :data="iris">
    <VVGeomPoint :x="d => d.Petal_Width"
        :y="d => d.Petal_Length"
        :color="d => d.Species" />
    <VVAxisX :breaks="[0, 1, 2, 3, 4]"
        :minor-breaks="({ min, max }) => Array.from({ length: 20 }, (_, i) => i * (max - min) / 20 + min)" />
    <VVAxisY :show-grid="false" :labels="x => x + ' cm'" />
    <VVAction move />
</VVPlot>` }}</code></pre>
                <component :is="{ template: templates[7], props: Object.keys(vBind) }" v-bind="vBind" />
            </div>
            <h3>List of axis properties</h3>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th>Axis property</th>
                            <th>Syntax</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>min</code>,<code>max</code></td>
                            <td>
                                <code>&lt;Number&gt;</code>
                            </td>
                            <td>Range limit by coordinate</td>
                            <td>
                                <VVPlot :data="demo_point">
                                    <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                    <VVAxisX :min="0" :max="4" />
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
                                <code>&lt;Number&gt;</code>
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
                                <code>"left"</code> | <code>"right"</code>
                                <br>
                                <code>"top"</code> | <code>"bottom"</code>
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
                            <td><code>show-grid</code></td>
                            <td><code>&lt;boolean&gt;</code></td>
                            <td>Whether to show grid lines</td>
                            <td>
                                <VVPlot :data="demo_point">
                                    <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                                    <VVAxisX :show-grid="false" />
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
                    </tbody>
                </table>
            </div>
        </section>
    </article>
</template>
