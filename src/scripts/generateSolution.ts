import { access, mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

const generateSolution = async () => {
    const day = process.argv[2] || new Date().getDate()
    const paddedDay = String(day).padStart(2, "0")

    const TEMPLATE = `
const file = Bun.file("src/inputs/day${paddedDay}.txt")
const input = await file.text()

for (const line of input.split("\\n")) {
    if (!line) {
        continue
    }
}

console.log(\`Day ${paddedDay}, Part 1: \${"solution"}, Part 2: \${"solution"}\`)
`

    const solutionDir = "src/solutions"
    const solutionPath = path.join(solutionDir, `${paddedDay}.ts`)

    await mkdir(solutionDir, { recursive: true })

    try {
        await access(solutionPath)
        console.log(`Solution file ${paddedDay}.ts already exists, skipping`)
        return
    } catch {
        await writeFile(solutionPath, TEMPLATE)
        console.log(`Created solution file: ${solutionPath}`)
    }
}

if (require.main === module) {
    generateSolution().catch((error) => {
        console.error("Error:", error.message)
        process.exit(1)
    })
}

export { generateSolution }
