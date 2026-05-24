import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";

test("DESIGN.md exists and passes the Google design.md linter without errors", () => {
  assert.equal(existsSync("DESIGN.md"), true, "Create root DESIGN.md");

  const cli = path.join(process.cwd(), "node_modules", ".bin", "design.md");
  const output = execFileSync(cli, ["lint", "--format", "json", "DESIGN.md"], { encoding: "utf8" });
  const report = JSON.parse(output);

  assert.equal(report.summary.errors, 0, JSON.stringify(report.findings, null, 2));
});
