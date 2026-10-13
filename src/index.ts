export * from './components'
export * as components from './components'
export * as vvgeom from './js/geom.js'
export * as vvstat from './js/stat.js'
export { default as vvtheme } from './js/theme.js'
export { default as vvbreak } from './js/break.js'
export { default as vvlabel } from './js/label.js'
export { default as vvscale } from './js/scale.js'
export * from './js/scale.js'
export * from './js/label.js'

import * as components from './components'
import type { App, Plugin } from 'vue'
export function install(app: App) {
    for (const [name, comp] of Object.entries(components)) {
        app.component(name, comp)
    }
}
const plugin: Plugin = { install }

export default plugin
