// Metadata and coordinate system helpers for rect geometry
import { vecutils } from '#base/js/utils'
let psum = vecutils.sum

export default {
    scale_attrs: ['fill', 'color', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = ds.xnudge ?? 0,
            ynudge = ds.ynudge ?? 0,
            xmin = psum(levels.x?.apply?.(ds.xmin) ?? ds.xmin, xnudge),
            xmax = psum(levels.x?.apply?.(ds.xmax) ?? ds.xmax, xnudge),
            ymin = psum(levels.y?.apply?.(ds.ymin) ?? ds.ymin, ynudge),
            ymax = psum(levels.y?.apply?.(ds.ymax) ?? ds.ymax, ynudge)
        return { xmin, xmax, ymin, ymax }
    },
    get_range(ds, orientation) {
        if (orientation == 'x') return (ds.xmin ?? []).concat(ds.xmax ?? [])
        if (orientation == 'y') return (ds.ymin ?? []).concat(ds.ymax ?? [])
    },
    validate(d) {
        if (isNaN(d.xmin) || isNaN(d.ymin) || isNaN(d.xmax) || isNaN(d.ymax)) return null
        return d
    }
}
