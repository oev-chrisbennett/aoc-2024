import { expect, test } from "bun:test"
import { findAllXMAS, xMasTheSpot } from "../solutions/04"

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

test("04 part 2.1", () => {
    const input = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`
    const part2 = xMasTheSpot(input.split("\n").map((line) => line.split("")))
    expect(part2).toEqual(9)
})

test("04 part 2.2", () => {
    const input = `XXXX
XXXM
XXXX
AXXX
XSXX`
    const part2 = xMasTheSpot(input.split("\n").map((line) => line.split("")))
    expect(part2).toEqual(0)
})
