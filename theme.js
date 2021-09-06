#!/usr/bin/env node
const { readdirSync, readFileSync, copyFileSync, existsSync } = require("fs");
const { execSync } = require("child_process");
const { join } = require("path");
const { createHash } = require("crypto");
const hashes = require("./hashes.json");
const path = "/data/data/com.termux/files/home/.termux/colors.properties";

const theme = process.argv[2];

if (!theme) {
  console.log("Available Themes:");
  console.log();

  console.log(readdirSync(join(__dirname, "themes"))
    .map(theme => theme.slice(0, -11))
    .map(theme => `  \x1b[5m-\x1b[0m \x1b[33m${theme}\x1b[0m`)
    .join("\n"));

  if (existsSync(path)) {
    const file = readFileSync(path);
    const hash = createHash("md5").update(file).digest("hex");

    console.log();

    if (hashes[hash]) {
      console.log(`You are currently using the theme: \x1b[33m${hashes[hash]}\x1b[0m`);
    } else {
      console.log("\x1b[5mPlease Note:\x1b[0m You may want to backup your \x1b[5m~/.termux/colors.properties\x1b[0m before applying a theme from here as it will override that file.");
    }
  }

  process.exit(1);
}

// Verify theme exists.
if (!existsSync(join(__dirname, "themes", theme + ".properties"))) {
  console.log(`Invalid Theme: ${theme}`);
  process.exit(1);
}

// Override ~/.termux/colors.properties with the choosen theme.
copyFileSync(
  join(__dirname, "themes", theme + ".properties"),
  path
);

// Reload Settings so changes take effect.
execSync("termux-reload-settings");

// Confirm the change to the user.
console.log(`Theme \x1b[33m${theme}\x1b[0m applied. Enjoy!`);
