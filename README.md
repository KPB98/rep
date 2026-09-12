# Rep

A lightweight sprint-based exercise tracker. The app is plain HTML, CSS, and JavaScript, and is packaged as an iPhone app with Capacitor.

## Install on iPhone without Xcode

Rep is also an installable Progressive Web App. It works offline and stores history on the device using IndexedDB. Follow [the PWA iPhone setup guide](docs/PWA_IPHONE_SETUP.md) to deploy it through GitHub Pages and add it to the iPhone Home Screen.

The **Past** screen includes JSON backup and restore controls. Backups protect history if Safari website data or the Home Screen app is removed.

## Web development

Open `index.html` directly in a browser. To create the production web bundle:

```bash
npm install
npm run build
```

## iPhone development

The native iOS project is created and maintained on macOS because Xcode is required. Follow [the Mac and iPhone handoff guide](docs/MAC_IOS_SETUP.md) after pulling the `capacitor` branch on the Mac.

Quick start on macOS:

```bash
npm install
npm run ios:setup
npm run ios:open
```

After subsequent web changes, run `npm run ios:sync` before rebuilding in Xcode.
