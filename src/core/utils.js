import { Fragment, computed } from 'vue'
export function expandFragment(componentList) {
    if (componentList == null) return []
    return componentList.flatMap(layer => {
        if (layer.type == Fragment) {
            return expandFragment(layer.children)
        } else if (layer.type == "template") {
            return expandFragment(layer.children).map(c => {
                c.props = { ...c.props, ...layer.props }
                return c
            })
        }
        return layer
    })
}

const pointerEventClones = new WeakMap()

/**
 * Lazily clone a pointer event through a Vue ref. Reading `.value` (normally
 * with `unref`) creates the clone; never reading it avoids the allocation.
 * @param {PointerEvent} event
 */
export function useEventClone(event) {
    return computed(() => {
        let cached = pointerEventClones.get(event)
        if (cached) return cached

        let options = {}
        for (let key in event) options[key] = event[key]
        options.bubbles = false
        let clone = new PointerEvent(event.type, options)
        for (let key of Object.keys(event)) {
            let prop = Object.getOwnPropertyDescriptor(clone, key)
            if (prop && !prop.writable && !prop.set) continue
            clone[key] = event[key]
        }
        pointerEventClones.set(event, clone)
        return clone
    })
}

export const pointerEvents = [
    'click', 'contextmenu', 'singleclick', 'dblclick',
    'pointerover', 'pointerout', 'pointerenter', 'pointerleave',
    'pointermove', 'pointerdown', 'pointerup', 'wheel'
]

export function emitEvent(handlers, ...args) {
    if (Array.isArray(handlers)) {
        handlers = handlers.filter(h => typeof h === "function")
        if (handlers.length === 0) return false
        handlers.forEach(h => h(...args))
        return true
    }
    if (typeof handlers !== "function") return false
    handlers(...args)
    return true
}

export function parseLinetype(linetype) {
    if (linetype == null) return []
    if (Array.isArray(linetype)) return linetype
    if (linetype === 'solid') return []
    if (linetype === 'dashed') return [4, 4]
    if (linetype === 'dotted') return [1, 3]
    if (linetype === 'dotdash') return [1, 3, 4, 3]
    if (linetype === 'longdash') return [8, 4]
    if (linetype === 'twodash') return [2, 2, 6, 2]
    if (linetype.includes(' ')) return linetype.split(' ').map(v => +v)
    return linetype.split('').map(v => +('0x' + v))
}

/**
 * drop null/undefined values from an object
 * @param {Object} obj 
 * @returns {Object}
 */
export function dropNull(obj) {
    if (typeof obj !== 'object' || obj == null) return obj
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v != null))
}

const unitInPx = {
    '': 1,
    'px': 1,
    'in': 96,
    'cm': 96 / 2.54,
    'mm': 96 / 25.4,
    'pt': 96 / 72,
    'pc': 16
}
/**
 * Normalize an SVG element by embedding canvas images and removing comments.
 * @param {SVGElement} svgElement 
 * @returns {SVGElement}
 */
function normalizeSVG(svgElement) {
    if (!(svgElement instanceof SVGElement)) return null
    function removeComments(node) {
        let i = node.childNodes.length
        while (i--) {
            const child = node.childNodes[i]
            if (child.nodeType === Node.COMMENT_NODE) {
                node.removeChild(child)
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                removeComments(child)
                if (child.getAttribute("style") == "") child.removeAttribute('style')
                if (child.getAttribute("class") == "") child.removeAttribute('class')
            }
        }
    }
    let svgClone = svgElement.cloneNode(true)
    let foreignElements = Array.from(svgElement.querySelectorAll('foreignObject')),
        foreignClones = Array.from(svgClone.querySelectorAll('foreignObject'))
    for (let i = 0; i < foreignElements.length; i++) {
        let foreignElement = foreignElements[i], foreignClone = foreignClones[i]
        let canvas = foreignElements[i].querySelector('canvas')
        if (!canvas) continue
        let img = svgClone.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'image')
        img.setAttribute('href', canvas.toDataURL())
        img.setAttribute('x', foreignElement.getAttribute('x'))
        img.setAttribute('y', foreignElement.getAttribute('y'))
        img.setAttribute('width', foreignElement.getAttribute('width'))
        img.setAttribute('height', foreignElement.getAttribute('height'))
        foreignClone.parentNode.replaceChild(img, foreignClone)
    }
    for (let node of svgClone.querySelectorAll('.vvplot-interactive,foreignObject')) node.remove()
    removeComments(svgClone)
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svgClone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    svgClone.setAttribute('version', '1.1')
    svgClone.removeAttribute('width')
    svgClone.removeAttribute('height')
    svgClone.setAttribute('viewBox', `0 0 ${svgElement.scrollWidth} ${svgElement.scrollHeight}`)
    return svgClone
}

/**
 * Serialize an SVG element to a string.
 * @param {SVGElement} svgElement 
 * @param {Object} options
 * @param {string} options.unit - The unit for width and height (default: 'mm').
 * @returns {string}
 */
export function serializeSVG(svgElement, { unit = 'mm' } = {}) {
    if (!(svgElement instanceof SVGElement)) return null
    let svg = normalizeSVG(svgElement)
    if (!unitInPx[unit]) unit = ''
    svg.setAttribute('width', svgElement.scrollWidth / unitInPx[unit] + unit)
    svg.setAttribute('height', svgElement.scrollHeight / unitInPx[unit] + unit)
    return new XMLSerializer().serializeToString(svg)
}

/**
 * Export an SVG element to a string, inlining images as data URLs.
 * @param {SVGElement} svgElement 
 * @param {Object} options
 * @param {string} options.unit - The unit for width and height (default: 'mm').
 * @returns {string}
 */
export async function exportSVG(svgElement, { unit = 'mm' } = {}) {
    if (!(svgElement instanceof SVGElement)) return null
    let svg = normalizeSVG(svgElement)
    if (!unitInPx[unit]) unit = ''
    svg.setAttribute('width', svgElement.scrollWidth / unitInPx[unit] + unit)
    svg.setAttribute('height', svgElement.scrollHeight / unitInPx[unit] + unit)
    const cache = new Map()
    for (let el of svg.querySelectorAll('image')) {
        let href = el.getAttribute('href') ?? el.getAttribute('xlink:href')
        if (href.startsWith('data:')) continue
        try {
            let response = await fetch(href)
            if (!response.ok) throw new Error(`Failed to fetch image: ${response.status}`)
            cache.set(href, await blobToDataURL(await response.blob()))
        } catch (e) {
            console.warn(`Failed to inline image ${href}: ${e.message}`)
        }
        if (cache.has(href)) {
            el.setAttribute('href', cache.get(href))
        }
    }
    return new XMLSerializer().serializeToString(svg)
}
