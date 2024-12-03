const MULTIPLICATION_PATTERN = /mul\((\d+),(\d+)\)/g

const parseMultiplication = (match: string): { a: number; b: number } => {
    const [a, b] = match.slice(4, -1).split(",").map(Number)

    return {
        a,
        b,
    }
}

const calculateLineMultiplications = (line: string): number => {
    const matches = Array.from(line.matchAll(MULTIPLICATION_PATTERN))

    return matches.reduce((sum, [match]) => {
        const { a, b } = parseMultiplication(match)
        return sum + a * b
    }, 0)
}

const calculateResult = async (): Promise<number> => {
    const file = Bun.file("src/inputs/day03.txt")
    const input = await file.text()

    return input
        .split("\n")
        .reduce((total, line) => total + calculateLineMultiplications(line), 0)
}

const part1 = await calculateResult()

console.log(`Day 03, Part 1: ${part1}, Part 2: ${"solution"}`)
