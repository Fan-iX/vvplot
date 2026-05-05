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

/**
 * reformat SVG XML to be more compatible with various renderers, especially for printing
 * @param {*} svgXml svg XML string
 * @param {*} fixOptions options for fixing various issues in SVG
 * @param {boolean} fixOptions.pageSize whether to add `@page` CSS rule to set page size to match SVG dimensions when printing
 * @param {boolean} fixOptions.dominantBaseline whether to convert text elements with dominant-baseline="central" or "middle" to use dy="0.35em" for better vertical alignment in some renderers
 * @param {boolean} fixOptions.transformOrigin whether to convert elements with transform-origin attribute to use equivalent translate() in transform attribute for better compatibility
 * @returns svg XML Blob
 */
export async function svg2svg(svgXml, {
    pageSize = true,
    dominantBaseline = true,
    transformOrigin = true,
} = {}) {
    let svg = new DOMParser().parseFromString(
        '<?xml version="1.0" standalone="no"?>\r\n' + svgXml,
        "image/svg+xml"
    ).documentElement
    if (pageSize) {
        let style = document.createElement('style')
        style.textContent = `@media print { @page { size: ${svg.width.baseVal.value / 96}in ${svg.height.baseVal.value / 96}in; margin: 0; } }`
        svg.prepend(style)
    }
    if (dominantBaseline) {
        svg.querySelectorAll('text[dominant-baseline="central"], text[dominant-baseline="middle"]').forEach(el => {
            el.removeAttribute('dominant-baseline')
            el.setAttribute('dy', "0.35em")
        })
    }
    if (transformOrigin) {
        svg.querySelectorAll('[transform-origin]').forEach(el => {
            const originAttr = el.getAttribute('transform-origin').trim()
            const transformAttr = el.getAttribute('transform') || ''
            const coords = originAttr.split(/[\s,]+/).map(parseFloat)
            if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                const [ox, oy] = coords
                const newTransform = `translate(${ox}, ${oy}) ${transformAttr} translate(${-ox}, ${-oy})`
                el.setAttribute('transform', newTransform)
                el.removeAttribute('transform-origin')
            }
        })
    }
    let xml = new XMLSerializer().serializeToString(svg)
    return new Blob([xml], { type: 'image/svg+xml' })
}

/**
 * Convert SVG XML string to PNG Blob
 * @param {*} svgXml XML string of the SVG image
 * @param {*} options options for conversion
 * @param {number} options.dpi desired DPI for the output PNG (default: 96)
 * @returns png Blob
 */
export async function svg2png(svgXml, { dpi = 96 } = {}) {
    const { promise, resolve, reject } = Promise.withResolvers()
    const url = URL.createObjectURL(new Blob(['<?xml version="1.0" standalone="no"?>\r\n', svgXml], { type: 'image/svg+xml' }))
    const img = new Image()
    img.onload = () => {
        try {
            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth * dpi / 96
            canvas.height = img.naturalHeight * dpi / 96
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            canvas.toBlob(blob => resolve(blob), 'image/png')
        } catch (e) {
            reject(new Error('Failed to convert SVG to PNG'))
        } finally {
            img.onload = img.onerror = null
            URL.revokeObjectURL(url)
        }
    }
    img.onerror = () => {
        img.onload = img.onerror = null
        URL.revokeObjectURL(url)
        reject(new Error('Failed to convert SVG to PNG'))
    }
    img.src = url
    return promise
}
