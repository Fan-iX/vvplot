import { intraaction, is_categorical, numutils } from '#base/js/utils.js'

/**
 * col transformation
 *   { x, y } => { x, y, height }
 */
export default Object.assign(function (data, { position = "stack", width, height, orientation = "x" }) {
    let missingAes = ['x', 'y'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatCol": "${missingAes.join('", "')}"`)
    let isXdiscrete = data.x.some(is_categorical)
    let isYdiscrete = data.y.some(is_categorical)
    if (isXdiscrete && isYdiscrete)
        throw new Error(`Both "x" and "y" are discrete, "StatCol" requires at most one discrete aesthetic`)
    let cateAes = isXdiscrete == isYdiscrete ? (orientation != "y" ? "x" : "y") : (isXdiscrete ? 'x' : 'y')
    let valueAes = cateAes == 'x' ? 'y' : 'x'
    let keys = Object.keys(data).filter(k => k != valueAes && !k.startsWith('$'))
    let group = intraaction(Object.fromEntries(keys.map(k => [k, data[k]])))
    let inter = intraaction({ group: group ?? 0, cate: data[cateAes] })
    let groupIdx = Map.groupBy(inter.map((_, i) => i), (_, i) => inter.categories[inter[i]])
    let groups = Map.groupBy(data.$raw, (_, i) => inter.categories[inter[i]])
    let cates = Array.from(groups.keys()),
        $raw = Array.from(groupIdx.values()).map(arr => arr.map(idx => data.$raw[idx])),
        val = Array.from(groupIdx.values()).map(arr => numutils.sum(arr.map(idx => data[valueAes][idx])))
    let result = {
        $raw: $raw,
        $group: cates.map(x => x.group),
        [cateAes]: cates.map(v => v.value),
    }
    for (let key of keys) {
        result[key] = cates.map(x => x.group).map(i => group.categories[i][key])
    }
    if (cateAes == 'x') {
        if (isXdiscrete) {
            width ??= 0.9
        } else {
            width ??= numutils.min(numutils.diff(Array.from(new Set(data[cateAes])).sort((a, b) => a - b))) * 0.9
        }
        result.height = val
    } else {
        if (isYdiscrete) {
            height ??= 0.9
        } else {
            height ??= numutils.min(numutils.diff(Array.from(new Set(data[cateAes])).sort((a, b) => a - b))) * 0.9
        }
        result.width = val
    }
    if (position == "stack") {
        let cate_group = Object.groupBy(result.$group, (v, i) => group.categories[v][cateAes])
        let offset = cates.map(_ => 0)
        for (let cate in cate_group) {
            let s = 0
            for (let i of cate_group[cate]) {
                offset[i] = s
                s += val[i]
            }
        }
        if (cateAes == 'x') {
            result.y = result.height.map((v, i) => offset[i] + v / 2)
            result.width = cates.map(_ => width)
        } else {
            result.x = result.width.map((v, i) => offset[i] + v / 2)
            result.height = cates.map(_ => height)
        }
    } else if (position == "dodge") {
        let cate_group = Object.groupBy(result.$group, (v, i) => group.categories[v][cateAes])
        let $group = result.$group.map(v => cate_group[group.categories[v][cateAes]])
        if (cateAes == 'x') {
            result.y = result.height.map(v => v / 2)
            result.width = $group.map(arr => width / arr.length)
            result.xnudge = $group.map((arr, i) => (result.xnudge?.[i] ?? 0) + ((arr.indexOf(result.$group[i]) + 0.5) / arr.length - 0.5) * width)
        } else {
            result.x = result.width.map(v => v / 2)
            result.height = $group.map(arr => height / arr.length)
            result.ynudge = $group.map((arr, i) => (result.ynudge?.[i] ?? 0) + ((arr.indexOf(result.$group[i]) + 0.5) / arr.length - 0.5) * height)
        }
    } else {
        if (cateAes == 'x') {
            result.y = result.height.map(v => v / 2)
            result.width = cates.map(_ => width)
        } else {
            result.x = result.width.map(v => v / 2)
            result.height = cates.map(_ => height)
        }
    }
    return result
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
