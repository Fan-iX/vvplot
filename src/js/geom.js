import { vecutils } from './utils'
let psum = vecutils.sum

export default {
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
            if (isNaN(+d.x) || isNaN(+d.y)) return null
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
            if (isNaN(+d.x) || isNaN(+d.y) || isNaN(+d.xend) || isNaN(+d.yend)) return null
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
        get_range(ds, orientation) {
            if (orientation == 'x') return (ds.x ?? []).concat(psum(ds.x ?? [], ds.dx ?? 0) ?? [])
            if (orientation == 'y') return (ds.y ?? []).concat(psum(ds.y ?? [], ds.dy ?? 0) ?? [])
        },
        validate(d) {
            if (isNaN(+d.x) || isNaN(+d.y) || isNaN(+d.xend) || isNaN(+d.yend)) return null
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
                let xmin = (ds.x ?? []).map((v, i) => +v - ds.width[i] / 2),
                    xmax = (ds.x ?? []).map((v, i) => +v + ds.width[i] / 2)
                return xmin.concat(xmax)
            }
            if (orientation == 'y') {
                let ymin = (ds.y ?? []).map((v, i) => +v - ds.height[i] / 2),
                    ymax = (ds.y ?? []).map((v, i) => +v + ds.height[i] / 2)
                return ymin.concat(ymax)
            }
        },
        validate(d) {
            if (isNaN(+d.xmin) || isNaN(+d.ymin) || isNaN(+d.xmax) || isNaN(+d.ymax)) return null
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
            if (isNaN(+d.xmin) || isNaN(+d.ymin) || isNaN(+d.xmax) || isNaN(+d.ymax)) return null
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
            if (isNaN(+d.x) || isNaN(+d.y)) return null
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
            if (isNaN(+d.x) || isNaN(+d.xend) || isNaN(+d.y) || isNaN(+d.yend)) return null
            return d
        }
    },
}
