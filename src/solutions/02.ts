const file = Bun.file("src/inputs/day02.txt")
const input = await file.text()

for (const line of input.split("\n")) {
    if (!line) {
        continue
    }
}

console.log(`Day 02, Part 1: ${"solution"}, Part 2: ${"solution"}`)
