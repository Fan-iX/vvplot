import * as d3 from 'd3'

function palette_scale_hue({
    h = [15, 375], c = 100, l = 65, h_start = 0,
    direction = 1,
    na_value = "#7f7f7f",
    title,
} = {}) {
    let fn = function (arr) {
        let extent = arr.extent[1] - arr.extent[0]
        return arr.map(v => {
            if (isNaN(v)) {
                return na_value
            } else {
                return d3.hcl(h[0] + h_start + (h[1] - h[0]) * (+v) / extent * direction, c, l).toString()
            }
        })
    }
    return Object.assign(fn, { title })
}

function palette_scale_manual({
    values,
    na_value = "#7f7f7f",
    title,
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
    return Object.assign(fn, { title })
}

function palette_scale_gradient({
    low = "#132B43",
    high = "#56B1F7",
    limits = [null, null],
    na_value = "#7f7f7f",
    title,
} = {}) {
    let fn = function (arr) {
        let extent = arr.extent
        let scale = d3.interpolateLab(low, high)
        return arr.map(v => {
            if (isNaN(v)) return na_value
            let scale_min = limits[0] ?? extent[0],
                scale_max = limits[1] ?? extent[1]
            if (scale_min === scale_max) return scale(0.5)
            if (v > scale_max) return high
            if (v < scale_min) return low
            return scale((v - scale_min) / (scale_max - scale_min))
        })
    }
    return Object.assign(fn, { title })
}

function palette_scale_gradient2({
    low = "#832424",
    mid = "white",
    high = "#3A3A98",
    midpoint = 0,
    limits = [null, null],
    na_value = "#7f7f7f",
    title,
} = {}) {
    let fn = function (arr) {
        let extent = arr.extent
        return arr.map(v => {
            if (isNaN(v)) return na_value
            let scale_min = limits[0] ?? extent[0],
                scale_max = limits[1] ?? extent[1],
                scale_mid = midpoint ?? (scale_min + scale_max) / 2
            if (v < scale_mid) {
                return d3.interpolateLab(low, mid)((v - scale_min) / (scale_mid - scale_min))
            } else {
                return d3.interpolateLab(mid, high)((v - scale_mid) / (scale_max - scale_mid))
            }
        })
    }
    return Object.assign(fn, { title })
}

function palette_scale_gradientn({
    colors = [],
    breaks,
    limits = [null, null],
    na_value = "#7f7f7f",
    title,
} = {}) {
    let fn = function (arr) {
        let extent = arr.extent
        return arr.map(v => {
            if (isNaN(v)) return na_value
            let scale_min = limits[0] ?? extent[0],
                scale_max = limits[1] ?? extent[1],
                anchors = breaks || Array(colors.length).fill(0).map((_, i) => scale_min + (scale_max - scale_min) * i / (colors.length - 1))
            return d3.scaleLinear(anchors, colors)(v)
        })
    }
    return Object.assign(fn, { title })
}

function palette_scale_auto({ title } = {}) {
    let color_hue = palette_scale_hue(),
        color_gradient = palette_scale_gradient()
    let fn = function (arr) {
        if (arr.level != null) {
            return color_hue(arr)
        } else {
            return color_gradient(arr)
        }
    }
    return Object.assign(fn, { title })
}

function palette_scale_dynamic({ discrete, continuous } = {}) {
    if (discrete == null) discrete = palette_scale_hue()
    if (continuous == null) continuous = palette_scale_gradient()
    let fn = function (arr) {
        if (arr.level != null) {
            return discrete(arr)
        } else {
            return continuous(arr)
        }
    }
    let title = discrete.title ?? continuous.title
    return Object.assign(fn, { title })
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

    default: palette_scale_auto,
}

function scale_identity({ title } = {}) {
    return Object.assign(function (arr) { return Array.from(arr) }, { title })
}
function scale_identity_asis({ title } = {}) {
    return Object.assign(function (arr) { return arr }, { asis: true, title })
}
function scale_identity_number({ title } = {}) {
    return Object.assign(function (arr) { return arr.map(v => +v) }, { title })
}
function scale_identity_string({ title } = {}) {
    return Object.assign(function (arr) { return arr.map(v => String(v ?? "")) }, { title })
}

function scale_disabled({ title } = {}) {
    return Object.assign(function () { return null }, { title })
}

function scale_manual({
    values,
    na_value = null,
    title
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
    return Object.assign(fn, { title })
}

function continuous_scale({
    limits = [null, null],
    range = [0, 1],
    na_value = null, null_value = null,
    title
} = {}) {
    let fn = function (arr) {
        let extent = arr.extent
        return arr.map(v => {
            if (v === null) return null_value
            if (isNaN(v)) return na_value
            let scale_min = limits[0] ?? extent[0],
                scale_max = limits[1] ?? extent[1]
            return (v - scale_min) / (scale_max - scale_min) * (range[1] - range[0]) + range[0]
        })
    }
    return Object.assign(fn, { title })
}

function shape_scale_discrete({ title } = {}) {
    let shapes = ["circle", "square", "triangle", "diamond", "plus"]
    let fn = function (arr) {
        return arr.map(v => shapes[+v])
    }
    return Object.assign(fn, { title })
}

function linetype_scale_discrete({ title } = {}) {
    let linetypes = ["solid", "22", "42", "44", "13", "1343", "73", "2262", "12223242",
        "F282", "F4448444", "224282F2", "F1"]
    let fn = function (arr) {
        return arr.map(v => linetypes[+v])
    }
    return Object.assign(fn, { title })
}

export default {
    color: palette_scales,
    stroke: palette_scales,
    fill: palette_scales,
    alpha: {
        continuous: continuous_scale,
        default: () => continuous_scale({ range: [0.1, 1] }),
    },
    size: {
        identity: scale_identity_number,
        continuous: continuous_scale,
        default: () => continuous_scale({ range: [1, 6] }),
    },
    linewidth: {
        identity: scale_identity_number,
        continuous: continuous_scale,
        manual: scale_manual,
        default: () => continuous_scale({ range: [1, 6] }),
    },
    linetype: {
        identity: scale_identity_string,
        discrete: linetype_scale_discrete,
        default: linetype_scale_discrete,
    },
    shape: {
        identity: scale_identity_string,
        shape: shape_scale_discrete,
        default: shape_scale_discrete,
    },
    transform: {
        manual: scale_manual,
        default: scale_identity_string,
    },
    custom(func, { title } = {}) {
        return Object.assign(function (arr) { return arr.map(func) }, { title })
    },
}
