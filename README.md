# TALWIND – Die sieben Echos

Ein eigenständiges 2D-Pixel-Abenteuer im Browser. Erkunde Avarra, beginne in Windruh, sprich mit den Bewohnern, sammle Echosamen und Waldblüten und stelle dich dem Wächter des ersten Echo-Schreins.

## Spielen

Das Spiel besteht aus statischen Dateien und benötigt keinen Build-Schritt und keinen Server-Code. Öffne die veröffentlichte Website oder starte lokal einen kleinen HTTP-Server im Projektordner:

```bash
python3 -m http.server 8000
```

Rufe danach `http://localhost:8000` im Browser auf. Für Offline-Funktionen und den Service Worker ist eine lokale HTTP-Adresse erforderlich; `file://` reicht dafür nicht.

## Steuerung

| Aktion | Tastatur | Touch / Gamepad |
|---|---|---|
| Bewegen | WASD oder Pfeiltasten | Virtueller Stick / linker Stick |
| Interagieren | E oder Leertaste | Aktion / A |
| Angreifen | J | Angriff / B |
| Fähigkeit | K | Fähigkeit / X |
| Ausweichen / Rolle | Shift | Rolle / Y |
| Heiltrank | H | Rucksack öffnen |

## Enthalten

- Fünf auswählbare Helden mit unterschiedlichen Fähigkeiten
- Windruh, Flüsterwald, Nebelmoor, Flüsterhöhle, Frostgrat und Echo-Schrein
- Hauptquest, Nebenquests, Bewohnerdialoge, Häuser und Laden
- Gegner, Bosskampf, Herzen, Erfahrung, Windtaler und Gegenstände
- Drei lokale Speicherplätze über den Browser-Speicher
- Touch-Steuerung, Gamepad-Unterstützung und Vollbild-fähiges Layout
- Installierbares PWA-Grundgerüst und Offline-Caching der Kern-Dateien
- GitHub Actions prüft bei Push und Pull Request die Syntax des eingebetteten JavaScripts und die benötigten Spieldateien

## Spielstände

Spielstände werden aktuell lokal im Browser über `localStorage` gespeichert. Sie werden nicht automatisch zwischen Geräten oder Browsern synchronisiert. Browserdaten zu löschen kann lokale Spielstände entfernen; nutze die Speicherplätze im Spiel und behalte deinen Browserdatenspeicher bei.

## Grafik und Assets

Die Titelillustration und das App-Symbol in `assets/` sind eigenständige SVG-Dateien für dieses Repository. Die Spielwelt verwendet ihren eingebauten Pixel-Art-Renderer. Es werden keine externen Asset-Pakete nachgeladen.

## Veröffentlichung auf Render

TALWIND ist eine statische Website. Verbinde dieses Repository in Render als **Static Site**, Branch `main`, Build Command leer lassen und Publish Directory auf `.` setzen. Danach veröffentlicht Render neue Commits automatisch. Die Website braucht weder eine Datenbank noch einen kostenpflichtigen Serverprozess.

## Aktueller Umfang

Der veröffentlichte Spielstand ist ein Singleplayer-Abenteuer. Online-Koop / Beitrittscodes sind nicht in dieser Version implementiert. Dafür wäre zusätzlich ein autoritativer Multiplayer-Server mit synchronisierten Spielzuständen nötig.

## Qualität prüfen

Mit Node.js 22 oder neuer:

```bash
node scripts/validate.js
```

Der Prüflauf parst das eingebettete JavaScript, prüft zentrale UI-Elemente und kontrolliert Manifest, Service Worker und lokale SVG-Dateien.
