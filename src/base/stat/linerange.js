/**
 * linerange transformation
 *   { x, ymin, ymax } => { x, y, xend, yend }
 *   { y, xmin, xmax } => { y, x, yend, xend }
 */
export default Object.assign(function (data) {
    if (data.x != null) {
        let missingAes = ['x', 'ymin', 'ymax'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for "StatLinerange": "${missingAes.join('", "')}"`)
        return (({ x, ymin, ymax, ...etc }) => ({ x, xend: x, y: ymin, yend: ymax, ...etc }))(data)
    } else if (data.y != null) {
        let missingAes = ['y', 'xmin', 'xmax'].filter(a => data[a] == null)
        if (missingAes.length > 0)
            throw new Error(`Missing aesthetics for "StatLinerange": "${missingAes.join('", "')}"`)
        return (({ y, xmin, xmax, ...etc }) => ({ y, yend: y, x: xmin, xend: xmax, ...etc }))(data)
    } else {
        throw new Error(`Missing aesthetics for "StatLinerange": x,ymin,ymax or y,xmin,xmax`)
    }
}, { core_attrs: ['x', 'y', 'xmin', 'xmax', 'ymin', 'ymax', 'xnudge', 'ynudge'] })
