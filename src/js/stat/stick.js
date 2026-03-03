/**
 * stick transformation
 *   { x, y, dx, dy } => { x, y, xend, yend }
 */
export default Object.assign(function (data) {
    if (data.dx == null) data.dx = Array(data.x.length).fill(0)
    if (data.dy == null) data.dy = Array(data.y.length).fill(0)
    let missingAes = ['x', 'y', 'dx', 'dy'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatStick": "${missingAes.join('", "')}"`)
    return data
}, { core_attrs: ['x', 'y', 'dx', 'dy', 'xnudge', 'ynudge'] })
