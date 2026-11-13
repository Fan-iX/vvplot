import { resolveGeom } from './registry/geom.js'
import { resolveStat } from './registry/stat.js'
import vvscale from '../js/scale.js'
import vvbreak from '../js/break.js'
import vvlabel from '../js/label.js'
import { numutils, EnumLevel, Asis, plus, is_categorical } from '../js/utils.js'
import { expandFragment } from './utils.js'

const identity_scale = Object.assign(
    arr => Array.from(arr),
    { asis: true, legend: false }
)

function object_map(obj, expr) {
    if (obj == null) return {}
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, expr(k, v)]))
}

/**
 * Graphic Layer object
 * @property {string} geom geometry type
 * @property {string} geomDef geometry definition
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
            attrs: $$attrs, args: $$args, opts: $$opts,
            vBind: $$vBind, showLegend,
            extendX: $$extendX, extendY: $$extendY,
        } = layerSchema
        let geomDef = resolveGeom($$geom)
        if (!geomDef) {
            console.error(`Invalid geom "${$$geom}"`, "in layer", layerSchema, ", plot", plotSchema)
            return
        }
        let stat = resolveStat($$stat)
        if (stat == null) {
            console.error(`Invalid stat "${$$stat}"`, "in layer", layerSchema, ", plot", plotSchema)
            return
        }
        this.geom = $$geom
        this.geomDef = geomDef
        this.showLegend = showLegend
        this.options = $$opts
        this.vBind = Object.assign($$vBind, {
            extendX: $$extendX ?? $extendX ?? 0,
            extendY: $$extendY ?? $extendY ?? 0
        })
        this.scales = {}
        // filter and prepare data by aesthetics
        if (typeof $$data == 'function') $$data = $$data($data)
        if ($$data == null) $$data = $data
        $aes = Array.isArray($aes) ? Array.from($aes) : [$aes]
        let data = {}

        let assigned = new Set()
        let rowKeys = new Set()
        let rows = new Array($$data.length).fill(null)
        this.$ftitles = {} // explicit legend titles
        this.$fnames = {}  // function-name fallbacks for legend titles
        this.$fn = {}

        for (let aes of $aes.concat($$aes).reverse()) {
            if (aes == null) continue

            if (typeof aes === 'function') {
                for (let i = 0; i < $$data.length; i++) {
                    let part = aes($$data[i], i, $$data)
                    if (part == null || typeof part !== 'object' || Array.isArray(part)) continue
                    for (let key in part) {
                        if (key.startsWith('$') || assigned.has(key) || part[key] === undefined) continue
                        let row = rows[i] ??= {}
                        if (key in row) continue
                        row[key] = part[key]
                        rowKeys.add(key)
                        let { name, title } = aes
                        if (name === key || ['anonymous', 'bound'].includes(name)) name = undefined
                        this.$fnames[key] ||= name
                        this.$ftitles[key] ??= title
                        this.$fn[key] ??= aes
                    }
                }
            } else if (typeof aes === 'object') {
                for (let key in aes) {
                    if (key.startsWith('$') || assigned.has(key) || typeof aes[key] !== 'function') continue
                    data[key] = $$data.map(aes[key])
                    let { name, title } = aes[key]
                    if (name === key || ['anonymous', 'bound'].includes(name)) name = undefined
                    this.$fnames[key] ||= name
                    this.$ftitles[key] ??= title
                    this.$fn[key] ??= aes[key]
                    assigned.add(key)
                }
            }
        }

        for (let key of rowKeys) {
            data[key] ??= new Array($$data.length).fill(undefined)
            let column = data[key]
            for (let i = 0; i < $$data.length; i++) {
                let val = rows[i]?.[key]
                if (val !== undefined) column[i] = val
            }
        }

        for (let key in data) {
            data[key] = data[key].map(x => x instanceof String || x instanceof Number ? new Asis(x) : x)
        }

        data.$raw = $$data

        // apply core attributes (attributes required in stat and coord_scale function)
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
            data.$group ??= data.group
            if (data.$group == null) {
                let length = Object.values(data).filter(v => Array.isArray(v))
                    .reduce((acc, cur) => Math.max(acc, cur.length), 0)
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
            ...this.geomDef.scale_attrs ?? []
        ])

        this.$data = data
        this.data = { ...data }
        for (const aes in data) {
            if ($$scales[aes] != null) {
                let scale = new Scale($$scales[aes])
                scale.aesthetics = aes
                scale._title = this.$ftitles[aes] ?? this.$fnames[aes] ?? (this.$fn[aes] ? String(this.$fn[aes]) : undefined)
                let values = this.$data[aes]
                if (!values?.length) continue
                if (!scale.asis) {
                    if ($$levels?.[aes] != null) {
                        scale.level = $$levels[aes]
                    } else if (values.some(is_categorical)) {
                        scale.level = EnumLevel.from(values)
                    } else {
                        scale.extent = numutils.extent(values.filter(v => !(v instanceof Asis)))
                    }
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
        if (scale.level) values = scale.level.apply(values)
        if (scale.limits) values.extent = scale.limits
        scale.aes = aes
        let scaled = scale(values)
        this.data[aes] = values.map((v, i) => v instanceof Asis ? v.valueOf() : scaled[i])
        this.scales[aes] = scale
    }

    applyCoordScale(coord_levels) {
        try {
            Object.assign(this.data, this.geomDef?.coord_scale?.(this.$data, coord_levels))
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
                let scale = new Scale(
                    scales?.[aes]
                    ?? vvscale[aes]?.default?.()
                    ?? identity_scale
                )
                scale.aesthetics = aes
                if (!scale.asis) {
                    if (levels?.[aes] != null) {
                        scale.level = levels[aes]
                    } else if (values.some(is_categorical)) {
                        scale.level = EnumLevel.from(values)
                    } else {
                        scale.extent = numutils.extent(values.filter(v => !(v instanceof Asis)))
                    }
                }
                let title, fname, fn
                for (const layer of this.layers) {
                    if (!layer.localScales.has(aes)) layer.applyScale(aes, scale)
                    if (layer.showLegend === false || layer.showLegend?.[aes] === false) continue
                    title ??= layer.$ftitles?.[aes]
                    fname ||= layer.$fnames?.[aes]
                    fn ??= layer.$fn?.[aes]
                }
                scale._title ??= title ?? (fname || (fn ? String(fn) : undefined))
            }
            for (const layer of this.layers) {
                if (layer.showLegend === false || layer.showLegend?.[aes] === false) continue
                let scale = layer.scales?.[aes]
                if (scale == null) continue
                if (!scale.asis) {
                    if (!this.scales.has(scale)) {
                        this.scales.set(scale, {})
                    }
                    let geoms = this.scales.get(scale)
                    if (geoms[layer.geom] == null) geoms[layer.geom] = {}
                    for (let attr of layer.geomDef?.scale_attrs ?? []) {
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
                this.levels[aes] = new EnumLevel(...levels[aes])
            } else {
                let values = this.layers.flatMap(layer => {
                    let fn = layer.geomDef?.get_values ?? layer.geomDef?.get_range
                    return fn?.(layer.$data, aes)
                })
                if (values.some(is_categorical)) {
                    this.levels[aes] = EnumLevel.from(values)
                } else {
                    values = this.layers.flatMap(layer => layer.geomDef?.get_range?.(layer.$data, aes)).filter(v => !isNaN(v))
                    this.extents[aes] = numutils.extent(values.filter(v => !(v instanceof Asis)))
                }
            }
        }
        for (const layer of this.layers) {
            layer.applyCoordScale(this.levels)
        }
        return this
    }

    getComputedLayers() {
        return this.layers.map(({ geom, geomDef, data, options, vBind }) => {
            let validate = geomDef?.validate ?? (d => d)
            return {
                data: data.$group.map(
                    (_, i) => validate(object_map(data, (k, v) => v?.[i]))
                ).filter(x => x != null),
                geom, options, vBind
            }
        })
    }

    getCoordScales(range, add, minRange) {
        let result = {}
        if (this.levels.x) {
            let min = +(range?.xmin ?? - 0.5) - (+add.x?.min || 0),
                max = +(range?.xmax ?? this.levels.x.length - 0.5) + (+add.x?.max || 0)
            result.x = new DiscreteCoordScale(this.levels.x, { min, max })
        } else {
            let $min = range?.xmin ?? this.extents.x?.min ?? 0,
                $max = range?.xmax ?? this.extents.x?.max ?? 0
            let min = plus($min, -add.x?.min || 0), max = plus($max, +add.x?.max || 0)
            let dmin = minRange?.x ?? 1
            if (max - min < dmin) {
                if (range?.xmax == null && range?.xmin != null) {
                    max = plus(min, +dmin)
                } else if (range?.xmax != null && range?.xmin == null) {
                    min = plus(max, -dmin)
                } else {
                    let interval = max - min
                    max = plus(max, -interval / 2 + dmin / 2)
                    min = plus(max, -dmin)
                }
            }
            if (min instanceof Date || max instanceof Date) {
                result.x = new DatetimeCoordScale({ min, max })
            } else {
                result.x = new ContinuousCoordScale({ min, max })
            }
        }

        if (this.levels.y) {
            let min = +(range?.ymin ?? - 0.5) - (+add.y?.min || 0),
                max = +(range?.ymax ?? this.levels.y.length - 0.5) + (+add.y?.max || 0)
            result.y = new DiscreteCoordScale(this.levels.y, { min, max })
        } else {
            let $min = range?.ymin ?? this.extents.y?.min ?? 0,
                $max = range?.ymax ?? this.extents.y?.max ?? 0
            let min = plus($min, -add.y?.min ?? 0), max = plus($max, +add.y?.max || 0)
            let dmin = minRange?.y ?? 1
            if (max - min < dmin) {
                if (range?.ymax == null && range?.ymin != null) {
                    max = plus(min, +dmin)
                } else if (range?.ymax != null && range?.ymin == null) {
                    min = plus(max, -dmin)
                } else {
                    let interval = max - min
                    max = plus(max, -interval / 2 + dmin / 2)
                    min = plus(max, -dmin)
                }
            }
            if (min instanceof Date || max instanceof Date) {
                result.y = new DatetimeCoordScale({ min, max })
            } else {
                result.y = new ContinuousCoordScale({ min, max })
            }
        }
        return result
    }
}

export class Scale extends Function {
    constructor(func) {
        let _func = func._fn ?? func
        function scale() {
            return _func.apply(scale, arguments)
        }
        Object.setPrototypeOf(scale, new.target.prototype)
        Object.assign(scale, func)
        scale._fn = _func
        return scale
    }
    set extent({ min, max, 0: rmin, 1: rmax } = {}) {
        min ??= rmin
        max ??= rmax
        this._limits = { 0: min, 1: max, length: 2, min, max }
    }
    get extent() {
        return this.limits
    }
    set limits({ min, max, 0: rmin, 1: rmax } = {}) {
        min ??= rmin
        max ??= rmax
        this.$limits = { 0: min, 1: max, length: 2, min, max }
    }
    get limits() {
        let min = this.$limits?.min ?? (this.level ? 0 : this._limits?.min),
            max = this.$limits?.max ?? this.level?.length ?? this._limits?.max
        return { 0: min, 1: max, length: 2, min, max }
    }
    toString() {
        return this.title ?? String(this._fn)
    }
}

class DiscreteCoordScale extends Function {
    constructor(level, { min, max } = {}) {
        const scale = min == max ? x => 0 : x => (+x - min) / (max - min)
        scale.range = { min, max }
        scale.level = level
        Object.setPrototypeOf(scale, new.target.prototype)
        return scale
    }
    invert(w) {
        let { min, max } = this.range
        return w * (max - min) + min
    }
    get breaks() { return Array.from(this.level) }
    get minorBreaks() { return [] }
}
class ContinuousCoordScale extends Function {
    constructor(domain) {
        let { min, max } = domain
        const scale = min == max ? x => isFinite(x) ? 0.5 : x : x => (+x - min) / (max - min)
        scale.range = { min, max }
        Object.setPrototypeOf(scale, new.target.prototype)
        return scale
    }
    invert(w) {
        let { min, max } = this.range
        return plus(min, w * (max - min))
    }
    get breaks() { return vvbreak.number() }
}
class DatetimeCoordScale extends ContinuousCoordScale {
    get breaks() { return vvbreak.datetime() }
    get minorBreaks() { return [] }
}

export class GAxis {
    constructor(scale, { breaks, labels, minorBreaks, titles } = {}) {
        this.scale = scale
        this.range = scale?.range
        this.breaks = breaks ?? scale.breaks
        this.labels = labels ?? vvlabel.auto()
        this.titles = titles ?? vvlabel.asis()
        this.minorBreaks = minorBreaks ?? breaks ?? scale.minorBreaks ?? scale.breaks
    }

    getBreaks({ range, expandMult, breakSlot } = {}) {
        let majorBreaks = this.breaks, minorBreaks = this.minorBreaks,
            labels = this.labels, titles = this.titles
        let min = range?.min ?? this?.range?.min,
            max = range?.max ?? this?.range?.max,
            interval = max - min || 0
        min = min == null ? min : plus(min, -(expandMult?.min ?? 0) * interval)
        max = max == null ? max : plus(max, +(expandMult?.max ?? 0) * interval)

        if (typeof majorBreaks == 'function') majorBreaks = majorBreaks({ min, max })
        if (!Array.isArray(majorBreaks)) majorBreaks = []

        if (typeof labels === 'function') labels = majorBreaks.map(labels)
        if (!Array.isArray(labels)) {
            labels = []
        } else if (labels.length != majorBreaks.length) {
            throw new Error('Length of labels must be the same as breaks')
        }

        if (typeof titles === 'function') titles = majorBreaks.map(titles)
        if (!Array.isArray(titles)) {
            titles = []
        } else if (titles.length != majorBreaks.length) {
            throw new Error('Length of titles must be the same as breaks')
        }

        if (typeof minorBreaks == 'function') minorBreaks = minorBreaks({ min, max, minor: true })
        if (!Array.isArray(minorBreaks)) minorBreaks = []

        majorBreaks = majorBreaks.map((value, i) => ({ type: "major", value, label: labels[i], title: titles[i] }))
        minorBreaks = minorBreaks.map(x => ({ type: "minor", value: x }))

        let breaks = majorBreaks.concat(minorBreaks)

        if (breakSlot instanceof Function) {
            breaks = expandFragment(breakSlot({ breaks, majorBreaks, minorBreaks, min, max }))
                .filter(c => c.type.$_type == "axis-break")
                .map(c => ({ ...c.type.$_props, ...c.props }))
        }

        return breaks
    }
}
