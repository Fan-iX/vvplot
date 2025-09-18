export function read_csv(text, { header = true, sep = ',' } = {}) {
    function parse_value(v) {
        if (!isNaN(v)) return +v
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(v)) {
            let [y, m, d] = v.split('-').map(x => +x)
            return Date.UTC(y, m - 1, d)
        }
        return v
    }
    let lines = text.replace(/\r/g, '').split('\n').filter(l => l), columns
    if (header) {
        columns = lines.shift()?.split?.(sep) ?? []
    }
    let data = lines.map(l => l.split(sep).map(v => parse_value(v)))
    if (!header) {
        let ncol = data.map(r => r.length).reduce((a, b) => a > b ? a : b, 0)
        columns = Array.from({ length: ncol }, (_, i) => `V${i + 1}`)
    }
    return Object.assign(data, { columns })
}
