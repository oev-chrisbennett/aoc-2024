import { expect, test } from "bun:test"
import { findAllXMAS } from "../solutions/04"

test("04 part 1.1", () => {
    const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`
    const findXMAS = findAllXMAS(
        input.split("\n").map((line) => line.split("")),
    )

    expect(findXMAS).toEqual(18)
})

test("04 part 1.2", () => {
    const input = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`
    const findXMAS = findAllXMAS(
        input.split("\n").map((line) => line.split("")),
    )

    expect(findXMAS).toEqual(4)
})
