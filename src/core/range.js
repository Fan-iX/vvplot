/**
 * Unified range state for a plot.
 *
 * `range` is the committed data range and `preview` is the temporary range
 * used while an interaction is in progress.
 */
import { shallowReactive, watch } from 'vue'

/**
 * @param {Object} [options]
 * @param {Object} [options.initialRange]
 * @param {Object} [options.initialPreview]
 * @param {Function} [options.onRangeChange]
 * @param {Function} [options.onPreviewChange]
 */
export function createRangeStore({
    initialRange = {},
    initialPreview = {},
    onRangeChange,
    onPreviewChange,
} = {}) {
    const range = shallowReactive((({ xmin, xmax, ymin, ymax }) => ({ xmin, xmax, ymin, ymax }))(initialRange))
    const preview = shallowReactive((({ xmin, xmax, ymin, ymax }) => ({ xmin, xmax, ymin, ymax }))(initialPreview))

    watch(() => ({ ...range }), (next, prev) => onRangeChange?.(next, prev), { flush: 'pre' })
    watch(() => ({ ...preview }), (next, prev) => onPreviewChange?.(next, prev), { flush: 'pre' })

    function updateRange(next) {
        for (let key of ['xmin', 'xmax', 'ymin', 'ymax']) {
            if (next?.[key] !== undefined && !Object.is(range[key], next[key])) {
                range[key] = next[key]
            }
        }
    }

    function setRange(next) {
        if (next == null) return
        for (let key of ['xmin', 'xmax', 'ymin', 'ymax']) {
            if (!Object.is(range[key], next[key])) {
                range[key] = next[key]
            }
        }
    }

    function updatePreview(next) {
        for (let key of ['xmin', 'xmax', 'ymin', 'ymax']) {
            if (next?.[key] !== undefined && !Object.is(preview[key], next[key])) {
                preview[key] = next[key]
            }
        }
    }

    function setPreview(next) {
        if (next == null) return
        for (let key of ['xmin', 'xmax', 'ymin', 'ymax']) {
            if (!Object.is(preview[key], next[key])) {
                preview[key] = next[key]
            }
        }
    }

    function clearPreview() {
        preview.xmin = preview.xmax = preview.ymin = preview.ymax = undefined
    }

    return {
        range, preview,
        setRange, updateRange, setPreview, updatePreview, clearPreview,
    }
}
