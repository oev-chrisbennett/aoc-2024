import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

const downloadInput = async () => {
    const sessionToken = process.env.AOC_SESSION
    if (!sessionToken) {
        throw new Error("No session token variable is declared.")
    }

    const today = new Date()
    const year = today.getFullYear()
    const day = today.getDate()

    const inputDir = "src/inputs"
    const outputPath = path.join(
        inputDir,
        `day${String(day).padStart(2, "0")}.txt`,
    )

    await mkdir(inputDir, { recursive: true })

    const response = await fetch(
        `https://adventofcode.com/${year}/day/${day}/input`,
        {
            headers: { Cookie: `session=${sessionToken}` },
        },
    )

    if (!response.ok) {
        throw new Error(
            `Failed to download: ${response.status} ${response.statusText}`,
        )
    }

    const input = await response.text()
    await writeFile(outputPath, input)

    return outputPath
}

if (require.main === module) {
    downloadInput()
        .then((filepath) =>
            console.log(`Successfully downloaded input to ${filepath}`),
        )
        .catch((error) => {
            console.error("Error:", error.message)
            process.exit(1)
        })
}

export { downloadInput }
