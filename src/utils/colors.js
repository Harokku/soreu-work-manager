// Usage: import { fromArray } from '../utils/colors'

// Create a function that returns a color from an array of colors based on an index value
export const fromArray = (index) => {
    const colors = ["red", "amber", "green", "cyan", "violet", "pink"] // <-- Array of colors
    return colors[index % colors.length] // <-- Return color from array based on index value (modulo array length)
}

export const bg50 = (index) => {
    const colors = ["bg-red-50", "bg-amber-50", "bg-green-50", "bg-cyan-50", "bg-violet-50", "bg-pink-50"] // <-- Array of colors
    return colors[index % colors.length] // <-- Return color from array based on index value (modulo array length)
}

export const bg300 = (index) => {
    const colors = ["bg-red-300", "bg-amber-300", "bg-green-300", "bg-cyan-300", "bg-violet-300", "bg-pink-300"] // <-- Array of colors
    return colors[index % colors.length] // <-- Return color from array based on index value (modulo array length)
}

export const beforeBg600 = (index) => {
    const colors = ["before:bg-red-600", "before:bg-amber-600", "before:bg-green-600", "before:bg-cyan-600", "before:bg-violet-600", "before:bg-pink-600"] // <-- Array of colors
    return colors[index % colors.length] // <-- Return color from array based on index value (modulo array length)
}

export const afterBg600 = (index) => {
    const colors = ["after:bg-red-600", "after:bg-amber-600", "after:bg-green-600", "after:bg-cyan-600", "after:bg-violet-600", "after:bg-pink-600"] // <-- Array of colors
    return colors[index % colors.length] // <-- Return color from array based on index value (modulo array length)
}