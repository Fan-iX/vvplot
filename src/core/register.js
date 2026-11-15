/**
 * Unified public registration API.
 *
 * The registries are kept separate because they model different dimensions:
 *  - geom:      geometry semantics
 *  - stat:      statistical transforms
 *  - renderer:  SVG / canvas implementations
 *  - component: metadata-only <VVGeom*> declaration components
 *  - element:   low-level SVG building blocks such as text and markdown
 */
export * from './registry/geom.js'
export * from './registry/stat.js'
export * from './registry/renderer.js'
export * from './registry/component.js'
export * from './registry/element.js'

import { defineComponent, markRaw } from 'vue'
import { registerGeom, resolveGeom } from './registry/geom.js'
import { registerStat, resolveStat } from './registry/stat.js'
import { registerRenderer, resolveRenderer } from './registry/renderer.js'
import { registerComponent } from './registry/component.js'
import { registerElement } from './registry/element.js'


/**
 * Decorate a stat transform with metadata used by the plotting engine.
 *
 * This function only defines the transform; it does not register it. Use
 * `registerStat(name, stat)` or `registerLayers` to register it.
 *
 * @param {import('./types.ts').StatTransform} transform
 * @param {Object} options
 * @param {string[]} [options.core_attrs] attributes that need to be vectorized before statistic transformation and coordinate scale
 * @returns {import('./types.ts').StatTransform}
 */
export function defineStat(transform, { core_attrs } = {}) {
    if (typeof transform !== 'function')
        throw new Error('defineStat() expects a transform function')
    if (core_attrs != null) transform.core_attrs = core_attrs
    return transform
}

/**
 * Create a reusable metadata-only layer declaration component.
 *
 * Resolution order:
 *  1. geom: a string is validated against the geometry registry; an object is
 *     used directly. The layer keeps the original geom reference; Plot
 *     resolves it to the actual geom definition before handing it to GPlot.
 *  2. stat: a string must already be registered; a function is used directly.
 *  3. renderer: a string must already be registered; an object is passed
 *     through as an inline renderer component. No implicit renderer registration
 *     is performed.
 *
 * @param {string} name component name, e.g. "VVGeomPoint"
 * @param {Object} options
 * @param {string|Object} options.geom geometry name or definition
 * @param {string|Function} [options.stat="identity"] statistic name or transform
 * @param {string|Object} [options.renderer] renderer key or inline renderer component
 * @param {string[]} [options.argnames=[]] stat argument names
 * @param {string[]} [options.optnames=[]] renderer-only option names
 * @returns {Object} Vue component carrying layer metadata
 */
export function registerLayer(name, {
    geom, stat = 'identity', renderer,
    argnames = [], optnames = [], ...defaults
}) {
    if (typeof name !== 'string' || name.length == 0)
        throw new Error('registerLayer() requires a non-empty "name"')
    if (geom == null)
        throw new Error('registerLayer() requires a "geom"')

    if (typeof geom === 'string' && !resolveGeom(geom))
        throw new Error(`Unknown geometry "${geom}"`)

    if (typeof stat === 'string' && !resolveStat(stat))
        throw new Error(`Unknown statistic "${stat}"`)

    if (typeof renderer === 'string' && !resolveRenderer(renderer))
        throw new Error(`Unknown renderer "${renderer}"`)
    if (renderer != null && typeof renderer !== 'string' &&
        typeof renderer !== 'object' && typeof renderer !== 'function')
        throw new Error(`Invalid renderer for "${name}"`)

    let component = markRaw(defineComponent({
        $_type: 'layer',
        $_props: { ...defaults, geom, stat, renderer },
        $_argnames: argnames,
        $_optnames: optnames,
    }))
    registerComponent(name, component)
    return component
}

/**
 * Register a complete layer package.
 *
 * `renderers` is keyed by renderer name and contains renderer entry
 * components.
 * `components` is keyed by declaration tag name.
 *
 * @param {Object} pack
 * @param {Record<string, Object>} [pack.geoms]
 * @param {Record<string, Function>} [pack.stats]
 * @param {Record<string, Object|Function>} [pack.renderers]
 * @param {Record<string, Object>} [pack.components]
 */
export function registerLayers({
    geoms = {}, stats = {}, renderers = {}, components = {},
} = {}) {
    for (const [name, geom] of Object.entries(geoms)) {
        registerGeom(name, markRaw(geom))
    }
    for (const [name, stat] of Object.entries(stats)) {
        registerStat(name, stat)
    }
    for (const [name, renderer] of Object.entries(renderers)) {
        registerRenderer(name, renderer)
    }
    for (const [name, component] of Object.entries(components)) {
        registerComponent(name, component)
    }
}

/**
 * Register the built-in SVG elements.
 *
 * @param {Record<string, Object>} elements
 */
export function registerElements(elements) {
    for (const [name, component] of Object.entries(elements)) {
        registerElement(name, component)
    }
}
