/**
 * Runtime registry for layer declaration components.
 *
 * A declaration component is a metadata-only Vue component such as
 * `VVGeomPoint`. It is consumed by <VVPlot> when parsing slot declarations,
 * not rendered directly.
 */
const registry = new Map()

/**
 * Register a layer declaration component by tag name.
 * @param {string} name component tag name, e.g. "VVGeomImage"
 * @param {Object} component layer declaration component
 * @returns {Object} the registered component
 */
export function registerComponent(name, component) {
    if (typeof name !== 'string' || name.length == 0)
        throw new Error('Layer component name must be a non-empty string')
    if (component == null || typeof component !== 'object')
        throw new Error(`Invalid layer component for "${name}"`)
    registry.set(name, component)
    return component
}

/**
 * Resolve a registered layer declaration component.
 * @param {string} name
 * @returns {Object|undefined}
 */
export function getComponent(name) {
    return registry.get(name)
}

/**
 * Get all registered layer declaration components as a plain object.
 * @returns {Record<string, Object>}
 */
export function getComponents() {
    return Object.fromEntries(registry)
}
