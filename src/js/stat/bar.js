import { intraaction } from '#base/js/utils'

/**
 * bar transformation
 *   { x } => { x, y, height }
 *   { y } => { x, y, width }
 */
export default Object.assign(function (data) {
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
        count: $raw.map(x => x.length),
        $group: cates.map(x => x.group),
        value: cates.map(x => x.value),
    }
    for (let key of keys) {
        result[key] = cates.map(x => x.group).map(i => group.categories[i][key])
    }
    if (data.x) {
        return (({ value, count, ...etc }) => ({ x: value, y: count.map(x => x / 2), height: count, ...etc }))(result)
    } else {
        return (({ value, count, ...etc }) => ({ y: value, x: count.map(x => x / 2), width: count, ...etc }))(result)
    }
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
