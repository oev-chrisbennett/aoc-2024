const file = Bun.file('input.txt')
const input = await file.text()

const listA: number[] = []
const listB: number[] = []

for (const line of input.split('\n')) {
    const [a, b] = line.split('   ')
    listA.push(Number(a))
    listB.push(Number(b))
}

listA.sort((x: number, y: number) => x - y)
listB.sort((x: number, y: number) => x - y)

const totalDistance: number = listA.reduce((acc: number, a: number, index: number) => {
    const distance: number = Math.abs(a - listB[index])
    return acc + distance
}, 0)

console.log(totalDistance)