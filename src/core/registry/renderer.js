/**
 * Runtime registry for layer renderers.
 *
 * Renderers are registered under a renderer name. A layer can reference that
 * key explicitly, or fall back to the geometry name for backward compatibility:
 *   registerRenderer('my-text', { svg: MyTextSvg })
 *
 * This module is engine-side only. The built-in `base` layers register their
 * renderers from `src/base/index.js`.
 */
const registry = new Map()

/**
 * Register or extend a renderer set.
 * @param {string} name renderer name
 * @param {{svg?: Object, canvas?: Object}} renderers
 * @returns {{svg?: Object, canvas?: Object}}
 */
export function registerRenderer(name, renderers) {
    if (typeof name !== 'string' || name.length == 0)
        throw new Error('Renderer name must be a non-empty string')
    if (renderers == null || typeof renderers !== 'object')
        throw new Error(`Invalid renderers for "${name}"`)
    let merged = { ...registry.get(name), ...renderers }
    registry.set(name, merged)
    return merged
}

/**
 * Get the renderers registered for a renderer name.
 * @param {string} ref
 * @returns {{svg?: Object, canvas?: Object}|undefined}
 */
export function resolveRenderer(ref) {
    if (typeof ref === 'string') return registry.get(ref)
    return ref ?? undefined
}

/**
 * Get a snapshot of all registered renderer names.
 * @returns {string[]}
 */
export function getRendererNames() {
    return Array.from(registry.keys())
}
