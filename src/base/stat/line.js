/**
 * line transformation
 *   connect data points in the order of one variable
 *   { x, y } => { x, y, xend, yend }
 */
export default Object.assign(function (data, { orientation = 'x' } = {}) {
    let missingAes = ['x', 'y'].filter(a => data[a] == null)
    if (missingAes.length > 0)
        throw new Error(`Missing aesthetics for "StatLine": "${missingAes.join('", "')}"`)
    let group = data.group ?? new Array(data.x.length).fill(null)
    let groups = Object.values(group.reduce((acc, cur, i) => {
        acc[cur] ??= []
        acc[cur].push(i)
        return acc
    }, {}))
    let orders = groups.map(group =>
        group.map((idx, i) => [data[orientation][idx], i]).sort((a, b) => a[0] - b[0]).map((d, i) => group[d[1]])
    )
    let order1 = orders.map(a => a.slice(0, -1).concat(NaN)).reduce((acc, cur) => acc.concat(cur), []).filter(x => !isNaN(x))
    let order2 = orders.map(a => a.slice(1).concat(NaN)).reduce((acc, cur) => acc.concat(cur), []).filter(x => !isNaN(x))
    let result = {}
    for (let aes in data) {
        result[aes] = order1.map(i => data[aes][i])
    }
    result.xend = order2.map(i => data.x[i])
    result.yend = order2.map(i => data.y[i])
    return result
}, { core_attrs: ['x', 'y', 'xnudge', 'ynudge'] })
