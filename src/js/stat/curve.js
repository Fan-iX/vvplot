import { intraaction, intrazip } from '#base/js/utils'

/**
 * curve transformation
 *   { x, y } => { points }
 *   { points } => { points }
 */
export default Object.assign(function (data) {
    if (data.points != null) return data
    let missingAes = ['x', 'y'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatCurve": "${missingAes.join('", "')}" or "points"`)
    let keys = Object.keys(data).filter(k => !['x', 'y'].includes(k) && !k.startsWith('$'))
    let group = intraaction(Object.fromEntries(keys.map(k => [k, data[k]])))
    let cut = intraaction({
        group: group ?? new Array(data.x.length).fill(0),
    }).map((v, _, a) => a.categories[v])
    let map = Map.groupBy(data.$raw, (_, i) => cut[i])
    let $raw = Array.from(map.values()), cates = Array.from(map.keys())
    let points = Array.from(Map.groupBy(intrazip({ x: data.x, y: data.y }), (_, i) => cut[i]).values())
    let result = {
        $raw: $raw,
        points,
    }
    for (let key of keys) {
        result[key] = cates.map(x => x.group).map(i => group.categories[i][key])
    }
    return result
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
