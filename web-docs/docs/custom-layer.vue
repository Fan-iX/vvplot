<script setup>
import { ref } from 'vue'
import iris from '../data/iris.json'
import { vvutils, defineStat, registerStat, registerLayer, registerGeom, registerRenderer } from '#src/index.ts'
import StarSvg_Vue from './componets/StarSvg.vue?raw'

let { sum: psum, coalesce } = vvutils.vecutils
registerGeom('star', {
    scale_attrs: ['shape', 'size', 'color', 'fill', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = coalesce(ds.xnudge, 0),
            ynudge = coalesce(ds.ynudge, 0),
            x = psum(levels.x?.apply?.(ds.x) ?? ds.x, xnudge),
            y = psum(levels.y?.apply?.(ds.y) ?? ds.y, ynudge)
        return { x, y }
    },
    get_range(ds, orientation) {
        if (orientation == 'x') return ds.x ?? []
        if (orientation == 'y') return ds.y ?? []
    },
    validate(d) {
        if (isNaN(d.x) || isNaN(d.y)) return null
        return d
    }
})
import StarSvg from './componets/StarSvg.vue'
registerRenderer('star', StarSvg)

const { intraaction } = vvutils
registerStat('centroid-text', defineStat(function (data) {
    let keys = Object.keys(data).filter(k => !['x', 'y'].includes(k) && !k.startsWith('$'))
    let group = intraaction(Object.fromEntries(keys.map(k => [k, data[k]])))
    let cut = intraaction({
        group: group ?? new Array(data.x.length).fill(0),
    }).map((v, _, a) => a.categories[v])
    let map = Map.groupBy(data.$raw, (_, i) => cut[i])
    let $raw = Array.from(map.values()), cates = Array.from(map.keys())
    let xs = Array.from(Map.groupBy(data.x, (_, i) => cut[i]).values())
    let ys = Array.from(Map.groupBy(data.y, (_, i) => cut[i]).values())
    let result = {
        $raw: $raw,
        $group: cates.map(x => x.group),
        x: xs.map(x => x.reduce((a, b) => a + b, 0) / x.length),
        y: ys.map(y => y.reduce((a, b) => a + b, 0) / y.length),
    }
    for (let key of keys) {
        result[key] = cates.map(x => group.categories[x.group][key])
    }
    return result
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge', 'label', 'textLength'] }))

const VVGeomStar = registerLayer('VVGeomStar', { geom: 'star', stat: 'point', renderer: 'star' })
const VVGeomCentroidText = registerLayer('VVGeomCentroidText', { geom: 'text', stat: 'centroid-text' })

const templates = ref({})
const vBind = { iris }
const components = { VVGeomCentroidText, VVGeomStar }
</script>

<template>
    <article>
        <section>
            <h2>Custom Layers</h2>
            <p>
                VVPlot supports custom layers with user-defined geometries and statistical transforms.
            </p>
            <p>
                VVPlot use four registries to handle layer definitions:
            </p>
            <ul>
                <li>
                    The <code>geom</code> registry defines the semantics of the data, including how to scale and
                    validate it.
                </li>
                <li>
                    The <code>renderer</code> registry holds the SVG/canvas renderer components keyed by renderer name.
                </li>
                <li>
                    The <code>stat</code> registry defines the statistical transforms that will be applied to the data.
                </li>
                <li>
                    The <code>layer</code> registry holds the declarative layer definitions, in the form of
                    vue components <code>&lt;VVGeom*&gt;</code>.
                </li>
            </ul>
            <h3>Custom Geometry and Renderers</h3>
            <p>
                To draw a custom geometry, we need to define a <b>geometry</b> and a <b>renderer</b>.
            </p>
            <p>
                The <b>geometry</b> defines the semantics of the data:
            </p>
            <ul>
                <li>
                    <code>scale_attrs</code> declares the aesthetics that will shall be scaled by the plot,
                    other properties will be passed to the renderer without scaling.
                </li>
                <li>
                    <code>coord_scale</code> defines how to scale the data to the plot coordinates.
                </li>
                <li>
                    <code>get_range</code> defines how to get the range of the data for each orientation.
                    VVPlot will use this to determine the plot limits.
                </li>
                <li>
                    <code>validate</code> is used to filter out invalid data points.
                </li>
            </ul>
            <p>
                In the following example, we define a custom <code>star</code> geometry, and register it with
                <code>registerGeom</code>.
            </p>
            <pre-highlight lang="javascript">{{ `import { vecutils, registerGeom } from 'vvplot'
let { sum: psum, coalesce } = vecutils

registerGeom('star', {
    scale_attrs: ['shape', 'size', 'color', 'fill', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = coalesce(ds.xnudge, 0),
            ynudge = coalesce(ds.ynudge, 0),
            x = psum(levels.x?.apply?.(ds.x) ?? ds.x, xnudge),
            y = psum(levels.y?.apply?.(ds.y) ?? ds.y, ynudge)
        return { x, y }
    },
    get_range(ds, orientation) {
        if (orientation == 'x') return ds.x ?? []
        if (orientation == 'y') return ds.y ?? []
    },
    validate(d) {
        if (isNaN(d.x) || isNaN(d.y)) return null
        return d
    }
})` }}</pre-highlight>
            <p>
                The <b>renderer</b> implements how to draw the geometry in SVG or Canvas.
                It is a Vue component that receives the scaled data, the plot layout and a coordinate
                <code>mapping</code> object as props. The mapping exposes <code>coord2pos</code>,
                <code>pos2coord</code> and <code>getCoord</code> helpers.
                A renderer entry is a normal Vue SFC. It can import both SVG and Canvas
                implementations and choose between them in its template or setup.
            </p>
            <p>
                Here is a custom <code>StarSvg</code> component, which will render the star geometric element in SVG.
            </p>
            <code class="file-name">StarSvg.Vue</code>
            <pre-highlight lang="html" class="max-h-120">{{ StarSvg_Vue }}</pre-highlight>
            <p>
                Register the it with <code>registerRenderer</code>:
            </p>
            <pre-highlight lang="javascript">{{ `import { registerRenderer } from 'vvplot'
registerRenderer('star', StarSvg)`}}</pre-highlight>
            <p>
                To make the custom geometry work within <code>&lt;VVPlot&gt;</code>,
                we need to define a declarative layer component <code>&lt;VVGeomStar&gt;</code> and make it available
                for the <code>vue</code> application.
                VVPlot provides a helper function <code>registerLayer</code> to do this.
            </p>
            <pre-highlight lang="javascript">{{ `import { registerLayer } from 'vvplot'
const VVGeomStar = registerLayer('VVGeomStar', { geom: 'star', stat: 'point', renderer: 'star' })`}}</pre-highlight>
            <p>
                <code>registerLayer</code> will return a Vue component,
                which can be used in SFC or for <code>app.component</code>
            </p>
            <h3>Custom Statistical Transform</h3>
            <p>
                VVPlot provides a set of built-in statistical transforms, but you can also define your own.
            </p>
            <p>
                In the following example, we define a <code>centroid-text</code> statistical transform, which collapses
                each group to its mean position and draws the group label there using the built-in text layer.
            </p>
            <pre-highlight lang="javascript" class="max-h-120">{{`import { defineStat, registerStat } from 'vvplot'
import { intraaction } from 'vvplot'

registerStat('centroid-text', defineStat(function (data) {
    let keys = Object.keys(data).filter(k => !['x', 'y'].includes(k) && !k.startsWith('$'))
    let group = intraaction(Object.fromEntries(keys.map(k => [k, data[k]])))
    let cut = intraaction({
        group: group ?? new Array(data.x.length).fill(0),
    }).map((v, _, a) => a.categories[v])
    let map = Map.groupBy(data.$raw, (_, i) => cut[i])
    let $raw = Array.from(map.values()), cates = Array.from(map.keys())
    let xs = Array.from(Map.groupBy(data.x, (_, i) => cut[i]).values())
    let ys = Array.from(Map.groupBy(data.y, (_, i) => cut[i]).values())
    let result = {
        $raw: $raw,
        $group: cates.map(x => x.group),
        x: xs.map(x => x.reduce((a, b) => a + b, 0) / x.length),
        y: ys.map(y => y.reduce((a, b) => a + b, 0) / y.length),
    }
    for (let key of keys) {
        result[key] = cates.map(x => group.categories[x.group][key])
    }
    return result
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge', 'label', 'textLength'] }))`}}</pre-highlight>

            <p>
                We can then register a layer component <code>&lt;VVGeomCentroidText&gt;</code> for this statistical
                transform.
                The native <code>text</code> geometry renderer will be used to render the text at the centroid position.
            </p>
            <pre-highlight lang="javascript">{{ `import { registerLayer } from 'vvplot'
const VVGeomCentroidText = registerLayer('VVGeomCentroidText', {
    geom: 'text', stat: 'centroid-text'
})`}}</pre-highlight>
            <hr>
            <p>
                Now we can use the custom layers in <code>&lt;VVPlot&gt;</code> to draw a star plot with group labels:
            </p>
            <pre-highlight lang="html">{{templates[1] = `<VVPlot :data="iris" :width="600" :height="400">
    <VVGeomStar :x="d => d.Petal_Length" :y="d => d.Petal_Width"
        :fill="d => d.Species" :points="6" />
    <VVGeomCentroidText :x="d => d.Petal_Length" :y="d => d.Petal_Width"
        :group="d => d.Species" :label="d => 'Iris ' + d.Species"
        item-style="font-style: italic;" />
    <VVAxisX title="Petal Length" />
    <VVAxisY title="Petal Width" />
</VVPlot>` }}</pre-highlight>
            <div class="flex flex-row items-start">
                <component :is="{ template: templates[1], props: Object.keys(vBind), components }" v-bind="vBind" />
            </div>
        </section>
    </article>
</template>
