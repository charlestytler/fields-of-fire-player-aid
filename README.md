# Fields of Fire Companion

A small, offline-friendly web app for stepping through the **Fields of Fire** Player Aids during a game.

The app is designed as a mobile-first player aid for phones and tablets. It starts at a Turn Dashboard, then lets you move through the active turn one phase at a time, with mission-specific filtering for Defensive Missions, Offensive Missions, and Combat Patrols.

## Features

- Turn Dashboard with turn number, mission type, visibility, activity level, and current phase
- Step-by-step Sequence of Play pages
- Defensive vs Offensive / Combat Patrol phase filtering
- Previous / Next phase navigation
- Jump-to-phase list
- End Turn flow that advances the turn and returns to the dashboard
- Collapsible details for rules caveats and uncommon reminders
- Static, offline-friendly PWA structure
- Local service worker cache for app files
- Home screen installation support for iOS, iPadOS, and Android

## Running Locally

This is a static web app. You can serve it with any local static file server.

Example using Python:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Installing On iPhone Or iPad

1. Open the app in **Safari**.
2. Tap the **Share** button.
3. Scroll down and tap **Add to Home Screen**.
4. Confirm the name, such as `FoF Aid`.
5. Tap **Add**.

The app will appear on your home screen and launch in a standalone app-style view.

Note: iOS and iPadOS require Safari for “Add to Home Screen” PWA installation.

## Installing On Android

1. Open the app in **Chrome**.
2. Tap the **three-dot menu**.
3. Tap **Install app** or **Add to Home screen**.
4. Confirm the install prompt.

The app will appear in your launcher or on your home screen.

## Offline Use

After the app has been opened once from a web server, its core files are cached by the service worker. This lets the player aid continue working when offline or when the hosting connection is unavailable.

For best results, open the app once while online before taking it to the table.

## Project Structure

```text
index.html              Main app markup
styles.css              Mobile-first styling
app.js                  Sequence data and app behavior
manifest.webmanifest    PWA metadata
service-worker.js       Static offline cache
assets/icon.svg         App icon
references/             Local rules and player aid references
```

## Design Goals

- Work well on small phones first
- Keep each phase focused on the next thing the player needs to do
- Avoid network requirements during play
- Preserve Fields of Fire terminology where it helps rules accuracy
- Keep the app simple enough to host as static files

## License And Attribution

The source code for this web app is licensed under the MIT License.

This project is an unofficial fan-made player aid for **Fields of Fire**. It is not affiliated with, sponsored by, approved by, or endorsed by GMT Games.

**Fields of Fire**, related game materials, rules text, player aids, trademarks, names, and reference documents remain the property of their respective owners and are not covered by this repository's code license.
