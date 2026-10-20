// Metadata and coordinate system helpers for curve geometry
export default {
    scale_attrs: ['fill', 'color', 'linewidth', 'linetype', 'alpha'],
    coord_scale(ds, levels) {
        let xnudge = ds.xnudge?.map(v => +v),
            ynudge = ds.ynudge?.map(v => +v),
            points = ds.points.map((points, i) => points.map(p => ({
                x: +(levels?.x?.[p.x] ?? p.x) + (xnudge?.[i] ?? 0),
                y: +(levels?.y?.[p.y] ?? p.y) + (ynudge?.[i] ?? 0)
            })))
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
