const { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } = require("fs");
const { basename, join } = require("path");
const { createHash } = require("crypto");
const path = process.argv[2] || "/data/data/com.termux/files/home/.config/nvim/bundle/doki-theme-vim/autoload";

// Ensure output directory exists.
if (!existsSync("themes")) mkdirSync("themes");

function parseTheme(filename) {
  const file = readFileSync(filename);
  const name = basename(filename).slice(0, -4);
  const regex = /color_(\d+)\s*=\s'(#[A-Za-z0-9]+)'/ig;
  const foreground = /palette.fg\s*=\s*\['(#[A-Za-z0-9]+)'/.exec(file)[1];
  const background = /palette.bg\s*=\s*\['(#[A-Za-z0-9]+)'/.exec(file)[1];
  const colors = [];

  let match;
  while ((match = regex.exec(file)) !== null) {
    colors.push(match[2]);
  }

  return { name, colors, foreground, background };
}

const files = readdirSync(path);

const hashes = {};
let count = 0;

for (const file of files) {
  const theme = parseTheme(join(path, file));

  const themeFile = [
    `background \t\t: ${theme.background}`,
    `foreground \t\t: ${theme.foreground}`,
    "",
    ...theme.colors.map((color, i) => {
      return `${`color${i}`.padEnd(8, " ")}\t\t\t: ${color}`;
    })
  ].join("\n");


  const hash = createHash("md5").update(themeFile).digest("hex");
  hashes[hash] = theme.name;

  writeFileSync(`themes/${theme.name}.properties`, themeFile);

  console.log(`Wrote themes/${theme.name}.properties`);
  count++;
}

writeFileSync("hashes.json", JSON.stringify(hashes));
console.log("Wrote hashes.json");

console.log();
console.log(`Wrote ${count} themes.`);
