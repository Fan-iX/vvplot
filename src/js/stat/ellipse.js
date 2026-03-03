import { intraaction, intrazip } from '#base/js/utils'

/**
 * ellipse transformation
 *   { x, y } => { cx, cy, A, B, C }
 */
export default Object.assign(function (data, { CI = 0.95 } = {}) {
    let missingAes = ['x', 'y'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatEllipse": "${missingAes.join('", "')}" or "points"`)
    let keys = Object.keys(data).filter(k => !['x', 'y'].includes(k) && !k.startsWith('$'))
    let group = intraaction(Object.fromEntries(keys.map(k => [k, data[k]])))
    let cut = intraaction({
        group: group ?? new Array(data.x.length).fill(0),
    }).map((v, _, a) => a.categories[v])
    let map = Map.groupBy(data.$raw, (_, i) => cut[i])
    let $raw = Array.from(map.values()), cates = Array.from(map.keys())
    let chi2 = -2 * Math.log(1 - CI)
    let ellipses = Array.from(Map.groupBy(intrazip({ x: data.x, y: data.y }), (_, i) => cut[i]).values()).map(points => {
        const n = points.length
        let cx = points.reduce((sum, p) => sum + p.x, 0) / n,
            cy = points.reduce((sum, p) => sum + p.y, 0) / n
        if (n < 2) return {}
        let covXX = points.reduce((sum, p) => sum + (p.x - cx) ** 2, 0) / (n - 1),
            covXY = points.reduce((sum, p) => sum + (p.x - cx) * (p.y - cy), 0) / (n - 1),
            covYY = points.reduce((sum, p) => sum + (p.y - cy) ** 2, 0) / (n - 1),
            k = (covXX * covYY - covXY * covXY) * chi2
        return { cx, cy, A: covYY / k, B: -covXY / k, C: covXX / k }
    })
    let result = {
        $raw,
        cx: ellipses.map(e => e.cx ?? 0),
        cy: ellipses.map(e => e.cy ?? 0),
        A: ellipses.map(e => e.A ?? 0),
        B: ellipses.map(e => e.B ?? 0),
        C: ellipses.map(e => e.C ?? 0),
    }
    for (let key of keys) {
        result[key] = cates.map(x => x.group).map(i => group.categories[i][key])
    }
    return result
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
