export class GEnumElement {
    constructor(label, value, level) {
        this.label = label
        this.value = value
        this.level = level
    }
    toString() {
        return this.label
    }
    valueOf() {
        return this.value
    }
    toJSON() {
        return this.label
    }
}

export class GEnumLevel extends Array {
    /**
     * return:
     *   x if x is a GEnumLevel
     *   new GEnumLevel from distinct values of x, ordered by natural order, if x is iterable
     *   new GEnumLevel from keys of x, orderd by coresponing values, if x is an object
     * @param {*} x
     * @param {function} [sortkey]
     * @returns {GEnumLevel}
     */
    static from(x) {
        if (x instanceof this) return x
        if (x[Symbol.iterator]) {
            let lvl = unique(Array.from(x).map(x => String(x))).sort((a, b) => compare(a, b, { numeric: true }))
            return new this(...lvl)
        } else if (typeof x === 'object') {
            let lvl = Object.keys(x).map(x => String(x)).sort((a, b) => compare(x[a], x[b]))
            return new this(...lvl)
        }
        throw new Error(`Invalid level values: ${x}`)
    }
    /**
     * build a GEnumLevel
     * @param {string[]} level
     */
    constructor(...level) {
        level = level.map((x, i) => new GEnumElement(String(x), i))
        level.forEach(l => l.level = level)
        level.mapping = Object.fromEntries(level.map(fct => [fct, fct]))
        Object.setPrototypeOf(level, GEnumLevel.prototype)
        return level
    }
    /**
     * get the level instance by index or key
     * @param {(number|string)} idx 
     * @returns {GEnumElement}
     */
    getItem(idx) {
        if (typeof idx === 'number' || idx instanceof Number) {
            return this[idx]
        } else {
            return this.mapping[idx]
        }
    }
    /**
     * convert an array to a GEnum array
     * @param {string[]} arr array to be converted, preferably a string array (items of other types will be converted to string)
     * @returns {GEnumElement[]}
     */
    apply(arr) {
        let result = arr.map(x => this.mapping[x])
        result.level = this
        return result
    }
}

function isContinuous(x) {
    return typeof x === 'number' || x instanceof Number || x instanceof Date
}
export function plus(a, b = 0) {
    if (b == 0 || a == null) return a
    if (a instanceof Date) return new a.constructor(+a + b)
    return +a + b
}

