import test from 'node:test'
import assert from 'node:assert/strict'
import { GPlot } from '../src/core/plot.js'
import {
    registerGeom, resolveGeom,
    registerStat, resolveStat,
    registerRenderer, getRenderer,
    getComponent,
    defineStat, registerLayer, registerLayers,
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

function makePlot(geom, stat, data, attrs = {}) {
    return new GPlot({
        data,
        aes: {},
    }, [{
        geom,
        stat,
        data: null,
        aes: {
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

test('renderer registry merges svg and canvas renderers', () => {
    let svg = { name: 'svg-renderer' }
    let canvas = { name: 'canvas-renderer' }
    registerRenderer('test.renderer', { svg })
    registerRenderer('test.renderer', { canvas })
    assert.equal(getRenderer('test.renderer').svg, svg)
    assert.equal(getRenderer('test.renderer').canvas, canvas)
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
    assert.equal(getRenderer('test.package').svg, svg)
    assert.equal(getComponent('VVGeomPackage'), component)
})
