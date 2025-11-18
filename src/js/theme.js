import { obj_merge } from './utils.js'

export const theme_base = {
    axis: {
        line_width: 1,
        tick_width: 1,
        tick_length: 5,
        label_size: 12,
        title_size: 18,
    },
    axis_h: {
        title_offset: 20,
    },
    axis_v: {
        title_offset: 30,
        title_angle: 90,
    },
    axis_left: {
        tick_position: 'left',
        title_position: 'left',
    },
    axis_right: {
        tick_position: 'right',
        title_position: 'right',
    },
    axis_top: {
        tick_position: 'top',
        title_position: 'top',
    },
    axis_bottom: {
        tick_position: 'bottom',
        title_position: 'bottom',
    },
    grid: {
        line_width: 1,
        line_width_major: 2,
    },
    plot: {
        margin: 20,
        padding_h: 50,
        padding_v: 20,
    },
    legend: {
        spacing: 4
    },
}

export const theme_default = {
    axis: {
        line_color: 'black',
        tick_color: 'black',
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
        tick_color: 'gray',
        label_color: 'gray',
        title_color: 'gray',
    },
    grid: {
        line_color: '#eeeeee',
    }
}

const theme_gray = {
    axis: {
        tick_color: 'black',
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
        tick_color: '#333333',
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
        tick_color: 'black',
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
        tick_color: 'black',
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
        return acc ?? undefined
    }, {})
}

export function themePreprocess(theme, flip = false) {
    let {
        axis_h, axis_v, axis_x, axis_y,
        grid_h, grid_v, grid_x, grid_y,
        plot: {
            margin_x, margin_y, margin_h, margin_v,
            padding_x, padding_y, padding_h, padding_v,
            ...plot
        } = {},
        ...rest
    } = theme
    if (flip) {
        axis_h = obj_merge([axis_h, axis_y])
        axis_v = obj_merge([axis_v, axis_x])
        grid_h = obj_merge([grid_h, grid_x])
        grid_v = obj_merge([grid_v, grid_y])
        plot.margin_h = margin_y === undefined ? margin_h : margin_y
        plot.margin_v = margin_x === undefined ? margin_v : margin_x
        plot.padding_h = padding_y === undefined ? padding_h : padding_y
        plot.padding_v = padding_x === undefined ? padding_v : padding_x
    } else {
        axis_h = obj_merge([axis_h, axis_x])
        axis_v = obj_merge([axis_v, axis_y])
        grid_h = obj_merge([grid_h, grid_y])
        grid_v = obj_merge([grid_v, grid_x])
        plot.margin_h = margin_x === undefined ? margin_h : margin_x
        plot.margin_v = margin_y === undefined ? margin_v : margin_y
        plot.padding_h = padding_x === undefined ? padding_h : padding_x
        plot.padding_v = padding_y === undefined ? padding_v : padding_y
    }
    return {
        axis_h, axis_v, grid_h, grid_v, plot, ...rest
    }
}

export function themeBuild(theme) {
    function _grid_build(grid_theme) {
        return {
            line_color_major: ["line_color", "line_color_major"].map(k => grid_theme?.[k]).findLast(x => x !== undefined),
            line_color_minor: ["line_color", "line_color_minor"].map(k => grid_theme?.[k]).findLast(x => x !== undefined),
            line_width_major: ["line_width", "line_width_major"].map(k => grid_theme?.[k]).findLast(x => x !== undefined),
            line_width_minor: ["line_width", "line_width_minor"].map(k => grid_theme?.[k]).findLast(x => x !== undefined),
        }
    }
    return {
        axis: {
            h: obj_merge(["axis", "axis_h"].map(k => theme?.[k])),
            v: obj_merge(["axis", "axis_v"].map(k => theme?.[k])),
            left: obj_merge(
                ["axis", "axis_v", "axis_left"].map(k => theme?.[k])
            ),
            right: obj_merge(
                ["axis", "axis_v", "axis_right"].map(k => theme?.[k])
            ),
            top: obj_merge(
                ["axis", "axis_h", "axis_top"].map(k => theme?.[k])
            ),
            bottom: obj_merge(
                ["axis", "axis_h", "axis_bottom"].map(k => theme?.[k])
            ),
        },
        grid: {
            h: _grid_build(obj_merge(["grid", "grid_h"].map(k => theme?.[k]))),
            v: _grid_build(obj_merge(["grid", "grid_v"].map(k => theme?.[k])))
        },
        plot: {
            margin: {
                left: ["margin", "margin_h", "margin_left"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                right: ["margin", "margin_h", "margin_right"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                top: ["margin", "margin_v", "margin_top"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                bottom: ["margin", "margin_v", "margin_bottom"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
            },
            padding: {
                left: ["padding", "padding_h", "padding_left"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                right: ["padding", "padding_h", "padding_right"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                top: ["padding", "padding_v", "padding_top"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
                bottom: ["padding", "padding_v", "padding_bottom"]
                    .map(k => theme?.plot?.[k])
                    .findLast(x => x !== undefined) ?? 0,
            },
            background: theme?.plot?.background
        },
        selection: theme?.selection ?? {},
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
