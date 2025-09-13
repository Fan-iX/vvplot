export const numutils = {
    min(arr, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(x => typeof x == 'number' || x instanceof Date)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        return Array.from(arr).reduce((a, b) => a < b ? a : b, Infinity)
    },
    max(arr, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(x => typeof x == 'number' || x instanceof Date)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        return Array.from(arr).reduce((a, b) => a > b ? a : b, -Infinity)
    },
    extent(arr, { na_rm = true, infinity_rm = true } = {}) {
        if (arr.length == 0) return []
        if (na_rm) arr = arr.filter(x => typeof x == 'number' || x instanceof Date)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        let min = Array.from(arr).reduce((a, b) => a < b ? a : b, Infinity),
            max = Array.from(arr).reduce((a, b) => a > b ? a : b, -Infinity)
        return { 0: min, 1: max, length: 2, min, max }
    }
}

export const vecutils = {
    sum(...values) {
        if (values.some(x => x == null)) return null
        if (values.some(x => !Array.isArray(x) && typeof x != 'number'))
            throw new Error('Arguments must be numbers or arrays')
        let nums = values.filter(x => !Array.isArray(x)).reduce((s, a) => +a + s, 0)
        values = values.filter(x => Array.isArray(x))
        if (values.length == 0)
            return [nums]
        if (values.some(v => v.length == 0))
            return []
        let length = values[0].length
        if (values.some(v => v.length != length))
            throw new Error('Arrays must have the same length')
        return Array.from({ length }, (_, i) => values.reduce((s, a) => +a[i] + s, nums))
    },
    opposite(value) {
        if (value == null) return null
        if (!Array.isArray(value) && typeof value != 'number')
            throw new Error('Arguments must be numbers or arrays')
        if (Array.isArray(value))
            return value.map(v => v == null ? v : -v)
        return -value
    },
    concat(...values) {
        if (values.some(x => x == null)) return null
        let arrs = values.filter(x => Array.isArray(x))
        if (arrs.length == 0) return [values.join('')]
        if (values.some(v => v.length == 0))
            return []
        let length = arrs[0].length
        if (arrs.some(v => v.length != length))
            throw new Error('Arrays must have the same length')
        return Array.from({ length }, (_, i) => values.map(a => Array.isArray(a) ? a[i] : a).join(''))
    }
}

/**
 * (shallow) merge array of objects, from left to right
 * `undefined` will be ignored
 * `null` will reset the merge
 * @param {Array} arr
 * @returns {Object|null}
 */
export function obj_merge(arr) {
    arr = arr.filter(x => x !== undefined)
    arr = arr.slice(arr.findIndex(x => x == null) + 1)
    if (arr.length == 0) return null
    return arr.reduce((a, c) => Object.assign(a, c), {})
}

export function str_c() {
    let args = Array.from(arguments)
    if (args.some(x => x === undefined)) return undefined
    if (args.some(x => x === null)) return null
    return args.join('')
}

export function unique(arr) {
    if (arr == null) return []
    return Array.from(new Set(arr))
}

export function getListeners(attrs) {
    let listeners = {}
    for (let key in attrs) {
        if (key.startsWith('on')) {
            listeners[key] = attrs[key]
        }
    }
    return listeners
}

export function extractModifier(event) {
    return {
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
        button: event.button,
        buttons: event.buttons,
    }
}

export function interaction(...values) {
    if (values.length == 0) return null
    let arrs = values.filter(x => Array.isArray(x))
    let length = arrs.reduce((l, val) => {
        if (Array.isArray(val)) {
            if (l == null) return val.length
            if (l != val.length) throw new Error('Arrays must have the same length')
        }
        return l
    }, null) ?? 0
    let categories = [], result = []
    for (let i = 0; i < length; i++) {
        let val = values.map(x => Array.isArray(x) ? x[i] : x)
        let idx = categories.findIndex(x => x.every((v, j) => v === val[j]))
        if (idx === -1) {
            categories.push(val)
            idx = categories.length - 1
        }
        result.push(idx)
    }
    result.categories = categories
    return result
}
