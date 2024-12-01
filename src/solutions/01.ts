const file = Bun.file("src/inputs/day01.txt")
const input = await file.text()

const listA: number[] = []
const listB: number[] = []

for (const line of input.split("\n")) {
    if (!line) {
        continue
    }

    const [a, b] = line.split("   ")
    listA.push(Number(a))
    listB.push(Number(b))
}

listA.sort((x: number, y: number) => x - y)
listB.sort((x: number, y: number) => x - y)

const { totalDistance, totalSimilarityScore } = listA.reduce(
    (acc, a, index) => {
        const count: number = listB.filter((b: number) => b === a).length
        const similarityScore = a * count
        const distance: number = Math.abs(a - listB[index])

        return {
            totalDistance: acc.totalDistance + distance,
            totalSimilarityScore: acc.totalSimilarityScore + similarityScore,
        }
    },
    { totalDistance: 0, totalSimilarityScore: 0 },
)

console.log(
    `Total distance: ${totalDistance}, Total similarity score: ${totalSimilarityScore}`,
)
