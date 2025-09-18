import vvgeom from './geom'
import vvstat from './stat'
import vvscale from './scale'
import vvbreak from './break'
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
            extendX: $extendX, extendY: $extendY,
        } = plotSchema
        let {
            geom: $$geom, stat: $$stat,
            data: $$data, aes: $$aes,
            levels: $$levels = {}, scales: $$scales = {},
            values: $$values, attrs: $$attrs, args: $$args,
            vBind: $$vBind,
            extendX: $$extendX, extendY: $$extendY,
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
        this.vBind = Object.assign($$vBind, {
            extendX: $$extendX ?? $extendX ?? 0,
            extendY: $$extendY ?? $extendY ?? 0
        })
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

        // apply core attributes (attributes required in stat function)
        let core_aes = stat?.core_attrs ?? ['x', 'y', 'xnudge', 'ynudge']
        let length = $$data.length
        if (length == 0) {
            length = core_aes.map(aes => $$attrs[aes]).filter(x => x != null)
                .reduce((acc, cur) => Math.max(Array.isArray(cur) ? cur.length : 1, acc), 0)
        }
        for (const aes in $$attrs) {
            if (!core_aes.includes(aes)) continue
            if (Array.isArray($$attrs[aes])) {
                if ($$attrs[aes].length != length)
                    throw new Error(`Attribute "${aes}" must have the same length as data (${length})`)
                data[aes] = $$attrs[aes]
            } else {
                if ($$attrs[aes] == null) continue
                data[aes] = new Array(length).fill($$attrs[aes])
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
            ...vvgeom[$$geom]?.scale_attrs ?? []
        ])

        this.$data = data
        this.$fns = fns
        this.data = { ...data }
        for (const aes in data) {
            if ($$scales[aes] != null) {
                let scale = new Scale($$scales[aes])
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

        this.attrs = {}
        for (const aes in $$attrs) {
            if (core_aes.includes(aes)) continue
            if (Array.isArray($$attrs[aes])) {
                if ($$attrs[aes].length != length)
                    throw new Error(`Attribute "${aes}" must have the same length as data (${length})`)
                this.data[aes] = $$attrs[aes]
            } else {
                this.attrs[aes] = $$attrs[aes]
                if ($$attrs[aes] != null) {
                    this.data[aes] = new Array(length).fill($$attrs[aes])
                }
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
        }
        values.extent = scale.limits
        scale.aes = aes
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
                if (scale.title == null) {
                    scale.title = this.layers.map(layer => layer.$fns?.[aes]).find(s => s != null)
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
                        this.scales.set(scale, {})
                    }
                    let geoms = this.scales.get(scale)
                    if (geoms[layer.geom] == null) geoms[layer.geom] = {}
                    for (let attr of vvgeom[layer.geom]?.scale_attrs) {
                        if (layer.attrs[attr] != null) {
                            geoms[layer.geom][attr] = layer.attrs[attr]
                        }
                    }
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

    getAxes(coordScales, expandMult, axes = []) {
        coordScales = {
            x: coordScales.x.expand(expandMult?.x),
            y: coordScales.y.expand(expandMult?.y)
        }
        return axes.filter(a => a.type in coordScales).map(ax => new GAxis(ax, coordScales[ax.type]))
    }

    render(range, expandAdd, expandMult, axes, minRange) {
        let coordScales = this.getCoordScales(range, expandAdd, minRange)
        return {
            layers: this.getComputedLayers(),
            axes: this.getAxes(coordScales, expandMult, axes),
            coordScales,
            scales: this.scales,
        }
    }
}

export class Scale extends Function {
    constructor(func) {
        let _func = func._fn ?? func
        function scale() {
            return _func.apply(scale, arguments)
        }
        Object.setPrototypeOf(scale, Scale.prototype)
        Object.assign(scale, func)
        scale._fn = _func
        return scale
    }
    set extent({ min, max, 0: rmin, 1: rmax } = {}) {
        min = min ?? rmin
        max = max ?? rmax
        this._limits = { 0: min, 1: max, length: 2, min, max }
    }
    get extent() {
        return this.limits
    }
    set limits({ min, max, 0: rmin, 1: rmax } = {}) {
        min = min ?? rmin
        max = max ?? rmax
        this.$limits = { 0: min, 1: max, length: 2, min, max }
    }
    get limits() {
        let min = this.$limits?.min ?? (this.level ? 0 : this._limits?.min),
            max = this.$limits?.max ?? this.level?.length ?? this._limits?.max
        return { 0: min, 1: max, length: 2, min, max }
    }
}

class DiscreteCoordScale extends Function {
    constructor(level, { min, max } = {}) {
        const scale = min == max ? x => 0 : x => (+x - min) / (max - min)
        scale.range = { min, max }
        scale.level = level
        scale.invert = w => w * (max - min) + min
        Object.setPrototypeOf(scale, DiscreteCoordScale.prototype)
        return scale
    }
    expand({ min: mmin = 0, max: mmax = 0 } = {}) {
        let $min = 0, $max = this.level.length, $interval = $max
        let min = $min - mmin * $interval,
            max = $max + mmax * $interval
        const scale = min == max ? x => 0 : x => (+x - min) / (max - min)
        scale.invert = w => w * (max - min) + min
        scale.range = this.range
        scale.level = this.level
        scale.title = this.title
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
        Object.setPrototypeOf(scale, ContinuousCoordScale.prototype)
        return scale
    }
    expand({ min: mmin = 0, max: mmax = 0 } = {}) {
        let { min: $min, max: $max } = this.limits
        let $interval = $max - $min
        let min = $min - mmin * $interval,
            max = $max + mmax * $interval
        const scale = min == max ? x => 0.5 : x => (+x - min) / (max - min)
        scale.range = this.range
        scale.level = this.level
        scale.title = this.title
        scale.limits = { min, max }
        Object.setPrototypeOf(scale, ContinuousCoordScale.prototype)
        return scale
    }
    invert(w) {
        let { min, max } = this.limits
        return w * (max - min) + min
    }
}
class DatetimeCoordScale extends ContinuousCoordScale {
    constructor(domain) {
        let scale = super(domain)
        Object.setPrototypeOf(scale, DatetimeCoordScale.prototype)
        return scale
    }
    expand({ min: mmin = 0, max: mmax = 0 } = {}) {
        let scale = super.expand({ min: mmin, max: mmax })
        Object.setPrototypeOf(scale, DatetimeCoordScale.prototype)
        return scale
    }
    invert(w) {
        let { min, max } = this.limits
        return new Date(w * (max - min) + min)
    }
}

class GAxis {
    constructor(config = {}, scale) {
        let { breaks, extend, labels, minorBreaks, showGrid, ...etc } = config
        Object.assign(this, etc)
        if (scale.level) {
            let level = scale.level.level.sort((a, b) => a - b)
            breaks = breaks ?? level.map(x => +x) ?? []
            if (typeof breaks == 'function') breaks = breaks(level)
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
            this.majorBreaks = showGrid ? breaks : []
            this.minorBreaks = []
        } else if (scale instanceof DatetimeCoordScale) {
            breaks = breaks ?? vvbreak.datetime({ extend }) ?? []
            if (typeof breaks == 'function') breaks = breaks(scale.limits)
            labels = labels ?? vvlabel.datetime()
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
            this.majorBreaks = showGrid ? breaks.sort() : []
            this.minorBreaks = []
        } else {
            breaks = breaks ?? vvbreak.number({ extend }) ?? []
            if (typeof breaks == 'function') breaks = breaks(scale.limits)
            minorBreaks = minorBreaks ?? vvbreak.number({ extend, minor: true }) ?? []
            if (typeof minorBreaks == 'function') minorBreaks = minorBreaks(scale.limits)
            labels = labels ?? vvlabel.number()
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
            this.majorBreaks = showGrid ? breaks.sort() : []
            this.minorBreaks = showGrid ? minorBreaks.sort() : []
        }
    }
}
