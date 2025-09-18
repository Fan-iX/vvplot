<script setup>
import iris from '../data/iris.json'
const demo_point = [
    { x: 1, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 4 },
    { x: 2, y: 3 },
]
const demo_polygon = [
    { points: [{ x: 1.5, y: 1 }, { x: 2, y: 3 }, { x: 2.5, y: 2.5 }] },
    { points: [{ x: 3, y: 3.5 }, { x: 4, y: 4 }, { x: 2.5, y: 4 }, { x: 3, y: 2 }] },
]
</script>
<template>
    <article>
        <section>
            <h3>List of available geom layers</h3>
            <div class="w-full overflow-auto">
                <table class="w-full" id="doc-layer-table">
                    <thead>
                        <tr>
                            <th>Tag Name</th>
                            <th>Geometric Element</th>
                            <th>Statistical Transformation</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tr>
                        <td><code>&lt;VVGeomBar /&gt;</code></td>
                        <td>rectangle</td>
                        <td>count</td>
                        <td>
                            <VVPlot :data="['a', 'b', 'b', 'c', 'a', 'b']">
                                <VVGeomBar :x="d => d" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomHistogram /&gt;</code></td>
                        <td>rectangle</td>
                        <td>histogram</td>
                        <td>
                            <VVPlot :data="iris">
                                <VVGeomHistogram :x="d => d.Sepal_Width" :bins="5" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomLine /&gt;</code></td>
                        <td>line</td>
                        <td>sort by one variable</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomLine :x="d => d.x" :y="d => d.y" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomLinerange /&gt;</code></td>
                        <td>line</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="[{ xmin: 1, xmax: 3, y: 'a' }, { xmin: 2.5, xmax: 4, y: 'b' }]" :width="200"
                                :height="120">
                                <VVGeomLinerange :xmin="d => d.xmin" :xmax="d => d.xmax" :y="d => d.y" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomPath /&gt;</code></td>
                        <td>line</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPath :x="d => d.x" :y="d => d.y" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomPoint /&gt;</code></td>
                        <td>point</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomPoint :x="d => d.x" :y="d => d.y" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomPolygon /&gt;</code></td>
                        <td>polygon</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="demo_polygon">
                                <VVGeomPolygon :points="d => d.points" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomRect /&gt;</code></td>
                        <td>rectangle</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="demo_polygon">
                                <VVGeomRect :xmin="d => d.points[0].x" :xmax="d => d.points[1].x"
                                    :ymin="d => d.points[0].y" :ymax="d => d.points[1].y" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomSegment /&gt;</code></td>
                        <td>line</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="demo_polygon">
                                <VVGeomSegment :x="d => d.points[0].x" :y="d => d.points[0].y"
                                    :xend="d => d.points[1].x" :yend="d => d.points[1].y" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomStick /&gt;</code></td>
                        <td>line</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomStick :x="d => d.x" :y="d => d.y" :dx="0.5" :dy="0.5" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomText /&gt;</code></td>
                        <td>text</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomText :x="d => d.x" :y="d => d.y" :label="(_, i) => i + 1" />
                                <VVAxisX :expand-mult="0.2" />
                                <VVAxisY :expand-mult="0.2" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomTextsegment /&gt;</code></td>
                        <td>text</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomTextsegment :x="1" :xend="2" :y="2" :yend="1" label="VVPlot" />
                                <VVAxisX :expand-mult="0.2" />
                                <VVAxisY :expand-mult="0.2" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>&lt;VVGeomTile /&gt;</code></td>
                        <td>text</td>
                        <td>none</td>
                        <td>
                            <VVPlot :data="demo_point">
                                <VVGeomTile :x="d => d.x" :y="d => d.y" :width="1" :height="1" />
                            </VVPlot>
                        </td>
                    </tr>
                </table>
            </div>
        </section>
    </article>
</template>
<style>
#doc-layer-table {
    .vvplot {
        width: 200px;
        height: 120px;
        margin: 0 auto;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding-inline: 8px;
    }

    th {
        padding-block: 8px;
    }
}
</style>
