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
    mean(arr, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(x => typeof x == 'number' || x instanceof Date)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        if (arr.length == 0) return NaN
        return Array.from(arr).reduce((a, v) => a + v, 0) / arr.length
    },
    sd(arr, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(x => typeof x == 'number' || x instanceof Date)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        if (arr.length <= 1) return NaN
        let mean = Array.from(arr).reduce((a, v) => a + v, 0) / arr.length
        return Math.sqrt(Array.from(arr).reduce((a, v) => a + (v - mean) ** 2, 0) / (arr.length - 1))
    },
    quantile(arr, p, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(x => typeof x == 'number' || x instanceof Date)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        if (arr.length == 0) return NaN
        arr = Array.from(arr).sort((a, b) => a - b)
        let idx = (arr.length - 1) * p,
            lo = Math.floor(idx), hi = Math.ceil(idx)
        if (lo == hi) return arr[lo]
        return arr[lo] * (hi - idx) + arr[hi] * (idx - lo)
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
    /* vectorized summation of numbers */
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
    /* vectorized opposite of numbers */
    opposite(value) {
        if (value == null) return null
        if (!Array.isArray(value) && typeof value != 'number')
            throw new Error('Arguments must be numbers or arrays')
        if (Array.isArray(value))
            return value.map(v => v == null ? v : -v)
        return -value
    },
    /* vectorized concat of strings */
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
    if (arr.length == 0) return undefined
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

export function emitEvent(handlers, ...args) {
    if (Array.isArray(handlers)) {
        handlers = handlers.filter(h => typeof h === "function")
        if (handlers.length === 0) return false
        handlers.forEach(h => h(...args))
        return true
    }
    if (typeof handlers !== "function") return false
    handlers(...args)
    return true
}

export function oob_censor(value, { min, max }) {
    if (value < min || value > max) return NaN
    return value
}
export function oob_squish_any(value, { min, max }) {
    if (value < min) return min
    if (value > max) return max
    return value
}
export function oob_squish_infinite(value, { min, max }) {
    if (value == -Infinity) return min
    if (value == Infinity) return max
    return value
}

export function dropNull(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v != null))
}

function deepEqual(a, b) {
    if (a === b) return true
    if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null) return false
    let aKeys = Object.keys(a), bKeys = Object.keys(b)
    if (aKeys.length !== bKeys.length) return false
    for (let key of aKeys) {
        if (!deepEqual(a[key], b[key])) return false
    }
    return true
}

/**
 * Create a shallow categorical representation for a list of object.
 * @param  {object[]} array
 * @returns {number[]}
 */
export function categorize(array) {
    if (!Array.isArray(array)) throw new Error('Argument must be an array')
    let categories = [], result = []
    for (let i = 0; i < array.length; i++) {
        let obj = array[i]
        let idx = categories.findIndex(cat => deepEqual(cat, obj))
        if (idx === -1) {
            categories.push(obj)
            idx = categories.length - 1
        }
        result.push(idx)
    }
    result.categories = categories
    return result
}


/**
 * Create a categorical representation for lists of data.
 * @param  {...any} arrays
 * @returns {number[]} result
 * @returns {Array[]} result.categories
 */
export function interaction(...arrays) {
    if (arrays.length == 0) return null
    let length = arrays.filter(x => Array.isArray(x)).reduce((l, arr) => {
        if (Array.isArray(arr)) {
            if (l == null) return arr.length
            if (l != arr.length) throw new Error('Arrays must have the same length')
        }
        return l
    }, null) ?? 0
    let categories = [], result = []
    for (let i = 0; i < length; i++) {
        let arr = arrays.map(x => Array.isArray(x) ? x[i] : x)
        let idx = categories.findIndex(x => x.every((v, j) => v === arr[j]))
        if (idx === -1) {
            categories.push(arr)
            idx = categories.length - 1
        }
        result.push(idx)
    }
    result.categories = categories
    return result
}

/**
 * Create a categorical representation for lists of data.
 * @param {object} arrays
 * @returns {number[]} result
 * @returns {object[]} result.categories
 */
export function intraaction(arrays) {
    if (Object.keys(arrays).length == 0) return null
    let length = Object.values(arrays).filter(x => Array.isArray(x)).reduce((l, arr) => {
        if (Array.isArray(arr)) {
            if (l == null) return arr.length
            if (l != arr.length) throw new Error('Arrays must have the same length')
        }
        return l
    }, null) ?? 0
    let keys = Object.keys(arrays)
    let categories = [], result = []
    for (let i = 0; i < length; i++) {
        let arr = Object.fromEntries(keys.map(k => [k, Array.isArray(arrays[k]) ? arrays[k][i] : arrays[k]]))
        let idx = categories.findIndex(x => keys.every(k => x[k] === arr[k]))
        if (idx === -1) {
            categories.push(arr)
            idx = categories.length - 1
        }
        result.push(idx)
    }
    result.categories = categories
    return result
}

export function intrazip(arrays) {
    if (Object.keys(arrays).length == 0) return []
    let length = Object.values(arrays).filter(x => Array.isArray(x)).reduce((l, arr) => {
        if (Array.isArray(arr)) {
            if (l == null) return arr.length
            if (l != arr.length) throw new Error('Arrays must have the same length')
        }
        return l
    }, null) ?? 0
    return Array.from({ length }, (_, i) => Object.fromEntries(Object.keys(arrays).map(k => [k, Array.isArray(arrays[k]) ? arrays[k][i] : arrays[k]])))
}
