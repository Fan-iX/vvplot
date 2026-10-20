/**
 * segment transformation
 *  { x, y, xend?, yend? } => { x, y, xend, yend }
 */
export default Object.assign(function (data) {
    if (data.xend == null) data.xend = data.x
    if (data.yend == null) data.yend = data.y
    let missingAes = ['x', 'y', 'xend', 'yend'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatSegment": "${missingAes.join('", "')}"`)
    return data
}, { core_attrs: ['x', 'y', 'xend', 'yend', 'xnudge', 'ynudge'] })
