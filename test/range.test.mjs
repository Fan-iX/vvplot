import test from 'node:test'
import assert from 'node:assert/strict'
import { nextTick } from 'vue'
import { createRangeStore } from '../src/core/range.js'

const initial = { xmin: 0, xmax: 10, ymin: 0, ymax: 10 }

test('range store does not emit while initializing', async () => {
    let events = []
    let store = createRangeStore({
        initialRange: initial,
        initialPreview: initial,
        onRangeChange: (...args) => events.push(['range', ...args]),
        onPreviewChange: (...args) => events.push(['preview', ...args]),
    })
    await nextTick()
    assert.deepEqual(events, [])
    assert.deepEqual({ ...store.range }, initial)
    assert.deepEqual({ ...store.preview }, initial)
})

test('updateRange applies a patch and batches changes', async () => {
    let events = []
    let store = createRangeStore({
        initialRange: initial,
        onRangeChange: (...args) => events.push(args),
    })
    await nextTick()

    store.updateRange({ xmin: 1 })
    store.updateRange({ xmax: 20 })
    await nextTick()

    assert.equal(events.length, 1)
    assert.deepEqual(events[0][0], { xmin: 1, xmax: 20, ymin: 0, ymax: 10 })
    assert.deepEqual(events[0][1], initial)
})

test('updateRange treats undefined as unchanged and null as clear', async () => {
    let events = []
    let store = createRangeStore({
        initialRange: initial,
        onRangeChange: next => events.push(next),
    })
    await nextTick()

    store.updateRange({ xmin: undefined })
    await nextTick()
    assert.equal(store.range.xmin, 0)
    assert.equal(events.length, 0)

    store.updateRange({ xmin: null })
    await nextTick()
    assert.equal(store.range.xmin, null)
    assert.equal(events.length, 1)
    assert.deepEqual(events[0], { xmin: null, xmax: 10, ymin: 0, ymax: 10 })
})

test('updatePreview applies a patch and treats undefined as unchanged', async () => {
    let store = createRangeStore({ initialPreview: initial })

    store.updatePreview({ xmin: 2, xmax: 8 })
    await nextTick()
    assert.deepEqual({ ...store.preview }, { xmin: 2, xmax: 8, ymin: 0, ymax: 10 })

    store.updatePreview({ ymin: null })
    await nextTick()
    assert.deepEqual({ ...store.preview }, { xmin: 2, xmax: 8, ymin: null, ymax: 10 })

    store.updatePreview({ xmin: undefined })
    await nextTick()
    assert.equal(store.preview.xmin, 2)
})

test('setRange replaces the whole state, including missing keys', async () => {
    let store = createRangeStore({ initialRange: initial })

    store.setRange({ xmin: 1, xmax: 20 })
    await nextTick()
    assert.deepEqual({ ...store.range }, {
        xmin: 1, xmax: 20, ymin: undefined, ymax: undefined,
    })
})

test('setRange keeps null and undefined as distinct state values', async () => {
    let events = []
    let store = createRangeStore({
        initialRange: { xmin: null, xmax: 10, ymin: undefined, ymax: 10 },
        onRangeChange: next => events.push(next),
    })
    await nextTick()

    store.setRange({ xmin: undefined, xmax: null, ymin: undefined, ymax: 10 })
    await nextTick()
    assert.equal(store.range.xmin, undefined)
    assert.equal(store.range.xmax, null)
    assert.equal(events.length, 1)

    store.setRange({ xmin: null, xmax: undefined, ymin: undefined, ymax: 10 })
    await nextTick()
    assert.equal(store.range.xmin, null)
    assert.equal(store.range.xmax, undefined)
    assert.equal(events.length, 2)
})

test('setPreview replaces the whole state, including missing keys', async () => {
    let store = createRangeStore({ initialPreview: initial })

    store.setPreview({ xmin: 2, xmax: 8 })
    await nextTick()
    assert.deepEqual({ ...store.preview }, {
        xmin: 2, xmax: 8, ymin: undefined, ymax: undefined,
    })
})

test('setPreview synchronizes null and undefined state values exactly', async () => {
    let events = []
    let store = createRangeStore({
        initialPreview: { xmin: null, xmax: 10, ymin: undefined, ymax: 10 },
        onPreviewChange: next => events.push(next),
    })
    await nextTick()

    store.setPreview({ xmin: undefined, xmax: null, ymin: undefined, ymax: 10 })
    await nextTick()
    assert.equal(store.preview.xmin, undefined)
    assert.equal(store.preview.xmax, null)
    assert.equal(events.length, 1)

    store.setPreview({ xmin: null, xmax: undefined, ymin: undefined, ymax: 10 })
    await nextTick()
    assert.equal(store.preview.xmin, null)
    assert.equal(store.preview.xmax, undefined)
    assert.equal(events.length, 2)
})

test('preview and range stay separate until explicitly updated', async () => {
    let store = createRangeStore({
        initialRange: initial,
        initialPreview: initial,
    })

    store.updatePreview({ xmin: 2, xmax: 8 })
    await nextTick()
    assert.deepEqual({ ...store.range }, initial)
    assert.deepEqual({ ...store.preview }, { ...initial, xmin: 2, xmax: 8 })

    store.updateRange({ xmin: 2, xmax: 8 })
    store.clearPreview()
    await nextTick()
    assert.deepEqual({ ...store.range }, { ...initial, xmin: 2, xmax: 8 })
    assert.deepEqual({ ...store.preview }, {
        xmin: undefined, xmax: undefined, ymin: undefined, ymax: undefined,
    })
})

test('clearPreview leaves committed range untouched', async () => {
    let store = createRangeStore({ initialRange: initial, initialPreview: initial })
    store.updatePreview({ xmin: 1, xmax: 2 })
    store.clearPreview()
    await nextTick()
    assert.deepEqual({ ...store.preview }, {
        xmin: undefined, xmax: undefined, ymin: undefined, ymax: undefined,
    })
    assert.deepEqual({ ...store.range }, initial)
})

test('initial state defaults missing keys to undefined', () => {
    let store = createRangeStore({
        initialRange: { xmin: undefined, xmax: 20 },
        initialPreview: { ymin: undefined, ymax: 30 },
    })
    assert.equal(store.range.xmin, undefined)
    assert.equal(store.range.xmax, 20)
    assert.equal(store.range.ymin, undefined)
    assert.equal(store.range.ymax, undefined)
    assert.equal(store.preview.xmin, undefined)
    assert.equal(store.preview.ymin, undefined)
    assert.equal(store.preview.ymax, 30)
})
