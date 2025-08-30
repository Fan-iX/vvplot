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

/**
 * format number with minimum distinguishable precision
 * @param {*} options
 * @returns {function(number, index, array): string}
 */
function format_auto() {
    return function (x, i, arr) {
        let a = Array.from(arr).sort((a, b) => a - b)
        let minInterval = a.slice(1).map((v, j) => v - a[j])
            .reduce((a, b) => a < b ? a : b)
        let digit = Math.round(-Math.log10(minInterval)) + 1
        if (digit < 0) digit = 0
        if (digit > 20) digit = 20
        return String(+x.toFixed(digit))
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
        return pre + num + suf;
    }
}


/**
 * format timestamp into date string
 * @param {*} options
 * @returns {function(number, index, array): string}
 */
function format_timestamp() {
    return function (x, i, arr) {
        let date = new Date(x)
        return date.toISOString().replace('T', ' ').replace('Z', '')
    }
}

export default {
    number: format_number,
    auto: format_auto,
    timestamp: format_timestamp,
    default: function (opts) {
        return format_number({ scale_cut: number_cut.default, ...opts })
    },
}
