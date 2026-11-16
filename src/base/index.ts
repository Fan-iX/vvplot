/**
 * Registration entry for the built-in `base` layers.
 *
 * The definition modules (`geom.js`, `stat.js`, `renderer/`) and declaration
 * components (`components/`) stay declarative. The root entry installs this
 * package through the standard registration API.
 */
export * as geoms from './geom.js'
export * as stats from './stat.js'
export * as renderers from './renderer'
export * as components from './components'
