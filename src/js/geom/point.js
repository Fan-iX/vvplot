// Metadata and coordinate system helpers for point geometry
import { vecutils } from '#base/js/utils.js'
let { sum: psum, coalesce } = vecutils

export default {
    scale_attrs: ['shape', 'size', 'color', 'stroke', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = coalesce(ds.xnudge, 0),
            ynudge = coalesce(ds.ynudge, 0),
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
