import * as d3 from 'd3'
import { oob_censor, oob_squish_any, oob_squish_infinite } from './utils.js'

export const oob = {
    censor: oob_censor,
    squish(value, { min, max }) {
        if (!isFinite(value)) return value
        if (value < min) return min
        if (value > max) return max
        return value
    },
    squish_any: oob_squish_any,
    squish_infinite: oob_squish_infinite,
    discard(value, { min, max }) {
        if (value < min || value > max) return null
        return value
    },
}

function custom_scale(func, { title, ...etc } = {}) {
    return Object.assign(function (arr) { return arr.map(func) }, { title }, etc)
}

function manual_scale({
    values = {},
    na_value = null,
    title, ...etc
} = {}) {
    let fn
    if (Array.isArray(values)) {
        fn = function (arr) {
            return arr.map(v => values[+v] ?? na_value)
        }
    } else {
        fn = function (arr) {
            return arr.map(v => values[v] ?? na_value)
        }
    }
    return Object.assign(fn, { title }, etc)
}

function continuous_scale({
    limits, oob = oob_censor,
    range = [0, 1],
    na_value = null, null_value = null,
    title, ...etc
} = {}) {
    let fn = function (arr) {
        let scale_min = this?.limits?.min ?? this?.limits?.[0] ?? arr.extent?.[0],
            scale_max = this?.limits?.max ?? this?.limits?.[1] ?? arr.extent?.[1],
            scale_interval = scale_max - scale_min,
            range_min = range?.min ?? range[0], range_max = range?.max ?? range[1],
            range_interval = range_max - range_min
        return arr.map(v => {
            v = this.oob(v, { min: scale_min, max: scale_max })
            if (v === null) return null_value
            if (isNaN(v)) return na_value
            return range_min + (v - scale_min) / scale_interval * range_interval
        })
    }
    return Object.assign(fn, { title, limits, oob }, etc)
}

function palette_scale_hue({
    h = [15, 375], c = 100, l = 65, h_start = 0,
    direction = 1,
    limits, oob = oob_censor,
    na_value = "#7f7f7f", null_value = null,
    title, ...etc
} = {}) {
    let fn = function (arr) {
        let scale_min = this?.limits?.min ?? this?.limits?.[0] ?? arr.extent?.[0],
            scale_max = this?.limits?.max ?? this?.limits?.[1] ?? arr.extent?.[1],
            scale_interval = scale_max - scale_min,
            h_min = h?.min ?? h[0], h_max = h?.max ?? h[1],
            h_interval = h_max - h_min
        return arr.map(v => {
            v = this.oob(v, { min: scale_min, max: scale_max })
            if (v === null) return null_value
            if (isNaN(v)) return na_value
            return d3.hcl(h_start + h_min + h_interval * (v - scale_min) / scale_interval * direction, c, l).toString()
        })
    }
    return Object.assign(fn, { title, limits, oob }, etc)
}

function palette_scale_manual({
    values,
    na_value = "#7f7f7f",
    title, ...etc
} = {}) {
    return manual_scale({ values, na_value, title, ...etc })
}

function palette_scale_gradient({
    low = "#132B43",
    high = "#56B1F7",
    limits, oob = oob_censor,
    na_value = "#7f7f7f", null_value = null,
    title, ...etc
} = {}) {
    let fn = function (arr) {
        let scale_min = this?.limits?.min ?? this?.limits?.[0] ?? arr.extent?.[0],
            scale_max = this?.limits?.max ?? this?.limits?.[1] ?? arr.extent?.[1],
            scale = d3.interpolateLab(low, high)
        return arr.map(v => {
            v = this.oob(v, { min: scale_min, max: scale_max })
            if (v === null) return null_value
            if (isNaN(v)) return na_value
            if (scale_min === scale_max) return scale(0.5)
            if (v > scale_max) return high
            if (v < scale_min) return low
            return scale((v - scale_min) / (scale_max - scale_min))
        })
    }
    return Object.assign(fn, { title, limits, oob }, etc)
}

function palette_scale_gradient2({
    low = "#832424",
    mid = "white",
    high = "#3A3A98",
    midpoint = 0,
    limits, oob = oob_censor,
    na_value = "#7f7f7f", null_value = null,
    title, ...etc
} = {}) {
    let fn = function (arr) {
        let scale_min = this?.limits?.min ?? this?.limits?.[0] ?? arr.extent?.[0],
            scale_max = this?.limits?.max ?? this?.limits?.[1] ?? arr.extent?.[1],
            scale_mid = midpoint ?? (scale_min + scale_max) / 2,
            scale_low = d3.interpolateLab(low, mid),
            scale_high = d3.interpolateLab(mid, high)
        return arr.map(v => {
            v = this.oob(v, { min: scale_min, max: scale_max })
            if (v === null) return null_value
            if (isNaN(v)) return na_value
            if (v < scale_mid) {
                return scale_low((v - scale_min) / (scale_mid - scale_min))
            } else {
                return scale_high((v - scale_mid) / (scale_max - scale_mid))
            }
        })
    }
    return Object.assign(fn, { title, limits, oob }, etc)
}

