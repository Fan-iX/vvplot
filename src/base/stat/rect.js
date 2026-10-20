/**
 * rect transformation
 *   { xmin, xmax, ymin, ymax } => { xmin, xmax, ymin, ymax }
 */
export default Object.assign(function (data) {
    let missingAes = ['xmin', 'xmax', 'ymin', 'ymax'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatRect": "${missingAes.join('", "')}"`)
    return data
}, { core_attrs: ['xmin', 'xmax', 'ymin', 'ymax', 'xnudge', 'ynudge'] })
