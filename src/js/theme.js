export const theme_base = {
    axis_x: {
        line_orientation: 'horizontal',
        title_offset: 20,
    },
    axis_y: {
        line_orientation: 'vertical',
        title_offset: 50,
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
    plot: {
        margin: 20,
        padding_x: 50,
        padding_y: 20,
    },
}

export const theme_default = {
    axis: {
        line_color: 'black',
        line_width: 1,
        ticks_color: 'black',
        ticks_width: 1,
        ticks_length: 5,
        label_color: 'black',
        label_size: 12,
        title_color: 'black',
        title_size: 18,
    },
    grid: {
        line_color: '#eeeeee',
        line_width_major: 2,
        line_width_minor: 1,
    },
    legend: {
        spacing: 4
    }
}

const theme_light = {
    axis: {
        line_color: 'gray',
        line_width: 1,
        ticks_color: 'gray',
        ticks_width: 1,
        ticks_length: 5,
        label_color: 'gray',
        label_size: 12,
        title_color: 'gray',
        title_size: 18,
    },
    grid: {
        line_color: '#eeeeee',
        line_width_major: 2,
        line_width_minor: 1,
    },
    legend: {
        spacing: 4
    }
}

const theme_classic = {
    axis: {
        line_color: 'black',
        line_width: 1,
        ticks_color: 'black',
        ticks_width: 1,
        ticks_length: 5,
        label_color: 'black',
        label_size: 12,
        title_color: 'black',
        title_size: 18,
    },
    legend: {
        spacing: 4
    }
}

function obj_merge(arr) {
    arr = arr.filter(x => x !== undefined)
    arr = arr.slice(arr.findIndex(x => x == null) + 1)
    if (arr.length == 0) return null
    return arr.reduce((a, c) => Object.assign(a, c), {})
}

export function themeMerge(...themes) {
    return {
        axis: {
            left: obj_merge(
                ["axis", "axis_y", "axis_left"].flatMap(k => themes.map(t => t?.[k]))
            ),
            right: obj_merge(
                ["axis", "axis_y", "axis_right"].flatMap(k => themes.map(t => t?.[k]))
            ),
            top: obj_merge(
                ["axis", "axis_x", "axis_top"].flatMap(k => themes.map(t => t?.[k]))
            ),
            bottom: obj_merge(
                ["axis", "axis_x", "axis_bottom"].flatMap(k => themes.map(t => t?.[k]))
            ),
        },
        grid: {
            x: obj_merge(
                ["grid", "grid_x"].flatMap(k => themes.map(t => t?.[k]))
            ),
            y: obj_merge(
                ["grid", "grid_y"].flatMap(k => themes.map(t => t?.[k]))
            )
        },
        plot: {
            margin: {
                left: ["margin", "margin_x", "margin_left"]
                    .flatMap(k => themes.map(t => t?.plot?.[k]))
                    .findLast(x => x !== undefined) ?? 0,
                right: ["margin", "margin_x", "margin_right"]
                    .flatMap(k => themes.map(t => t?.plot?.[k]))
                    .findLast(x => x !== undefined) ?? 0,
                top: ["margin", "margin_y", "margin_top"]
                    .flatMap(k => themes.map(t => t?.plot?.[k]))
                    .findLast(x => x !== undefined) ?? 0,
                bottom: ["margin", "margin_y", "margin_bottom"]
                    .flatMap(k => themes.map(t => t?.plot?.[k]))
                    .findLast(x => x !== undefined) ?? 0,
            },
            padding: {
                left: ["padding", "padding_x", "padding_left"]
                    .flatMap(k => themes.map(t => t?.plot?.[k]))
                    .findLast(x => x !== undefined) ?? 0,
                right: ["padding", "padding_x", "padding_right"]
                    .flatMap(k => themes.map(t => t?.plot?.[k]))
                    .findLast(x => x !== undefined) ?? 0,
                top: ["padding", "padding_y", "padding_top"]
                    .flatMap(k => themes.map(t => t?.plot?.[k]))
                    .findLast(x => x !== undefined) ?? 0,
                bottom: ["padding", "padding_y", "padding_bottom"]
                    .flatMap(k => themes.map(t => t?.plot?.[k]))
                    .findLast(x => x !== undefined) ?? 0,
            }
        },
        legend: {
            spacing: themes.map(t => t?.legend?.spacing)
                .findLast(x => x !== undefined) ?? 0
        }
    }
}

export default {
    base: theme_base,
    default: theme_default,
    light: theme_light,
    classic: theme_classic,
}
