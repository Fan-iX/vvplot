// Metadata and coordinate system helpers for boxplot geometry
import { vecutils } from '#base/js/utils'
let psum = vecutils.sum

export default {
    scale_attrs: ['fill', 'color', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = ds.xnudge ?? 0,
            ynudge = ds.ynudge ?? 0
        if (ds.x) {
            let x = psum(levels.x?.apply?.(ds.x) ?? ds.x, xnudge),
                xmin = psum(x, ds.width?.map?.(x => -x / 2) ?? -0.5, xnudge),
                xmax = psum(x, ds.width?.map?.(x => +x / 2) ?? 0.5, xnudge),
                lwisker = psum(ds.lwisker, ynudge),
                Q1 = psum(ds.Q1, ynudge),
                median = psum(ds.median, ynudge),
                Q3 = psum(ds.Q3, ynudge),
                uwisker = psum(ds.uwisker, ynudge),
                outliers = vecutils.apply(
                    ($x, { y: ys, $raw }, nudge) => psum(ys, nudge).map(($y, i) => ({ x: $x, y: $y, $raw: $raw[i] })),
                    x, ds.outliers ?? [], ynudge
                ),
                $ymin = psum(ds.min, ynudge), $ymax = psum(ds.max, ynudge)
            return {
                x, xmin, xmax, lwisker, Q1, median, Q3, uwisker, outliers,
                $xmin: xmin, $xmax: xmax, $ymin, $ymax
            }
        } else if (ds.y) {
            let y = psum(levels.y?.apply?.(ds.y) ?? ds.y, ynudge),
                ymin = psum(y, ds.height?.map?.(y => -y / 2) ?? -0.5, ynudge),
                ymax = psum(y, ds.height?.map?.(y => +y / 2) ?? 0.5, ynudge),
                lwisker = psum(ds.lwisker, xnudge),
                Q1 = psum(ds.Q1, xnudge),
                median = psum(ds.median, xnudge),
                Q3 = psum(ds.Q3, xnudge),
                uwisker = psum(ds.uwisker, xnudge),
                outliers = vecutils.apply(
                    ($y, { x: xs, $raw }, nudge) => psum(xs, nudge).map(($x, i) => ({ x: $x, y: $y, $raw: $raw[i] })),
                    y, ds.outliers ?? [], xnudge
                ),
                $xmin = psum(ds.min, xnudge), $xmax = psum(ds.max, xnudge)
            return {
                y, ymin, ymax, lwisker, Q1, median, Q3, uwisker, outliers,
                $xmin, $xmax, $ymin: ymin, $ymax: ymax
            }
        }
        return {}
    },
    get_range(ds, orientation) {
        if (orientation == 'x') return ds.x || (ds.min ?? []).concat(ds.max ?? [])
        if (orientation == 'y') return ds.y || (ds.min ?? []).concat(ds.max ?? [])
    },
    validate(d) {
        if ([d.$xmin, d.$xmax, d.$ymin, d.$ymax].some(v => isNaN(v))) return null
        return d
    }
}
