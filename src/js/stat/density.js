import { numutils, intraaction } from '#base/js/utils'

/**
 * density transformation
 *   { x } => { points }
 *   { y } => { points }
 */
export default Object.assign(function (data, { n = 512, kernel = 'gaussian' } = {}) {
    if (data.x != null && data.y != null)
        throw new Error(`"StatDensity" only supports "x" or "y", not both`)
    let values = data.x ?? data.y
    if (values == null)
        throw new Error(`Missing aesthetics for "StatDensity": "x" or "y"`)
    if (values.some(x => typeof x !== 'number'))
        throw new Error(`"StatDensity" requires a continuous aesthetic`)
    kernel = density_kernels[kernel]
    if (!kernel) {
        throw new Error(`kernel must be one of ${Object.keys(density_kernels).map(k => `"${k}"`).join(', ')}`)
    }
    let keys = Object.keys(data).filter(k => !['x', 'y'].includes(k) && !k.startsWith('$'))
    let group = intraaction(Object.fromEntries(keys.map(k => [k, data[k]])))
    let cut = intraaction({
        group: group ?? new Array(values.length).fill(0),
    }).map((v, _, a) => a.categories[v])
    let map = Map.groupBy(data.$raw, (_, i) => cut[i])
    let $raw = Array.from(map.values()), cates = Array.from(map.keys())
    let vs = Array.from(Map.groupBy(values, (_, i) => cut[i]).values())
    let result = {
        $raw: $raw,
        $group: cates.map(x => x.group),
    }
    let density = vs.map(v => {
        let bandwidth = bw.nrd0(v)
        let { min, max } = numutils.extent(v)
        min -= 3 * bandwidth
        max += 3 * bandwidth
        let step = (max - min) / (n - 1)
        let breaks = Array.from({ length: n }, (_, i) => min + i * step)
        return breaks.map(t => [t, numutils.mean(v.map(d => kernel((t - d) / bandwidth))) / bandwidth])
    })
    for (let key of keys) {
        result[key] = cates.map(x => group.categories[x.group][key])
    }
    if (data.x) {
        result.points = density.map(v => v.map(([x, y]) => ({ x, y })))
    } else {
        result.points = density.map(v => v.map(([y, x]) => ({ x, y })))
    }
    return result
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })

const bw = {
    nrd0: function (x) {
        x = x.filter(v => (typeof v === 'number' || v instanceof Date) && isFinite(v))
        let sd = numutils.sd(x)
        let iqr = numutils.quantile(x, 0.75) - numutils.quantile(x, 0.25)
        let v = Math.min(sd, iqr / 1.34) || 1
        return 0.9 * v * x.length ** -0.2
    },
    nrd: function (x) {
        x = x.filter(v => (typeof v === 'number' || v instanceof Date) && isFinite(v))
        let sd = numutils.sd(x)
        let iqr = numutils.quantile(x, 0.75) - numutils.quantile(x, 0.25)
        let v = Math.min(sd, iqr / 1.34) || 1
        return 1.06 * v * x.length ** -0.2
    }
}

const density_kernels = {
    uniform: x => Math.abs(x) <= 1 ? 0.5 : 0,
    triangular: x => Math.abs(x) <= 1 ? 1 - Math.abs(x) : 0,
    epanechnikov: x => Math.abs(x) <= 1 ? 0.75 * (1 - x ** 2) : 0,
    biweight: x => Math.abs(x) <= 1 ? (15 / 16) * (1 - x ** 2) ** 2 : 0,
    triweight: x => Math.abs(x) <= 1 ? (35 / 32) * (1 - x ** 2) ** 3 : 0,
    tricube: x => Math.abs(x) <= 1 ? (70 / 81) * (1 - Math.abs(x) ** 3) ** 3 : 0,
    gaussian: x => Math.exp(-0.5 * x ** 2) / Math.sqrt(2 * Math.PI),
    cosine: x => Math.abs(x) <= 1 ? (Math.PI / 4) * Math.cos((Math.PI / 2) * x) : 0,
    logistic: x => 1 / (Math.cosh(x) ** 2) / Math.PI,
    sigmoid: x => 2 / ((Math.exp(x) + Math.exp(-x)) ** 2) / Math.PI
}
