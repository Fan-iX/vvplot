/**
 * point transformation
 *   { x, y, points } => { x, y, points }
 */
export default Object.assign(function (data) {
    let missingAes = ['x', 'y', 'points'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatPoint": "${missingAes.join('", "')}"`)
    return data
}, { core_attrs: ['x', 'y', 'points', 'xnudge', 'ynudge'] })
