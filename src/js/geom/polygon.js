// Metadata and coordinate system helpers for polygon geometry
export default {
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
}
