import {test, expect} from "vitest"
import {dividePerCategory} from "./utils"

test("divide per category with clean data", () => {
    // test dividePerCategory with clean data
    const issues = [
        {id: 1, category: "a"},
        {id: 2, category: "a"},
        {id: 3, category: "b"},
        {id: 4, category: "b"},
        {id: 5, category: "c"},
    ]
    const result = dividePerCategory(issues)
    expect(result).toEqual({
        a: [{id: 1, category: "a"}, {id: 2, category: "a"}],
        b: [{id: 3, category: "b"}, {id: 4, category: "b"}],
        c: [{id: 5, category: "c"}],
    })
})