function palette_scale_gradientn({
    colors = [],
    values, anchors,
    limits, oob = oob_censor,
    na_value = "#7f7f7f", null_value = null,
    title, ...etc
} = {}) {
    let fn = function (arr) {
        let scale_min = this?.limits?.min ?? this?.limits?.[0] ?? arr.extent?.[0],
            scale_max = this?.limits?.max ?? this?.limits?.[1] ?? arr.extent?.[1]
        let domain = anchors
        if (domain == null && values != null)
            domain = values.map(v => scale_min + (scale_max - scale_min) * v)
        if (domain == null)
            domain = Array(colors.length).fill(0).map((_, i) => scale_min + (scale_max - scale_min) * i / (colors.length - 1))
        let scale = d3.scaleLinear(domain, colors)
        return arr.map(v => {
            v = this.oob(v, { min: scale_min, max: scale_max })
            if (v === null) return null_value
            if (isNaN(v)) return na_value
            return scale(v)
        })
    }
    return Object.assign(fn, { title, limits, oob }, etc)
}

function palette_scale_auto({
    limits, oob = oob_censor,
    title, ...etc
} = {}) {
    let scale_hue = palette_scale_hue(),
        scale_gradient = palette_scale_gradient()
    let fn = function (arr) {
        if (arr.level != null) {
            return scale_hue.call(this, arr)
        } else {
            return scale_gradient.call(this, arr)
        }
    }
    return Object.assign(fn, { title, limits, oob }, etc)
}

function palette_scale_dynamic({
    discrete, continuous,
    limits, oob = oob_censor,
    title, ...etc
} = {}) {
    if (discrete == null) discrete = palette_scale_hue()
    if (continuous == null) continuous = palette_scale_gradient()
    let fn = function (arr) {
        if (arr.level != null) {
            return discrete.call(this, arr)
        } else {
            return continuous.call(this, arr)
        }
    }
    return Object.assign(fn, { title, limits, oob }, etc)
}

const palette_scales = {
    identity: scale_identity_string,

    discrete: palette_scale_hue,
    hue: palette_scale_hue,
    manual: palette_scale_manual,

    continuous: palette_scale_gradient,
    gradient: palette_scale_gradient,
    gradient2: palette_scale_gradient2,
    gradientn: palette_scale_gradientn,

    dynamic: palette_scale_dynamic,
    auto: palette_scale_auto,
    custom: custom_scale,

    default: palette_scale_auto,
}

function scale_identity({ title, ...etc } = {}) {
    return Object.assign(function (arr) { return Array.from(arr) }, { title }, etc)
}
function scale_identity_asis({ title, ...etc } = {}) {
    return Object.assign(function (arr) { return arr }, { asis: true, title }, etc)
}
function scale_identity_number({ title, ...etc } = {}) {
    return Object.assign(function (arr) { return arr.map(v => +v) }, { title }, etc)
}
function scale_identity_string({ title, ...etc } = {}) {
    return Object.assign(function (arr) { return arr.map(v => String(v ?? "")) }, { title }, etc)
}

function scale_disabled({ title, ...etc } = {}) {
    return Object.assign(function () { return null }, { title }, etc)
}

function shape_scale_discrete({ title, ...etc } = {}) {
    let shapes = ["circle", "square", "triangle", "diamond", "plus"]
    let fn = function (arr) {
        return arr.map(v => shapes[+v])
    }
    return Object.assign(fn, { title }, etc)
}

function linetype_scale_discrete({ title, ...etc } = {}) {
    let linetypes = ["solid", "22", "42", "44", "13", "1343", "73", "2262", "12223242",
        "F282", "F4448444", "224282F2", "F1"]
    let fn = function (arr) {
        return arr.map(v => linetypes[+v])
    }
    return Object.assign(fn, { title }, etc)
}

export default {
    color: palette_scales,
    stroke: palette_scales,
    fill: palette_scales,
    alpha: {
        continuous: continuous_scale,
        custom: custom_scale,
        default: ({ title, ...etc } = {}) => continuous_scale({ range: [0.1, 1], title, ...etc }),
    },
    size: {
        identity: scale_identity_number,
        continuous: continuous_scale,
        custom: custom_scale,
        default: ({ title, ...etc } = {}) => continuous_scale({ range: [1, 6], title, ...etc }),
    },
    linewidth: {
        identity: scale_identity_number,
        continuous: continuous_scale,
        manual: manual_scale,
        custom: custom_scale,
        default: ({ title, ...etc } = {}) => continuous_scale({ range: [1, 6], title, ...etc }),
    },
    linetype: {
        identity: scale_identity_string,
        discrete: linetype_scale_discrete,
        default: linetype_scale_discrete,
        custom: custom_scale,
    },
    shape: {
        identity: scale_identity_string,
        discrete: shape_scale_discrete,
        default: shape_scale_discrete,
        custom: custom_scale,
    },
}
