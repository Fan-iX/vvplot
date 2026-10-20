export function defineStat(transform, { core_attrs } = {}) {
    if (typeof transform !== 'function')
        throw new Error('defineStat() expects a transform function')
    if (core_attrs != null) transform.core_attrs = core_attrs
    return transform
}
