/**
 * Runtime registry for layer renderers.
 *
 * A geometry definition can either embed its renderers:
 *   { render: { svg: MySvgRenderer, canvas: MyCanvasRenderer } }
 * or register them separately under a geometry name:
 *   registerRenderer('my-geom', { svg: MySvgRenderer })
 *
 * This module is engine-side only. The built-in `base` layers register their
 * renderers from `src/base/index.js`.
 */
const registry = new Map()

/**
 * Register or extend the renderers of a geometry.
 * @param {string} name geometry name
 * @param {{svg?: Object, canvas?: Object, default?: string}} renderers
 * @returns {{svg?: Object, canvas?: Object, default?: string}}
 */
export function registerRenderer(name, renderers) {
    if (typeof name !== 'string' || name.length == 0)
        throw new Error('Geometry name must be a non-empty string')
    if (renderers == null || typeof renderers !== 'object')
        throw new Error(`Invalid renderers for "${name}"`)
    let merged = { ...registry.get(name), ...renderers }
    registry.set(name, merged)
    return merged
}

/**
 * Get the renderers registered for a geometry name.
 * @param {string} name
 * @returns {{svg?: Object, canvas?: Object, default?: string}|undefined}
 */
export function getRenderer(name) {
    return registry.get(name)
}

/**
 * Get a snapshot of all registered renderer names.
 * @returns {string[]}
 */
export function getRendererNames() {
    return Array.from(registry.keys())
}
