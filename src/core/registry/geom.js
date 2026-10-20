/**
 * Runtime registry for geometry definitions.
 *
 * The registry is intentionally independent of the built-in `base` layers.
 * Built-in and third-party packages register their definitions here.
 */
const registry = new Map()

/**
 * Register a geometry definition under a name.
 * @param {string} name geometry name
 * @param {Object} geom geometry definition
 * @returns {Object} the registered geometry definition
 */
export function registerGeom(name, geom) {
    if (typeof name !== 'string' || name.length == 0)
        throw new Error('Geometry name must be a non-empty string')
    if (geom == null)
        throw new Error(`Invalid geometry definition for "${name}"`)
    registry.set(name, geom)
    return geom
}

/**
 * Resolve a geometry reference. A string is looked up in the registry,
 * any other value (a geometry object) is returned as-is.
 * @param {string|Object} ref geometry name or definition
 * @returns {Object|undefined}
 */
export function resolveGeom(ref) {
    if (typeof ref === 'string') return registry.get(ref)
    return ref ?? undefined
}

/**
 * Get a snapshot of all registered geometry names.
 * @returns {string[]}
 */
export function getGeomNames() {
    return Array.from(registry.keys())
}
