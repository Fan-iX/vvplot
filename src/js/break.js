/**
 * get nice breaks from a numeric range
 * @param {*} options
 * @returns {function({min:number, max:number}): Array}
 */
function break_number({ step, minor = false } = {}) {
    return function ({ min, max } = {}) {
        let interval = max - min
        if (isNaN(interval) || interval < 0) return []
        if (interval == 0) return [min]
        let exp = 10 ** Math.floor(Math.log10(interval) - 1),
            m = interval / exp
        if (step == null)
            step = ([5, 10, 20].find(x => x * 5 > m) ?? 20) * exp
        if (minor) step /= 2
        let nMin = Math.ceil(min / step)
        let nMax = Math.floor(max / step)
        return new Array(nMax - nMin + 1).fill(null).map((_, i) => (nMin + i) * step)
    }
}
/**
 * get nice breaks from a datetime range
 * @param {*} options
 * @returns {function({min:number, max:number}): Array}
 */
function break_datetime() {
    return function ({ min, max } = {}) {
        let interval = max - min
        if (isNaN(interval) || interval < 0) return []
        if (interval == 0) return [new Date(min)]
        let s = new Date(min),
            e = new Date(max)
        let sYear = s.getUTCFullYear(),
            sMonth = s.getUTCMonth(),
            sDate = s.getUTCDate(),
            sHours = s.getUTCHours(),
            sMinutes = s.getUTCMinutes(),
            sSeconds = s.getUTCSeconds()
        let breaks = []
        if (interval > 3 * 31536000000) { // > 3 year
            let itvlYear = interval / 31536000000
            let exp = 10 ** Math.floor(Math.log10(itvlYear) - 1),
                m = itvlYear / exp
            let step = Math.max((m > 50 ? 10 : m > 25 ? 5 : 2) * exp, 1)
            s = new Date(Date.UTC(
                Math.ceil(sYear / step) * step
            ))
            do { breaks.push(new Date(s)) }
            while (s.setUTCFullYear(s.getUTCFullYear() + step) < e)
        } else if (interval > 3 * 2592000000) { // > 3 months
            let itvlMonth = interval / 2592000000
            let step = [2, 3, 6].findLast(x => x * 3 <= itvlMonth) || 1
            s = new Date(Date.UTC(
                sYear,
                Math.ceil(sMonth / step) * step
            ))
            do { breaks.push(new Date(s)) }
            while (s.setUTCMonth(s.getUTCMonth() + step) < e)
        } else if (interval > 21 * 86400000) { // > 21 days
            s = new Date(Date.UTC(
                sYear, sMonth,
                sDate + (7 - s.getUTCDay()) % 7
            ))
            do { breaks.push(new Date(s)) }
            while (s.setUTCDate(s.getUTCDate() + 7) < e)
        } else if (interval > 3 * 86400000) { // > 3 days
            let itvlDate = interval / 86400000
            let step = [2, 3].findLast(x => x * 3 <= itvlDate) || 1
            s = new Date(Date.UTC(
                sYear, sMonth,
                Math.ceil(sDate)
            ))
            do { breaks.push(new Date(s)) }
            while (s.setUTCDate(s.getUTCDate() + step) < e)
        } else if (interval > 3 * 3600000) { // > 3 hours
            let itvlHours = interval / 3600000
            let step = [2, 3, 6].findLast(x => x * 3 <= itvlHours) || 1
            s = new Date(Date.UTC(
                sYear, sMonth, sDate,
                Math.ceil(sHours / step) * step
            ))
            do { breaks.push(new Date(s)) }
            while (s.setUTCHours(s.getUTCHours() + step) < e)
        } else if (interval > 3 * 60000) { // > 3 minutes
            let itvlMinutes = interval / 60000
            let step = [2, 5, 10, 30].findLast(x => x * 3 <= itvlMinutes) || 1
            s = new Date(Date.UTC(
                sYear, sMonth, sDate,
                sHours,
                Math.ceil(sMinutes / step) * step
            ))
            do { breaks.push(new Date(s)) }
            while (s.setUTCMinutes(s.getUTCMinutes() + step) < e)
        } else if (interval > 3000) { // > 3 seconds
            let itvlSeconds = interval / 1000
            let step = [2, 5, 10, 30].findLast(x => x * 3 <= itvlSeconds) || 1
            s = new Date(Date.UTC(
                sYear, sMonth, sDate,
                sHours, sMinutes,
                Math.ceil(sSeconds / step) * step
            ))
            do { breaks.push(new Date(s)) }
            while (s.setUTCSeconds(s.getUTCSeconds() + step) < e)
        } else {
            let exp = 10 ** Math.floor(Math.log10(interval) - 1),
                m = interval / exp
            let step = (m > 50 ? 20 : m > 25 ? 10 : 5) * exp
            let nMin = Math.ceil(min / step)
            let nMax = Math.floor(max / step)
            return new Array(nMax - nMin + 1).fill(null).map((_, i) => new Date((nMin + i) * step))
        }
        return breaks
    }
}

export default {
    number: break_number,
    datetime: break_datetime,
}
