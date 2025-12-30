<script setup>
import { ref, computed, reactive, useTemplateRef, watch, nextTick } from 'vue';
import iris from '../data/iris.json'

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
const layerRawData = ref({})
function plotEventHandler(e, c) {
    if ([c.l, c.r, c.t, c.b].some(x => x < 0)) return
    if (e.type == "wheel") e.preventDefault()
    eventHist.value.push(" plot event: " + e.type)
    plotEventData.value = c
}
function axisEventHandler(e, c) {
    if ([c.l, c.r, c.t, c.b].some(x => x < 0)) return
    if (e.type == "wheel") e.preventDefault()
    eventHist.value.push(" axis event: " + e.type)
    axisEventData.value = c
}
function layerEventHandler(e, c, d) {
    if (e.type == "wheel") e.preventDefault()
    eventHist.value.push("layer event: " + e.type)
    layerEventData.value = c
    layerRawData.value = d
}
function resizeEventHandler() {
    eventHist.value.push(" plot event: resize")
}
watch(eventHist, (v) => {
    if (eventHist.value.length > 20) eventHist.value = eventHist.value.slice(-20)
    if (histRef.value) nextTick(() => { histRef.value.scrollTop = histRef.value.scrollHeight })
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
const pointerEventTemplate = computed(() => `<VVPlot :width="${width.value}" :height="${height.value}" ${Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => `@${e}="(e, c) => plotEventData = c"`).join(' ')} resize>
    <VVAxisX position="center" ${Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => `@${e}="(e, c) => axisEventData = c"`).join(' ')} />
    <VVAxisY position="center" ${Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => `@${e}="(e, c) => axisEventData = c"`).join(' ')} />
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
        ${Object.entries(activeEvents).filter(([e, v]) => v).map(([e, v]) => `@${e}="(e, c, d) => { layerEventData = c; layerRawData = d }"`).join(' ')} />
</VVPlot>`)
</script>
<template>
    <article>
        <section>
            <h2>Event handling</h2>
            <h3>Pointer events</h3>
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
                Several arguments are passed to pointer event handlers:
            </p>
            <ul>
                <li>
                    The first argument is the original DOM event object.
                </li>
                <li>
                    The second argument contains the event position in data coordinate (<code>x</code>, <code>y</code>),
                    as well as its distance to the sides of the plot area in pixel
                    (<code>l</code>, <code>r</code>, <code>t</code>, <code>b</code>).
                    Note that for axis event handlers, only properties for the axis orientation will be provided.
                </li>
                <li>
                    The third argument is the raw data bound to the graphical element, this is for layer event handlers
                    only.
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
            <h3>Resize event</h3>
            <p>
                For resizable plots, a <code>resize</code> event of argument
                <code>{ width, height }</code> will be triggered when the plot is resized.
            </p>
            <p>
                The <code>width</code> and <code>height</code> model value of the plot will be updated as well.
            </p>
            <fieldset>
                <legend>pointer and resize events</legend>
                <div class="flex flex-wrap gap-x-4">
                    <label v-for="v, k in activeEvents" :key="k" class="inline-block">
                        <input type="checkbox" v-model="activeEvents[k]"> {{ k }}
                    </label>
                </div>
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
                    <pre class="overflow-auto h-40" ref="hist-container">{{ eventHist.join('\n') }}</pre>
                    <div class="row-span-full">
                        <div>
                            <p>plot event data:</p>
                            <pre class="overflow-auto h-36">{{ plotEventData }}</pre>
                        </div>
                        <div>
                            <p>axis event data:</p>
                            <pre class="overflow-auto h-24">{{ axisEventData }}</pre>
                        </div>
                        <div>
                            <p>layer event data:</p>
                            <pre class="overflow-auto h-36">{{ layerEventData }}</pre>
                        </div>
                        <div>
                            <p>layer raw data:</p>
                            <pre class="overflow-auto h-24">{{ layerRawData }}</pre>
                        </div>
                    </div>
                </div>
            </fieldset>
        </section>
    </article>
</template>
