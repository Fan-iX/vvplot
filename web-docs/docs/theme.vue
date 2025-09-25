<script setup>
import vvtheme from '#base/js/theme'
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
            <pre class="code h-96">{
    axis: {
        line_width: 1,
        tick_width: 1,
        tick_length: 5,
        label_size: 12,
        title_size: 18,
        line_color: 'black',
        tick_color: 'black',
        label_color: 'black',
        title_color: 'black'
    },
    axis_h: {
        title_offset: 20
    },
    axis_v: {
        title_offset: 30,
        title_angle: 90
    },
    axis_left: {
        tick_position: 'left',
        title_position: 'left'
    },
    axis_right: {
        tick_position: 'right',
        title_position: 'right'
    },
    axis_top: {
        tick_position: 'top',
        title_position: 'top'
    },
    axis_bottom: {
        tick_position: 'bottom',
        title_position: 'bottom'
    },
    grid: {
        line_width: 1,
        line_width_major: 2,
        line_color: '#eeeeee'
    },
    plot: {
        margin: 20,
        padding_h: 50,
        padding_v: 20
    },
    legend: {
        spacing: 4
    }
}</pre>
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
                            <th>Defalt</th>
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
                            <td><code>20</code></td>
                            <td rowspan="4">
                                <VVPlot :data="iris" :width="300" :height="200">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <template #tooltip>
                                        <svg width="300" height="200" class="absolute top-0 left-0">
                                            <path d="M20 20V180H280V160H70V20H20" fill="green" fill-opacity="0.2" />
                                        </svg>
                                    </template>
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Space for bottom axis</td>
                            <td><code>padding</code>, <code>padding_v</code>, <code>padding_bottom</code></td>
                            <td><code>20</code></td>
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
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th>Element</th>
                            <th>Theme property</th>
                            <th>Default</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Axis line width</td>
                            <td><code>line_width</code></td>
                            <td><code>1</code></td>
                            <td rowspan="2">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :limits="[-10, 10]" :show-grid="false"
                                        :theme="{ line_width: 2, line_color: 'red' }" title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Axis line color</td>
                            <td><code>line_color</code></td>
                            <td><code>"black"</code></td>
                        </tr>
                        <tr>
                            <td>Tick line width</td>
                            <td><code>tick_width</code></td>
                            <td><code>1</code></td>
                            <td rowspan="3">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :limits="[-10, 10]" :show-grid="false"
                                        :theme="{ tick_width: 2, tick_color: 'red', tick_length: 10 }" title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Tick bar color</td>
                            <td><code>tick_color</code></td>
                            <td><code>"black"</code></td>
                        </tr>
                        <tr>
                            <td>Tick bar length</td>
                            <td><code>tick_length</code></td>
                            <td><code>5</code></td>
                        </tr>
                        <tr>
                            <td>Tick text size</td>
                            <td><code>label_size</code></td>
                            <td><code>12</code></td>
                            <td rowspan="2">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :limits="[-10, 10]" :show-grid="false"
                                        :theme="{ label_size: 18, label_color: 'red' }" title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Tick text color</td>
                            <td><code>label_color</code></td>
                            <td><code>"black"</code></td>
                        </tr>
                        <tr>
                            <td>Axis title size</td>
                            <td><code>title_size</code></td>
                            <td><code>18</code></td>
                            <td rowspan="3">
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :limits="[-10, 10]" :show-grid="false"
                                        :theme="{ title_size: 24, title_color: 'red', title_offset: 15 }" title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Axis title color</td>
                            <td><code>title_color</code></td>
                            <td><code>"black"</code></td>
                        </tr>
                        <tr>
                            <td>Axis title color</td>
                            <td><code>title_offset</code></td>
                            <td>
                                <code>20</code> for horizontal axes
                                <br>
                                <code>30</code> for vertical axes
                            </td>
                        </tr>
                        <tr>
                            <td>Tick position</td>
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
                            <td>
                                <VVPlot :data="iris" :width="300" :height="60">
                                    <VVAxisX :limits="[-10, 10]" :show-grid="false" :theme="{ tick_position: 'top' }"
                                        title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Title position</td>
                            <td><code>title_position</code></td>
                            <td>same as <code>tick_position</code></td>
                            <td>
                                <VVPlot :data="iris" :width="300" :height="50">
                                    <VVAxisX :limits="[-10, 10]" :show-grid="false" :theme="{ title_position: 'right' }"
                                        title="x" />
                                    <VVAxisY position="none" :show-grid="false" />
                                </VVPlot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
                            <th>Theme property</th>
                            <th>Default</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Major grid line width</td>
                            <td><code>line_width_major</code>, <code>line_width</code></td>
                            <td><code>2</code></td>
                            <td rowspan="2">
                                <VVPlot :width="300" :height="200" :theme="{ grid: { line_color_major: 'red' } }">
                                    <VVAxisX :limits="[-10, 10]" />
                                    <VVAxisY :limits="[-10, 10]" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Major grid line color</td>
                            <td><code>line_color_major</code>, <code>line_color</code></td>
                            <td><code>"#eeeeee"</code></td>
                        </tr>
                        <tr>
                            <td>Minor grid line width</td>
                            <td><code>line_width_minor</code>, <code>line_width</code></td>
                            <td><code>1</code></td>
                            <td rowspan="3">
                                <VVPlot :width="300" :height="200" :theme="{ grid: { line_color_minor: 'red' } }">
                                    <VVAxisX :limits="[-10, 10]" />
                                    <VVAxisY :limits="[-10, 10]" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Minor grid line color</td>
                            <td><code>line_color_minor</code>, <code>line_color</code></td>
                            <td><code>"#eeeeee"</code></td>
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
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th>Theme</th>
                            <th>Appearance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>vvtheme.default</code></td>
                            <td>
                                <VVPlot :data="iris" :theme="vvtheme.default">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>vvtheme.light</code></td>
                            <td>
                                <VVPlot :data="iris" :theme="vvtheme.light">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>vvtheme.classic</code></td>
                            <td>
                                <VVPlot :data="iris" :theme="vvtheme.classic">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>vvtheme.gray</code></td>
                            <td>
                                <VVPlot :data="iris" :theme="vvtheme.gray">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>vvtheme.dark</code></td>
                            <td>
                                <VVPlot :data="iris" :theme="vvtheme.dark">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>vvtheme.linedraw</code></td>
                            <td>
                                <VVPlot :data="iris" :theme="vvtheme.linedraw">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>vvtheme.void</code></td>
                            <td>
                                <VVPlot :data="iris" :theme="vvtheme.void">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                </VVPlot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </article>
</template>
