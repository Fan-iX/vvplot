<script setup>
import { ref } from 'vue'

import vvscale from '#base/js/scale'
import vvtheme from '#base/js/theme'

import iris from '../data/iris.json'
const vBind = { iris, vvscale, vvtheme }
const templates = ref({})
const render = ref('canvas')
</script>
<template>
    <article>
        <section>
            <h2>Quick Start</h2>
            <h3>Basic concepts</h3>
            <p>
                VVPlot uses a Vue-based, <i>Grammar of Graphics</i> style syntax to build plots.
            </p>
            <hr>
            <pre-highlight lang="html">{{templates[1] = `<VVPlot :data="iris" :width="600" :height="400">
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Petal_Length" :color="d => d.Species" />
    <VVAxisX title="Petal Width" />
    <VVAxisY title="Petal Length" />
</VVPlot>` }}</pre-highlight>
            <component :is="{ template: templates[1], props: Object.keys(vBind) }" v-bind="vBind" class="mx-auto" />
            <hr>
            </hr>
            <h4>The plot component</h4>
            <p>
                <code>&lt;VVPlot&gt;</code> is the main wrapper component,
                inside which you can place various <strong>figure elements</strong>,
                such as <strong>layers</strong> (<code>&lt;VVGeomPoint&gt;</code>) and
                <strong>axes</strong> (<code>&lt;VVAxisX&gt;</code>/<code>&lt;VVAxisY&gt;</code>).
            </p>
            <p>
                The <code>data</code> property of <code>&lt;VVPlot&gt;</code> specifies the <strong>data</strong> to be
                plotted.
            </p>
            <p>
                Fisher's <i>Iris</i> data set is used in the example above:
            </p>
            <details>
                <summary>The <code>iris</code> data set</summary>
                <pre-highlight lang="javascript"
                    class="overflow-auto max-h-48">iris = [{{iris.map(d => '\n    ' + JSON.stringify(d)).join(',') + '\n'}}]</pre-highlight>
            </details>
            <h4>Layer declaration</h4>
            <p>
                A plot may contain multiple <strong>layer components</strong>.
                Each layer component declares a <strong>graphic layer</strong> in the plot.
            </p>
            <p>
                Different components declare different <strong>statistical transformation</strong> that will be applied
                to the data, as well as different <strong>geometric elements</strong> that is to be drawn on the plot.
                In the example above, <code>&lt;VVGeomPoint /&gt;</code> tells the plot to draw scatter points.
            </p>
            <p>
                By default, layers will inherit the <strong>data</strong> from the parent <code>&lt;VVPlot&gt;</code>
                component.
                You may also provide a <code>data</code> property to the layer to override the inherited data.
                It can be an array of data entries, or a function which will be applied to the inherited data.
            </p>
            <p>
                <strong>Aesthetics</strong> define how data variables are mapped to visual properties of the geometric
                element.
                They are specified via layer properties, e.g. <code>x</code>, <code>y</code>, <code>color</code>.
            </p>
            <ul>
                <li>
                    If a function is provided, the <strong>aesthetic mapping</strong> will be applied to each data
                    entry to obtain the <strong>aesthetic value</strong>. Aesthetic values will later be transformed
                    by <strong>scaling functions</strong> to <strong>aesthetic attributes</strong>, which will define
                    the visual properties of the geometric element.
                </li>
                <li>
                    If a constant value is provided, it will serve directly as an <strong>aesthetic attribute</strong>.
                </li>
            </ul>
            <p>
                Some geom layers may require specific <strong>arguments</strong> for statistical transformation.
                They shall be provided as layer properties as well.
            </p>
            <p>
                You may also provide <strong>scaling functions</strong> via the <code>scales</code> property of the
                layer. Some predefined scaling functions are available in the <code>vvscale</code> module.
            </p>
            <p>
                Other <strong>layer attributes</strong> will be passed to the geometric element as is.
            </p>
            <h4>Axes declaration</h4>
            <p>
                <code>&lt;VVAxisX /&gt;</code> and <code>&lt;VVAxisY /&gt;</code> are <strong>axis</strong> components
                that declare how the x- and y-axes of the plot shall be shown.
            </p>
            <p><strong>Axis properties</strong> specify how the axis will be drawn.</p>
            <ul>
                <li>
                    The property <code>position</code> defines the display position and layout of the axis.
                    It can be a either a number in data coordinate (e.g. <code>0</code>) or a percentage string (e.g.
                    <code>"10%"</code>) standing for the relative position within the plot area.
                    You may also use the keywords <code>"left"</code>/<code>"right"</code> for y-axis,
                    and <code>"top"</code>/<code>"bottom"</code> for x-axis.
                </li>
                <li>
                    The property <code>breaks</code> defines how tick marks are placed along the axis.
                    It can be an array of break positions in data coordinate, or a function that generates such an
                    array.
                    Some predefined break functions are available in the <code>vvbreak</code> module.
                </li>
                <li>
                    The property <code>labels</code> defines how tick labels are generated.
                    It can be a function that generates an array of labels from the array of break positions.
                    Some predefined label functions are available in the <code>vvlabel</code> module.
                </li>
                <li>
                    The boolean property <code>show-grid</code> specifies whether grid lines should be drawn
                    along the axis. The grid lines will be drawn at the (major) break positions.
                    You can use the <code>minor-breaks</code> property to specify minor grid lines.
                </li>
            </ul>
            <p>
                Each plot has one <strong>primary</strong> axis for each dimension (x and y).
                The <strong>coordinate properties</strong> of the primary axis will affect the coordinate mapping of the
                plot.
            </p>
            <ul>
                <li>
                    The properties <code>min</code> and <code>max</code> defines the range limits of the axis.
                </li>
                <li>
                    For discrete axes, the property <code>levels</code> controls the which discrete values are shown.
                    It also controls the order of the discrete values.
                </li>
                <li>
                    The property <code>expand-add</code> and <code>expand-mult</code> control the expansion of the axis
                    limits.
                </li>
                <li>
                    The property <code>reverse</code> controls whether the axis is reversed.
                </li>
            </ul>
            <p>
                Axis with the boolean property <code>primary</code> will be treated as primary axes.
                If no axis is marked as primary for a dimension, the first axis without <code>:primary="false"</code>
                (or <code>secondary</code>) will be treated as primary axes.
            </p>
            <p>
                If no x-axis is specified, a default x-axis will be drawn at the bottom of the plot.
                You may use the property <code>position="none"</code> to hide it.
                The same applies to y-axis, which will be drawn at the left of the plot by default.
            </p>
            <hr>
            <pre-highlight lang="html">{{templates[2] = `<VVPlot :data="iris" :width="600" :height="400">
    <VVGeomHistogram :x="d => d.Petal_Width" :fill="d => d.Species" :alpha="0.5" bins="20"
        :scales="{ fill: vvscale.fill.hue({ l: 60 }) }"
        style="cursor: pointer;"/>
    <VVAxisX :min="0" :breaks="[0, 0.5, 1, 1.5, 2, 2.5]" />
    <VVAxisY :expand-mult="{max: 0.1}" primary />
    <VVAxisY position="right" />
</VVPlot>` }}</pre-highlight>
            <component :is="{ template: templates[2], props: Object.keys(vBind) }" v-bind="vBind" class="mx-auto" />
            <hr>
            <p>
                The plot above shows how these things work together:
            </p>
            <ul>
                <li>
                    The plot <strong>data</strong> property <code>:data="iris"</code> specifies the data to be plotted.
                </li>
                <li>
                    The <strong>layer</strong> component <code>&lt;VVGeomHistogram /&gt;</code> draws histogram bars
                    (geometric element) after applying histogram binning (statistical transformation) to the data.
                    <ul>
                        <li>
                            <code>:x="d => d.Petal_Width"</code> and <code>:fill="d => d.Species"</code> specifies the
                            <strong>aesthetic mapping</strong> for the x-axis and fill color.
                        </li>
                        <li>
                            <code>:alpha="0.5"</code> specifies a constant <strong>aesthetic attribute</strong> for the
                            transparency of the bars.
                        </li>
                        <li>
                            <code>bins="20"</code> is an layer <strong>argument</strong> that specifies the number of
                            bins to be used for histogram binning.
                        </li>
                        <li>
                            <code>:scales="{ fill: vvscale.fill.hue({ l: 60 }) }"</code> provides <strong>scaling
                                functions</strong> for the fill color aesthetic.
                        </li>
                        <li>
                            The remaining <strong>layer attributes</strong> <code>style="cursor: pointer;"</code> adds a
                            CSS style to the bars. You can move your mouse over the bars to see the effect.
                        </li>
                    </ul>
                </li>
                <li>
                    The <strong>axis</strong> component <code>&lt;VVAxisX /&gt;</code> draws the x-axis at the bottom
                    of the plot.
                    <ul>
                        <li>
                            Since this is the only x-axis in the plot, it is treated as the <strong>primary</strong>
                            x-axis.
                        </li>
                        <li>
                            The property <code>:min="0"</code> sets the minimum limit of the coordinate
                            mapping for the x-dimension. The maximum limit is determined automatically from the data.
                        </li>
                        <li>
                            The property <code>:breaks="[0, 0.5, 1, 1.5, 2, 2.5]"</code> specifies the tick mark
                            positions along the axis.
                        </li>
                    </ul>
                </li>
                <li>
                    Two axis components <code>&lt;VVAxisY /&gt;</code> draws y-axes on the left and
                    right sides of the plot.
                    <ul>
                        <li>
                            The first y-axis, marked with <code>primary</code>, it is treated as the primary y-axis.
                        </li>
                        <li>
                            The property <code>:expand-mult="{max: 0.1}"</code> expands the maximum limit of the
                            coordinate mapping for the y-dimension by 10%.
                        </li>
                        <li>
                            The second y-axis is positioned at the right side of the plot with
                            <code>position="right"</code>.
                        </li>
                    </ul>
                </li>
            </ul>
            <p>
                Please refer to the <a href="#layer">Layer</a> and <a href="#axis">Axis</a> page for more details.
            </p>
        </section>
        <section>
            <h3>Modify plot appearance with <code>theme</code></h3>
            <p>
                The <code>theme</code> property of <code>&lt;VVPlot&gt;</code> can be used to change the overall
                appearance of the plot.
            </p>
            <p>
                Like <code>ggplot2</code>, VVPlot comes with several built-in themes.
            </p>
            <p>
                To use a built-in theme, you need to import it from the <code>vvtheme</code> module.
            </p>
            <pre-highlight lang="javascript">import { vvtheme } from 'vvplot'</pre-highlight>
            <p>
                You can provide a single theme object or an array of theme objects to the <code>theme</code> property of
                <code>&lt;VVPlot&gt;</code>:
            </p>
            <hr>
            <pre-highlight lang="html">{{templates[3] = `<VVPlot :data="iris" :width="600" :height="400" 
    :theme="[vvtheme.gray, { axis_x: { line_color: 'blue' } }]">
    <VVGeomHistogram :x="d => d.Petal_Width" :fill="d => d.Species" bins="15"/>
</VVPlot>` }}</pre-highlight>
            <component :is="{ template: templates[3], props: Object.keys(vBind) }" v-bind="vBind" class="mx-auto" />
            <hr>
            <p>
                Please refer to the <a href="#theme">Theme</a> page for more details.
            </p>
        </section>
        <section>
            <h3>Make the plot interactive</h3>
            <p>
                VVPlot uses an declarative approach to add interactivity to plots.
                The <strong>action component</strong> <code>&lt;VVAction /&gt;</code> and
                <strong>selection component</strong> <code>&lt;VVSelection /&gt;</code>
                are used to declare interactive behaviors.
            </p>
            <p>
                <code>&lt;VVAction /&gt;</code> can be placed inside the plot or within an axis.
            </p>
            <p>
                There are 3 available <strong>plot actions</strong> and 4 available <strong>axis actions</strong>,
                which are: <code>move</code>, <code>nudge</code>, <code>zoom</code>, <code>rescale</code> (axis only).
            </p>
            <hr>
            <pre-highlight lang="html">{{templates[4] = `<VVPlot :data="iris" :width="600" :height="400">
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
    <VVAxisX position="center" :extend="1" :min="-1">
        <VVAction :zoom="{ min: -5 }" :rescale="{ max: 10 }" :min-range="3" />
        <VVAction move :nudge="{ shift: true }" :min="-2" :max="10" />
    </VVAxisX>
    <VVAxisY :position="0" :extend="1">
        <VVAction :zoom="{ max: 10, min: -2 }" :move="{ min: -2 }" :rescale="{ max: 10 }" />
    </VVAxisY>
    <VVSelection />
    <VVAction nudge shift x />
    <VVAction nudge y />
    <VVAction :move="{ button: 'right' }" :xmin="-2" :xmax="10" :ymin="-2" />
    <VVAction :zoom="{ xmin: -5, xmax: 10 }" :ymin="-2" :ymax="10" ctrl />
</VVPlot>` }}</pre-highlight>
            <component :is="{ template: templates[4], props: Object.keys(vBind) }" v-bind="vBind" class="mx-auto" />
            <hr>
            <p>
                The plot above declares a bunch of actions to make the plot interactive.
            </p>
            <ul>
                <li>
                    The <code>&lt;VVAction /&gt;</code> inside <code>&lt;VVAxisX /&gt;</code> and
                    <code>&lt;VVAxisY /&gt;</code> declares axis actions that are bound to the respective axes.
                    They will take effect when the mouse is over the axis.
                    <ul>
                        <li>
                            The <code>rescale</code> and <code>zoom</code> action allows <strong>zooming</strong> the
                            axis limits via mouse drag and scroll.
                        </li>
                        <li>
                            The <code>nudge</code> and <code>move</code> action allows <strong>moving</strong> the plot
                            view via mouse drag and scroll.
                        </li>
                        <li>
                            The property <code>:min="-5"</code> restricts zoom-out so that the minimum boundary of the
                            x-axis will not be less than -5 in data coordinate, while the properties
                            <code>:min-range="4"</code> restricts zoom-in so that the minimum range
                            of the axis will not be less than 4 units in data coordinate. The same applies to other
                            <code>min</code> and <code>max</code> properties for both x- and y-axes.
                        </li>
                        <li>
                            The configuration <code>{ shift: true }</code> requires holding down the <kbd>Shift</kbd>
                            key to activate the nudge action. This avoid the conflict between <code>nudge</code> and
                            <code>zoom</code> action on mouse scroll.
                        </li>
                    </ul>
                </li>
                <li>
                    Other <code>&lt;VVAction /&gt;</code> are directly inside <code>&lt;VVPlot /&gt;</code> declares
                    plot actions that are bound to the whole plot.
                    <ul>
                        <li>
                            The <code>nudge</code> action allows <strong>moving</strong> the plot view via mouse scroll.
                            The <code>x</code> and <code>y</code> propertys restrict the nudge direction to horizontal
                            and vertical respectively.
                        </li>
                        <li>
                            The <code>move</code> action allows <strong>moving</strong> the plot view via mouse drag.
                        </li>
                        <li>
                            The <code>zoom</code> action allows <strong>zooming</strong> the plot view via mouse scroll.
                        </li>
                        <li>
                            The properties <code>xmin</code>, <code>xmax</code>, <code>ymin</code>, <code>ymax</code>
                            ensure that the plot view will not be moved or zoomed outside the specified range in data
                            coordinate.
                        </li>
                        <li>
                            The property <code>shift</code> restricts the action to be activated only when the
                            <kbd>Shift</kbd> key is held down. While <code>{ button: 'right' }</code> restricts the
                            action to be activated only when the right mouse button is held down.
                        </li>
                    </ul>
                </li>
                <li>
                    The <code>&lt;VVSelection /&gt;</code> declaration allows the creation of a selection range for the
                    plot.
                </li>
            </ul>
            <p>
                As you may have noticed, the specification of range limits, mouse/key restriction as well as the action
                type are very flexible. The action type can be specified either via a value-less property (e.g.
                <code>nudge</code>) or via a property with an object value (e.g. <code>:nudge="{ shift: true }"</code>).
                Restrictions provided in the form of component attributes will be applied to all action entries of the
                component, while restrictions provided as properties value for a specific action type will only be
                applied to that action type and override the component attribute restriction.
            </p>
            <p>
                The axis property <code>extend</code> controls how much extra space is reserved for drawing geometric
                elements that is outside the plot view. Points and axis ticks that is outside the extended range will
                not be drawn until the plot view is moved or zoomed to include them.
            </p>
            <p>
                For performance reason, a scale transform will be applied during the zoom action, so the size and
                position of geometric elements may not be accurate. the content of the plot will be rerender after the
                move/zoom action is finished (i.e. mouse button released)
            </p>
            <p>
                Please refer to the <a href="#action">Action</a> page for more details.
            </p>
        </section>
        <section>
            <h3><code>SVG</code> and <code>canvas</code> render mode</h3>
            <p>
                Usually, VVPlot uses SVG to render plots.
            </p>
            <p>
                However, you may suffer from performance issues when rendering large amount of geometric elements with
                SVG.
            </p>
            <p>
                VVPlot automatically switches render mode to HTML5 Canvas when the number of geometric elements exceeds
                a certain threshold (default: 1000) for each layer.
            </p>
            <p>
                You can force rendering mode via the <code>render</code> layer property.
            </p>
            <hr>
            <blockquote class="warning">
                <p>
                    You may experience slow response and high CPU usage in SVG mode.
                </p>
            </blockquote>
            <label>
                render mode:
                <select v-model="render">
                    <option value="canvas">Canvas</option>
                    <option value="svg">SVG</option>
                </select>
            </label>
            <pre-highlight lang="html">{{templates[5] = `<VVPlot :width="600" :height="400">
    <VVGeomPoint :data="Array.from({length: 30000}, ()=>({x:Math.random(),y:Math.random()}))"
        :x="d => d.x" :y="d => d.y" :size="2" render="${render}"/>
    <VVAction zoom move />
</VVPlot>` }}</pre-highlight>
            <component :is="{ template: templates[5], props: Object.keys(vBind).concat('render') }" v-bind="vBind"
                :render="render" class="mx-auto" />
        </section>
    </article>
</template>
