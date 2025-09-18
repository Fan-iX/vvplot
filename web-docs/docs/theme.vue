<script setup>
import vvtheme from '#base/js/theme'
import iris from '../data/iris.json'
</script>
<template>
    <article>
        <section>
            <h3>List of available built-in themes</h3>
            <div class="w-full overflow-auto">
                <table class="w-full" id="doc-theme-table">
                    <thead>
                        <tr>
                            <th>Theme</th>
                            <th>Appearance</th>
                        </tr>
                    </thead>
                    <tr>
                        <td><code>vvtheme.default</code></td>
                        <td>
                            <VVPlot :data="iris" :theme="vvtheme.default">
                                <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>vvtheme.light</code></td>
                        <td>
                            <VVPlot :data="iris" :theme="vvtheme.light">
                                <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>vvtheme.classic</code></td>
                        <td>
                            <VVPlot :data="iris" :theme="vvtheme.classic">
                                <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>vvtheme.gray</code></td>
                        <td>
                            <VVPlot :data="iris" :theme="vvtheme.gray">
                                <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>vvtheme.dark</code></td>
                        <td>
                            <VVPlot :data="iris" :theme="vvtheme.dark">
                                <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>vvtheme.linedraw</code></td>
                        <td>
                            <VVPlot :data="iris" :theme="vvtheme.linedraw">
                                <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
                            </VVPlot>
                        </td>
                    </tr>
                    <tr>
                        <td><code>vvtheme.void</code></td>
                        <td>
                            <VVPlot :data="iris" :theme="vvtheme.void">
                                <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
                            </VVPlot>
                        </td>
                    </tr>
                </table>
            </div>
        </section>
    </article>
</template>
<style>
#doc-theme-table {
    .vvplot {
        width: 300px;
        height: 200px;
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
