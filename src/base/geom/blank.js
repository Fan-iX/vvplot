// Metadata and coordinate system helpers for blank geometry
export default {
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
}
