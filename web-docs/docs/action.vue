<script setup>
import { ref, computed, reactive, useTemplateRef, watch } from 'vue';
import iris from '../data/iris.json'
const plotSelectArg = ref({})
const plotNudgeArg = ref({})
const plotMoveArg = ref({})
const plotZoomArg = ref({})
const axisNudgeArg = ref({})
const axisMoveArg = ref({})
const axisZoomArg = ref({})
const axisRescaleArg = ref({})

const histRef = useTemplateRef('hist-container')
const width = ref(600)
const height = ref(400)
const activeEvents = reactive({
    click: true, contextmenu: true,
    dblclick: true, singleclick: true,
    pointerdown: true, pointerup: true,
    pointerenter: false, pointerleave: false,
    pointerover: false, pointerout: false,
    pointermove: false,
    wheel: true,
})
const eventHist = ref([])
const plotEventData = ref({})
const axisEventData = ref({})
const layerEventData = ref({})
function plotEventHandler(e, d) {
    if ([d.l, d.r, d.t, d.b].some(x => x < 0)) return
    if (e.type == "wheel") e.preventDefault()
    eventHist.value.push(" plot event: " + e.type)
    plotEventData.value = d
}
function axisEventHandler(e, d) {
    if ([d.l, d.r, d.t, d.b].some(x => x < 0)) return
    if (e.type == "wheel") e.preventDefault()
    eventHist.value.push(" axis event: " + e.type)
    axisEventData.value = d
}
function layerEventHandler(e, d) {
    if (e.type == "wheel") e.preventDefault()
    eventHist.value.push("layer event: " + e.type)
    layerEventData.value = d
}
function resizeEventHandler() {
    eventHist.value.push(" plot event: resize")
}
watch(eventHist, (v) => {
    if (eventHist.value.length > 20) eventHist.value = eventHist.value.slice(-20)
    if (histRef.value) histRef.value.scrollTop = histRef.value.scrollHeight
}, { deep: true })
const plotVOn = computed(() => {
    return Object.fromEntries(Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => [e, plotEventHandler]))
})
const axisVOn = computed(() => {
    return Object.fromEntries(Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => [e, axisEventHandler]))
})
const layerVOn = computed(() => {
    return Object.fromEntries(Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => [e, layerEventHandler]))
})
const pointerEventTemplate = computed(() => `<VVPlot :width="${width.value}" :height="${height.value}" ${Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => `@${e}="(e, d) => plotEventData = d"`).join(' ')} resize>
    <VVAxisX position="center" ${Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => `@${e}="(e, d) => axisEventData = d"`).join(' ')} />
    <VVAxisY position="center" ${Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => `@${e}="(e, d) => axisEventData = d"`).join(' ')} />
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
        ${Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => `@${e}="(e, d) => layerEventData = d"`).join(' ')} />
</VVPlot>`)

