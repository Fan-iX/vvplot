import { obj_merge } from './utils.js'

export const theme_base = {
    axis: {
        line_width: 1,
        ticks_width: 1,
        ticks_length: 5,
        label_size: 12,
        title_size: 18,
    },
    axis_x: {
        line_orientation: 'horizontal',
        title_offset: 20,
    },
    axis_y: {
        line_orientation: 'vertical',
        title_offset: 30,
        title_angle: 90,
    },
    axis_left: {
        ticks_position: 'left',
        title_position: 'left',
    },
    axis_right: {
        ticks_position: 'right',
        title_position: 'right',
    },
    axis_top: {
        ticks_position: 'top',
        title_position: 'top',
    },
    axis_bottom: {
        ticks_position: 'bottom',
        title_position: 'bottom',
    },
    grid: {
        line_width_major: 2,
        line_width_minor: 1,
    },
    plot: {
        margin: 20,
        padding_x: 50,
        padding_y: 20,
    },
    legend: {
        spacing: 4
    },
}

export const theme_default = {
    axis: {
        line_color: 'black',
        ticks_color: 'black',
        label_color: 'black',
        title_color: 'black',
    },
    grid: {
        line_color: '#eeeeee',
    },
}

const theme_light = {
    axis: {
        line_color: 'gray',
        ticks_color: 'gray',
        label_color: 'gray',
        title_color: 'gray',
    },
    grid: {
        line_color: '#eeeeee',
    }
}

const theme_gray = {
    axis: {
        ticks_color: 'black',
        label_color: 'black',
        title_color: 'black',
    },
    grid: {
        line_color: 'white',
    },
    plot: {
        background: '#eeeeee'
    }
}

const theme_dark = {
    axis: {
        ticks_color: '#333333',
        label_color: '#555555',
        title_color: 'black',
    },
    grid: {
        line_color: '#666666',
    },
    plot: {
        background: '#888888'
    }
}

const theme_linedraw = {
    axis: {
        line_color: 'black',
        ticks_color: 'black',
        label_color: 'black',
        title_color: 'black',
    },
    grid: {
        line_color: 'black',
        line_width_major: 1,
        line_width_minor: 0.5,
    },
}

const theme_classic = {
    axis: {
        line_color: 'black',
        ticks_color: 'black',
        label_color: 'black',
        title_color: 'black',
    },
    grid: null,
}

const theme_void = {
    axis: null,
    grid: null,
}

export function themeMerge(...themes) {
    return themes.reduce((acc, t) => {
        for (let k in t) {
            if (t[k] === null) {
                acc[k] = null
            } else {
                acc[k] = Object.assign(acc[k] || {}, t[k])
            }
        }
        return acc
    }, {})
}

export function themeBuild(theme) {
    return {
        axis: {
            x: obj_merge(["axis", "axis_x"].map(k => theme?.[k])),
            y: obj_merge(["axis", "axis_y"].map(k => theme?.[k])),
            left: obj_merge(
                ["axis", "axis_y", "axis_left"].map(k => theme?.[k])
            ),
            right: obj_merge(
                ["axis", "axis_y", "axis_right"].map(k => theme?.[k])
            ),
            top: obj_merge(
                ["axis", "axis_x", "axis_top"].map(k => theme?.[k])
            ),
            bottom: obj_merge(
                ["axis", "axis_x", "axis_bottom"].map(k => theme?.[k])
            ),
        },
        grid: {
            x: obj_merge(["grid", "grid_x"].map(k => theme?.[k])),
            y: obj_merge(["grid", "grid_y"].map(k => theme?.[k]))
        },
        plot: {
            margin: {
                left: ["margin", "margin_x", "margin_left"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                right: ["margin", "margin_x", "margin_right"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                top: ["margin", "margin_y", "margin_top"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                bottom: ["margin", "margin_y", "margin_bottom"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
            },
            padding: {
                left: ["padding", "padding_x", "padding_left"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                right: ["padding", "padding_x", "padding_right"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                top: ["padding", "padding_y", "padding_top"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                bottom: ["padding", "padding_y", "padding_bottom"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
            },
            background: theme?.plot?.background ?? 'none'
        },
        legend: {
            spacing: theme?.legend?.spacing ?? 0
        }
    }
}

export default {
    base: theme_base,
    default: theme_default,
    light: theme_light,
    classic: theme_classic,
    gray: theme_gray,
    dark: theme_dark,
    linedraw: theme_linedraw,
    void: theme_void,
}
