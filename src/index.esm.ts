export * from './index'

import { registerElements, registerLayers } from './core/register.js'
import * as elements from './elements'
registerElements(elements)
import * as baseLayers from './base'
registerLayers(baseLayers)

import * as components from './components'
import type { App, Plugin } from 'vue'
const plugin: Plugin = {
    install(app: App) {
        for (const [name, comp] of Object.entries(components)) {
            app.component(name, comp)
        }
    }
}

export default plugin
