/**
 * tile transformation
 *   { x, y, width?, height? } => { x, y, width, height }
 */
export default Object.assign(function (data) {
    if (data.width == null && data.x.some(x => typeof x === 'string')) {
        data.width = Array(data.x.length).fill(1)
    }
    if (data.height == null && data.y.some(y => typeof y === 'string')) {
        data.height = Array(data.y.length).fill(1)
    }
    let missingAes = ['x', 'y', 'width', 'height'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatTile": "${missingAes.join('", "')}"`)
    return data
}, { core_attrs: ['x', 'y', 'width', 'height', 'xnudge', 'ynudge'] })
