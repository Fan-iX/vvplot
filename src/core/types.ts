export type LegendGlyph = 'tile' | 'line' | 'point' | 'text' | 'boxplot'

export interface GeomDefinition {
    legend_glyph?: LegendGlyph | LegendGlyph[]
    scale_attrs?: string[]
    coord_scale?: (data: Record<string, any>, levels: Record<string, any>) => Record<string, any>
    get_values?: (data: Record<string, any>, orientation: 'x' | 'y') => any[] | undefined
    get_range?: (data: Record<string, any>, orientation: 'x' | 'y') => any[] | undefined
    validate?: (datum: Record<string, any>) => Record<string, any> | null | undefined
}

export interface StatTransform {
    (data: Record<string, any>, args?: Record<string, any>): Record<string, any>
    core_attrs?: string[]
}

export interface LayerDefinitionOptions {
    name: string
    geom: string | GeomDefinition
    stat?: string | StatTransform
    argnames?: string[]
    optnames?: string[]
    defaults?: Record<string, any>
    showLegend?: boolean | Record<string, boolean>
}

export interface CoordinateMapping {
    /** Map data coordinates / ranges to panel pixel coordinates. */
    coord2pos: (coord: Record<string, any>, options?: Record<string, any>) => Record<string, number | undefined>
    /** Map panel pixel coordinates back to data coordinates. */
    pos2coord: (coord: Record<string, any>) => Record<string, any>
    /** Read plot-relative and data coordinates from a DOM event. */
    getCoord: (event: Event) => Record<string, any>
}

export interface RendererProps {
    data: Array<Record<string, any>>
    layout: Record<string, number>
    mapping: CoordinateMapping
    options?: Record<string, any>
    extendX?: number
    extendY?: number
    dpi?: number
    groupClass?: any
    groupStyle?: any
}

export interface TextElementProps {
    x: number
    y: number
    text: string
    title?: string
    alpha?: number
    angle?: number
    translateX?: number
    translateY?: number
    anchorX?: number
    anchorY?: number
    dockX?: number
    dockY?: number
    fontSize?: number
}
