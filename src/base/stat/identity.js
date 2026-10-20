/**
 * identity transformation
 *   keep data points as is
 */
export default Object.assign(function (data) {
    return data
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
