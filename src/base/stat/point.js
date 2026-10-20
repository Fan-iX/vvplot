import { defineStat } from '#src/core/register.js'
/**
 * point transformation
 *   { x, y } => { x, y }
 */
export default defineStat(function (data) {
    let missingAes = ['x', 'y'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatPoint": "${missingAes.join('", "')}"`)
    return data
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
