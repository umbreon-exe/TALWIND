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
| Interagieren | E oder Leertaste | Objekt antippen / A |
| Angreifen | J | Angriff / B |
| Fähigkeit | K | Fähigkeit / X |
| Ausweichen / Rolle | Shift | Rolle / Y |
| Heiltrank | H | Rucksack öffnen |

## Enthalten

- Fünf auswählbare Helden mit unterschiedlichen Fähigkeiten
- Eine zusammenhängende Avarra-Welt mit Windruh, Flüsterwald, Nebelmoor, Flüsterhöhle, Frostgrat und Echo-Schrein
- Hauptquest, Nebenquests, Bewohnerdialoge, Häuser und Laden
- Erkundungs-Belohnungen beim erstmaligen Entdecken eines Bioms
- Gegner, Bosskampf, Herzen, Erfahrung, Windtaler und Gegenstände
- Tag-/Nachtzyklus mit sichtbarer Uhr und Abend-/Nachtstimmung
- 36-Slot-Inventar mit Ausrüstungsplätzen, Lagertruhen und anklickbaren Gegenständen
- Handwerkssystem mit Angelrute, Spitzhacke, Kleidung, Rüstung, Heilsalbe, Wegzehrung und Kristalllaterne
- Angeln mit Biss-Zeitfenster und gezeichneter Angel-Animation
- Viele Rohstoffe je Biom: Holz, Kräuter, Pilze, Harz, Getreide, Lehm, Torf, Salz, Muscheln, Kupfer, Eisen, Silber, Gold, Geoden und Frostmaterialien
- Drei Browser-Speicherplätze plus automatisches Fortsetzen, Autosave alle 15 Sekunden und Speichern beim Verlassen der Seite
- Erkundungs-Belohnungen beim erstmaligen Entdecken eines Bioms: Windtaler und Erfahrung
- Anklickbare Weltkarte mit Spielerposition, Truhen, wichtigen Bewohnern und speicherbarem Wegpunkt
- Zusammenhängende Avarra-Karte (309×237 Tiles) mit begehbaren Wegen zwischen sechs Biomen, anklickbarer Weltkarte und speicherbaren Wegpunkten
- Touch-Steuerung, Gamepad-Unterstützung und Vollbild-fähiges Layout
- Installierbares PWA-Grundgerüst und Offline-Caching der Kern-Dateien
- GitHub Actions prüft bei Push und Pull Request die Syntax des eingebetteten JavaScripts und die benötigten Spieldateien

## Spielstände

Spielstände werden lokal im Browser über `localStorage` gespeichert. TALWIND setzt beim Start den zuletzt gespeicherten Slot automatisch fort, speichert während des Spiels alle 15 Sekunden und zusätzlich beim Verlassen der Seite. Die Daten werden nicht zwischen Geräten oder Browsern synchronisiert. Über die Karte gesetzte Wegpunkte und bereits entdeckte Biome werden mitgespeichert. Das Löschen von Website-/Browserdaten kann Spielstände entfernen; lösche daher nicht den Website-Speicher, wenn du deinen Fortschritt behalten möchtest.

## Grafik und Assets

Die Titelillustration und das App-Symbol in `assets/` sind eigenständige SVG-Dateien für dieses Repository. Die Spielwelt verwendet einen eingebauten Pixel-Art-Renderer mit saisonalen Baumarten, Büschen, Pflanzen, Minen- und Eisdekorationen. Die Biome liegen nun als eine große Karte mit einem gemeinsamen Weltkoordinatensystem vor. Neue Rohstoff-Fundstellen werden pro Biom erzeugt. Zusätzliche kostenlose Asset-Pakete sind in `ASSET_SOURCES.md` dokumentiert; die neu recherchierten ZIP-/PNG-Pakete wurden noch nicht importiert.

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

## Grafik-Credits und Nutzung

- **Super Retro World – Character Pack**: Figuren von Gif (@gif_not_jif), Noiracide (@Noiracide) und Romi (@DessRomaric). Die beigefügte Lizenz erlaubt kommerzielle und nicht-kommerzielle Spielprojekte sowie Anpassungen; die Grafiken dürfen nicht als eigenständiges Paket weitergegeben werden.
- **The Fan-tasy Tileset**: Dekorationen von Ventilatore. In diesem Projekt wird die kostenlose Version verwendet. Diese ist laut Anbieter nur für nicht-kommerzielle Projekte vorgesehen; für eine kommerzielle Veröffentlichung wäre die Premium-Lizenz erforderlich. Eine eigenständige Weitergabe des Asset-Pakets ist nicht erlaubt.

Quellen: [Super Retro World Character Pack](https://farm-animal.itch.io/character-pack) · [The Fan-tasy Tileset](https://ventilatore.itch.io/the-fantasy-tileset)
