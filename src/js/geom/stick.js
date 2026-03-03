// Metadata and coordinate system helpers for stick geometry
import { vecutils } from '#base/js/utils'
let psum = vecutils.sum

export default {
    scale_attrs: ['color', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = ds.xnudge ?? 0,
            ynudge = ds.ynudge ?? 0,
            x = psum(levels.x?.apply?.(ds.x) ?? ds.x, xnudge),
            y = psum(levels.y?.apply?.(ds.y) ?? ds.y, ynudge),
            xend = psum(x, ds.dx),
            yend = psum(y, ds.dy)
        return { x, y, xend, yend }
    },
    get_values(ds, orientation) {
        if (orientation == 'x') return ds.x ?? []
        if (orientation == 'y') return ds.y ?? []
    },
    get_range(ds, orientation) {
        if (orientation == 'x') return (ds.x ?? []).concat(psum(ds.x ?? [], ds.dx ?? 0) ?? [])
        if (orientation == 'y') return (ds.y ?? []).concat(psum(ds.y ?? [], ds.dy ?? 0) ?? [])
    },
    validate(d) {
        if (isNaN(d.x) || isNaN(d.y) || isNaN(d.xend) || isNaN(d.yend)) return null
        return d
    }
}
