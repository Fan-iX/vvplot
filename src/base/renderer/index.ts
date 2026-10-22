import BlankSvg from './blank/BlankSvg.vue'
export const blank = { svg: BlankSvg }

import BoxplotSvg from './boxplot/BoxplotSvg.vue'
import BoxplotCanvas from './boxplot/BoxplotCanvas.vue'
export const boxplot = { svg: BoxplotSvg, canvas: BoxplotCanvas }

import CurveSvg from './curve/CurveSvg.vue'
import CurveCanvas from './curve/CurveCanvas.vue'
export const curve = { svg: CurveSvg, canvas: CurveCanvas }
export const shape = { svg: CurveSvg, canvas: CurveCanvas }

import EllipseSvg from './ellipse/EllipseSvg.vue'
import EllipseCanvas from './ellipse/EllipseCanvas.vue'
export const ellipse = { svg: EllipseSvg, canvas: EllipseCanvas }

import LineSvg from './line/LineSvg.vue'
import LineCanvas from './line/LineCanvas.vue'
export const line = { svg: LineSvg, canvas: LineCanvas }
export const stick = { svg: LineSvg, canvas: LineCanvas }

import MarkdownSvg from './markdown/MarkdownSvg.vue'
export const markdown = { svg: MarkdownSvg }

import MarkdownsegmentSvg from './markdownsegment/MarkdownsegmentSvg.vue'
export const markdownsegment = { svg: MarkdownsegmentSvg }

import PointSvg from './point/PointSvg.vue'
import PointCanvas from './point/PointCanvas.vue'
export const point = { svg: PointSvg, canvas: PointCanvas }

import PolygonSvg from './polygon/PolygonSvg.vue'
import PolygonCanvas from './polygon/PolygonCanvas.vue'
export const polygon = { svg: PolygonSvg, canvas: PolygonCanvas }

import RectSvg from './rect/RectSvg.vue'
import RectCanvas from './rect/RectCanvas.vue'
export const rect = { svg: RectSvg, canvas: RectCanvas }
export const tile = { svg: RectSvg, canvas: RectCanvas }

import TextSvg from './text/TextSvg.vue'
import TextCanvas from './text/TextCanvas.vue'
export const text = { svg: TextSvg, canvas: TextCanvas }

import TextsegmentSvg from './textsegment/TextsegmentSvg.vue'
import TextsegmentCanvas from './textsegment/TextsegmentCanvas.vue'
export const textsegment = { svg: TextsegmentSvg, canvas: TextsegmentCanvas }
