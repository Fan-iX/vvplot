import { defineStat } from '#src/core/register.js'
/**
 * identity transformation
 *   keep data points as is
 */
export default defineStat(function (data) {
    return data
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
