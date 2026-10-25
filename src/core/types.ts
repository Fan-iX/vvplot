import type { Component } from 'vue'

export interface GeomDefinition {
    name?: string
    scale_attrs?: string[]
    coord_scale?: (data: Record<string, any>, levels: Record<string, any>) => Record<string, any>
    get_values?: (data: Record<string, any>, orientation: 'x' | 'y') => any[] | undefined
    get_range?: (data: Record<string, any>, orientation: 'x' | 'y') => any[] | undefined
    validate?: (datum: Record<string, any>) => Record<string, any> | null | undefined
    render?: {
        svg?: Component
        canvas?: Component
        default?: 'svg' | 'canvas'
    }
    legend?: 'point' | 'line' | 'tile' | 'text' | false
    [key: string]: any
}

export interface StatTransform {
    (data: Record<string, any>, args?: Record<string, any>): Record<string, any>
    core_attrs?: string[]
}

export interface LayerDefinitionOptions {
    name: string
    geom: string | GeomDefinition
    stat?: string | StatTransform
    args?: string[]
    attrs?: string[]
    defaults?: Record<string, any>
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
    extendX?: number
    extendY?: number
    dpi?: number
    groupClass?: any
    groupStyle?: any
}
