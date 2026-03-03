/**
 * text transformation
 *   { x, y, label } => { x, y, label }
 */
export default Object.assign(function (data) {
    let missingAes = ['x', 'y', 'label'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatText": "${missingAes.join('", "')}"`)
    return data
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge', 'label', 'text-length'] })
