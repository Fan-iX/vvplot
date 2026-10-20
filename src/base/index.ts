/**
 * Registration entry for the built-in `base` layers.
 *
 * The definition modules (`geom.js`, `stat.js`, `layer/svg`, `layer/canvas`)
 * and declaration components (`components/`) stay declarative. This module
 * installs the whole package through the standard registration API.
 */
import * as geoms from './geom.js'
import * as stats from './stat.js'
import * as svg from './renderer/svg/index.js'
import * as canvas from './renderer/canvas/index.js'
import * as components from './components/index.js'

const renderers: Record<string, { svg?: Object, canvas?: Object }> = {}
for (const [name, component] of Object.entries(svg)) {
    renderers[name] = { ...renderers[name], svg: component }
}
for (const [name, component] of Object.entries(canvas)) {
    renderers[name] = { ...renderers[name], canvas: component }
}

export default { geoms, stats, renderers, components }
