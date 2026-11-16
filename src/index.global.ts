export * from './index'
export * as baseutils from './base/utils.js'

import { registerElements, registerLayers } from './core/register.js'
import * as elements from './elements'
registerElements(elements)
import * as baseLayers from './base'
registerLayers(baseLayers)

import * as components from './components'
import type { App } from 'vue'
export function install(app: App) {
    for (const [name, comp] of Object.entries(components)) {
        app.component(name, comp)
    }
}