const selectProperties = reactive({
    once: false,
    dismissible: true,
})
const selectTemplate = computed(() => `<VVPlot :width="600" :height="400">
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
    <VVAction select once="${selectProperties.once}" dismissible="${selectProperties.dismissible}" @select="e => selectEventArgument = e" />
</VVPlot>`)
</script>
<template>
    <article>
        <section>
            <h2>Event handling and interactivity</h2>
            <h3>Pointer events</h3>
            <p>
                Event handlers can be attached to the plot component (<code>&lt;VVPlot&gt;</code>),
                axis declarations (<code>&lt;VVAxis&gt;</code>) or layer declarations (<code>&lt;VVGeom&gt;</code>)
                to capture pointer actions.
            </p>
            <p>
                Two arguments are passed to the event handler:
                the first is the original DOM event object,
                and the second is an object containing information about the event context.
            </p>
            <ul>
                <li>
                    Plot events have the second argument containing its distance to the sides of the plot area in pixel
                    (<code>l</code>, <code>r</code>, <code>t</code>, <code>b</code>)
                    as well as its position in data coordinate
                    (<code>x</code>, <code>y</code>).
                </li>
                <li>
                    Axis events have the same distance and coordinate position as the second argument,
                    but only for the axis orientation.
                </li>
                <li>
                    Layer events have the raw data bound to the graphical element.
                </li>
            </ul>
            <p>
                Apart from the standard DOM events <code>click</code> DOM event,
                an additional event, <code>singleclick</code>, is provided for convenience.
                It will be triggered if the mouse button is clicked without moving the pointer.
            </p>
            <h3>Resize event</h3>
            <p>
                For resizable plots, a <code>resize</code> event of argument
                <code>{ width, height }</code> will be triggered when the plot is resized.
            </p>
            <p>
                The <code>width</code> and <code>height</code> model value of the plot will be updated as well.
            </p>
            <hr>
            <p class="flex flex-wrap gap-x-4">
                <label v-for="v, k in activeEvents" :key="k" class="inline-block">
                    <input type="checkbox" v-model="activeEvents[k]"> {{ k }}
                </label>
            </p>
            <p>
                width × height:
                <input type="number" v-model.number="width" class="w-20 border-b" />
                ×
                <input type="number" v-model.number="height" class="w-20 border-b" />
            </p>
            <pre class="code">{{ pointerEventTemplate }}</pre>
            <div class="grid grid-rows-[400px_1fr] grid-cols-[600px_1fr] gap-2 grid-flow-col">
                <VVPlot :data="iris" v-on="plotVOn" v-model:width="width" v-model:height="height"
                    @resize="resizeEventHandler" resize>
                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
                        v-on="layerVOn" />
                    <VVAxisX v-on="axisVOn" position="center" />
                    <VVAxisY v-on="axisVOn" position="center" />
                </VVPlot>
                <pre class="overflow-auto h-36" ref="hist-container">{{ eventHist.join('\n') }}</pre>
                <div class="row-span-full">
                    <div>
                        <p>plot event data:</p>
                        <pre class="overflow-auto h-48">{{ plotEventData }}</pre>
                    </div>
                    <div>
                        <p>axis event data:</p>
                        <pre class="overflow-auto h-24">{{ axisEventData }}</pre>
                    </div>
                    <div>
                        <p>layer event data:</p>
                        <pre class="overflow-auto h-48">{{ layerEventData }}</pre>
                    </div>
                </div>
            </div>
            <hr>
            <h3>Action declaration and events</h3>
            <h4>Selection</h4>
            <p>
                A rectangular region of the plot can be selected via mouse drag.
                The selection action is declared through the <code>select</code> property of the
                <code>&lt;VVAction&gt;</code> helper component.
            </p>
            <p>
                The boolean properties <code>once</code> and <code>dismissible</code>
                can be used to control the selection behavior.
                If <code>once</code> is true, the selection range will not be displayed after the selection is made.
                If <code>dismissible</code> is false, the selection range will not be dismissed by a singleclick.
            </p>
            <p>
                Two event, <code>select</code> and <code>cancel</code> will emitted when a selection is made or
                dismissed.
            </p>
            <hr>
            <p class="flex flex-wrap gap-x-4">
                <label v-for="v, k in selectProperties" :key="k" class="inline-block">
                    <input type="checkbox" v-model="selectProperties[k]"> {{ k }}
                </label>
            </p>
            <pre class="code">{{ selectTemplate }}</pre>
            <div class="flex flex-row">
                <VVPlot :data="iris" :width="600" :height="400">
                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
                    <VVAction select @select="e => plotSelectArg = e" v-bind="selectProperties" />
                </VVPlot>
                <div>
                    <p><strong>Select event argument</strong></p>
                    <pre class="max-h-96 overflow-auto flex-1">{{ plotSelectArg }}</pre>
                </div>
            </div>
            <hr>
            <h4>Change of plot limits</h4>
            <p>
                The limits of the plot and axis can be changed interactively via mouse actions.
                The interactive actions are declared through the <code>&lt;VVAction /&gt;</code> helper component.
            </p>
            <p>
                These actions will emit events of the same name.
                They have the updated plot/axis limits as the event argument.
                You can attach event handlers on the <code>&lt;VVPlot&gt;</code> component to capture them.
                For convenience, event handlers can be attached to the <code>&lt;VVAction /&gt;</code> component as
                well.
            </p>
            <p>
                A <code>rangechange</code> event will also be emitted when the plot limits change.
            </p>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th colspan="2">Action</th>
                            <th>Description</th>
                            <th>Example</th>
                            <th>Event argument</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th rowspan="3">plot</th>
                            <td><code>nudge</code></td>
                            <td>move plot view via mouse scroll</td>
                            <td>
                                <VVPlot :data="iris" @nudge="e => plotNudgeArg = e">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAction nudge x />
                                </VVPlot>
                            </td>
                            <td>
                                <pre class="w-64 max-h-48 overflow-auto">{{ plotNudgeArg }}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td><code>move</code></td>
                            <td>move plot view via mouse drag</td>
                            <td>
                                <VVPlot :data="iris" @move="e => plotMoveArg = e">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAction move />
                                </VVPlot>
                            </td>
                            <td>
                                <pre class="w-64 max-h-48 overflow-auto">{{ plotMoveArg }}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td><code>zoom</code></td>
                            <td>zoom plot limits via mouse scroll</td>
                            <td>
                                <VVPlot :data="iris" @zoom="e => plotZoomArg = e">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAction zoom />
                                </VVPlot>
                            </td>
                            <td>
                                <pre class="w-64 max-h-48 overflow-auto">{{ plotZoomArg }}</pre>
                            </td>
                        </tr>
                        <tr>
                            <th rowspan="4">axis</th>
                            <td><code>nudge</code></td>
                            <td>move plot view via mouse scroll</td>
                            <td>
                                <VVPlot :data="iris">
                                    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length"
                                        :color="d => d.Species" />
                                    <VVAxisX position="50%">
                                        <VVAction nudge @nudge="e => axisNudgeArg = e" />
                                    </VVAxisX>
                                    <VVAxisY position="50%">
                                        <VVAction nudge @nudge="e => axisNudgeArg = e" />
                                    </VVAxisY>
                                </VVPlot>
                            </td>
                            <td>
                                <pre class="w-64 max-h-48 overflow-auto">{{ axisNudgeArg }}</pre>
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
                                        <VVAction move @move="e => axisMoveArg = e" />
                                    </VVAxisX>
                                    <VVAxisY position="50%">
                                        <VVAction move @move="e => axisMoveArg = e" />
                                    </VVAxisY>
                                </VVPlot>
                            </td>
                            <td>
                                <pre class="w-64 max-h-48 overflow-auto">{{ axisMoveArg }}</pre>
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
                                        <VVAction zoom @zoom="e => axisZoomArg = e" />
                                    </VVAxisX>
                                    <VVAxisY position="50%">
                                        <VVAction zoom @zoom="e => axisZoomArg = e" />
                                    </VVAxisY>
                                </VVPlot>
                            </td>
                            <td>
                                <pre class="w-64 max-h-48 overflow-auto">{{ axisZoomArg }}</pre>
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
                                        <VVAction rescale @rescale="e => axisRescaleArg = e" />
                                    </VVAxisX>
                                    <VVAxisY position="50%">
                                        <VVAction rescale @rescale="e => axisRescaleArg = e" />
                                    </VVAxisY>
                                </VVPlot>
                            </td>
                            <td>
                                <pre class="w-64 max-h-48 overflow-auto">{{ axisRescaleArg }}</pre>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </article>
</template>
