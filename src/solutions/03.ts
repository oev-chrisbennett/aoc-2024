const MULTIPLICATION_PATTERN = /mul\((\d+),(\d+)\)/g
const DO_OR_DONT_PATTERN = /(?:do\(\)|don't\(\))/g

type Slice = {
    content: string
    startIndex?: number
    endIndex?: number
    type: "do" | "dont" | "neither"
    total: number
}

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

const calculatePart2 = (input: string): number => {
    const markers = Array.from(input.matchAll(DO_OR_DONT_PATTERN))

    if (!markers.length) {
        return calculateLineMultiplications(input)
    }

    const processMarker = (marker: RegExpMatchArray, index: number): Slice => {
        const nextMarker = markers[index + 1]
        const markerLength = marker[0].length

        return {
            content: input.substring(
                (marker.index ?? 0) + markerLength,
                nextMarker?.index ?? input.length,
            ),
            startIndex: marker.index ?? 0,
            endIndex: nextMarker?.index ?? input.length,
            type: marker[0] === "do()" ? "do" : "dont",
            total: 0,
        }
    }

    const initialSlice: Slice = {
        content: input.substring(0, markers[0].index),
        type: "neither",
        total: calculateLineMultiplications(
            input.substring(0, markers[0].index),
        ),
    }

    const slices = markers.map((marker, index) => {
        const slice = processMarker(marker, index)
        slice.total =
            slice.type !== "dont"
                ? calculateLineMultiplications(slice.content)
                : 0
        return slice
    })

    return [initialSlice, ...slices].reduce(
        (sum, slice) => sum + slice.total,
        0,
    )
}

const calculateResult = async (): Promise<{ part1: number; part2: number }> => {
    const file = Bun.file("src/inputs/day03.txt")
    const input = await file.text()

    const part1 = calculateLineMultiplications(input)
    const part2 = calculatePart2(input)

    return { part1: part1, part2: part2 }
}

const { part1, part2 } = await calculateResult()

console.log(`Day 03, Part 1: ${part1}, Part 2: ${part2}`)
