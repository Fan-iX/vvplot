/**
 * textsegment transformation
 *   { x, y, xend, yend, label } => { x, y, xend, yend, label }
 */
export default Object.assign(function (data) {
    if (data.xend == null) data.xend = data.x
    if (data.yend == null) data.yend = data.y
    let missingAes = ['x', 'y', 'xend', 'yend', 'label'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatTextsegment": "${missingAes.join('", "')}"`)
    return data
}, { core_attrs: ['x', 'y', 'xend', 'yend', 'xnudge', 'ynudge', 'label'] })
