// Metadata and coordinate system helpers for curve geometry
import { is_continuous } from '#base/js/utils.js'

export default {
    scale_attrs: ['fill', 'color', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let x = levels.x?.apply?.(ds.x) ?? ds.x,
            y = levels.y?.apply?.(ds.y) ?? ds.y,
            xnudge = ds.xnudge?.map(v => +v),
            ynudge = ds.ynudge?.map(v => +v),
            points = ds.points.map((points, i) => points.map(p => ({
                x: +(levels?.x?.[p.x] ?? p.x) + (xnudge?.[i] ?? 0) + x[i],
                y: +(levels?.y?.[p.y] ?? p.y) + (ynudge?.[i] ?? 0) + y[i]
            })))
        return { points }
    },
    get_values(ds, orientation) {
        if (orientation == 'x') return ds.x
        if (orientation == 'y') return ds.y
    },
    get_range(ds, orientation) {
        if (orientation == 'x') return (ds.points ?? []).flatMap((ps, i) => ps.map(p => p.x + ds.x[i]))
        if (orientation == 'y') return (ds.points ?? []).flatMap((ps, i) => ps.map(p => p.y + ds.y[i]))
    },
    validate(d) {
        if (!Array.isArray(d.points)) return null
        return d
    }
}
