<script setup>
import iris from '../data/iris.json'
</script>
<template>
    <article>
        <section>
            <h3>List of available action declarations</h3>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th colspan="2">Action</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th rowspan="4">Plot</th>
                            <td><code>select</code></td>
                            <td>select plot range via mouse drag</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAction select />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>nudge</code></td>
                            <td>move plot view via mouse scroll</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAction nudge />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>move</code></td>
                            <td>move plot view via mouse drag</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAction move />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>zoom</code></td>
                            <td>zoom plot limits via mouse scroll</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAction zoom />
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <th rowspan="4">Axis</th>
                            <td><code>nudge</code></td>
                            <td>move plot view via mouse scroll</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAxisX position="50%">
                                        <VVAction nudge />
                                    </VVAxisX>
                                    <VVAxisY position="50%">
                                        <VVAction nudge />
                                    </VVAxisY>
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>move</code></td>
                            <td>move plot view via mouse drag</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAxisX position="50%">
                                        <VVAction move />
                                    </VVAxisX>
                                    <VVAxisY position="50%">
                                        <VVAction move />
                                    </VVAxisY>
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>zoom</code></td>
                            <td>zoom axis limits via mouse scroll</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAxisX position="50%">
                                        <VVAction zoom />
                                    </VVAxisX>
                                    <VVAxisY position="50%">
                                        <VVAction zoom />
                                    </VVAxisY>
                                </VVPlot>
                            </td>
                        </tr>
                        <tr>
                            <td><code>rescale</code></td>
                            <td>zoom axis limits via mouse drag</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAxisX position="50%">
                                        <VVAction rescale />
                                    </VVAxisX>
                                    <VVAxisY position="50%">
                                        <VVAction rescale />
                                    </VVAxisY>
                                </VVPlot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </article>
</template>
