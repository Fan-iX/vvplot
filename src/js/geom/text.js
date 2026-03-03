// Metadata and coordinate system helpers for text geometry
import { vecutils } from '#base/js/utils'
let psum = vecutils.sum

export default {
    scale_attrs: ['size', 'color', 'stroke', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = ds.xnudge ?? 0,
            ynudge = ds.ynudge ?? 0,
            x = psum(levels.x?.apply?.(ds.x) ?? ds.x, xnudge),
            y = psum(levels.y?.apply?.(ds.y) ?? ds.y, ynudge)
        return { x, y }
    },
    get_range(ds, orientation) {
        if (orientation == 'x') return ds.x ?? []
        if (orientation == 'y') return ds.y ?? []
    },
    validate(d) {
        if (isNaN(d.x) || isNaN(d.y)) return null
        return d
    }
}
