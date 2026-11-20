"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");

assert.match(html, /<canvas[^>]+id="world"/, "game canvas is present");
assert.match(html, /id="mainMenu"/, "separate start menu is present");
assert.match(html, /id="titleScreen"/, "hero selection menu is present");
assert.ok(html.includes("const sizes={windruh:[96,72]"), "Windruh is larger than before");
assert.ok(html.includes("label:'Nordbrücke · Flüsterwald'") && !html.includes("label:'Ostweg · Nebelmoor'") && !html.includes("label:'Südweg · Echo-Schrein'"), "Windruh has one exit to the forest only");
assert.ok(html.includes("const inDoor=Math.abs(x+12-VW/2)<34"), "room exit has a dedicated doorway corridor");
assert.ok(html.includes("if(!room){const px=player.x+12,py=player.y+31;const exit=world.exits.find"), "overworld exits trigger by walking");
assert.match(html, /id="gameOver"/, "checkpoint screen is present");
assert.match(html, /id="retryBtn"/, "checkpoint action is present");
assert.match(html, /id="heroGrid"/, "hero selection is present");
assert.match(html, /id="questLine"/, "quest HUD is present");
assert.match(html, /id="skillCooldown"/, "ability cooldown is visible");
assert.match(html, /id="attackCooldown"/, "attack cooldown is visible");
assert.ok(html.includes("function questGuideTarget(") && html.includes("function drawQuestGuide("), "main quest direction arrow is implemented");
assert.ok(html.includes("One road only: the village connects to the forest through the north bridge."), "Windruh has only one outer-region route");
assert.ok(html.includes("label:'Nordbrücke · Flüsterwald'") && !html.includes("label:'Ostweg · Nebelmoor'") && !html.includes("label:'Südweg · Echo-Schrein'"), "moor and shrine exits are not inside the village");
assert.ok(html.includes("for(let i=0;i<980;i++)") && html.includes("for(let i=0;i<420;i++)"), "forest vegetation density is increased");
assert.ok(html.includes("for(let i=0;i<390;i++)") && html.includes("for(let i=0;i<170;i++)"), "moor vegetation density is increased");
assert.ok(html.includes("ripple=Math.sin(now/170)") && html.includes("o.x+31,o.y+52"), "fountain has a larger ornate basin and animated water");
assert.ok(html.includes("to:'shrine',tx:30*T") && html.includes("to:'wald',tx:110*T"), "shrine is reached from the forest and returns to the forest");
assert.ok(html.includes("function updateNPCs(dt)") && html.includes("updateNPCs(dt)"), "NPCs have ambient roaming movement");
assert.ok(html.includes("const pulse=Math.sin(now/210)"), "fountain has recognizable animated basin details");
assert.ok(html.includes("function spawnCombatFx("), "combat visual effects are implemented");
assert.ok(html.includes("function drawCombatEffects("), "combat effects are rendered");
assert.ok(html.includes("function combatTarget("), "combat targeting uses facing direction and range");
assert.ok(html.includes("function damageMonster("), "shared enemy damage handling is present");
assert.ok(html.includes("player.attackAnim=.24"), "basic attacks trigger an animation");
assert.ok(html.includes("player.skillAnim=.72"), "hero abilities trigger an animation");
assert.ok(html.includes("STEINHAUT · SCHUTZ AKTIV") && html.includes("STERNENSCHUSS") && html.includes("ECHOWELLE"), "hero abilities have distinct feedback");

assert.ok(html.includes("frame16x20.png"), "default 16x20 character sheets are used");
assert.ok(html.includes("const HERO_SPRITE_IDS=[28,8,1,31,24]"), "five distinct pack heroes are configured");
assert.ok(html.includes("Art/Buildings/"), "the exterior building asset folder is used");
assert.ok(html.includes("document.addEventListener('keydown',keyDown)"), "keyboard input is connected at document level");
assert.ok(html.includes("pointerType==='touch'"), "touch joystick movement is handled");
const startGameStart = html.indexOf("function startGame(){");
const startGameEnd = html.indexOf("function startLoop(", startGameStart);
const startGameBlock = startGameStart >= 0 && startGameEnd > startGameStart
  ? html.slice(startGameStart, startGameEnd)
  : "";
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
assert.ok(read("sw.js").includes('CACHE_NAME = "talwind-shell-v8"'), "service worker cache was refreshed");

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


assert.ok(html.includes('id="worldClock"') && html.includes("function drawDayNight("), "day/night cycle and clock HUD exist");
assert.ok(html.includes("function renderInventoryPanel(") && html.includes("const BAG_SLOTS=24"), "24-slot inventory exists");
assert.ok(html.includes("function openChestPanel(") && html.includes("function transferChestItem("), "storage chests can transfer items");
assert.ok(html.includes("function startFishing(") && html.includes("function drawFishingRod("), "fishing minigame and rod animation exist");
assert.ok(html.includes("const RECIPES=") && html.includes("ironArmor") && html.includes("frostMantle"), "armor crafting recipes exist");
assert.ok(html.includes("function takePlayerHit(") && html.includes("function armorBlockChance("), "armor affects incoming damage");
assert.ok(html.includes("copperVein1") && html.includes("ironVein1") && html.includes("frostVein1"), "ore nodes exist in caves and ice biome");
assert.ok(html.includes("drawTreeVariant(") && html.includes("'berryBush'") && html.includes("'snowPine'"), "tree, bush and snow foliage variants exist");
assert.ok(html.includes("id:'forestCache'") && html.includes("id:'moorCache'") && html.includes("id:'caveCache'"), "three world chests exist");
assert.ok(html.includes("function collectQuestItem(item)") && html.includes("nodeId"), "resource mining and persistence are implemented");
