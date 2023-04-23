import {test,expect} from "vitest"
import {fromArray} from "./colors"

test("return red if index is 0", () => {
    expect(fromArray(0)).toBe("red")
})

test("return amber if index is 1", () => {
    expect(fromArray(1)).toBe("amber")
})

test("return green if index is 2", () => {
    expect(fromArray(2)).toBe("green")
})

test("return cyan if index is 3", () => {
    expect(fromArray(3)).toBe("cyan")
})

test("return violet if index is 4", () => {
    expect(fromArray(4)).toBe("violet")
})

test("return pink if index is 5", () => {
    expect(fromArray(5)).toBe("pink")
})

test("return red if index is 6", () => {
    expect(fromArray(6)).toBe("red")
})
