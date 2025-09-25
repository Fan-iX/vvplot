export const number_cut = {
    default: {
        '': 1, 'k': 1e3, 'M': 1e6, 'G': 1e9, 'T': 1e12, 'P': 1e15, 'E': 1e18, 'Z': 1e21, 'Y': 1e24,
    },
    si: {
        'y': 1e-24, 'z': 1e-21, 'a': 1e-18, 'f': 1e-15, 'p': 1e-12, 'n': 1e-9, 'μ': 1e-6, 'm': 1e-3,
        '': 1, 'k': 1e3, 'M': 1e6, 'G': 1e9, 'T': 1e12, 'P': 1e15, 'E': 1e18, 'Z': 1e21, 'Y': 1e24,
    },
    binary: {
        '': 1, 'Ki': 1024, 'Mi': 1024 ** 2, 'Gi': 1024 ** 3, 'Ti': 1024 ** 4, 'Pi': 1024 ** 5, 'Ei': 1024 ** 6, 'Zi': 1024 ** 7, 'Yi': 1024 ** 8,
    },
    time: {
        'ns': 1e-9, 'μs': 1e-6, 'ms': 1e-3, 's': 1, 'm': 60, 'h': 3600, 'd': 86400,
        'w': 604800, 'M': 2592000, 'y': 31536000,
    }
}

function format_asis() {
    return function (x) {
        if (x == null) return ""
        return String(x)
    }
}

/**
 * format number with fixed scale
 * @param {*} options
 * @returns {function(number, index, array): string}
 */
function format_number({
    accuracy, scale = 1,
    prefix = "", suffix = "", big_mark = " ",
    style_positive = "none", style_negative = "hyphen",
    scale_cut = { "": 1 } } = {}
) {
    let pos_mark = ({ plus: "+", space: " " })[style_positive] ?? "",
        neg_mark = ({ hyphen: "-", minus: "−", parens: "(" })[style_negative] ?? ""
    return function (x, i, arr = [x]) {
        let acc
        if (accuracy) {
            acc = accuracy
        } else if (arr.length > 1) {
            let ar = arr.filter(x => isFinite(x)).sort((a, b) => a - b)
            let minInterval = ar.slice(1).map((v, j) => v - ar[j])
                .reduce((a, b) => a < b ? a : b)
            acc = minInterval * scale
        } else {
            acc = x || 1
        }
        let cut = Object.entries(scale_cut).sort((a, b) => b[1] - a[1]).find(x => x[1] <= acc)?.[0] ?? ""
        let suf = (cut == "" ? "" : " ") + cut + suffix
        acc = acc / (scale_cut[cut] ?? 1)
        let digit = Math.max(0, Math.ceil(-Math.log10(acc)))
        let num = Math.round(x * scale / (scale_cut[cut] ?? 1) / acc) * acc
        let pre = prefix + (num > 0 ? pos_mark : num < 0 ? neg_mark : "")
        if (num < 0 && style_negative == "parens") suf = ")" + suf
        num = Math.abs(num).toFixed(digit).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1' + big_mark)
        return pre + num + suf
    }
}


/**
 * format timestamp into date string
 * @param {*} options
 * @returns {function(number, index, array): string}
 */
function format_datetime({
    format,
} = {}) {
    let $fn = {
        y: d => d.getUTCFullYear(),
        M: d => d.getUTCMonth() + 1,
        d: d => d.getUTCDate(),
        h: d => d.getUTCHours(),
        m: d => d.getUTCMinutes(),
        s: d => d.getUTCSeconds()
    }
    let $cut = { y: 31536000, M: 2678400, d: 86400, h: 3600, m: 60, s: 1 }
    function $format(date, fmt) {
        return fmt.replace(/(y|M|d|h|m|s)\1*/g, (m, f) => {
            let s = String($fn[f](date)), l = m.length
            if (f == 'y') return s.slice(-l)
            return s.padStart(l, '0')
        })
    }
    let offset_left = { y: 0, M: 5, d: 8, h: 11, m: 14, s: 17 }
    let offset_right = { y: 4, M: 7, d: 10, h: 13, m: 16, s: 19 }
    return function (x, i, arr = [x]) {
        if (arr.length <= 1) return $format(new Date(x), format ?? 'yyyy-MM-dd hh:mm:ss')
        if (format == null) {
            let a = Array.from(arr).sort((a, b) => a - b)
            let minInterval = a.slice(1).map((v, j) => v - a[j])
                .reduce((a, b) => a < b ? a : b) / 1000,
                maxInterval = (a[a.length - 1] - a[0]) / 1000
            let minCut = ["y", "M", "d", "m", "s"].find(k => $cut[k] <= minInterval)
            let maxCut = maxInterval > 2678400 ? "y" : maxInterval > 86400 ? "M" : "h"
            format = 'yyyy-MM-dd hh:mm:ss'.slice(offset_left[maxCut], offset_right[minCut])
        }
        return $format(new Date(x), format)
    }
}

export default {
    number: format_number,
    datetime: format_datetime,
    timestamp: format_datetime,
    asis: format_asis,
    default: function (opts) {
        return format_number({ scale_cut: number_cut.default, ...opts })
    },
}
