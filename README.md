# Dr. Werner & Associates

Statisches, GitHub-Pages-kompatibles Website-Repository für den eigenständigen Legal-Services-Bereich „Dr. Werner & Associates“.

## Technologie

- Reines HTML, CSS und Vanilla JavaScript
- Kein Node.js
- Kein npm
- Kein Build-Prozess
- Keine Server-Abhängigkeit
- Keine externen Trackingdienste
- Relative Pfade für GitHub Pages

## GitHub Pages einrichten

1. Erstellen Sie auf GitHub ein neues Repository.
2. Laden Sie alle Dateien dieses Projekts in das Repository hoch.
3. Öffnen Sie im Repository den Bereich `Settings`.
4. Wechseln Sie zu `Pages`.
5. Wählen Sie unter `Build and deployment` die Quelle `Deploy from a branch`.
6. Wählen Sie den Branch `main`.
7. Wählen Sie als Ordner `/(root)` aus.
8. Speichern Sie die Einstellungen und warten Sie auf die Bereitstellung.
9. Öffnen Sie anschließend den angezeigten GitHub-Pages-Link.

## Wichtige Hinweise

- Das Projekt verwendet ausschließlich relative Pfade wie `assets/css/styles.css`. Dadurch funktioniert die Website direkt in GitHub Pages-Unterordnern.
- Es ist kein Build nötig. Änderungen an HTML-, CSS-, JavaScript-, JSON- oder SVG-Dateien können direkt in das Repository geladen werden.
- `admin.html` ist ein statischer Prototyp für Content-Export. Änderungen werden nicht automatisch ins Repository geschrieben.
- Vor Veröffentlichung müssen insbesondere `impressum.html`, `datenschutz.html`, `disclaimer.html` und alle berufsrechtlichen Angaben final geprüft und ergänzt werden.

## Lokale Nutzung

- Die HTML-Dateien können direkt im Browser geöffnet werden.
- Für `admin.html` ist das Laden lokaler JSON-Dateien je nach Browser eingeschränkt. Über GitHub Pages funktioniert der Fetch-basierte Prototyp zuverlässig. Alternativ kann ein einfacher lokaler statischer Dateiserver verwendet werden, wenn gewünscht.
