import { intraaction } from '#base/js/utils.js'

/**
 * bar transformation
 *   { x } => { x, y, height }
 *   { y } => { x, y, width }
 */
export default Object.assign(function (data, { position = "stack", width = 0.9, height = 0.9 }) {
    if (data.x != null && data.y != null)
        throw new Error(`"StatBar" only supports "x" or "y", not both`)
    let cateAes = data.x ? 'x' : 'y'
    let values = data[cateAes]
    if (values == null)
        throw new Error(`Missing aesthetics for "StatBar": "x" or "y"`)
    if (values.some(x => typeof x === 'number'))
        throw new Error(`"StatBar" requires a discrete aesthetic`)
    let keys = Object.keys(data).filter(k => !k.startsWith('$'))
    let group = intraaction(Object.fromEntries(keys.map(k => [k, data[k]])))
    let inter = intraaction({ group: group ?? 0, value: values })
    let groups = Map.groupBy(data.$raw, (_, i) => inter.categories[inter[i]])
    let $raw = Array.from(groups.values()), cates = Array.from(groups.keys())
    let result = {
        $raw: $raw,
        $group: cates.map(x => x.group),
    }
    for (let key of keys) {
        result[key] = cates.map(x => x.group).map(i => group.categories[i][key])
    }
    if (cateAes == 'x') {
        result.x = cates.map(v => v.value)
        result.height = $raw.map(v => v.length)
    } else {
        result.y = cates.map(v => v.value)
        result.width = $raw.map(v => v.length)
    }
    if (position == "stack") {
        let cate_group = Object.groupBy(result.$group, (v, i) => group.categories[v][cateAes])
        let offset = cates.map(_ => 0)
        for (let cate in cate_group) {
            let s = 0
            for (let i of cate_group[cate]) {
                offset[i] = s
                s += $raw[i].length
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
