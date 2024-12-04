type Position = {
    row: number
    col: number
}

const DIRECTIONS: Position[] = [
    { row: -1, col: -1 }, // ↖️
    { row: -1, col: 0 }, // ⬆️
    { row: -1, col: 1 }, // ↗️
    { row: 0, col: -1 }, // ⬅️
    { row: 0, col: 1 }, // ➡️
    { row: 1, col: -1 }, // ↙️
    { row: 1, col: 0 }, // ⬇️
    { row: 1, col: 1 }, // ↘️
]

const isInBounds = (pos: Position, grid: string[][]): boolean => {
    return (
        pos.row >= 0 &&
        pos.row < grid.length &&
        pos.col >= 0 &&
        pos.col < grid[0].length
    )
}

export const findAllXMAS = (grid: string[][]): number => {
    let count = 0

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === "X") {
                for (const dir of DIRECTIONS) {
                    let pos = { row, col }
                    let pattern = "X"

                    for (const nextChar of "MAS") {
                        pos = {
                            row: pos.row + dir.row,
                            col: pos.col + dir.col,
                        }

                        // No match, break
                        if (
                            !isInBounds(pos, grid) ||
                            grid[pos.row][pos.col] !== nextChar
                        ) {
                            break
                        }

                        // Match, add to pattern
                        pattern += nextChar
                    }

                    // Word found, increment count
                    if (pattern === "XMAS") {
                        count++
                    }
                }
            }
        }
    }

    return count
}

const file = Bun.file("src/inputs/day04.txt")
const input = await file.text()
const grid = input.split("\n").map((line) => line.split(""))

const part1 = findAllXMAS(grid)

console.log(`Day 04, Part 1: ${part1}, Part 2: ${"solution"}`)
