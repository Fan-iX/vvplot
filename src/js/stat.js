import { numutils, interaction, intraaction } from './utils'
/**
 * stat functions
 * input: data object with arrays of aesthetics
 * output: data object with arrays of aesthetics
 * aesthetics can be added/removed/modified
 */
export default {
    line: Object.assign(function (data, { orientation = 'x' } = {}) {
        let missingAes = ['x', 'y'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomLine: ${missingAes}`)
        let group = data.group ?? new Array(data.x.length).fill(null)
        let groups = Object.values(group.reduce((acc, cur, i) => {
            if (acc[cur] == undefined) acc[cur] = []
            acc[cur].push(i)
            return acc
        }, {}))
        let orders = groups.map(group =>
            group.map((idx, i) => [data[orientation][idx], i]).sort((a, b) => a[0] - b[0]).map((d, i) => group[d[1]])
        )
        let order1 = orders.map(a => a.slice(0, -1).concat(NaN)).reduce((acc, cur) => acc.concat(cur), []).filter(x => !isNaN(x))
        let order2 = orders.map(a => a.slice(1).concat(NaN)).reduce((acc, cur) => acc.concat(cur), []).filter(x => !isNaN(x))
        let result = {}
        for (let aes in data) {
            result[aes] = order1.map(i => data[aes][i])
        }
        result.xend = order2.map(i => data.x[i])
        result.yend = order2.map(i => data.y[i])
        return result
    }, { coord_attrs: ['x', 'y', 'xnudge', 'ynudge'] }),
    linerange: Object.assign(function (data) {
        if (data.x != null) {
            let missingAes = ['x', 'ymin', 'ymax'].filter(a => data[a] == null)
            if (missingAes.length > 0)
                throw new Error(`Missing aesthetics for GeomLinerange: ${missingAes}`)
            return (({ x, ymin, ymax, ...etc }) => ({ x, xend: x, y: ymin, yend: ymax, ...etc }))(data)
        } else if (data.y != null) {
            let missingAes = ['y', 'xmin', 'xmax'].filter(a => data[a] == null)
            if (missingAes.length > 0)
                throw new Error(`Missing aesthetics for GeomLinerange: ${missingAes}`)
            return (({ y, xmin, xmax, ...etc }) => ({ y, yend: y, x: xmin, xend: xmax, ...etc }))(data)
        } else {
            throw new Error(`Missing aesthetics for GeomLinerange: x,ymin,ymax or y,xmin,xmax`)
        }
    }, { coord_attrs: ['x', 'y', 'xmin', 'xmax', 'ymin', 'ymax', 'xnudge', 'ynudge'] }),
    path: Object.assign(function (data) {
        let missingAes = ['x', 'y'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomPath: ${missingAes}`)
        let group = data.group ?? new Array(data.x.length).fill(null)
        let groups = Object.values(group.reduce((acc, cur, i) => {
            if (acc[cur] == undefined) acc[cur] = []
            acc[cur].push(i)
            return acc
        }, {}))
        let orders = groups.map(group => group.map((idx, i) => group[i]))
        let order1 = orders.map(a => a.slice(0, -1).concat(NaN)).reduce((acc, cur) => acc.concat(cur), []).filter(x => !isNaN(x))
        let order2 = orders.map(a => a.slice(1).concat(NaN)).reduce((acc, cur) => acc.concat(cur), []).filter(x => !isNaN(x))
        let result = {}
        for (let aes in data) {
            result[aes] = order1.map(i => data[aes][i])
        }
        result.xend = order2.map(i => data.x[i])
        result.yend = order2.map(i => data.y[i])
        return result
    }, { coord_attrs: ['x', 'y', 'xnudge', 'ynudge'] }),
    segment: Object.assign(function (data) {
        if (data.xend == null) data.xend = data.x
        if (data.yend == null) data.yend = data.y
        let missingAes = ['x', 'y', 'xend', 'yend'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomLine: ${missingAes}`)
        return data
    }, { coord_attrs: ['x', 'y', 'xend', 'yend', 'xnudge', 'ynudge'] }),
    stick: Object.assign(function (data) {
        if (data.dx == null) data.dx = Array(data.x.length).fill(0)
        if (data.dy == null) data.dy = Array(data.y.length).fill(0)
        let missingAes = ['x', 'y', 'dx', 'dy'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomStick: ${missingAes}`)
        return data
    }, { coord_attrs: ['x', 'y', 'dx', 'dy', 'xnudge', 'ynudge'] }),
    point: Object.assign(function (data) {
        let missingAes = ['x', 'y'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomPoint: ${missingAes}`)
        return data
    }, { coord_attrs: ['x', 'y', 'xnudge', 'ynudge'] }),
    polygon: Object.assign(function (data) {
        let missingAes = ['points'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomPolygon: ${missingAes}`)
        return data
    }, { coord_attrs: ['points', 'xnudge', 'ynudge'] }),
    rect: Object.assign(function (data) {
        let missingAes = ['xmin', 'xmax', 'ymin', 'ymax'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomRect: ${missingAes}`)
        return data
    }, { coord_attrs: ['xmin', 'xmax', 'ymin', 'ymax', 'xnudge', 'ynudge'] }),
    tile: Object.assign(function (data) {
        if (data.width == null && data.x.some(x => typeof x === 'string')) {
            data.width = Array(data.x.length).fill(1)
        }
        if (data.height == null && data.y.some(y => typeof y === 'string')) {
            data.height = Array(data.y.length).fill(1)
        }
        let missingAes = ['x', 'y', 'width', 'height'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomTile: ${missingAes}`)
        return data
    }, { coord_attrs: ['x', 'y', 'width', 'height', 'xnudge', 'ynudge'] }),
    text: Object.assign(function (data) {
        let missingAes = ['x', 'y', 'label'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomText: ${missingAes}`)
        return data
    }, { coord_attrs: ['x', 'y', 'xnudge', 'ynudge'] }),
    textsegment: Object.assign(function (data) {
        if (data.xend == null) data.xend = data.x
        if (data.yend == null) data.yend = data.y
        let missingAes = ['x', 'y', 'xend', 'yend', 'label'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for GeomTextsegment: ${missingAes}`)
        return data
    }, { coord_attrs: ['x', 'y', 'xend', 'yend', 'xnudge', 'ynudge'] }),
    histogram: Object.assign(function (data, { bins = 30, binwidth, breaks } = {}) {
        if (data.x != null && data.y != null)
            throw new Error(`Histogram only supports x or y, not both`)
        let values = data.x ?? data.y
        if (values == null)
            throw new Error(`Missing aesthetics for GeomHistogram: x or y`)
        if (values.some(x => typeof x !== 'number'))
            throw new Error(`"stat.histogram" requires a continuous aesthetic`)
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
        let inter = intraaction({
            group: group ?? 0,
            upper: values.map(v => breaks.findLast(b => b <= v) ?? breaks[0]),
            lower: values.map(v => breaks.find(b => b > v) ?? breaks[bins])
        })
        let groups = Map.groupBy(data.$raw, (_, i) => inter.categories[inter[i]])
        let $raw = Array.from(groups.values()), cates = Array.from(groups.keys())
        let result = {
            $raw: $raw,
            count: $raw.map(x => x.length),
            $group: cates.map(x => x.group),
            upper: cates.map(x => x.upper),
            lower: cates.map(x => x.lower),
        }
        for (let key of keys) {
            result[key] = cates.map(x => x.group).map(i => group.categories[i][key])
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
    }, { coord_attrs: ['x', 'y', 'xnudge', 'ynudge'] }),
    bar: Object.assign(function (data) {
        if (data.x != null && data.y != null)
            throw new Error(`Bar only supports x or y, not both`)
        let values = data.x ?? data.y
        if (values == null)
            throw new Error(`Missing aesthetics for GeomBar: x or y`)
        if (values.some(x => typeof x === 'number'))
            throw new Error(`"stat.bar" requires a discrete aesthetic`)
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
    }, { coord_attrs: ['x', 'y', 'xnudge', 'ynudge'] }),
}
