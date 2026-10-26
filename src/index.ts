export * from './components'
export * from './base/components'
export * as components from './components'
export * as layers from './base/components'
export * as vvgeom from './base/geom.js'
export * as vvstat from './base/stat.js'
export { default as vvtheme } from './js/theme.js'
export { default as vvbreak } from './js/break.js'
export { default as vvlabel } from './js/label.js'
export { default as vvscale } from './js/scale.js'
export * from './js/scale.js'
export * from './js/label.js'
export * as vvutils from './js/utils.js'
export * from './core/register.js'
export type * from './core/types.ts'

import { registerElements, registerLayers } from './core/register.js'
import baseLayers from './base'
registerLayers(baseLayers)
import * as coreElements from './core/element'
registerElements(coreElements)
import * as layers from './base/components'
import * as components from './components'
import type { App, Plugin } from 'vue'
export function install(app: App) {
    for (const [name, comp] of Object.entries(components)) {
        app.component(name, comp)
    }
    for (const [name, comp] of Object.entries(layers)) {
        app.component(name, comp)
    }
}
const plugin: Plugin = { install }

export default plugin
