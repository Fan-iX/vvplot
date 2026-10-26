/**
 * Runtime registry for low-level SVG core components.
 *
 * Core components are the building blocks used by axes and SVG renderers,
 * such as CoreText, CoreMarkdown, CorePoint and CoreTile. The registry is
 * independent of geometry/renderer registries so that optional cores (for
 * example markdown or tex) can be added without changing the engine.
 */
const registry = new Map()

/**
 * Register a core SVG component by name.
 * @param {string} name core name, e.g. "text"
 * @param {Object|Function} component Vue component
 * @returns {Object|Function} the registered component
 */
export function registerElement(name, component) {
    if (typeof name !== 'string' || name.length == 0)
        throw new Error('Core name must be a non-empty string')
    if (component == null ||
        (typeof component !== 'object' && typeof component !== 'function'))
        throw new Error(`Invalid core component for "${name}"`)
    registry.set(name, component)
    return component
}

/**
 * Resolve a core component reference. A string is looked up in the registry;
 * a component object/function is returned as-is.
 * @param {string|Object|Function} ref core name or component
 * @returns {Object|Function|undefined}
 */
export function resolveElement(ref) {
    if (typeof ref === 'string') return registry.get(ref)
    return ref ?? undefined
}

/**
 * Get all registered core names.
 * @returns {string[]}
 */
export function getElementNames() {
    return Array.from(registry.keys())
}