export const numutils = {
    min(arr, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(isContinuous)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        return Array.from(arr).reduce((a, b) => a < b ? a : b, Infinity)
    },
    max(arr, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(isContinuous)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        return Array.from(arr).reduce((a, b) => a > b ? a : b, -Infinity)
    },
    mean(arr, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(isContinuous)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        if (arr.length == 0) return NaN
        return Array.from(arr).reduce((a, v) => a + v, 0) / arr.length
    },
    sd(arr, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(isContinuous)
        if (infinity_rm) arr = arr.filter(x => isFinite(x))
        if (arr.length <= 1) return NaN
        let mean = Array.from(arr).reduce((a, v) => a + v, 0) / arr.length
        return Math.sqrt(Array.from(arr).reduce((a, v) => a + (v - mean) ** 2, 0) / (arr.length - 1))
    },
    quantile(arr, p, { na_rm = true, infinity_rm = true } = {}) {
        if (na_rm) arr = arr.filter(isContinuous)
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
        if (na_rm) arr = arr.filter(isContinuous)
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

/**
 * concatenate strings, with special handling of `undefined` and `null`
 * - if any argument is `undefined`, return `undefined`
 * - else if any argument is `null`, return `null`
 * - else return concatenated string
 * @param  {...(string|undefined|null)} args
 * @returns {string|undefined|null}
 */
export function str_c(...args) {
    if (args.some(x => x === undefined)) return undefined
    if (args.some(x => x === null)) return null
    return args.join('')
}

/**
 * return unique values in an array
 * @param {Array} arr 
 * @returns {Array}
 */
export function unique(arr) {
    if (arr == null) return []
    return Array.from(new Set(arr))
}

/**
 * natural comparation of two item
 * @param {*} a 
 * @param {*} b 
 * @returns {number}
 */
function compare(a, b, { numeric = false } = {}) {
    if (typeof a != 'number' || typeof b != 'number')
        return String(a).localeCompare(String(b), undefined, { numeric })
    return a - b
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
/**
 * turn out-of-bounds values to NaN
 * @param {number} value 
 * @param {Object} option 
 * @param {number} option.min lower bound
 * @param {number} option.max upper bound
 * @returns {number}
 */
export function oob_censor(value, { min, max }) {
    if (value < min || value > max) return NaN
    return value
}
/**
 * turn out-of-bounds values to bounds
 * @param {number} value 
 * @param {Object} option 
 * @param {number} option.min lower bound
 * @param {number} option.max upper bound
 * @returns {number}
 */
export function oob_squish_any(value, { min, max }) {
    if (value < min) return min
    if (value > max) return max
    return value
}
/**
 * turn infinite values to bounds
 * @param {number} value 
 * @param {Object} option 
 * @param {number} option.min lower bound
 * @param {number} option.max upper bound
 * @returns {number}
 */
export function oob_squish_infinite(value, { min, max }) {
    if (value == -Infinity) return min
    if (value == Infinity) return max
    return value
}

/**
 * drop null/undefined values from an object
 * @param {Object} obj 
 * @returns {Object}
 */
export function dropNull(obj) {
    if (typeof obj !== 'object' || obj == null) return obj
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v != null))
}

/**
 * test deep equality between two values
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
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
 * @returns {number[]} result
 * @returns {Array[]} result.categories
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
 * @param {Object} arrays
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

/**
 * Turn dict of arrays into array of dicts
 * @param {Object} arrays dict of arrays
 * @returns {object[]} array of dicts
 */
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

export function serializeSVG(svgElement) {
    if (!(svgElement instanceof SVGElement)) return null
    function removeComments(node) {
        let i = node.childNodes.length;
        while (i--) {
            const child = node.childNodes[i];
            if (child.nodeType === Node.COMMENT_NODE) {
                node.removeChild(child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                removeComments(child);
                if (child.getAttribute("style") == "") child.removeAttribute('style')
                if (child.getAttribute("class") == "") child.removeAttribute('class')
            }
        }
    }
    let svgClone = svgElement.cloneNode(true)
    let foreignElements = Array.from(svgElement.querySelectorAll('foreignObject')),
        foreignClones = Array.from(svgClone.querySelectorAll('foreignObject'))
    for (let i = 0; i < foreignElements.length; i++) {
        let foreignElement = foreignElements[i], foreignClone = foreignClones[i]
        let canvas = foreignElements[i].querySelector('canvas')
        if (!canvas) continue
        let img = svgClone.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'image')
        img.setAttribute('href', canvas.toDataURL())
        img.setAttribute('x', foreignElement.getAttribute('x'))
        img.setAttribute('y', foreignElement.getAttribute('y'))
        img.setAttribute('width', foreignElement.getAttribute('width'))
        img.setAttribute('height', foreignElement.getAttribute('height'))
        foreignClone.parentNode.replaceChild(img, foreignClone)
    }
    for (let node of svgClone.querySelectorAll('.vvplot-interactive')) node.remove()
    removeComments(svgClone)
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svgClone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    svgClone.setAttribute('version', '1.1')
    svgClone.setAttribute('width', svgElement.scrollWidth)
    svgClone.setAttribute('height', svgElement.scrollHeight)
    svgClone.setAttribute('viewBox', `0 0 ${svgElement.scrollWidth} ${svgElement.scrollHeight}`)
    const serializer = new XMLSerializer()
    return serializer.serializeToString(svgClone)
}
