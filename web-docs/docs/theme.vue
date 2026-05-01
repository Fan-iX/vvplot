<script setup>
import vvtheme from '#base/js/theme'
import { themeMerge } from '#base/js/theme'
import iris from '../data/iris.json'
</script>
<template>
    <article>
        <section>
            <h2>Plot theme: modify plot appearance</h2>
            <p>The appearance of plots can be customized with themes.</p>
            <h3>Theme syntax</h3>
            <p>
                Themes are collections of style options for different plot components, represented as
                two-level nested objects.
                Here shows the full content of the <code>default</code> theme:
            </p>
            <pre-highlight lang="json"
                class="h-96 overflow-auto">{{ themeMerge(vvtheme.base, vvtheme.default) }}</pre-highlight>
            <p>
                Theme objects can be passed to the <code>theme</code> prop of <code>VVPlot</code> components.
                They will be deep merged together with the default theme.
            </p>
            <p>
                If an array of themes is provided, they will be merged from left to right.
            </p>
            <p>
                <code>null</code> and <code>undefined</code> have different merging behaviors:
                <code>null</code> will override the previous value, while <code>undefined</code> will be ignored.
            </p>
            <h4>Theme properties for the plot area</h4>
            <p>
                The <code>margin_*</code> and <code>padding_*</code> properties of the <code>plot</code> property set
                control the layout of the plot area.
            </p>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table whitespace-nowrap">
                    <thead>
                        <tr>
                            <th>Target</th>
                            <th>Theme property</th>
                            <th>Default</th>
                            <th>In plot</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Margin at top side</td>
                            <td><code>margin</code>, <code>margin_v</code>, <code>margin_top</code></td>
                            <td><code>20</code></td>
                            <td rowspan="4">
                                <VVPlot :data="iris" :width="300" :height="200">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <template #tooltip>
                                        <svg width="300" height="200" class="absolute top-0 left-0">
                                            <path d="M0 0H300V200H0V0M20 20H280V180H20V20" fill="orange"
                                                fill-opacity="0.2" fill-rule="evenodd" />
                                        </svg>
                                    </template>
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Margin at bottom side</td>
                            <td><code>margin</code>, <code>margin_v</code>, <code>margin_bottom</code></td>
                            <td><code>20</code></td>
                        </tr>
                        <tr>
                            <td>Margin at left side</td>
                            <td><code>margin</code>, <code>margin_h</code>, <code>margin_left</code></td>
                            <td><code>20</code></td>
                        </tr>
                        <tr>
                            <td>Margin at right side</td>
                            <td><code>margin</code>, <code>margin_h</code>, <code>margin_right</code></td>
                            <td><code>20</code></td>
                        </tr>
                        <tr>
                            <td>Space for top axis</td>
                            <td><code>padding</code>, <code>padding_v</code>, <code>padding_top</code></td>
                            <td><code>30</code></td>
                            <td rowspan="4">
                                <VVPlot :data="iris" :width="300" :height="200">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <template #tooltip>
                                        <svg width="300" height="200" class="absolute top-0 left-0">
                                            <path d="M20 20V180H280V150H70V20H20" fill="green" fill-opacity="0.2" />
                                        </svg>
                                    </template>
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Space for bottom axis</td>
                            <td><code>padding</code>, <code>padding_v</code>, <code>padding_bottom</code></td>
                            <td><code>30</code></td>
                        </tr>
                        <tr>
                            <td>Space for left axis</td>
                            <td><code>padding</code>, <code>padding_h</code>, <code>padding_left</code></td>
                            <td><code>50</code></td>
                        </tr>
                        <tr>
                            <td>Space for right axis</td>
                            <td><code>padding</code>, <code>padding_h</code>, <code>padding_right</code></td>
                            <td><code>50</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                The <code>background</code> property controls the background color of the plot area.
            </p>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th>Target</th>
                            <th>Theme property</th>
                            <th>Defalt</th>
                            <th>In plot</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Background color of plot area</td>
                            <td><code>background</code></td>
                            <td><code>null</code></td>
                            <td>
                                <VVPlot :data="iris" :width="300" :height="200"
                                    :theme="{ plot: { background: '#AAAAAA88' } }">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h4>Theme properties for axes</h4>
            <p>
                The <code>axis</code> and <code>axis_*</code> property sets control the appearance of the plot axes.
            </p>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table whitespace-nowrap">
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Attribute</th>
                            <th>Theme property</th>
                            <th>Default</th>
                            <th colspan="2">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowspan="2">Axis line</td>
                            <td>width</td>
                            <td><code>line_width</code></td>
                            <td><code>1</code></td>
                            <td><code>2</code></td>
                            <td rowspan="2">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :min="-10" :max="10" :show-grid="false"
                                        :theme="{ line_width: 2, line_color: 'red' }" title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>color</td>
                            <td><code>line_color</code></td>
                            <td><code>"black"</code></td>
                            <td><code>"red"</code></td>
                        </tr>
                        <tr>
                            <td rowspan="4">Tick bar</td>
                            <td>position</td>
                            <td><code>tick_position</code></td>
                            <td>
                                <code>"bottom"</code> for horizontal axes
                                <br>
                                <code>"left"</code> for vertical axes
                                <br>
                                <code>"top"</code> for top axes
                                <br>
                                <code>"right"</code> for right axes
                            </td>
                            <td><code>"top"</code></td>
                            <td rowspan="4">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :min="-10" :max="10" :show-grid="false"
                                        :theme="{ tick_position: 'top', tick_width: 2, tick_color: 'red', tick_length: 3 }"
                                        title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td><code>tick_width</code></td>
                            <td><code>1</code></td>
                            <td><code>2</code></td>
                        </tr>
                        <tr>
                            <td>color</td>
                            <td><code>tick_color</code></td>
                            <td><code>"black"</code></td>
                            <td><code>"red"</code></td>
                        </tr>
                        <tr>
                            <td>length</td>
                            <td><code>tick_length</code></td>
                            <td><code>5</code></td>
                            <td><code>3</code></td>
                        </tr>
                        <tr>
                            <td rowspan="10">Tick text</td>
                            <td>size</td>
                            <td><code>label_size</code></td>
                            <td><code>12</code></td>
                            <td><code>18</code></td>
                            <td rowspan="7">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :min="-10" :max="10" :show-grid="false" :labels="t => `*${t}*`"
                                        :theme="{ tick_position: 'top', label_position: 'bottom', label_size: 18, label_color: 'red', label_offset: 15, label_type: 'markdown', label_anchor_x: 0.5, label_anchor_y: 0.5 }"
                                        title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>color</td>
                            <td><code>label_color</code></td>
                            <td><code>"black"</code></td>
                            <td><code>"red"</code></td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td><code>label_type</code></td>
                            <td><code>"text"</code></td>
                            <td><code>"markdown"</code></td>
                        </tr>
                        <tr>
                            <td>offset</td>
                            <td><code>label_offset</code></td>
                            <td>tick bar length</td>
                            <td><code>15</code></td>
                        </tr>
                        <tr>
                            <td>position</td>
                            <td><code>label_position</code></td>
                            <td>same as <code>tick_position</code></td>
                            <td><code>"bottom"</code></td>
                        </tr>
                        <tr>
                            <td rowspan="2">anchor</td>
                            <td><code>label_anchor_x</code></td>
                            <td>
                                <code>0</code> for position: right
                                <br>
                                <code>1</code> for position: left
                                <br>
                                <code>0.5</code> for others
                            </td>
                            <td><code>0.5</code></td>
                        </tr>
                        <tr>
                            <td><code>label_anchor_y</code></td>
                            <td>
                                <code>0</code> for position: top
                                <br>
                                <code>1</code> for position: bottom
                                <br>
                                <code>0.5</code> for others
                            </td>
                            <td><code>0.5</code></td>
                        </tr>
                        <tr>
                            <td>rotation</td>
                            <td><code>label_angle</code></td>
                            <td><code>0</code></td>
                            <td><code>-45</code></td>
                            <td rowspan="3">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :min="-10" :max="10" :show-grid="false"
                                        :theme="{ label_angle: -45, label_dock_x: 1, label_dock_y: 1 }" title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2">docking</td>
                            <td><code>label_dock_x</code></td>
                            <td>
                                <code>0</code> for position: right
                                <br>
                                <code>1</code> for position: left
                                <br>
                                <code>0.5</code> for others
                            </td>
                            <td><code>1</code></td>
                        </tr>
                        <tr>
                            <td><code>label_dock_y</code></td>
                            <td>
                                <code>0</code> for position: top
                                <br>
                                <code>1</code> for position: bottom
                                <br>
                                <code>0.5</code> for others
                            </td>
                            <td><code>1</code></td>
                        </tr>
                        <tr>
                            <td rowspan="8">Title text</td>
                            <td>size</td>
                            <td><code>title_size</code></td>
                            <td><code>18</code></td>
                            <td><code>24</code></td>
                            <td rowspan="5">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :min="-10" :max="10" :show-grid="false"
                                        :theme="{ title_size: 24, title_color: 'red', title_offset: 15, title_angle: 90, title_type: 'markdown' }"
                                        title="***x***" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>color</td>
                            <td><code>title_color</code></td>
                            <td><code>"black"</code></td>
                            <td><code>"red"</code></td>
                        </tr>
                        <tr>
                            <td>offset</td>
                            <td><code>title_offset</code></td>
                            <td>
                                <code>20</code> for horizontal axes
                                <br>
                                <code>30</code> for vertical axes
                            </td>
                            <td><code>15</code></td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td><code>title_type</code></td>
                            <td><code>"text"</code></td>
                            <td><code>"markdown"</code></td>
                        </tr>
                        <tr>
                            <td>rotation</td>
                            <td><code>title_angle</code></td>
                            <td><code>0</code></td>
                            <td><code>90</code></td>
                        </tr>
                        <tr>
                            <td>position</td>
                            <td><code>title_position</code></td>
                            <td>
                                <code>"bottom"</code> for horizontal axes
                                <br>
                                <code>"left"</code> for vertical axes
                                <br>
                                <code>"top"</code> for top axes
                                <br>
                                <code>"right"</code> for right axes
                            </td>
                            <td><code>"right"</code></td>
                            <td rowspan="3">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :min="-10" :max="10" :show-grid="false"
                                        :theme="{ title_dock_x: 0, title_dock_y: 0, title_position: 'right' }"
                                        title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2">docking</td>
                            <td><code>title_dock_x</code></td>
                            <td>
                                <code>0</code> for position: right
                                <br>
                                <code>1</code> for position: left
                                <br>
                                <code>0.5</code> for others
                            </td>
                            <td><code>0</code></td>
                        </tr>
                        <tr>
                            <td><code>title_dock_y</code></td>
                            <td>
                                <code>0</code> for position: top
                                <br>
                                <code>1</code> for position: bottom
                                <br>
                                <code>0.5</code> for others
                            </td>
                            <td><code>0</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                Additional CSS styles for tick and title labels can be applied throught the <code>label_style</code> and
                <code>title_style</code> property.
            </p>
            <p>
                <code>VVAxis</code> components may have an inline <code>theme</code> property as well.
            </p>
            <p>
                For axes, theme property sets will be merged in the following order (from low to high priority):
            </p>
            <ol>
                <li>The <code>axis</code> property set</li>
                <li>The <code>axis_h</code> or <code>axis_v</code> property set, depending on the axis orientation</li>
                <li>
                    For side axes, the <code>axis_left</code>, <code>axis_right</code>, <code>axis_top</code>, or
                    <code>axis_bottom</code> property set, depending on the axis position
                </li>
                <li>The inline <code>theme</code> property of the axis component</li>
            </ol>
            <h4>Theme properties for grid lines</h4>
            <p>
                The <code>grid</code> and <code>grid_*</code> property sets control the appearance of the grid lines.
            </p>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table whitespace-nowrap">
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Attribute</th>
                            <th>Theme property</th>
                            <th>Default</th>
                            <th colspan="2">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowspan="2">Major grid</td>
                            <td>line width</td>
                            <td><code>line_width_major</code>, <code>line_width</code></td>
                            <td><code>2</code></td>
                            <td><code>2</code></td>
                            <td rowspan="2">
                                <VVPlot :width="300" :height="200" :theme="{ grid: { line_color_major: 'red' } }">
                                    <VVAxisX :min="-10" :max="10" />
                                    <VVAxisY :min="-10" :max="10" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>line color</td>
                            <td><code>line_color_major</code>, <code>line_color</code></td>
                            <td><code>"#eeeeee"</code></td>
                            <td><code>"red"</code></td>
                        </tr>
                        <tr>
                            <td rowspan="2">Minor grid</td>
                            <td>line width</td>
                            <td><code>line_width_minor</code>, <code>line_width</code></td>
                            <td><code>1</code></td>
                            <td><code>1</code></td>
                            <td rowspan="3">
                                <VVPlot :width="300" :height="200" :theme="{ grid: { line_color_minor: 'red' } }">
                                    <VVAxisX :min="-10" :max="10" />
                                    <VVAxisY :min="-10" :max="10" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>line color</td>
                            <td><code>line_color_minor</code>, <code>line_color</code></td>
                            <td><code>"#eeeeee"</code></td>
                            <td><code>"red"</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                Horizontal and vertical grid lines can be styled with property sets
                <code>grid_h</code> and <code>grid_v</code>, respectively.
            </p>
            <blockquote class="tip">
                Apart from the <code>*_h</code> and <code>*_v</code> properties for horizontal and vertical elements,
                you can also use the <code>*_x</code> and <code>*_y</code> properties that are related to x and y axes,
                which follows the <code>flip</code> behavior of the plot.
            </blockquote>
            <blockquote class="info">
                Notice that in normal plots, <code>axis_x</code> stands for the horizontal axis (<code>axis_h</code>),
                while <code>grid_x</code> stands for the <i>vertical</i> grid lines (<code>grid_v</code>) which are
                related to the x axis.
            </blockquote>
            <h3>List of built-in themes</h3>
            <table
                class="w-full [&_.vvplot]:h-[200px] [&_figcaption]:mt-2 [&_figcaption]:ml-[40px] [&_figcaption]:before:content-['▼']">
                <tbody>
                    <tr>
                        <td>
                            <figure>
                                <figcaption><code>vvtheme.default</code></figcaption>
                                <VVPlot :data="iris" :theme="vvtheme.default">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </figure>
                        </td>
                        <td>
                            <figure>
                                <figcaption><code>vvtheme.light</code></figcaption>
                                <VVPlot :data="iris" :theme="vvtheme.light">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </figure>
                        </td>
                        <td>
                            <figure>
                                <figcaption><code>vvtheme.classic</code></figcaption>
                                <VVPlot :data="iris" :theme="vvtheme.classic">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </figure>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <figure>
                                <figcaption><code>vvtheme.gray</code></figcaption>
                                <VVPlot :data="iris" :theme="vvtheme.gray">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </figure>
                        </td>
                        <td>
                            <figure>
                                <figcaption><code>vvtheme.dark</code></figcaption>
                                <VVPlot :data="iris" :theme="vvtheme.dark">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </figure>
                        </td>
                        <td>
                            <figure>
                                <figcaption><code>vvtheme.linedraw</code></figcaption>
                                <VVPlot :data="iris" :theme="vvtheme.linedraw">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </figure>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <figure>
                                <figcaption><code>vvtheme.void</code></figcaption>
                                <VVPlot :data="iris" :theme="vvtheme.void">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </figure>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </article>
</template>
