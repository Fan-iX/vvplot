import { vecutils } from './utils'
let psum = vecutils.sum

/**
 * Metadata and coordinate system helpers for geometric elements
 *  - scale_attrs: the aesthetics that need to be scaled
 *  - coord_scale: function to compute the coordinates after scaling
 *  - get_range: function to get the data range for a given orientation
 *  - validate: function to validate a data point, invalid points will not be rendered
 */

export default {
    blank: {
        scale_attrs: [],
        coord_scale(ds, levels) {
            return null
        },
        get_range(ds, orientation) {
            if (orientation == 'x') return ds.x ?? []
            if (orientation == 'y') return ds.y ?? []
        },
        validate(d) {
            return null
        }
    },
    point: {
        scale_attrs: ['shape', 'size', 'color', 'stroke', 'linewidth', 'linetype', 'alpha'],
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
    },
    line: {
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
    },
    stick: {
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
    },
    curve: {
        scale_attrs: ['fill', 'color', 'linewidth', 'linetype', 'alpha'],
        coord_scale(ds, levels) {
            let xnudge = ds.xnudge?.map(v => +v),
                ynudge = ds.ynudge?.map(v => +v),
                points = ds.points.map((points, i) => points.map(p => {
                    let xn = xnudge?.[i] ?? 0,
                        yn = ynudge?.[i] ?? 0
                    return {
                        x: +(levels?.x?.[p.x] ?? p.x) + xn,
                        y: +(levels?.y?.[p.y] ?? p.y) + yn
                    }
                }))
            return { points }
        },
        get_range(ds, orientation) {
            if (orientation == 'x') return (ds.points ?? []).flatMap(ps => ps.map(p => p.x))
            if (orientation == 'y') return (ds.points ?? []).flatMap(ps => ps.map(p => p.y))
        },
        validate(d) {
            if (!Array.isArray(d.points)) return null
            return d
        }
    },
    tile: {
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
                let xmin = (ds.x ?? []).map((v, i) => +v - (ds.width?.[i] ?? 0) / 2),
                    xmax = (ds.x ?? []).map((v, i) => +v + (ds.width?.[i] ?? 0) / 2)
                return xmin.concat(xmax)
            }
            if (orientation == 'y') {
                let ymin = (ds.y ?? []).map((v, i) => +v - (ds.height?.[i] ?? 0) / 2),
                    ymax = (ds.y ?? []).map((v, i) => +v + (ds.height?.[i] ?? 0) / 2)
                return ymin.concat(ymax)
            }
        },
        validate(d) {
            if (isNaN(d.xmin) || isNaN(d.ymin) || isNaN(d.xmax) || isNaN(d.ymax)) return null
            return d
        }
    },
    rect: {
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
    },
    polygon: {
        scale_attrs: ['fill', 'color', 'linewidth', 'linetype', 'alpha'],
        coord_scale(ds, levels) {
            let xnudge = ds.xnudge?.map(v => +v),
                ynudge = ds.ynudge?.map(v => +v),
                points = ds.points.map((points, i) => points.map(p => {
                    let xn = xnudge?.[i] ?? 0,
                        yn = ynudge?.[i] ?? 0
                    return {
                        x: +(levels?.x?.[p.x] ?? p.x) + xn,
                        y: +(levels?.y?.[p.y] ?? p.y) + yn
                    }
                }))
            return { points }
        },
        get_range(ds, orientation) {
            if (orientation == 'x') return (ds.points ?? []).flatMap(ps => ps.map(p => p.x))
            if (orientation == 'y') return (ds.points ?? []).flatMap(ps => ps.map(p => p.y))
        },
        validate(d) {
            if (!Array.isArray(d.points)) return null
            return d
        }
    },
    text: {
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
    },
    textsegment: {
        scale_attrs: ['size', 'color', 'stroke', 'linewidth', 'linetype', 'alpha'],
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
            if (isNaN(d.x) || isNaN(d.xend) || isNaN(d.y) || isNaN(d.yend)) return null
            return d
        }
    },

    boxplot: {
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
                    $xmin = psum(ds.xmin, xnudge), $xmax = psum(ds.xmax, xnudge)
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
    },
}
