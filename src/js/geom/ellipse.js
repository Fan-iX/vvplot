// Metadata and coordinate system helpers for ellipse geometry
import { vecutils } from '#base/js/utils'
let psum = vecutils.sum

export default {
    scale_attrs: ['fill', 'color', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let { A, B, C } = ds
        let xnudge = ds.xnudge ?? 0,
            ynudge = ds.ynudge ?? 0,
            cx = psum(levels.x?.apply?.(ds.cx) ?? ds.cx, xnudge),
            cy = psum(levels.y?.apply?.(ds.cy) ?? ds.cy, ynudge)
        return { cx, cy, A, B, C }
    },
    get_range(ds, orientation) {
        if (orientation == 'x') {
            let dx = vecutils.apply((A, B, C) => Math.sqrt(C / (A * C - B * B)), ds.A ?? [], ds.B ?? [], ds.C ?? [])
            return psum(ds.cx ?? [], dx).concat(psum(ds.cx ?? [], vecutils.opposite(dx)) ?? [])
        }
        if (orientation == 'y') {
            let dy = vecutils.apply((A, B, C) => Math.sqrt(A / (A * C - B * B)), ds.A ?? [], ds.B ?? [], ds.C ?? [])
            return psum(ds.cy ?? [], dy).concat(psum(ds.cy ?? [], vecutils.opposite(dy)) ?? [])
        }
    },
    validate(d) {
        if (isNaN(d.cx) || isNaN(d.cy) || isNaN(d.A) || isNaN(d.B) || isNaN(d.C) || !(d.A * d.C > d.B * d.B)) return null
        return d
    }
}
