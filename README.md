# Wayfarer — Install on Android (Samsung S23 Ultra)

A Progressive Web App (PWA) that installs as a real Android app icon, runs full-screen, works offline, and stores everything on your device.

---

## Install in 3 steps (recommended path: GitHub Pages)

### 1. Get the files online (one-time setup, ~3 minutes)

PWAs need to be served over HTTPS to install properly. The free way:

1. Go to **github.com** and create a free account if you don't have one.
2. Create a new repository — name it anything (e.g. `wayfarer`). Make it **public**.
3. Upload all five files from this folder to the repo:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `icon-512-maskable.png`
4. Go to the repo's **Settings → Pages**.
5. Under "Build and deployment", set **Source** to "Deploy from a branch", pick the `main` branch, folder `/ (root)`, and click **Save**.
6. Wait ~30 seconds. Your app is now live at:
   `https://YOUR-USERNAME.github.io/wayfarer/`

### 2. Install on your S23 Ultra

1. Open **Chrome** on your phone and visit your URL.
2. Wait for the page to fully load (this caches the app for offline use).
3. Tap Chrome's menu (⋮ in the top-right) → **Install app** (or "Add to Home screen" on older Chrome — pick the option labeled "Install" if you see both).
4. Confirm. The app appears as a Wayfarer icon in your app drawer and on your home screen.

### 3. Use it

- Tapping the icon launches Wayfarer **full-screen** with no browser bars — like any other Android app.
- Works **offline** after the first launch.
- Everything (journeys, attached PDFs/images, custom icons) is stored locally in your phone's secure browser storage. Nothing is uploaded anywhere.

---

## Updating the app

When you (or I) push new changes to the same GitHub repo, the service worker fetches them automatically the next time you open Wayfarer with internet. To force an immediate refresh: long-press the app icon → App info → Storage → Clear cache (your data is preserved; only the app code is re-downloaded next launch).

---

## Want a real signed `.apk` instead?

Once your app is hosted (step 1 above), go to **pwabuilder.com**, paste your URL, and download the generated Android package. That gives you an installable `.apk` file you can sideload — no Chrome required to launch, and you can distribute it however you want.

---

## File checklist

This folder should contain:

- `index.html` — the app itself
- `manifest.json` — tells Android how to install it (name, icons, display mode)
- `sw.js` — service worker for offline support
- `icon-192.png` — small icon (192×192)
- `icon-512.png` — large icon (512×512)
- `icon-512-maskable.png` — Android adaptive icon (gets cropped to circle/squircle/etc by the OS)
- `README.md` — this file
- `make_icons.py` — the Python script that generated the icons (you can ignore or delete this; only useful if you want to redesign the icon)
