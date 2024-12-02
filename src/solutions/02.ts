type Report = number[]
type ReportValidator = (numbers: Report) => boolean

interface ReportAnalysisResult {
    increasingCount: number
    decreasingCount: number
    totalValidReports: number
}

const REPORT_DIFF_MIN = 0
const REPORT_DIFF_MAX = 4

const getDifference = (current: number, previous: number): number =>
    Math.abs(current - previous)

const isValidDifference = (diff: number): boolean =>
    diff > REPORT_DIFF_MIN && diff < REPORT_DIFF_MAX

const validateReport = (
    levels: Report,
    comparator: (current: number, previous: number) => boolean,
): boolean => {
    return levels.every((num, index) => {
        if (index === 0) return true

        const previous = levels[index - 1]
        const diff = getDifference(num, previous)

        return comparator(num, previous) && isValidDifference(diff)
    })
}

const isIncreasingReport: ReportValidator = (numbers) =>
    validateReport(numbers, (current, previous) => current > previous)

const isDecreasingReport: ReportValidator = (numbers) =>
    validateReport(numbers, (current, previous) => current < previous)

const analyseReports = async (): Promise<ReportAnalysisResult> => {
    const file = Bun.file("src/inputs/day02.txt")
    const input = await file.text()

    const result = input
        .split("\n")
        .filter(Boolean)
        .reduce(
            (acc: ReportAnalysisResult, line) => {
                const numbers = line.split(" ").map(Number)
                const isIncreasing = isIncreasingReport(numbers)
                const isDecreasing = isDecreasingReport(numbers)

                return {
                    increasingCount:
                        acc.increasingCount + (isIncreasing ? 1 : 0),
                    decreasingCount:
                        acc.decreasingCount + (isDecreasing ? 1 : 0),
                    totalValidReports:
                        acc.totalValidReports +
                        (isIncreasing || isDecreasing ? 1 : 0),
                }
            },
            {
                increasingCount: 0,
                decreasingCount: 0,
                totalValidReports: 0,
            },
        )

    return result
}

const resultPart1 = await analyseReports()
console.log(
    `Day 02, Part 1: ${resultPart1.totalValidReports}, Part 2: "solution"`,
)
