import test from 'node:test'
import assert from 'node:assert/strict'
import { GPlot } from '../src/core/plot.js'
import {
    registerGeom, resolveGeom,
    registerStat, resolveStat,
    registerRenderer, resolveRenderer, getRendererNames,
    getComponent,
    defineStat, registerLayer, registerLayers,
    registerElement, resolveElement, getElementNames,
} from '../src/core/register.js'

const testGeom = {
    scale_attrs: [],
    coord_scale(ds, levels) {
        let x = levels.x?.apply?.(ds.x) ?? ds.x
        let y = levels.y?.apply?.(ds.y) ?? ds.y
        let width = ds.width ?? 0.9
        let height = ds.height ?? 0.9
        const add = (a, b) => a.map((v, i) => +v + (Array.isArray(b) ? +b[i] : +b))
        return {
            xmin: add(x, Array.isArray(width) ? width.map(v => -v / 2) : -width / 2),
            xmax: add(x, Array.isArray(width) ? width.map(v => +v / 2) : +width / 2),
            ymin: add(y, Array.isArray(height) ? height.map(v => -v / 2) : -height / 2),
            ymax: add(y, Array.isArray(height) ? height.map(v => +v / 2) : +height / 2),
        }
    },
    get_values(ds, orientation) {
        return orientation === 'x' ? ds.x : ds.y
    },
    get_range(ds, orientation) {
        return orientation === 'x' ? ds.x : ds.y
    },
    validate(d) {
        return isNaN(d.xmin) ? null : d
    },
}

const testStat = defineStat(data => data, {
    core_attrs: ['x', 'y', 'width', 'height'],
})

registerGeom('test.named', testGeom)
registerStat('test.named', testStat)
registerRenderer('test.named', { svg: { name: 'test-named-svg' } })
registerRenderer('test.renderer', { svg: { name: 'test-renderer-svg' } })

function makePlot(geom, stat, data, attrs = {}) {
    geom = typeof geom === 'string' ? resolveGeom(geom) : geom
    return new GPlot({
        data,
        aes: {},
    }, [{
        geom,
        stat,
        data: null,
        aes: Array.isArray(attrs.aes) || typeof attrs.aes === 'function'
            ? attrs.aes
            : {
                x: d => d.x,
                y: d => d.y,
                ...attrs.aes,
            },
        attrs: attrs.attrs ?? {},
        scales: {},
        levels: {},
        args: {},
        opts: attrs.opts ?? {},
        vBind: {},
        renderer: attrs.renderer,
        showLegend: attrs.showLegend,
    }])
}

test('custom geometry and stat can be registered under names', () => {
    assert.equal(resolveGeom('test.named'), testGeom)
    assert.equal(resolveStat('test.named'), testStat)

    let plot = makePlot('test.named', 'test.named', [{ x: 2, y: 3 }], {
        attrs: { width: 2, height: 2 },
    })
    plot.useScales({}, {}).useCoordLevels({})
    let layers = plot.getComputedLayers()
    assert.equal(layers.length, 1)
    assert.equal(layers[0].data.length, 1)
    assert.equal(layers[0].data[0].xmin, 1)
    assert.equal(layers[0].data[0].xmax, 3)
})

test('layer aes spec resolves multiple aesthetics once per row', () => {
    let calls = 0
    let plot = makePlot('test.named', 'test.named', [{ x: 2, y: 3 }], {
        aes: d => {
            calls++
            return { x: d.x, y: d.y, width: 2, height: 2 }
        },
    })
    let layer = plot.layers[0]
    assert.deepEqual(layer.$data.x, [2])
    assert.deepEqual(layer.$data.y, [3])
    assert.deepEqual(layer.$data.width, [2])
    assert.deepEqual(layer.$data.height, [2])
    assert.equal(calls, 1)
})

test('layer aes spec supports arrays, objects, and layer aes priority', () => {
    let plot = makePlot('test.named', 'test.named', [{ x: 2, y: 3, c: 'a' }], {
        aes: [
            d => ({ x: d.x, y: d.y, color: 'red' }),
            { color: d => d.c, width: () => 2, height: () => 2 },
            { x: d => d.x + 10 },
        ],
    })
    let layer = plot.layers[0]
    assert.deepEqual(layer.$data.x, [12])
    assert.deepEqual(layer.$data.y, [3])
    assert.deepEqual(layer.$data.color, ['a'])
    assert.deepEqual(layer.$data.width, [2])
})

test('aes titles prefer explicit title over function-name fallback', () => {
    function species(d) {
        return d.c
    }
    species.title = 'Species'

    let plot = makePlot('test.named', 'test.named', [{ x: 1, y: 2, c: 'a' }], {
        aes: [
            { color: d => d.c },
            { color: species },
        ],
    })
    let layer = plot.layers[0]
    assert.equal(layer.$fnames.color, 'species')
    assert.equal(layer.$ftitles.color, 'Species')
})

