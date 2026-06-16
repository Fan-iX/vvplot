import { intraaction } from '#base/js/utils'

/**
 * bar transformation
 *   { x } => { x, y, height }
 *   { y } => { x, y, width }
 */
export default Object.assign(function (data, { position = "stack", width = 1, height = 1 }) {
    if (data.x != null && data.y != null)
        throw new Error(`"StatBar" only supports "x" or "y", not both`)
    let values = data.x ?? data.y
    if (values == null)
        throw new Error(`Missing aesthetics for "StatBar": "x" or "y"`)
    if (values.some(x => typeof x === 'number'))
        throw new Error(`"StatBar" requires a discrete aesthetic`)
    let keys = Object.keys(data).filter(k => !['x', 'y'].includes(k) && !k.startsWith('$'))
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
    if (data.x) {
        result.x = cates.map(v => v.value)
        result.height = $raw.map(v => v.length)
    } else {
        result.y = cates.map(v => v.value)
        result.width = $raw.map(v => v.length)
    }
    if (position == "dodge") {
        if (data.x) {
            result.y = result.height.map(v => v / 2)
            result.width = cates.map((_, i) => width / group.categories.length)
            result.xnudge = result.$group.map((v, i) => (result.xnudge?.[i] ?? 0) + ((v + 0.5) / group.categories.length - 0.5) * width)
        } else {
            result.x = result.width.map(v => v / 2)
            result.height = cates.map((_, i) => height / group.categories.length)
            result.ynudge = result.$group.map((v, i) => (result.ynudge?.[i] ?? 0) + ((v + 0.5) / group.categories.length - 0.5) * height)
        }
    } else {
        let tmp = Object.fromEntries(Array.from(new Set(values)).map(v => [v, 0]))
        let offset = cates.map(_ => 0)
        let indices = cates.map((cate, i) => [cate, i]).sort(([{ group: a }], [{ group: b }]) => a - b)
        for (let [cate, i] of indices) {
            offset[i] = tmp[cate.value]
            tmp[cate.value] += $raw[i].length
        }
        if (data.x) {
            result.y = result.height.map((v, i) => offset[i] + v / 2)
            result.width = cates.map(_ => width)
        } else {
            result.x = result.width.map((v, i) => offset[i] + v / 2)
            result.height = cates.map(_ => height)
        }
    }
    return result
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
