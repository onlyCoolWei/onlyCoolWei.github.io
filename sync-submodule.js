import { execSync } from "child_process"
import { existsSync } from "fs"

const run = (cmd, cwd) => {
  try {
    console.log(`\n> Running: ${cmd} in ${cwd || "root"}`)
    execSync(cmd, { cwd, stdio: "inherit" })
  } catch (err) {
    console.error(`\n[Error] Failed to run: ${cmd}`)
    process.exit(1)
  }
}

const timestamp = new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })

// 1. Sync inside the submodule (content folder -> my-repository)
if (existsSync("content")) {
  console.log("=== Checking content submodule ===")
  // Fetch and pull latest changes from my-repository remote first
  run("git pull origin main", "content")

  // Check if there are local modifications in the submodule
  const status = execSync("git status --porcelain", { cwd: "content" }).toString().trim()
  if (status) {
    console.log("Local changes found in content/. Committing and pushing...")
    run("git add .", "content")
    run(`git commit -m "Obsidian vault update: ${timestamp}"`, "content")
    run("git push origin main", "content")
  } else {
    console.log("No local changes in content/ submodule.")
  }
}

// 2. Update submodule reference in parent repo
console.log("\n=== Checking submodule references in my-brain ===")
run("git submodule update --remote --merge")

// 3. Commit and push parent repo changes (my-brain -> onlyCoolWei.github.io)
const parentStatus = execSync("git status --porcelain").toString().trim()
if (parentStatus) {
  console.log("Submodule reference or configuration has changed. Updating my-brain...")
  run("git add .")
  run(`git commit -m "Sync: update content submodule to latest: ${timestamp}"`)
  run("git push origin main")
} else {
  console.log("No changes in my-brain parent repo.")
}

console.log("\n=== All repositories synchronized successfully! ===")
