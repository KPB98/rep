# Install Rep on iPhone without Xcode

Rep can be installed as a Progressive Web App (PWA). It opens from the Home Screen, works offline after its first successful load, and does not require Xcode or an Apple Developer account.

## Enable GitHub Pages once

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Open the **Actions** tab and confirm that **Deploy PWA to GitHub Pages** completes.

The expected address is:

```text
https://kpb98.github.io/rep/
```

Deployments happen automatically whenever the `main` branch is pushed.

## Add Rep to the iPhone

1. Open the Pages address in Safari.
2. Tap **Share**, then **Add to Home Screen**.
3. Turn on **Open as Web App** if Safari shows that option.
4. Tap **Add**, then launch Rep from its new Home Screen icon.
5. Open it once while online so the complete offline app shell is cached.

## History and backups

Rep stores its state in IndexedDB on the current device. Existing data from the older `localStorage` version is migrated automatically the first time the updated app opens.

Closing and reopening Rep, restarting the iPhone, or using it offline will retain history. Browser storage is not an account or cloud backup: deleting the Home Screen app or clearing Safari website data can remove it.

Use **Past → Export backup** periodically and save the JSON file to Files or iCloud Drive. Use **Past → Restore backup** to replace the device's current history with a saved backup.
