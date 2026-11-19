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

assert.match(html, /frame16x20\\.png/, "default 16x20 character sheets are used");
assert.match(html, /const HERO_SPRITE_IDS=\\[28,8,1,31,24\\]/, "five distinct pack heroes are configured");
assert.match(html, /Art\\/Buildings\\//, "the exterior building asset folder is used");
assert.match(html, /document\\.addEventListener\\('keydown',keyDown\\)/, "keyboard input is connected at document level");
assert.match(html, /pointerType==='touch'/, "touch joystick movement is handled");
const startGameBlock = html.match(/function startGame\\(\\)\\s*\\{[\\s\\S]*?\\n\\}/)?.[0] || "";
assert.ok(startGameBlock, "startGame function is present");
assert.doesNotMatch(startGameBlock, /showDialogue/, "the opening modal no longer blocks movement");
const spriteRoot = "assets/imported/super-retro-world/SuperRetroWorld_CharacterPack_Full/sprite_split";
for (const id of [1, 8, 24, 28, 31]) {
  const sprite = path.join(root, spriteRoot, `character_${id}`, `character_${id}_frame16x20.png`);
  assert.ok(fs.existsSync(sprite), `hero sprite ${id} exists`);
}
const buildingRoot = "assets/imported/fan-tasy-tileset/The Fan-tasy Tileset (Free)/Art/Buildings";
for (const file of ["House_Hay_1.png", "House_Hay_2.png", "House_Hay_3.png", "House_Hay_4_Purple.png"]) {
  assert.ok(fs.existsSync(path.join(root, buildingRoot, file)), `building sprite ${file} exists`);
}
assert.match(read("sw.js"), /talwind-shell-v2/, "service worker cache was refreshed");

const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
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
