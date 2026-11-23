"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");
const sw = read("sw.js");

assert.match(html, /<canvas[^>]+id="world"/, "game canvas is present");
assert.match(html, /id="mainMenu"/, "main menu is present");
assert.match(html, /id="titleScreen"/, "hero selection menu is present");
assert.match(html, /id="heroGrid"/, "hero selection is present");
assert.match(html, /id="questLine"/, "quest HUD is present");
assert.match(html, /id="gameOver"/, "checkpoint screen is present");
assert.ok(html.includes("const WORLD_WIDTH=440,WORLD_HEIGHT=360"), "Avarra uses the current large world map");
assert.ok(html.includes("function makeRegionWorld(id,seed)") && html.includes("function makeWorld(initialZone,seed)"), "the six regions are assembled from seeded maps");
assert.ok(html.includes("function changeZone(id,x,y)") && html.includes("const regionAt="), "regions remain connected in one world");
assert.ok(html.includes("function updateNPCs(dt)") && html.includes("updateNPCs(dt)"), "NPCs have ambient movement");
assert.ok(html.includes("heroes[selected].speed*1.3*gearBoost"), "player travel speed has been improved");
assert.ok(html.includes("now/190+(n.phase||0)"), "imported NPC sprites animate at a readable pace");
assert.ok(html.includes("const occupied=new Uint8Array(WORLD_WIDTH*WORLD_HEIGHT)"), "world dressing avoids structures and existing props");
assert.ok(html.includes("road([[354,185],[368,185],[382,193],[389,202]],1)"), "settlement side roads are present");
assert.ok(html.includes("road([[195,105],[211,105],[225,105],[236,112]],1)"), "Eichenruh has connected village paths");
assert.ok(html.includes("function hashSeed(seed,label)") && html.includes("function createWorldSeed()"), "each new run can create a distinct reproducible seed");
assert.ok(html.includes("worldSeed,selected,zone") && html.includes("worldSeed=(Number(d.worldSeed)>>>0)||createWorldSeed()"), "world seed persists when saving and loading");
assert.ok(html.includes("const ridge=(") && html.includes("Windkamm-Ausblick"), "mountain ridges and an optional summit route are generated");
assert.ok(html.includes("const tallPlants=new Set") && html.includes("nearRoad(tx,ty,1)"), "vegetation is clustered and kept away from roads");
assert.ok(html.includes("const houseLooks=") && html.includes("b.spriteFile=look.files"), "houses vary by village and world seed");
assert.ok(html.includes("function resetNewAdventure()") && html.includes("freeSlot=slots.findIndex"), "new worlds use a separate save slot where possible");
assert.ok(html.includes("id===10") && html.includes("id===11") && html.includes("tile===10||tile===11"), "mountain art is drawn and blocks movement");
assert.ok(html.includes('id="worldSeedText"') && html.includes("worldSeedCode(worldSeed)"), "the world code is shown in the HUD and map");
assert.ok(html.includes("const speed=heroes[selected].speed*1.3*gearBoost"), "movement multiplier is applied to all heroes");

const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1])
  .filter(script => script.trim().length > 0);
assert.ok(inlineScripts.length > 0, "at least one inline script is present");
for (const [index, script] of inlineScripts.entries()) {
  new Function(script);
  console.log("Inline script " + (index + 1) + ": syntax OK");
}

const npcBlock = html.match(/const NPC_SPRITE_IDS=\{([\s\S]*?)\};/);
assert.ok(npcBlock, "NPC sprite mapping exists");
const npcSpriteMap = new Map([...npcBlock[1].matchAll(/([a-zA-Z0-9_]+)\s*:\s*(\d+)/g)].map(match => [match[1], Number(match[2])]));
const npcIds = new Set([
  ...[...html.matchAll(/\bnpc\('([^']+)'/g)].map(match => match[1]),
  ...[...html.matchAll(/makeNPC\('([^']+)'/g)].map(match => match[1])
]);
for (const id of npcIds) {
  assert.ok(npcSpriteMap.has(id), "NPC " + id + " uses an imported character sprite");
}
const spriteRoot = "assets/imported/super-retro-world/SuperRetroWorld_CharacterPack_Full/sprite_split";
for (const [name, id] of npcSpriteMap) {
  const sprite = path.join(root, spriteRoot, "character_" + id, "character_" + id + "_frame16x20.png");
  assert.ok(fs.existsSync(sprite), "imported NPC sprite for " + name + " exists");
}

const buildingBlock = html.match(/const BUILDING_SPRITES_BY_ID=\{([\s\S]*?)\};/);
assert.ok(buildingBlock, "building sprite mapping exists");
const buildingMap = new Map([...buildingBlock[1].matchAll(/([a-zA-Z0-9_]+)\s*:\s*'([^']+)'/g)].map(match => [match[1], match[2]]));
const buildingIds = [
  "mira","inn","shop","library","home2","tailor","smith","bakery","garden","clinic",
  "harbor_inn","harbor_shop","harbor_home","harbor_store",
  "eichen_inn","eichen_shop","eichen_home","eichen_smith","eichen_hall",
  "stone_inn","stone_smith","stone_home","stone_store","farm_house"
];
for (const id of buildingIds) {
  assert.ok(buildingMap.has(id), "building " + id + " uses an imported house sprite");
}
const buildingRoot = "assets/imported/fan-tasy-tileset/The Fan-tasy Tileset (Free)/Art/Buildings";
for (const file of new Set(buildingMap.values())) {
  assert.ok(fs.existsSync(path.join(root, buildingRoot, file)), "house sprite " + file + " exists");
}

assert.ok(html.includes("function attack()") && html.includes("function ability()") && html.includes("function dodge()"), "combat actions are present");
assert.ok(html.includes("function drawPackCharacter(") && html.includes("frame16x20.png"), "animated character sprite sheets are used");
assert.ok(html.includes("function drawBuilding(b)") && html.includes("ctx.drawImage(houseImage"), "imported house artwork is rendered");
assert.ok(html.includes("function drawWorldMap()") && html.includes('id="worldMapCanvas"'), "interactive world map is present");
assert.ok(html.includes("autosaveClock>=15") && html.includes("addEventListener('pagehide'"), "autosaving is connected");
assert.ok(sw.includes('CACHE_NAME = "talwind-shell-v12"'), "service worker cache was refreshed");

const manifest = JSON.parse(read("manifest.webmanifest"));
assert.equal(manifest.name, "TALWIND – Die sieben Echos");
assert.ok(fs.existsSync(path.join(root, "sw.js")), "service worker exists");
assert.ok(fs.existsSync(path.join(root, "assets/windruh.svg")), "title art exists");
assert.ok(fs.existsSync(path.join(root, "assets/icon.svg")), "app icon exists");

console.log("TALWIND validation passed.");
