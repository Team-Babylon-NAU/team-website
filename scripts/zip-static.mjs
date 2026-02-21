import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const cwd = process.cwd();
const staticDir = join(cwd, "public", "static-site");
const outDir = join(cwd, "public");

// Verify files exist
const files = ["index.html", "app.css", "app.js"];
for (const f of files) {
  const p = join(staticDir, f);
  if (!existsSync(p)) {
    console.error("Missing file:", p);
    process.exit(1);
  }
  console.log("Found:", f);
}

// Create zip
try {
  execSync(`cd "${staticDir}" && zip -r "${join(outDir, "nexus-project.zip")}" index.html app.css app.js`, {
    stdio: "inherit",
  });
  console.log("\nZIP created at: public/nexus-project.zip");
} catch {
  // Fallback to tar
  try {
    execSync(`cd "${staticDir}" && tar -czf "${join(outDir, "nexus-project.tar.gz")}" index.html app.css app.js`, {
      stdio: "inherit",
    });
    console.log("\nArchive created at: public/nexus-project.tar.gz");
  } catch (e) {
    console.log("\nCould not create archive. Files are available at public/static-site/");
    console.log("  - index.html");
    console.log("  - app.css");  
    console.log("  - app.js");
  }
}
