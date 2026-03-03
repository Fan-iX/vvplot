import { numutils, intraaction } from '#base/js/utils'

/**
 * histogram transformation
 *   { x } => { xmin, xmax, ymin, ymax }
 *   { y } => { ymin, ymax, xmin, xmax }
 */
export default Object.assign(function (data, { bins = 30, binwidth, breaks } = {}) {
    if (data.x != null && data.y != null)
        throw new Error(`"StatHistogram" only supports "x" or "y", not both`)
    let values = data.x ?? data.y
    if (values == null)
        throw new Error(`Missing aesthetics for "StatHistogram": "x" or "y"`)
    if (values.some(x => typeof x !== 'number'))
        throw new Error(`"StatHistogram" requires a continuous aesthetic`)
    if (breaks) {
        breaks.sort((a, b) => a - b)
    } else {
        let { min, max } = numutils.extent(values)
        if (!binwidth) binwidth = (max - min) / (bins - 1)
        breaks = Array.from({ length: bins + 1 }, (_, i) => min + (i - 0.5) * binwidth)
    }
    bins = breaks.length - 1
    let keys = Object.keys(data).filter(k => !['x', 'y'].includes(k) && !k.startsWith('$'))
    let group = intraaction(Object.fromEntries(keys.map(k => [k, data[k]])))
    let cut = intraaction({
        group: group ?? new Array(values.length).fill(0),
        upper: values.map(v => breaks.findLast(b => b <= v) ?? breaks[0]),
        lower: values.map(v => breaks.find(b => b > v) ?? breaks[bins])
    }).map((v, _, a) => a.categories[v])
    let map = Map.groupBy(data.$raw, (_, i) => cut[i])
    let $raw = Array.from(map.values()), cates = Array.from(map.keys())
    let result = {
        $raw: $raw,
        count: $raw.map(x => x.length),
        $group: cates.map(x => x.group),
        upper: cates.map(x => x.upper),
        lower: cates.map(x => x.lower),
    }
    for (let key of keys) {
        result[key] = cates.map(x => group.categories[x.group][key])
    }
    if (data.x) {
        return (({
            upper: xmin, lower: xmax,
            count: ymax, ymin = $raw.map(() => 0), ...etc
        }) => ({ xmin, xmax, ymin, ymax, ...etc }))(result)
    } else {
        return (({
            upper: ymin, lower: ymax,
            count: xmax, xmin = $raw.map(() => 0), ...etc
        }) => ({ xmin, xmax, ymin, ymax, ...etc }))(result)
    }
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