test('assigned key accessor blocks lower titles', () => {
    function fallback(d) {
        return d.c
    }
    fallback.title = 'Fallback'

    let plot = makePlot('test.named', 'test.named', [{ x: 1, y: 2, c: 'a' }], {
        aes: [
            { color: fallback },
            { color: d => d.c },
        ],
    })
    let layer = plot.layers[0]
    assert.equal(layer.$fnames.color, undefined)
    assert.equal(layer.$ftitles.color, undefined)
})

test('key-accessor undefined is explicit and blocks lower fallbacks', () => {
    let plot = makePlot('test.named', 'test.named', [{ x: 1, y: 2 }, { x: 3, y: 4 }], {
        aes: [
            { color: () => 'blue' },
            { color: () => undefined },
        ],
    })
    let layer = plot.layers[0]
    assert.deepEqual(layer.$data.color, [undefined, undefined])
    assert.equal(layer.$ftitles.color, undefined)
})

test('row-function partial values override lower key-accessor columns', () => {
    let plot = makePlot('test.named', 'test.named', [
        { x: 1, y: 2, c: 'a' },
        { x: 3, y: 4, c: 'b' },
    ], {
        aes: [
            { color: () => 'fallback' },
            d => d.c === 'a' ? { color: 'a-color' } : {},
        ],
    })
    let layer = plot.layers[0]
    assert.deepEqual(layer.$data.color, ['a-color', 'fallback'])
})

test('constant values in aes are ignored', () => {
    let plot = makePlot('test.named', 'test.named', [{ x: 1, y: 2 }], {
        aes: [{ color: 'red' }],
    })
    let layer = plot.layers[0]
    assert.equal(layer.$data.color, undefined)
})

test('unknown custom aesthetics fall back to identity scaling', () => {
    let geom = {
        ...testGeom,
        scale_attrs: ['custom_aes'],
    }
    registerGeom('test.custom-aes', geom)
    registerStat('test.custom-aes', testStat)

    let plot = makePlot('test.custom-aes', 'test.custom-aes', [{ x: 1, y: 2, custom_aes: 'abc' }], {
        aes: { custom_aes: d => d.custom_aes },
    })
    plot.useScales({}, {}).useCoordLevels({})
    assert.equal(plot.layers[0].data.custom_aes[0], 'abc')
})

test('registerLayer creates a declarative layer component', () => {
    let layer = registerLayer('VVGeomTest', {
        geom: 'test.named',
        stat: 'test.named',
        argnames: ['width'],
        optnames: ['mode', 'padding'],
        width: 1,
        mode: 'hide',
        padding: 2,
    })
    assert.equal(layer.$_type, 'layer')
    assert.equal(layer.$_props.geom, 'test.named')
    assert.deepEqual(layer.$_argnames, ['width'])
    assert.deepEqual(layer.$_optnames, ['mode', 'padding'])
    assert.equal(layer.$_props.width, 1)
    assert.equal(layer.$_props.mode, 'hide')
    assert.equal(getComponent('VVGeomTest'), layer)
})

test('registerLayer stores an explicit renderer key', () => {
    let layer = registerLayer('VVGeomTestRenderer', {
        geom: 'test.named',
        stat: 'test.named',
        renderer: 'test.renderer',
    })
    assert.equal(layer.$_props.renderer, 'test.renderer')
    assert.equal(getComponent('VVGeomTestRenderer'), layer)
})

test('registerLayer accepts a custom stat function', () => {
    let stat = data => data
    let layer = registerLayer('VVGeomFunctionStat', {
        geom: 'test.named',
        stat,
        renderer: 'test.renderer',
    })
    assert.equal(layer.$_props.stat, stat)
    assert.equal(layer.$_props.geom, 'test.named')
})

test('registerLayer registers an inline renderer for a shared geom', () => {
    let svg = { name: 'inline-svg' }
    let layer = registerLayer('VVGeomInlineRenderer', {
        geom: 'test.named',
        stat: 'test.named',
        renderer: { svg },
    })
    assert.equal(layer.$_props.renderer.svg, svg)
    assert.equal(resolveRenderer('VVGeomInlineRenderer'), undefined)
})

test('registerLayer passes an inline renderer for a custom geom', () => {
    let geom = { ...testGeom }
    let svg = { name: 'custom-geom-svg' }
    let layer = registerLayer('VVGeomCustomRenderer', {
        geom,
        stat: 'test.named',
        renderer: { svg },
    })
    assert.equal(layer.$_props.renderer.svg, svg)
    assert.equal(layer.$_props.geom.coord_scale, geom.coord_scale)
    assert.equal(resolveRenderer('test.geom'), undefined)
})

