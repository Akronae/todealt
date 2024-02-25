import urljoin from "proper-url-join";
import chalk from "chalk";
import path from "path";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env.development" });
dotenv.config({ path: ".env.development.local" });

function Err(msg) {
  throw new Error(msg);
}
function env(name) {
  return process.env[name] ?? Err(`${name} is not defined`);
}

const backUrl = env("NEXT_PUBLIC_API_URL");
const schemaPath = env("API_SCHEMA");

const output = `./src/generated/api`;
const input = urljoin(backUrl, schemaPath);

const command = `npx -y openapi-typescript-codegen --input ${input} --output ${output} \
 --client axios --useUnionTypes --useOptions --indent 2 --name GeneratedApiClient`;

console.log(
  chalk.magenta(
    "🏗️ ",
    `generating client services from ${chalk.yellow(backUrl)}...`
  )
);
console.log("running command:", chalk.gray(command));

execSync(command, { stdio: "inherit" });

execSync(`yarn prettier --write ${path.join(output, "**")} --loglevel silent`, {
  stdio: "inherit",
});

console.log("✅", chalk.green("done at", output));
