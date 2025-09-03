import vvgeom from './geom'
import vvstat from './stat'
import vvscale from './scale'
import vvlabel from './label'
import { numutils } from './utils'

function compare(a, b) {
    if (typeof a != 'number' || typeof b != 'number')
        return a.toString().localeCompare(b.toString())
    return a > b ? 1 : a < b ? -1 : 0
}

function naturalCompare(a, b) {
    if (typeof a != 'number' || typeof b != 'number')
        return a.toString().localeCompare(b.toString(), undefined, { numeric: true })
    return a > b ? 1 : a < b ? -1 : 0
}

function object_map(obj, expr) {
    if (obj == null) return {}
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, expr(k, v)]))
}

class GEnumElement {
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
}

class GEnumLevel {
    /**
     * return:
     *   x if x is a GEnumLevel
     *   new GEnumLevel from distinct values of x, ordered by natural order, if x is an array
     *   new GEnumLevel from keys of x, orderd by coresponing values, if x is an object
     * @param {*} x
     * @param {function} [sortkey]
     * @returns {GEnumLevel}
     */
    static from(x) {
        if (x instanceof this) return x
        if (x instanceof Set) {
            x = Array.from(x)
        }
        if (Array.isArray(x)) {
            let lvl = Array.from(new Set(x.map(x => x.toString()))).sort(naturalCompare)
            return new this(lvl)
        } else if (typeof x === 'object') {
            let lvl = Object.keys(x).map(x => x.toString()).sort((a, b) => compare(x[a], x[b]))
            return new this(lvl)
        }
        throw new Error(`Invalid level values: ${x}`)
    }
    /**
     * build a GEnumLevel from a string list
     * @param {string[]} level
     */
    constructor(level) {
        if (level instanceof this.constructor) return level
        if (level instanceof Set) {
            level = Array.from(level)
        }
        if (!Array.isArray(level)) {
            throw new Error('level must be an array')
        }
        let lvl = level.map(x => x.toString()).map((k, i) => new GEnumElement(k, i, this))
        this.level = lvl
        this.mapping = Object.fromEntries(lvl.map(fct => [fct, fct]))
        this.length = lvl.length
    }
    [Symbol.iterator]() {
        return this.level[Symbol.iterator]()
    }
    /**
     * get the level instance by index or key
     * @param {(number|string)} idx 
     * @returns {GEnumElement}
     */
    getItem(idx) {
        if (typeof idx === 'number' || idx instanceof Number) {
            return this.level[idx]
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

/**
 * convert an array to enum array
 * @param {Array} arr
 * @param {(string[]|Function)} [level]
 * @returns {GEnumElement[]}
 */
function as_enum(arr, level) {
    if (level instanceof GEnumLevel) {
        return level.apply(arr)
    }
    let lvl
    if (Array.isArray(level)) {
        lvl = new GEnumLevel(level)
    } else {
        lvl = GEnumLevel.from(arr, level)
    }
    return lvl.apply(arr)
}

/**
 * Graphic Layer object
 * @property {string} geom geometry type
 * @property {Object} data scaled data
 * @property {Object} $data unscaled data
 * @property {Object} aes aesthetics
 * @property {Object} localScales local scaled aesthetics
 */
class GLayer {
    /**
     * Create a graphic layer from schema
     * @param {Object} layerSchema layer schema
     * @param {Array} layerSchema.data layer data
     * @param {Function[]} layerSchema.aes layer aesthetics
     * @param {string} layerSchema.geom geometry type
     * @param {string|Function} layerSchema.stat statistical transformation
     * @param {Object} layerSchema.levels aesthetic levels
     * @param {Object} layerSchema.scales aesthetic scales
     * @param {Object} layerSchema.attrs aesthetic constant attributes
     * @param {Object} layerSchema.args arguments for stat function
     * @param {Object} layerSchema.vBind v-bind object for the layer
     * @param {Object} plotSchema plot schema, properties will be overridden by layerSchema
     * @param {Array} plotSchema.data plot data
     * @param {Function[]} plotSchema.aes plot aesthetics
     */
    constructor(layerSchema, plotSchema) {
        let {
            data: $data = [], aes: $aes,
        } = plotSchema
        let {
            geom: $$geom, stat: $$stat,
            data: $$data, aes: $$aes,
            levels: $$levels = {}, scales: $$scales = {},
            attrs: $$attrs, args: $$args,
            vBind: $$vBind
        } = layerSchema
        if (!vvgeom[$$geom]) {
            console.error(`Invalid geom "${$$geom}"`, "in layer", layerSchema, ", plot", plotSchema)
            return
        }
        let stat = typeof $$stat == 'function' ? $$stat : vvstat[$$stat]
        if (stat == null) {
            console.error(`Invalid stat "${$$stat}"`, "in layer", layerSchema, ", plot", plotSchema)
            return
        }
        this.geom = $$geom
        this.vBind = $$vBind
        this.scales = {}
        // filter and prepare data by aesthetics
        if (typeof $$data == 'function') $$data = $$data($data)
        if ($$data == null) $$data = $data
        $$aes = { ...$aes, ...$$aes }
        let data = {}
        let fns = {} // function names for legend titles
        for (const aes in $$aes) {
            fns[aes] = String($$aes[aes])
            data[aes] = $$data.map($$aes[aes])
        }
        data.$raw = $$data

        // apply coordinate attributes
        let coord_aes = stat?.coord_attrs ?? ['x', 'y', 'xnudge', 'ynudge']
        let length = $$data.length
        if (length == 0) {
            length = coord_aes.map(aes => $$attrs[aes]).filter(x => x != null)
                .reduce((acc, cur) => Math.max(Array.isArray(cur) ? cur.length : 1, acc), 0)
        }
        for (const aes in $$attrs) {
            if (!coord_aes.includes(aes)) continue
            if (!Array.isArray($$attrs[aes])) {
                if ($$attrs[aes] == null) continue
                data[aes] = new Array(length).fill($$attrs[aes])
            } else {
                if ($$attrs[aes].length != length)
                    throw new Error(`Attribute "${aes}" must have the same length as data (${length})`)
                data[aes] = $$attrs[aes]
            }
        }

        // apply stat function
        try {
            data = stat(data, $$args || {})
            data.$group = data.$group ?? data.group
            if (data.$group == null) {
                let length = Object.values(data)?.[0]?.length ?? 0
                data.$group = new Array(length).fill(null)
            }
        } catch (e) {
            console.error("Error", e, "in layer", layerSchema, ", plot", plotSchema)
            return
        }

        // apply local scales
        this.localScales = new Set([
            ...Object.keys($$levels).filter(k => $$levels[k] != null),
            ...Object.keys($$scales).filter(k => $$scales[k] != null)
        ])
        this.aes = new Set([
            ...this.localScales,
            ...vvgeom[$$geom]?.attrs ?? []
        ])

        this.$data = data
        this.data = { ...data }
        for (const aes in data) {
            if ($$scales[aes] != null || vvgeom[$$geom]?.attrs?.includes?.(aes)) {
                let scale = new Scale($$scales[aes] ?? vvscale[aes].default())
                scale.aesthetics = aes
                if (scale.title === undefined) {
                    scale.title = fns[aes]
                }
                let values = this.$data[aes]
                if (!values?.length) continue
                if ($$levels?.[aes] != null) {
                    scale.level = $$levels[aes]
                } else if (values.some(v => typeof v === 'string')) {
                    scale.level = GEnumLevel.from(values)
                } else {
                    scale.extent = numutils.extent(values)
                }
                this.applyScale(aes, scale)
            }
        }

        for (const aes in $$attrs) {
            if (coord_aes.includes(aes)) continue
            if (!Array.isArray($$attrs[aes])) {
                if ($$attrs[aes] != null) {
                    this.data[aes] = new Array(length).fill($$attrs[aes])
                }
            } else {
                if ($$attrs[aes].length != length)
                    throw new Error(`Attribute "${aes}" must have the same length as data (${length})`)
                this.data[aes] = $$attrs[aes]
            }
        }
    }
    /**
     * apply custom level or extent to an aesthetic
     */
    applyScale(aes, scale) {
        let values = this.$data[aes]
        if (values == null) return
        if (scale.level != null) {
            values = scale.level.apply(values)
            values.extent = scale.extent
        } else {
            values.extent = scale.extent
        }
        this.data[aes] = scale(values)
        this.scales[aes] = scale
    }

    applyCoordScale(coord_levels) {
        try {
            Object.assign(this.data, vvgeom[this.geom]?.coord_scale?.(this.$data, coord_levels))
        } catch (e) {
            console.error(e)
        }
    }
}

/**
 * Graphic plot object
 */
export class GPlot {
    constructor(schema, layers) {
        this.levels = {}
        this.extents = {}
        this.layers = []
        this.coordScales = {}
        for (let i in layers) {
            this.layers.push(new GLayer(layers[i], schema))
        }
        this.layers = this.layers.filter(layer => layer.$data != null)
        this.aes = new Set(this.layers.flatMap(layer => Array.from(layer.aes)))
        this.scales = new Map()
    }

    useScales(scales, levels) {
        this.scales = new Map()
        for (const aes of this.aes) {
            let values = this.layers.filter(layer => !layer.localScales.has(aes))
                .flatMap(layer => layer.$data[aes] ?? [])
            if (values.length != 0) {
                let scale = new Scale(scales?.[aes] ?? vvscale[aes].default())
                scale.aesthetics = aes
                if (levels?.[aes] != null) {
                    scale.level = levels[aes]
                } else if (values.some(v => typeof v === 'string')) {
                    scale.level = GEnumLevel.from(values)
                } else if (!scale.asis) {
                    scale.extent = numutils.extent(values)
                }
                for (const layer of this.layers) {
                    if (!layer.localScales.has(aes)) {
                        layer.applyScale(aes, scale)
                    }
                }
            }
            for (const layer of this.layers) {
                let scale = layer.scales?.[aes]
                if (scale == null) continue
                if (!scale.asis) {
                    if (!this.scales.has(scale)) {
                        this.scales.set(scale, new Set())
                    }
                    this.scales.get(scale).add(layer.geom)
                }
            }
        }
        return this
    }

    useCoordLevels(levels = {}) {
        for (const aes of ['x', 'y']) {
            if (levels[aes]) {
                this.levels[aes] = new GEnumLevel(levels[aes])
            } else {
                let values = this.layers.flatMap(layer => {
                    let fn = vvgeom[layer.geom].get_values ?? vvgeom[layer.geom].get_range
                    return fn?.(layer.$data, aes)
                })
                if (values.some(v => typeof v === 'string')) {
                    this.levels[aes] = GEnumLevel.from(values)
                } else {
                    values = this.layers.flatMap(layer => vvgeom[layer.geom].get_range?.(layer.$data, aes)).filter(v => !isNaN(v))
                    this.extents[aes] = numutils.extent(values)
                }
            }
        }
        for (const layer of this.layers) {
            layer.applyCoordScale(this.levels)
        }
        return this
    }

    getComputedLayers() {
        return this.layers.map(layer => {
            let data = Object.values(Object.groupBy(layer.data.$group.map(
                (_, i) => vvgeom[layer.geom].validate(object_map(layer.data, (k, v) => v?.[i]))
            ).filter(x => x != null), d => d.$group))
            return { data, geom: layer.geom, vBind: layer.vBind }
        })
    }

    getCoordScales(range, add, minRange) {
        let result = {}
        this._range = range
        if (this.levels.x) {
            let min = +(range?.xmin ?? - 0.5) - (add.x?.min ?? 0),
                max = +(range?.xmax ?? this.levels.x.length - 0.5) + (add.x?.max ?? 0)
            result.x = new DiscreteCoordScale(this.levels.x, { min, max })
        } else {
            let $min = range?.xmin ?? this.extents.x?.min ?? 0,
                $max = range?.xmax ?? this.extents.x?.max ?? 0
            let min = +$min - (add.x?.min ?? 0), max = +$max + (add.x?.max ?? 0)
            let dmin = minRange?.x ?? 1
            if (max - min < dmin) {
                if (range?.xmax == null && range?.xmin != null) {
                    max = min + dmin
                } else if (range?.xmax != null && range?.xmin == null) {
                    min = max - dmin
                } else {
                    max = (max + min) / 2 + dmin / 2
                    min = max - dmin
                }
            }
            if ($min instanceof Date || $max instanceof Date) {
                result.x = new DatetimeCoordScale({ min, max })
            } else {
                result.x = new ContinuousCoordScale({ min, max })
            }
        }

        if (this.levels.y) {
            let min = +(range?.ymin ?? - 0.5) - (add.y?.min ?? 0),
                max = +(range?.ymax ?? this.levels.y.length - 0.5) + (add.y?.max ?? 0)
            result.y = new DiscreteCoordScale(this.levels.y, { min, max })
        } else {
            let $min = range?.ymin ?? this.extents.y?.min ?? 0,
                $max = range?.ymax ?? this.extents.y?.max ?? 0
            let min = +$min - (add.y?.min ?? 0), max = +$max + (add.y?.max ?? 0)
            let dmin = minRange?.y ?? 1
            if (max - min < dmin) {
                if (range?.ymax == null && range?.ymin != null) {
                    max = min + dmin
                } else if (range?.ymax != null && range?.ymin == null) {
                    min = max - dmin
                } else {
                    max = (max + min) / 2 + dmin / 2
                    min = max - dmin
                }
            }
            if ($min instanceof Date || $max instanceof Date) {
                result.y = new DatetimeCoordScale({ min, max })
            } else {
                result.y = new ContinuousCoordScale({ min, max })
            }
        }
        return result
    }

    getAxes(coordScales, expandMult, $axes = { left: true, bottom: true }) {
        coordScales = {
            x: coordScales.x.expand(expandMult?.x),
            y: coordScales.y.expand(expandMult?.y)
        }
        let axes = { x: {}, y: {} }
        if ($axes.left) axes.y.left = new GAxis($axes.left, coordScales.y)
        if ($axes.bottom) axes.x.bottom = new GAxis($axes.bottom, coordScales.x)
        if ($axes.right) axes.y.right = new GAxis($axes.right, coordScales.y)
        if ($axes.top) axes.x.top = new GAxis($axes.top, coordScales.x)
        return axes
    }

    render(range, expandAdd, expandMult, axes = { left: true, bottom: true }, minRange) {
        let coordScales = this.getCoordScales(range, expandAdd, minRange)
        return {
            layers: this.getComputedLayers(),
            axes: this.getAxes(coordScales, expandMult, axes),
            coordScales,
            scales: this.scales,
        }
    }
}

class Scale extends Function {
    constructor(func) {
        let scale = Object.assign(func.bind(), func)
        Object.setPrototypeOf(scale, Scale.prototype)
        return scale
    }
    set extent(value) {
        this._extent = value
    }
    get extent() {
        if (this.level) return {
            0: 0, 1: this.level.length, length: 2,
            min: 0, max: this.level.length
        }
        if (this._extent) return this._extent
        return undefined
    }
}

class DiscreteCoordScale extends Function {
    constructor(level, { min, max } = {}) {
        const scale = min == max ? x => 0 : x => (+x - min) / (max - min)
        scale.range = { min, max }
        scale.level = level
        scale.invert = w => w * (max - min) + min
        scale.padding = { min: 0, max: 0 }
        Object.setPrototypeOf(scale, DiscreteCoordScale.prototype)
        return scale
    }
    expand({ min: mmin = 0, max: mmax = 0 } = {}) {
        let $min = 0, $max = this.level.length, $interval = $max
        let min = $min - mmin * $interval,
            max = $max + mmax * $interval
        const scale = min == max ? x => 0 : x => (+x - min) / (max - min)
        scale.invert = x => w => w * (max - min) + min
        scale.range = this.range
        scale.level = this.level
        scale.title = this.title
        let interval = max - min
        scale.padding = {
            min: interval == 0 ? 0 : ($min - min) / interval,
            max: interval == 0 ? 0 : (max - $max) / interval,
        }
        Object.setPrototypeOf(scale, DiscreteCoordScale.prototype)
        return scale
    }
}
class ContinuousCoordScale extends Function {
    constructor(domain) {
        let min = +domain.min,
            max = +domain.max
        const scale = min == max ? x => 0.5 : x => (+x - min) / (max - min)
        scale.range = { min, max }
        scale.limits = { min, max }
        scale.invert = w => w * (max - min) + min
        scale.padding = { min: 0, max: 0 }
        Object.setPrototypeOf(scale, ContinuousCoordScale.prototype)
        return scale
    }
    expand({ min: mmin = 0, max: mmax = 0 } = {}) {
        let { min: $min, max: $max } = this.limits
        let $interval = $max - $min
        let min = $min - mmin * $interval,
            max = $max + mmax * $interval
        let interval = max - min
        const scale = min == max ? x => 0.5 : x => (+x - min) / (max - min)
        scale.invert = w => w * (max - min) + min
        scale.range = this.range
        scale.level = this.level
        scale.title = this.title
        scale.limits = { min, max }
        scale.padding = {
            min: interval == 0 ? 0 : ($min - min) / interval,
            max: interval == 0 ? 0 : (max - $max) / interval,
        }
        Object.setPrototypeOf(scale, ContinuousCoordScale.prototype)
        return scale
    }
}
class DatetimeCoordScale extends ContinuousCoordScale {
    constructor(domain) {
        let scale = super(domain)
        let { min, max } = scale.limits
        scale.invert = w => new Date(w * (max - min) + min)
        Object.setPrototypeOf(scale, DatetimeCoordScale.prototype)
        return scale
    }
    expand({ min: mmin = 0, max: mmax = 0 } = {}) {
        let scale = super.expand({ min: mmin, max: mmax })
        let { min, max } = scale.limits
        scale.invert = w => new Date(w * (max - min) + min)
        Object.setPrototypeOf(scale, DatetimeCoordScale.prototype)
        return scale
    }
}

function getContinuousBreaks({ min, max } = {}, extend = 0) {
    let interval = max - min
    if (!(interval > 0)) return []
    min -= interval * extend
    max += interval * extend
    let exp = 10 ** Math.floor(Math.log10(interval) - 1),
        m = interval / exp
    let step = (m > 50 ? 20 : m > 25 ? 10 : 5) * exp
    let nMin = Math.ceil(min / step)
    let nMax = Math.floor(max / step)
    return new Array(nMax - nMin + 1).fill(null).map((_, i) => (nMin + i) * step)
}

function getContinuousMinorBreaks({ min, max } = {}, extend = 0) {
    let interval = max - min
    if (!(interval > 0)) return []
    min -= interval * extend
    max += interval * extend
    let exp = 10 ** Math.floor(Math.log10(interval) - 1),
        m = interval / exp
    let step = (m > 50 ? 10 : m > 25 ? 5 : 2.5) * exp
    let nMin = Math.ceil(min / step)
    let nMax = Math.floor(max / step)
    return new Array(nMax - nMin + 1).fill(null).map((_, i) => (nMin + i) * step)
}

function getDatetimeBreaks({ min, max } = {}, extend = 0) {
    let interval = max - min
    if (!(interval > 0)) return []
    let s = new Date(min - interval * extend),
        e = new Date(max + interval * extend)
    let sYear = s.getUTCFullYear(),
        sMonth = s.getUTCMonth(),
        sDate = s.getUTCDate(),
        sHours = s.getUTCHours(),
        sMinutes = s.getUTCMinutes(),
        sSeconds = s.getUTCSeconds()
    let breaks = []
    if (interval > 3 * 31536000000) { // > 3 year
        let itvlYear = interval / 31536000000
        let exp = 10 ** Math.floor(Math.log10(itvlYear) - 1),
            m = itvlYear / exp
        let step = Math.max((m > 50 ? 10 : m > 25 ? 5 : 2) * exp, 1)
        s = new Date(Date.UTC(
            Math.ceil(sYear / step) * step
        ))
        do { breaks.push(new Date(s)) }
        while (s.setUTCFullYear(s.getUTCFullYear() + step) < e)
    } else if (interval > 3 * 2592000000) { // > 3 months
        let itvlMonth = interval / 2592000000
        let step = [2, 3, 6].findLast(x => x * 3 <= itvlMonth) || 1
        s = new Date(Date.UTC(
            sYear,
            Math.ceil(sMonth / step) * step
        ))
        do { breaks.push(new Date(s)) }
        while (s.setUTCMonth(s.getUTCMonth() + step) < e)
    } else if (interval > 21 * 86400000) { // > 21 days
        s = new Date(Date.UTC(
            sYear, sMonth,
            sDate + (7 - s.getUTCDay()) % 7
        ))
        do { breaks.push(new Date(s)) }
        while (s.setUTCDate(s.getUTCDate() + 7) < e)
    } else if (interval > 3 * 86400000) { // > 3 days
        let itvlDate = interval / 86400000
        let step = [2, 3].findLast(x => x * 3 <= itvlDate) || 1
        s = new Date(Date.UTC(
            sYear, sMonth,
            Math.ceil(sDate)
        ))
        do { breaks.push(new Date(s)) }
        while (s.setUTCDate(s.getUTCDate() + step) < e)
    } else if (interval > 3 * 3600000) { // > 3 hours
        let itvlHours = interval / 3600000
        let step = [2, 3, 6].findLast(x => x * 3 <= itvlHours) || 1
        s = new Date(Date.UTC(
            sYear, sMonth, sDate,
            Math.ceil(sHours / step) * step
        ))
        do { breaks.push(new Date(s)) }
        while (s.setUTCHours(s.getUTCHours() + step) < e)
    } else if (interval > 3 * 60000) { // > 3 minutes
        let itvlMinutes = interval / 60000
        let step = [2, 5, 10, 30].findLast(x => x * 3 <= itvlMinutes) || 1
        s = new Date(Date.UTC(
            sYear, sMonth, sDate,
            sHours,
            Math.ceil(sMinutes / step) * step
        ))
        do { breaks.push(new Date(s)) }
        while (s.setUTCMinutes(s.getUTCMinutes() + step) < e)
    } else if (interval > 3000) { // > 3 seconds
        let itvlSeconds = interval / 1000
        let step = [2, 5, 10, 30].findLast(x => x * 3 <= itvlSeconds) || 1
        s = new Date(Date.UTC(
            sYear, sMonth, sDate,
            sHours, sMinutes,
            Math.ceil(sSeconds / step) * step
        ))
        do { breaks.push(new Date(s)) }
        while (s.setUTCSeconds(s.getUTCSeconds() + step) < e)
    } else {
        let exp = 10 ** Math.floor(Math.log10(interval) - 1),
            m = interval / exp
        let step = (m > 50 ? 20 : m > 25 ? 10 : 5) * exp
        let nMin = Math.ceil(min / step)
        let nMax = Math.floor(max / step)
        return new Array(nMax - nMin + 1).fill(null).map((_, i) => (nMin + i) * step)
    }
    return breaks
}

class GAxis {
    constructor(config = {}, scale) {
        Object.assign(this, (({ breaks, extend, labels, minorBreaks, showGrid, ...etc }) => etc)(config))
        if (scale.level) {
            let level = scale.level.level.sort((a, b) => a - b)
            let breaks = level.map(x => +x)
            let labels = config.labels
            if (Array.isArray(labels)) {
                if (labels.length != breaks.length) {
                    throw new Error('Length of labels must be the same as breaks')
                }
            } else if (typeof labels === 'function') {
                labels = level.map(labels)
            } else {
                labels = level.map(x => String(x))
            }
            this.ticks = breaks.map((position, i) => ({ position, label: labels[i] }))
            this.majorBreaks = config.showGrid ? breaks : []
            this.minorBreaks = []
        } else if (scale instanceof DatetimeCoordScale) {
            let breaks = config.breaks ?? getDatetimeBreaks(scale.limits) ?? []
            let labels = config.labels ?? vvlabel.date()
            if (!Array.isArray(breaks)) breaks = []
            if (Array.isArray(labels)) {
                if (labels.length != breaks.length) {
                    throw new Error('Length of labels must be the same as breaks')
                }
            } else if (typeof labels === 'function') {
                labels = breaks.map(labels)
            } else {
                labels = breaks.map(b => String(b))
            }
            let titles = breaks.map(b => new Date(b).toISOString())
            this.ticks = breaks.map((position, i) => ({ position, label: labels[i], title: titles[i] }))
                .sort((a, b) => a.position - b.position)
            this.majorBreaks = config.showGrid ? breaks.sort() : []
            this.minorBreaks = []
        } else {
            let breaks = config.breaks ?? getContinuousBreaks(scale.limits, config.extend) ?? []
            let minorBreaks = config.minorBreaks ?? getContinuousMinorBreaks(scale.limits, config.extend) ?? []
            let labels = config.labels ?? vvlabel.number()
            if (!Array.isArray(breaks)) breaks = []
            if (Array.isArray(labels)) {
                if (labels.length != breaks.length) {
                    throw new Error('Length of labels must be the same as breaks')
                }
            } else if (typeof labels === 'function') {
                labels = breaks.map(labels)
            } else {
                labels = breaks.map(b => String(b))
            }
            this.ticks = breaks.map((position, i) => ({ position, label: labels[i] }))
                .sort((a, b) => a.position - b.position)
            this.majorBreaks = config.showGrid ? breaks.sort() : []
            this.minorBreaks = config.showGrid ? minorBreaks.sort() : []
        }
    }
}
