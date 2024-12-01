import { spawn } from "node:child_process"

const day = process.argv[2] || new Date().getDate()
const paddedDay = String(day).padStart(2, "0")
const solutionPath = `src/solutions/${paddedDay}.ts`

const childProcess = spawn("bun", ["run", "--watch", solutionPath], {
    stdio: "inherit",
})

childProcess.on("error", (err: Error) => {
    console.error(`Failed to start solution: ${err.message}`)
    process.exit(1)
})
