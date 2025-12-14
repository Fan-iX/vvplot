<script setup>
import { ref } from 'vue'
import vvscale, { oob } from '#base/js/scale'

import iris from '../data/iris.json'
import UCBAdmissions from '../data/UCBAdmissions.json'
import letters_txt from '../data/sentences.txt?raw'
const letters = letters_txt.toLowerCase().replace(/[^a-z]/g, "").split("")
const vBind = { iris, UCBAdmissions, vvscale, oob, letters }
const templates = ref({})

const alpha_limits_max = ref(600)
const size_limits_max = ref(600)
</script>
<template>
    <article>
        <section>
            <h2>Plot scale</h2>
            <p>
                In VVPlot, <strong>Scaling functions</strong> are used to mapping data values to
                geometric element properties.
            </p>
            <p>
                VVPlot provides several built-in scale function wrappers for different aesthetics
                in the <code>vvplot/scale</code> module.
                They can be imported directly from the module:
            </p>
            <pre-highlight lang="javascript">import vvscale from 'vvplot/scale'</pre-highlight>
            <h3><code>identity</code> scale: keep values unchanged</h3>
            <p>
                The identity scale (<code>vvscale.*.identity()</code>) maps data values to aesthetic attributes directly
                without any transformation.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre-highlight lang="html">{{templates[1] = `<VVPlot :data="[
    { x: 1, y: 1, size:10, color: 'red' },
    { x: 2, y: 4, size:14, color: 'green' },
    { x: 3, y: 9, size:17, color: 'blue' }
]" :scales="{ color: vvscale.color.identity(),
              size: vvscale.size.identity() }">
    <VVGeomPoint :x="d => d.x" :y="d => d.y"
        :color="d => d.color" :size="d => d.size" />
</VVPlot>` }}</pre-highlight>
                <component :is="{ template: templates[1], props: Object.keys(vBind) }" v-bind="vBind"
                    v-memo="[templates[1]]" />
            </div>
            <h3><code>manual</code> scale: map categorical values manually</h3>
            <p>
                <strong>Categorical values</strong> refer to data values that represent distinct categories or groups.
            </p>
            <p>
                In VVPlot, categorical values are represented by instances of an enumeration class,
                which have both an ordinal number value (<code>.valueOf()</code>)
                and a string representation (<code>.toString()</code>).
            </p>
            <blockquote class="info">
                String data values will be automatically converted to categorical values before scaling functions are
                applied.
            </blockquote>
            <p>
                Manual scales (<code>vvscale.*.manual()</code>) can be used to map categorical data values to aesthetic
                attributes manually.
            </p>
            <p>
                The wrapper function takes an <code>values</code> argument property that specifies the mapping between
                data values and aesthetic attributes.
                It can be either an array of aesthetic attribute values or an object that describes the mapping.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre-highlight lang="html">{{templates[2] = `<VVPlot :data="iris" :scales="{
    color: vvscale.color.manual({
        values: ['#1f77b4', '#ff7f0e', '#2ca02c']
     // values: { 'setosa': '#1f77b4',
     //           'versicolor': '#ff7f0e',
     //           'virginica': '#2ca02c' }
}) }">
    <VVGeomPoint :x="d => d.Petal_Width"
        :y="d => d.Petal_Length"
        :color="d => d.Species" />
</VVPlot>` }}</pre-highlight>
                <component :is="{ template: templates[2], props: Object.keys(vBind) }" v-bind="vBind"
                    v-memo="[templates[2]]" />
            </div>
            <h3><code>continuous</code> scales: map numerical values to a continuous range</h3>
            <p>
                Continuous scales (<code>vvscale.*.continuous()</code>) can be used to map numerical data values to
                aesthetic attributes continuously.
            </p>
            <p>
                The <code>limits</code> and <code>range</code> argument properties of the wrapper function define the
                input and output ranges for the scale.
            </p>
            <p>
                <label class="flex">
                    limits:
                    <input type="range" min="1" max="1000" v-model="alpha_limits_max" />
                </label>
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre-highlight lang="html">{{templates[3] = `<VVPlot :data="UCBAdmissions"
    :scales="{ alpha: vvscale.size.continuous({
        limits: [0, ${alpha_limits_max}], range: [0.2, 1], na_value: 0
    }) }">
    <VVGeomPoint :x="d => d.Gender + '_' + d.Admit"
        :y="d => d.Dept" :alpha="d => d.Freq" :size="15" />
    <VVAxisX :theme="{ text_angle: -10 }" />
</VVPlot>` }}</pre-highlight>
                <component :is="{ template: templates[3], props: Object.keys(vBind) }" v-bind="vBind"
                    v-memo="[templates[3]]" />
            </div>
            <p>
                By default, values out of the specified <code>limits</code> range will be treated as <code>NaN</code>
                and mapped to the <code>na_value</code> constant.
            </p>
            <p>
                The <code>oob</code> argument property controls how out-of-boundary values will be handled.
                VVPlot provides several built-in oob functions in the <code>vvplot/scale</code> module:
            </p>
            <pre-highlight lang="javascript">import { oob } from 'vvplot/scale'</pre-highlight>
            <p>
                The following oob functions are available:
            </p>
            <ul>
                <li>
                    <code>oob.censor</code>: maps out-of-boundary values to <code>NaN</code>.
                </li>
                <li>
                    <code>oob.squish</code>: maps finite out-of-boundary values to the nearest boundary value.
                </li>
                <li>
                    <code>oob.squish_any</code>: maps all out-of-boundary values to the nearest boundary value.
                </li>
                <li>
                    <code>oob.squish_infinite</code>: maps <code>-Infinity</code> to the minimum boundary and
                    <code>Infinity</code> to the maximum boundary.
                </li>
                <li>
                    <code>oob.discard</code>: maps out-of-boundary values to <code>null</code>.
                </li>
            </ul>
            <p>
                <label class="flex">
                    limits:
                    <input type="range" min="1" max="1000" v-model="size_limits_max" />
                </label>
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre-highlight lang="html">{{templates[4] = `<VVPlot :data="UCBAdmissions"
    :scales="{ size: vvscale.size.continuous({
        limits: [0, ${size_limits_max}], range: [5, 20],
        oob: oob.squish_any
    }) }">
    <VVGeomPoint :x="d => d.Gender + '_' + d.Admit"
        :y="d => d.Dept" :size="d => d.Freq" />
    <VVAxisX :theme="{ text_angle: -10 }" />
</VVPlot>` }}</pre-highlight>
                <component :is="{ template: templates[4], props: Object.keys(vBind) }" v-bind="vBind"
                    v-memo="[templates[4]]" />
            </div>
            <h3>Color scales</h3>
            <p>
                The <code>vvscale.color</code> and <code>vvscale.fill</code> modules
                provide several color scale functions for mapping data values to color strings.
            </p>
            <p>
                <code>vvscale.color.hue()</code> is the default color scale for categorical mapping.
                It generates a set of distinct colors by varying the hue component in the HCL color space
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre-highlight lang="html">{{templates[5] = `<VVPlot :data="iris"
    :scales="{ color: vvscale.color.hue() }">
    <VVGeomPoint :x="d => d.Petal_Width"
        :y="d => d.Petal_Length"
        :color="d => d.Species" />
</VVPlot>` }}</pre-highlight>
                <component :is="{ template: templates[5], props: Object.keys(vBind) }" v-bind="vBind"
                    v-memo="[templates[5]]" />
            </div>
            <p>
                <code>vvscale.color.gradient()</code> is the default color scale for continuous mapping.
                It generates a gradient of colors between two specified colors.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre-highlight lang="html">{{templates[6] = `<VVPlot :data="iris"
    :scales="{ color: vvscale.color.gradient() }">
    <VVGeomPoint :x="d => d.Petal_Width"
        :y="d => d.Petal_Length"
        :color="d => d.Sepal_Width" />
</VVPlot>` }}</pre-highlight>
                <component :is="{ template: templates[6], props: Object.keys(vBind) }" v-bind="vBind"
                    v-memo="[templates[6]]" />
            </div>
            <h4>List of built-in color scales (<code>vvscale.color</code> / <code>vvscale.fill</code>)</h4>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th>Scale</th>
                            <th>Argument syntax</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>hue()</code></td>
                            <td>
                                <ul>
                                    <li><code>h: Number[2]</code>: hue range. Defaults to <code>[15, 375]</code></li>
                                    <li><code>c: Number</code>: chroma. Defaults to <code>100</code></li>
                                    <li><code>l: Number</code>: lightness. Defaults to <code>65</code></li>
                                    <li><code>h_start: Number</code>: hue to start at. Defaults to <code>0</code></li>
                                </ul>
                            </td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Petal_Length"
                                        :color="d => d.Species" :scales="{ color: vvscale.color.hue() }" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>gradient()</code></td>
                            <td>
                                <ul>
                                    <li>
                                        <code>low: String</code>: color for the low end of the gradient.
                                        Defaults to <code>"#132B43"</code>
                                    </li>
                                    <li>
                                        <code>high: String</code>: color for the high end of the gradient.
                                        Defaults to <code>"#56B1F7"</code>
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Petal_Length"
                                        :color="d => d.Sepal_Width" :scales="{ color: vvscale.color.gradient() }" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>gradient2()</code></td>
                            <td>
                                <ul>
                                    <li>
                                        <code>low: String</code>: color for the low end of the gradient.
                                        Defaults to <code>"#832424"</code>
                                    </li>
                                    <li>
                                        <code>mid: String</code>: color for the midpoint of the gradient.
                                        Defaults to <code>"white"</code>
                                    </li>
                                    <li>
                                        <code>high: String</code>: color for the high end of the gradient.
                                        Defaults to <code>"#3A3A98"</code>
                                    </li>
                                    <li>
                                        <code>midpoint: Number | null</code>: midpoint (in data value).
                                        Defaults to <code>0</code>
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Petal_Length"
                                        :color="d => d.Sepal_Width"
                                        :scales="{ color: vvscale.color.gradient2({ midpoint: null }) }" />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>gradientn()</code></td>
                            <td>
                                <ul>
                                    <li>
                                        <code>colors: String[]</code>: array of colors to use in the gradient.
                                    </li>
                                    <li>
                                        <code>anchors: Number[] | null</code>: positions for each color in the gradient,
                                        in data value.
                                        Defaults to <code>null</code>
                                    </li>
                                    <li>
                                        <code>values: Number[] | null</code>: positions for each color in the gradient,
                                        in [0, 1].
                                        Defaults to <code>null</code>
                                        <ul>
                                            <li>
                                                Colors will be evenly spaced if both <code>values</code>
                                                and <code>anchors</code> are set to <code>null</code>.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Petal_Length"
                                        :color="d => d.Sepal_Width"
                                        :scales="{ color: vvscale.color.gradientn({ colors: ['red', 'white', 'green'] }) }" />
                                </VVPlot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Shape and linetype scales</h3>
            <p>
                The <code>shape</code> aesthetic uses string values to represent different shapes for point elements.
                available shapes include: <code>"circle"</code>, <code>"square"</code>, <code>"triangle"</code>,
                <code>"diamond"</code>, <code>"plus"</code>, <code>"cross"</code>
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre-highlight lang="html">{{templates[7] = `<VVPlot :scales="{ shape: vvscale.color.identity() }"
    :data="[
        'circle', 'square', 'triangle',
        'diamond', 'plus', 'cross'
    ]">
    <VVGeomPoint :x="d => d" :shape="d => d"
        :y="0" :size="15" />
</VVPlot>` }}</pre-highlight>
                <component :is="{ template: templates[7], props: Object.keys(vBind) }" v-bind="vBind"
                    v-memo="[templates[7]]" />
            </div>
            <p>
                The <code>linetype</code> aesthetic controls the line style for line elements.
                Valid linetype values include:
            </p>
            <ul>
                <li>space separated decimal numbers (SVG line <code>stroke-dasharray</code> attribute)</li>
                <li>string of one bit hex numbers (ggplot2 <code>linetype</code> hex string)</li>
                <li>one of the flollowing predefined names:
                    <code>"solid"</code>, <code>"dashed"</code>, <code>"dotted"</code>, <code>"dotdash"</code>,
                    <code>"longdash"</code>, <code>"twodash"</code>
                </li>
            </ul>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre-highlight lang="html">{{templates[8] = `<VVPlot :scales="{ linetype: vvscale.linetype.identity() }"
    :data="[
        'solid', 'dashed', 'dotted',
        'dotdash', 'longdash', 'twodash',
        '5 5', '10 5 2 5', 'F8'
    ]">
    <VVGeomLinerange :xmin="0" :xmax="1"
        :y="d => d" :linetype="d => d" />
</VVPlot>` }}</pre-highlight>
                <component :is="{ template: templates[8], props: Object.keys(vBind) }" v-bind="vBind"
                    v-memo="[templates[8]]" />
            </div>
            <h3>Custom scale functions</h3>
            <p>
                Any function that takes an array of data values as input and
                returns an array of mapped values can be used as a scale function.
            </p>
            <p>
                You can create your own custom scale functions to implement specific mapping logic
                that is not covered by the built-in scale functions.
            </p>
            <p>
                The <code>vvscale.*.custom</code> wrapper function can be used to create custom scale functions easily.
            </p>
            <div class="grid grid-cols-[3fr_2fr] gap-4">
                <pre-highlight lang="html">{{templates[9] = `<VVPlot :data="letters" :scales="{
    fill: vvscale.fill.custom(v => ['blue', 'gold'][v % 2]),
 // same as \`arr => arr.map(v => ['blue','gold'][v % 2])\`
 // the function will be applied to an array of categorical values,
 // \`v % 2\` works because \`v.valueOf()\` will return its ordinal number
}">
    <VVGeomBar :x="d => d" :fill="d => d" />
</VVPlot>` }}</pre-highlight>
                <component :is="{ template: templates[9], props: Object.keys(vBind) }" v-bind="vBind"
                    v-memo="[templates[9]]" />
            </div>
            <p>

            </p>
        </section>
    </article>
</template>
