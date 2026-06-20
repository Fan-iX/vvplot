import { numutils, intraaction, is_categorical } from '#base/js/utils'

/**
 * violin transformation
 *   { x, y } => { x, y, points }
 */
export default Object.assign(function (data, {
    n = 512, kernel = 'gaussian', scale = 'width',
    position = "dodge", width = 0.9, height = 0.9
} = {}) {
    let missingAes = ['x', 'y'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatViolin": "${missingAes.join('", "')}"`)
    let isXdiscrete = data.x.some(is_categorical)
    let isYdiscrete = data.y.some(is_categorical)
    if (isXdiscrete && isYdiscrete)
        throw new Error(`Both "x" and "y" are discrete, "StatViolin" requires one continuous and one discrete aesthetic`)
    if (!isXdiscrete && !isYdiscrete)
        throw new Error(`Both "x" and "y" are continuous, "StatViolin" requires one continuous and one discrete aesthetic`)
    kernel = density_kernels[kernel]
    if (!kernel) {
        throw new Error(`kernel must be one of ${Object.keys(density_kernels).map(k => `"${k}"`).join(', ')}`)
    }
    let [valueAes, cateAes, size] = isXdiscrete ? ['y', 'x', width] : ['x', 'y', height]
    let values = data[valueAes]
    let keys = Object.keys(data).filter(k => k != valueAes && !k.startsWith('$'))
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
        [valueAes]: cates.map(v => 0)
    }
    let density = vs.map(v => {
        let bandwidth = bw.nrd0(v)
        let { min, max } = numutils.extent(v)
        min -= 3 * bandwidth
        max += 3 * bandwidth
        let step = (max - min) / (n - 1)
        let breaks = Array.from({ length: n }, (_, i) => min + i * step)
        let res = breaks.map(t => numutils.mean(v.map(d => kernel((t - d) / bandwidth))) / bandwidth)
        let ratio = scale == "area" ? 1 : 1 / numutils.max(res)
        return breaks.map((t, i) => [t, res[i] * ratio / 2])
    })
    for (let key of keys) {
        result[key] = cates.map(x => group.categories[x.group][key])
    }
    if (position == "dodge") {
        let cate_group = Object.groupBy(result.$group, (v, i) => group.categories[v][cateAes])
        let $group = result.$group.map(v => cate_group[group.categories[v][cateAes]])
        density = $group.map((arr, i) => density[i].map(([x, y]) => [x, y * size / arr.length]))
        if (isXdiscrete) {
            result.xnudge = $group.map((arr, i) => (result.xnudge?.[i] ?? 0) + ((arr.indexOf(result.$group[i]) + 0.5) / arr.length - 0.5) * width)
        } else {
            result.ynudge = $group.map((arr, i) => (result.ynudge?.[i] ?? 0) + ((arr.indexOf(result.$group[i]) + 0.5) / arr.length - 0.5) * height)
        }
    } else {
        density = density.map(v => v.map(([x, y]) => [x, y * size]))
    }
    if (isXdiscrete) {
        result.points = density.map(v => v.map(([y, x]) => ({ x, y })).concat(v.map(([y, x]) => ({ x: -x, y })).reverse()))
    } else {
        result.points = density.map(v => v.map(([x, y]) => ({ x, y })).concat(v.map(([x, y]) => ({ x, y: -y })).reverse()))
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
