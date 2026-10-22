/**
 * Registration entry for the built-in `base` layers.
 *
 * The definition modules (`geom.js`, `stat.js`, `renderer/`) and declaration
 * components (`components/`) stay declarative. The root entry installs this
 * package through the standard registration API.
 */
import * as geoms from './geom.js'
import * as stats from './stat.js'
import * as renderers from './renderer'
import * as components from './components'

export default { geoms, stats, renderers, components }
