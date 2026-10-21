import { Fragment } from 'vue'
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

export function serializeSVG(svgElement, { unit = 'mm' } = {}) {
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
    if (!unitInPx[unit]) unit = ''
    svgClone.setAttribute('width', svgElement.scrollWidth / unitInPx[unit] + unit)
    svgClone.setAttribute('height', svgElement.scrollHeight / unitInPx[unit] + unit)
    svgClone.setAttribute('viewBox', `0 0 ${svgElement.scrollWidth} ${svgElement.scrollHeight}`)
    const serializer = new XMLSerializer()
    return serializer.serializeToString(svgClone)
}
