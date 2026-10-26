/**
 * Runtime registry for low-level SVG elements.
 *
 * Elements are the building blocks used by axes and SVG renderers, such as
 * ElementText, ElementMarkdown, ElementPoint and ElementTile. The registry is
 * independent of geometry/renderer registries so that optional elements (for
 * example markdown or tex) can be added without changing the engine.
 */
const registry = new Map()

/**
 * Register a low-level SVG element by name.
 * @param {string} name element name, e.g. "text"
 * @param {Object|Function} component Vue component
 * @returns {Object|Function} the registered component
 */
export function registerElement(name, component) {
    if (typeof name !== 'string' || name.length == 0)
        throw new Error('Element name must be a non-empty string')
    if (component == null ||
        (typeof component !== 'object' && typeof component !== 'function'))
        throw new Error(`Invalid element component for "${name}"`)
    registry.set(name, component)
    return component
}

/**
 * Resolve an element component reference. A string is looked up in the registry;
 * a component object/function is returned as-is.
 * @param {string|Object|Function} ref element name or component
 * @returns {Object|Function|undefined}
 */
export function resolveElement(ref) {
    if (typeof ref === 'string') return registry.get(ref)
    return ref ?? undefined
}

/**
 * Get all registered element names.
 * @returns {string[]}
 */
export function getElementNames() {
    return Array.from(registry.keys())
}
