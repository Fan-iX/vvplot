/**
 * Runtime registry for statistical transformations.
 *
 * The registry is intentionally independent of the built-in `base` layers.
 * Built-in and third-party packages register their transforms here.
 */
const registry = new Map()

/**
 * Register a statistic under a name.
 * @param {string} name statistic name
 * @param {Function} stat statistic transform
 * @returns {Function} the registered statistic
 */
export function registerStat(name, stat) {
    if (typeof name !== 'string' || name.length == 0)
        throw new Error('Stat name must be a non-empty string')
    if (typeof stat !== 'function')
        throw new Error(`Stat "${name}" must be a function`)
    registry.set(name, stat)
    return stat
}

/**
 * Resolve a statistic reference. Functions are returned as-is,
 * strings are looked up in the registry.
 * @param {string|Function} ref statistic name or transform
 * @returns {Function|undefined}
 */
export function resolveStat(ref) {
    if (typeof ref === 'function') return ref
    return registry.get(ref)
}

/**
 * Get a snapshot of all registered statistic names.
 * @returns {string[]}
 */
export function getStatNames() {
    return Array.from(registry.keys())
}