test('GPlot carries the layer renderer key', () => {
    let plot = makePlot('test.named', 'test.named', [{ x: 1, y: 2 }], {
        renderer: 'test.renderer',
    })
    plot.useScales({}, {}).useCoordLevels({})
    assert.equal(plot.layers[0].renderer, 'test.renderer')
    assert.equal(plot.getComputedLayers()[0].renderer, 'test.renderer')
})

test('GPlot carries a direct renderer object', () => {
    let renderer = { svg: { name: 'direct-svg' } }
    let plot = makePlot('test.named', 'test.named', [{ x: 1, y: 2 }], { renderer })
    plot.useScales({}, {}).useCoordLevels({})
    assert.equal(plot.layers[0].renderer, renderer)
    assert.equal(plot.getComputedLayers()[0].renderer, renderer)
})

test('options are carried through GPlot unchanged', () => {
    let options = { mode: 'hide', padding: 2, maxLabels: 200 }
    let plot = makePlot('test.named', 'test.named', [{ x: 1, y: 2 }], {
        attrs: { width: 1, height: 1 },
        opts: options,
    })
    plot.useScales({}, {}).useCoordLevels({})
    let layer = plot.getComputedLayers()[0]
    assert.equal(layer.options, options)
})

test('element registry registers and resolves elements', () => {
    let component = { name: 'test-element' }
    registerElement('test.element', component)
    assert.equal(resolveElement('test.element'), component)
    assert.equal(resolveElement(component), component)
    assert.ok(getElementNames().includes('test.element'))
})

test('renderer registry merges svg and canvas renderers', () => {
    let svg = { name: 'svg-renderer' }
    let canvas = { name: 'canvas-renderer' }
    registerRenderer('test.renderer', { svg })
    registerRenderer('test.renderer', { canvas })
    assert.equal(resolveRenderer('test.renderer').svg, svg)
    assert.equal(resolveRenderer('test.renderer').canvas, canvas)
    assert.ok(getRendererNames().includes('test.renderer'))
})

test('registerLayers registers all four registries', () => {
    let geom = { ...testGeom, scale_attrs: ['x'] }
    let stat = defineStat(data => data, { core_attrs: ['x'] })
    let svg = { name: 'package-svg' }
    let component = { name: 'VVGeomPackage' }
    registerLayers({
        geoms: { 'test.package': geom },
        stats: { 'test.package': stat },
        renderers: { 'test.package': { svg } },
        components: { VVGeomPackage: component },
    })
    assert.equal(resolveGeom('test.package'), geom)
    assert.equal(resolveStat('test.package'), stat)
    assert.equal(resolveRenderer('test.package').svg, svg)
    assert.equal(getComponent('VVGeomPackage'), component)
})

test('showLegend suppresses only the legend association of a layer', () => {
    let legendGeom = { ...testGeom, scale_attrs: ['color'] }
    registerGeom('test.legend', legendGeom)
    registerStat('test.legend', testStat)

    let visible = makePlot('test.legend', 'test.legend', [{ x: 1, y: 2, c: 'a' }], {
        aes: { color: d => d.c },
    })
    visible.useScales({}, {})
    assert.equal(visible.scales.size, 1)

    let hidden = makePlot('test.legend', 'test.legend', [{ x: 1, y: 2, c: 'a' }], {
        aes: { color: d => d.c },
        showLegend: false,
    })
    hidden.useScales({}, {})
    assert.equal(hidden.scales.size, 0)
})

test('showLegend can hide individual aesthetics of a layer', () => {
    let legendGeom = { ...testGeom, scale_attrs: ['color', 'shape'] }
    registerGeom('test.legend-per-aes', legendGeom)
    registerStat('test.legend-per-aes', testStat)

    let plot = makePlot('test.legend-per-aes', 'test.legend-per-aes', [{ x: 1, y: 2, c: 'a', s: 'b' }], {
        aes: {
            color: d => d.c,
            shape: d => d.s,
        },
        showLegend: { color: false },
    })
    plot.useScales({}, {})
    assert.deepEqual(Array.from(plot.scales.keys()).map(scale => scale.aesthetics), ['shape'])
})

test('legend appearances are keyed by legend glyph rather than geom name', () => {
    let geom = { ...testGeom, scale_attrs: ['color'], legend_glyph: 'point' }
    registerGeom('test.legend-glyph', geom)
    registerStat('test.legend-glyph', testStat)
    let plot = makePlot('test.legend-glyph', 'test.legend-glyph', [{ x: 1, y: 2, c: 'a' }], {
        aes: { color: d => d.c },
        attrs: { color: 'red' },
    })
    plot.useScales({}, {})
    let appearance = Array.from(plot.scales.values())[0]
    assert.deepEqual(Object.keys(appearance), ['point'])
    assert.equal(appearance.point.color, 'red')
})
