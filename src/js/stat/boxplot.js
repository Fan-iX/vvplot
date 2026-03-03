import { numutils, intraaction } from '#base/js/utils'

/**
 * boxplot transformation
 *   { x, y } => { x, min, lwisker, Q1, median, Q3, uwisker, max, outliers }
 *   { x, y } => { y, min, lwisker, Q1, median, Q3, uwisker, max, outliers }
 */
export default Object.assign(function (data, { }) {
    let missingAes = ['x', 'y'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatBoxplot": "${missingAes.join('", "')}"`)
    let isXdiscrete = data.x.some(x => typeof x !== 'number')
    let isYdiscrete = data.y.some(y => typeof y !== 'number')
    if (isXdiscrete && isYdiscrete)
        throw new Error(`Both "x" and "y" are discrete, "StatBoxplot" requires one continuous and one discrete aesthetic`)
    if (!isXdiscrete && !isYdiscrete)
        throw new Error(`Both "x" and "y" are continuous, "StatBoxplot" requires one continuous and one discrete aesthetic`)
    let [valueAes, cateAes] = isXdiscrete ? ['y', 'x'] : ['x', 'y']
    let keys = Object.keys(data).filter(k => k != valueAes && !k.startsWith('$'))
    let group = intraaction(Object.fromEntries(keys.map(k => [k, data[k]])))
    let inter = intraaction({ group: group ?? 0, cate: data[cateAes] })
    let groupIdx = Map.groupBy(inter.map((_, i) => i), (_, i) => inter.categories[inter[i]])
    let cates = Array.from(groupIdx.keys()),
        $raw = Array.from(groupIdx.values()).map(arr => arr.map(idx => data.$raw[idx])),
        val = Array.from(groupIdx.values()).map(arr => arr.map(idx => data[valueAes][idx]))
    let min = val.map(v => numutils.min(v)),
        Q1 = val.map(v => numutils.quantile(v, 0.25)),
        median = val.map(v => numutils.quantile(v, 0.5)),
        Q3 = val.map(v => numutils.quantile(v, 0.75)),
        max = val.map(v => numutils.max(v)),
        IQR = val.map((_, i) => Q3[i] - Q1[i]),
        lwisker = val.map((_, i) => Math.max(min[i], Q1[i] - 1.5 * IQR[i])),
        uwisker = val.map((_, i) => Math.min(max[i], Q3[i] + 1.5 * IQR[i])),
        outliers = Array.from(groupIdx.values()).map((arr, i) => {
            let ids = arr.filter(idx => data[valueAes][idx] < lwisker[i] || data[valueAes][idx] > uwisker[i])
            return {
                [valueAes]: ids.map(idx => data[valueAes][idx]),
                $raw: ids.map(idx => data.$raw[idx])
            }
        })
    let result = {
        $raw: $raw,
        $group: cates.map(x => x.group),
        min, lwisker, Q1, median, Q3, uwisker, max, outliers
    }
    for (let key of keys) {
        result[key] = cates.map(x => x.group).map(i => group.categories[i][key])
    }
    return result
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
