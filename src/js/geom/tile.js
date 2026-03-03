// Metadata and coordinate system helpers for tile geometry
import { vecutils } from '#base/js/utils'
let psum = vecutils.sum

export default {
    scale_attrs: ['fill', 'color', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = ds.xnudge ?? 0,
            ynudge = ds.ynudge ?? 0,
            x = levels.x?.apply?.(ds.x) ?? ds.x,
            y = levels.y?.apply?.(ds.y) ?? ds.y,
            xmin = psum(x, ds.width?.map?.(x => -x / 2) ?? -0.5, xnudge),
            xmax = psum(x, ds.width?.map?.(x => +x / 2) ?? 0.5, xnudge),
            ymin = psum(y, ds.height?.map?.(x => -x / 2) ?? -0.5, ynudge),
            ymax = psum(y, ds.height?.map?.(x => +x / 2) ?? 0.5, ynudge)
        return { xmin, xmax, ymin, ymax }
    },
    get_values(ds, orientation) {
        if (orientation == 'x') return ds.x
        if (orientation == 'y') return ds.y
    },
    get_range(ds, orientation) {
        if (orientation == 'x') {
            let xmin = vecutils.apply((v, l) => +v - l / 2, ds.x ?? [], ds.width ?? []),
                xmax = vecutils.apply((v, l) => +v + l / 2, ds.x ?? [], ds.width ?? [])
            return xmin.concat(xmax)
        }
        if (orientation == 'y') {
            let ymin = vecutils.apply((v, l) => +v - l / 2, ds.y ?? [], ds.height ?? []),
                ymax = vecutils.apply((v, l) => +v + l / 2, ds.y ?? [], ds.height ?? [])
            return ymin.concat(ymax)
        }
    },
    validate(d) {
        if (isNaN(d.xmin) || isNaN(d.ymin) || isNaN(d.xmax) || isNaN(d.ymax)) return null
        return d
    }
}
