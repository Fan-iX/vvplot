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

const selection = ref({})
const selectConfigs = reactive({
    once: false, dismissible: true,
    resize: true, move: true,
})
const selectModifiers = reactive({
    ctrl: false, shift: false, meta: false, alt: false
})
const pointerupPrevent = reactive({
    plot: false, layer: false,
})
function onpointerup(e, target) {
    if (pointerupPrevent[target]) e.preventDefault()
}
const selectButton = ref("left")
const selectTemplate = computed(() => `<VVPlot :width="600" :height="400"${pointerupPrevent.plot ? ' @pointerup.prevent' : ''}>
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" ${pointerupPrevent.layer ? '@pointerup.prevent ' : ''}/>
    <VVSelection v-model="selection" ${Object.entries(selectConfigs).map(([k, v]) => `:${k}="${v}"`).join(' ')}
        ${Object.entries(selectModifiers).map(([k, v]) => `:${k}="${v}"`).join(' ')} button="${selectButton.value}"
        :xmin="0.5" :xmax="2" :theme="{ line_color: 'gray' }" :min-range-x="0.5" />
</VVPlot>`)
</script>
<template>
    <article>
        <section>
            <h2>Event handling and interactivity</h2>
            <h3>Pointer and resize events</h3>
            <h4>Pointer events</h4>
            <p>
                Standard DOM pointer events (
                <code>click</code>, <code>contextmenu</code>, <code>dblclick</code>,
                <code>pointerdown</code>, <code>pointerup</code>,
                <code>pointerenter</code>, <code>pointerleave</code>, <code>pointerover</code>, <code>pointerout</code>,
                <code>pointermove</code> and <code>wheel</code>
                ) can be captured through event handlers attached to the plot component (<code>&lt;VVPlot&gt;</code>),
                axis declarations (<code>&lt;VVAxis&gt;</code>) or layer declarations (<code>&lt;VVGeom&gt;</code>).
            </p>
            <p>
                Two arguments are passed to pointer event handlers:
                the first is the original DOM event object,
                and the second is an object containing information about the event context.
            </p>
            <ul>
                <li>
                    For <strong>plot events</strong>,
                    the second argument contains its distance to the sides of the plot area in pixel
                    (<code>l</code>, <code>r</code>, <code>t</code>, <code>b</code>)
                    as well as its position in data coordinate
                    (<code>x</code>, <code>y</code>).
                </li>
                <li>
                    For <strong>axis events</strong>,
                    the second argument has the same distance and coordinate position properties as for the plot events,
                    but only for the axis orientation.
                </li>
                <li>
                    For <strong>layer events</strong>,
                    the second argument will be the raw data bound to the graphical element.
                </li>
            </ul>
            <p>
                Apart from the standard DOM events,
                an additional event, <code>singleclick</code>, is provided for convenience.
                It will be triggered if a mouse button is released at the same position where it was pressed.
            </p>
            <blockquote class="info">
                <p>
                    <code>canvas</code> layers do not support <code>pointerenter</code>, <code>pointerleave</code>,
                    <code>pointerover</code> and <code>pointerout</code> events.
                </p>
            </blockquote>
            <blockquote class="info">
                <p>
                    Layers are rendered in order of declaration, with later layers on top of earlier ones.
                </p>
                <p>
                    For both <code>svg</code> and <code>canvas</code> layers, events will be captured by the topmost
                    graphic element at the event position.
                    However, if there are overlapping <code>svg</code> and <code>canvas</code> layers, the event will
                    always be captured by the <code>svg</code> layer first, even if it is underneath a
                    <code>canvas</code> layer.
                </p>
            </blockquote>
            <h4>Resize event</h4>
            <p>
                For resizable plots, a <code>resize</code> event of argument
                <code>{ width, height }</code> will be triggered when the plot is resized.
            </p>
            <p>
                The <code>width</code> and <code>height</code> model value of the plot will be updated as well.
            </p>
            <fieldset>
                <legend>pointer and resize events</legend>
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
                <pre-highlight lang="html">{{ pointerEventTemplate }}</pre-highlight>
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
            </fieldset>
            <h3>Action declaration and events</h3>
            <h4>Selection</h4>
            <p>
                A rectangular region of the plot can be selected via mouse drag.
                Selection actions can be declared through the <code>&lt;VVSelection&gt;</code> helper component.
            </p>
            <p>
                The model value of the <code>&lt;VVSelection&gt;</code> component contains the selected region in data
                coordinates.
            </p>
            <p>
                When a selection is made or dismissed, a <code>select</code> or <code>dismiss</code> event will be
                emitted to the helper component. Event handlers could take two arguments:
                the first is the selection model value, and the second is a virtual pointer event.
            </p>
            <p>
                Boolean properties <code>once</code>, <code>dismissible</code>, <code>resize</code> and
                <code>move</code> can be used to control the selection behavior:
            </p>
            <ul>
                <li>
                    <code>once</code>:
                    If <code>true</code>, the selection range will not be displayed after the selection is made,
                    only the <code>select</code> event will be emitted.
                </li>
                <li>
                    <code>dismissible</code>:
                    If unset, a <code>dismiss</code> event will be emitted on singleclick only if there is an
                    existing selection range;
                    If <code>false</code>, the selection range will not be dismissed by a singleclick;
                    If <code>true</code>, a <code>dismiss</code> event will always be emitted on singleclick.
                </li>
                <li>
                    <code>resize</code>:
                    If <code>true</code>, the selection region can be resized via dragging its edges and corners.
                </li>
                <li>
                    <code>move</code>:
                    If <code>true</code>, the selection region can be moved via dragging its body.
                </li>
            </ul>
            <p>
                Key modifier <code>ctrl</code>, <code>shift</code>, <code>meta</code>, <code>alt</code>
                and mouse modifier <code>button</code> / <code>buttons</code>
                can be used to control when the selection can be made or dismissed.
            </p>
            <p>
                The dismissal of selection can be prevented by calling the <code>.preventDefault()</code> method
                on the <code>pointerup</code> DOM event.
            </p>
            <blockquote class="info">
                <p>
                    The <code>.preventDefault()</code> call must be made before the <code>pointerup</code> event is
                    bubbled to the <code>svg</code> element (the <code>&lt;VVPlot&gt;</code> component).
                    So the <code>capture: true</code> option shall be used when the event handler is attached to
                    ancestor elements (e.g. <code>document</code>) of the <code>&lt;VVPlot&gt;</code> component.
                </p>
            </blockquote>
            <p>
                limits and minimum interval of the selection region can be set via properties
                <code>xmin</code>, <code>xmax</code>, <code>ymin</code>, <code>ymax</code> and
                <code>min-range-x</code>, <code>min-range-y</code> .
            </p>
            <p>
                The selection region can be styled via the <code>theme</code> property.
                It accepts an object with properties <code>background</code>, <code>opacity</code>,
                <code>line_color</code> and <code>line_width</code>.
            </p>
            <fieldset>
                <legend>selection events</legend>
                <p class="flex flex-wrap gap-x-4">
                    <label v-for="v, k in selectConfigs" :key="k" class="inline-block">
                        <input type="checkbox" class="align-middle" v-model="selectConfigs[k]"> {{ k }}
                    </label>
                    <label v-for="v, k in selectModifiers" :key="k" class="inline-block">
                        <input type="checkbox" class="align-middle" v-model="selectModifiers[k]"> {{ k }}
                    </label>
                    <label class="inline-block">
                        button:
                        <select v-model="selectButton">
                            <option value="left">left</option>
                            <option value="right">right</option>
                        </select>
                    </label>
                    <label v-for="v, k in pointerupPrevent" :key="k" class="inline-block">
                        <input type="checkbox" class="align-middle" v-model="pointerupPrevent[k]"> {{ k }}.prevent
                    </label>
                </p>
                <pre-highlight lang="html">{{ selectTemplate }}</pre-highlight>
                <div class="flex flex-row">
                    <VVPlot :data="iris" :width="600" :height="400" @pointerup="e => onpointerup(e, 'plot')">
                        <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
                            @pointerup="e => onpointerup(e, 'layer')" />
                        <VVSelection v-model="selection" :button="selectButton" :xmin="0.5" :xmax="2" :min-range-x="0.5"
                            :theme="{ line_color: 'gray' }" v-bind="{ ...selectConfigs, ...selectModifiers }"
                            @select="e => plotSelectArg = e" @dismiss="e => plotSelectArg = e" />
                    </VVPlot>
                    <div class="flex-1">
                        <p><strong>Selection event argument</strong></p>
                        <pre>{{ plotSelectArg }}</pre>
                    </div>
                </div>
            </fieldset>
            <h4>Change of plot limits</h4>
            <p>
                The limits of the plot and axis can be changed interactively via mouse actions.
                The interactive actions are declared through the <code>&lt;VVAction /&gt;</code> helper component.
            </p>
            <p>
                These actions will emit events of the same name, which have the updated plot/axis limits as the
                event
                argument.
                You can attach event handlers on the <code>&lt;VVAction /&gt;</code> component to capture them.
                For convenience, event handlers can be attached to the <code>&lt;VVPlot&gt;</code> component as
                well.
            </p>
            <p>
                A <code>rangechange</code> event will also be emitted to the plot when the plot limits change.
            </p>
            <div class="w-full overflow-auto">
                <table class="w-full doc-demo-table">
                    <thead>
                        <tr>
                            <th colspan="2">Action</th>
                            <th>Description</th>
                            <th>Example</th>
                            <th><code>rangechange</code> event argument</th>
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
