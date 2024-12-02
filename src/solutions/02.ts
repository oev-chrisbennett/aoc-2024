const isSafe = ({ levels }: { levels: number[] }): boolean => {
    const differences: number[] = []

    for (let i = 1; i < levels.length; i++) {
        differences.push(levels[i] - levels[i - 1])
    }

    const increasing = differences.every((d) => d >= 1 && d <= 3)
    const decreasing = differences.every((d) => d <= -1 && d >= -3)

    return increasing || decreasing
}

const input = await Bun.file("src/inputs/day02.txt").text()
const reports = input.split("\n").map((line) => line.split(" ").map(Number))

let safe = 0
let madeSafe = 0

for (const report of reports) {
    let tolerable = false

    for (let i = 0; i < report.length; i++) {
        const removed = [...report.slice(0, i), ...report.slice(i + 1)]

        if (isSafe({ levels: removed })) {
            tolerable = true
            break
        }
    }

    if (isSafe({ levels: report })) safe++
    if (isSafe({ levels: report }) || tolerable) madeSafe++
}

console.log({ part1: safe, part2: madeSafe })
