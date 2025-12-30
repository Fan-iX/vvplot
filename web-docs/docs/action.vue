<script setup>
import { ref, computed, reactive, useTemplateRef, watch, nextTick } from 'vue';
import iris from '../data/iris.json'

const selectionData = ref({})
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

const actionHist = ref([])
const actionData = ref({})
const histRef = useTemplateRef('hist-container')

watch(actionHist, (v) => {
    if (actionHist.value.length > 20) actionHist.value = actionHist.value.slice(-20)
    if (histRef.value) nextTick(() => { histRef.value.scrollTop = histRef.value.scrollHeight })
}, { deep: true })
const plotActions = reactive({
    nudge: true,
    move: true,
    zoom: true,
})
const axisActions = reactive({
    nudge: true,
    move: true,
    zoom: true,
    rescale: true,
})
const plotActionModifiers = reactive({
    nudge: { ctrl: false, shift: true, meta: false, alt: false, x: true, y: false },
    move: { ctrl: false, shift: false, meta: false, alt: false, x: true, y: true },
    zoom: { ctrl: false, shift: false, meta: false, alt: false, x: true, y: true },
})
const axisActionModifiers = reactive({
    nudge: { ctrl: false, shift: true, meta: false, alt: false },
    move: { ctrl: false, shift: false, meta: false, alt: false },
    zoom: { ctrl: false, shift: false, meta: false, alt: false },
    rescale: { ctrl: false, shift: false, meta: false, alt: false },
})
const actionTemplate = computed(() => {
    let plotActionComponents = Object.keys(plotActions).filter(act => plotActions[act])
        .map(act => `<VVAction ${act}${Object.entries(plotActionModifiers[act]).map(([k, v]) => v ? ` ${k}` : "").join('')} @${act}="d => actionData = d" />`)
    let axisActionComponents = Object.keys(axisActions).filter(act => axisActions[act])
        .map(act => `<VVAction ${act}${Object.entries(axisActionModifiers[act]).map(([k, v]) => v ? ` ${k}` : "").join('')} @${act}="d => actionData = d" />`)
    return `<VVPlot :width="600" :height="400">
    <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
${plotActionComponents.map(x => "    " + x + "\n").join('')}    <VVAxisX>
${axisActionComponents.map(x => "        " + x + "\n").join('')}    </VVAxisX>
</VVPlot>`})
</script>
<template>
    <article>
        <section>
            <h2>Plot action: interactivity</h2>
            <h3>Selection</h3>
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
                <div class="flex flex-wrap gap-x-4">
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
                </div>
                <pre-highlight lang="html">{{ selectTemplate }}</pre-highlight>
                <div class="flex flex-row">
                    <VVPlot :data="iris" :width="600" :height="400" @pointerup="e => onpointerup(e, 'plot')">
                        <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species"
                            @pointerup="e => onpointerup(e, 'layer')" />
                        <VVSelection v-model="selection" :button="selectButton" :xmin="0.5" :xmax="2" :min-range-x="0.5"
                            :theme="{ line_color: 'gray' }" v-bind="{ ...selectConfigs, ...selectModifiers }"
                            @select="e => selectionData = e" @dismiss="e => selectionData = e" />
                    </VVPlot>
                    <div class="flex-1">
                        <p><strong>Selection event argument</strong></p>
                        <pre>{{ selectionData }}</pre>
                    </div>
                </div>
            </fieldset>
            <h3>Change of plot limits</h3>
            <p>
                The limits of the plot and axis can be changed interactively via mouse actions.
                The interactive actions are declared through the <code>&lt;VVAction /&gt;</code> helper component.
            </p>
            <p>
                Available actions include:
            </p>
            <ul>
                <li>
                    <code>nudge</code>: move plot view via mouse scroll.
                </li>
                <li>
                    <code>move</code>: move plot view via mouse drag.
                </li>
                <li>
                    <code>zoom</code>: zoom plot limits via mouse scroll.
                </li>
                <li>
                    <code>rescale</code>: zoom plot limits via mouse drag (this action is only available for axis).
                </li>
            </ul>
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
            <p>
                The <code>min</code> and <code>max</code> model value of the primary axis will be updated as well.
            </p>
            <fieldset>
                <legend>plot and axis actions</legend>
                <div>plot actions:</div>
                <div class="grid grid-cols-7 gap-x-4 ml-4">
                    <template v-for="v, k in plotActions">
                        <label class="col-start-1">
                            <input type="checkbox" v-model="plotActions[k]"> {{ k }}
                        </label>
                        <label v-for="_, m in plotActionModifiers[k]">
                            <input type="checkbox" v-model="plotActionModifiers[k][m]" :disabled="!v"> {{ m }}
                        </label>
                    </template>
                </div>
                <div>axis actions:</div>
                <div class="grid grid-cols-7 gap-x-4 ml-4">
                    <template v-for="v, k in axisActions">
                        <label class="col-start-1">
                            <input type="checkbox" v-model="axisActions[k]"> {{ k }}
                        </label>
                        <label v-for="_, m in axisActionModifiers[k]">
                            <input type="checkbox" v-model="axisActionModifiers[k][m]" :disabled="!v"> {{ m }}
                        </label>
                    </template>
                </div>
                <pre-highlight lang="html">{{ actionTemplate }}</pre-highlight>
                <div class="grid grid-cols-[600px_1fr] gap-2 grid-flow-col">
                    <VVPlot :data="iris" :width="600" :height="400" @rangechange="e => actionData = e">
                        <VVGeomPoint :x="d => d.Petal_Width" :y="d => d.Sepal_Length" :color="d => d.Species" />
                        <template v-for="enabled, act in plotActions">
                            <VVAction v-if="enabled" :[act]="true" v-bind="plotActionModifiers[act]"
                                @[act]="actionHist.push('plot:' + act)" />
                        </template>
                        <VVAxisX>
                            <template v-for="enabled, act in axisActions">
                                <VVAction v-if="enabled" :[act]="true" v-bind="axisActionModifiers[act]"
                                    @[act]="actionHist.push('axis:' + act)" />
                            </template>
                        </VVAxisX>
                    </VVPlot>
                    <div class="row-span-full">
                        <div>
                            <p>action history:</p>
                            <pre class="overflow-auto h-48" ref="hist-container">{{ actionHist.join('\n') }}</pre>
                        </div>
                        <div>
                            <p>action data:</p>
                            <pre class="overflow-auto h-36">{{ actionData }}</pre>
                        </div>
                    </div>
                </div>
            </fieldset>
        </section>
    </article>
</template>
