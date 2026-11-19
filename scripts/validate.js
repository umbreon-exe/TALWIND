"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");

assert.match(html, /<canvas[^>]+id="world"/, "game canvas is present");
assert.match(html, /id="titleScreen"/, "title screen is present");
assert.match(html, /id="gameOver"/, "checkpoint screen is present");
assert.match(html, /id="retryBtn"/, "checkpoint action is present");
assert.match(html, /id="heroGrid"/, "hero selection is present");
assert.match(html, /id="questLine"/, "quest HUD is present");

const inlineScripts = [...html.matchAll(/<script(?:\\s[^>]*)?>([\\s\\S]*?)<\\/script>/gi)]
  .map(match => match[1])
  .filter(script => script.trim().length > 0);
assert.ok(inlineScripts.length > 0, "at least one inline script is present");
for (const [index, script] of inlineScripts.entries()) {
  // Parse without running browser-dependent game code.
  new Function(script);
  console.log(`Inline script ${index + 1}: syntax OK`);
}

const manifest = JSON.parse(read("manifest.webmanifest"));
assert.equal(manifest.name, "TALWIND – Die sieben Echos");
assert.ok(fs.existsSync(path.join(root, "sw.js")), "service worker exists");
assert.ok(fs.existsSync(path.join(root, "assets/windruh.svg")), "title art exists");
assert.ok(fs.existsSync(path.join(root, "assets/icon.svg")), "app icon exists");

console.log("TALWIND validation passed.");
