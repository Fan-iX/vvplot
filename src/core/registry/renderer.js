/**
 * Runtime registry for layer renderers.
 *
 * A renderer is a single Vue component that owns its rendering mode. It
 * receives the requested `render` value and decides whether to use SVG,
 * Canvas or another implementation.
 *
 *   registerRenderer('my-text', MyTextRenderer)
 */
const registry = new Map()

/**
 * Register a renderer entry component.
 * @param {string} name renderer name
 * @param {Object|Function} component Vue component
 * @returns {Object|Function} the registered component
 */
export function registerRenderer(name, component) {
    if (typeof name !== 'string' || name.length == 0)
        throw new Error('Renderer name must be a non-empty string')
    if (component == null || (typeof component !== 'object' && typeof component !== 'function'))
        throw new Error(`Invalid renderer component for "${name}"`)
    registry.set(name, component)
    return component
}

/**
 * Resolve a renderer reference. A string is looked up in the registry;
 * a component is returned as-is.
 * @param {string|Object|Function} ref renderer name or component
 * @returns {Object|Function|undefined}
 */
export function resolveRenderer(ref) {
    if (typeof ref === 'string') return registry.get(ref)
    return ref ?? undefined
}

/**
 * Get all registered renderer names.
 * @returns {string[]}
 */
export function getRendererNames() {
    return Array.from(registry.keys())
}
