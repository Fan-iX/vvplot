/**
 * Metadata and coordinate system helpers for geometric elements
 * Each geometry type has the following properties:
 *  - scale_attrs: the aesthetics that need to be scaled
 *  - coord_scale: function to compute the coordinates after scaling
 *  - get_range: function to get the data range for a given orientation
 *  - validate: function to validate a data point, invalid points will not be rendered
 */
export { default as blank } from './geom/blank.js'
export { default as boxplot } from './geom/boxplot.js'
export { default as curve } from './geom/curve.js'
export { default as ellipse } from './geom/ellipse.js'
export { default as line } from './geom/line.js'
export { default as markdown } from './geom/markdown.js'
export { default as markdownsegment } from './geom/markdownsegment.js'
export { default as point } from './geom/point.js'
export { default as polygon } from './geom/polygon.js'
export { default as rect } from './geom/rect.js'
export { default as stick } from './geom/stick.js'
export { default as text } from './geom/text.js'
export { default as textsegment } from './geom/textsegment.js'
export { default as tile } from './geom/tile.js'
