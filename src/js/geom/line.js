// Metadata and coordinate system helpers for line geometry
import { vecutils } from '#base/js/utils'
let psum = vecutils.sum

export default {
    scale_attrs: ['color', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = ds.xnudge ?? 0,
            ynudge = ds.ynudge ?? 0,
            x = psum(levels.x?.apply?.(ds.x) ?? ds.x, xnudge),
            y = psum(levels.y?.apply?.(ds.y) ?? ds.y, ynudge),
            xend = psum(levels.x?.apply?.(ds.xend) ?? ds.xend, xnudge),
            yend = psum(levels.y?.apply?.(ds.yend) ?? ds.yend, ynudge)
        return { x, y, xend, yend }
    },
    get_range(ds, orientation) {
        if (orientation == 'x') return (ds.x ?? []).concat(ds.xend ?? [])
        if (orientation == 'y') return (ds.y ?? []).concat(ds.yend ?? [])
    },
    validate(d) {
        if (isNaN(d.x) || isNaN(d.y) || isNaN(d.xend) || isNaN(d.yend)) return null
        return d
    }
}
