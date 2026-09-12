# Mac and iPhone handoff

This project uses Capacitor to run the existing web app inside a native iOS app. The web source remains `index.html`; do not edit the generated copy in `dist/`.

## 1. Clone or update the repository

For a new Mac checkout:

```bash
git clone https://github.com/KPB98/rep.git
cd rep
git switch capacitor
```

For an existing checkout:

```bash
git switch capacitor
git pull --ff-only
```

GitHub no longer accepts an account password for command-line pushes. Authenticate with either GitHub CLI (`brew install gh`, then `gh auth login`) or an SSH key before pushing.

## 2. Install prerequisites

- Install the current Xcode from the Mac App Store and launch it once.
- In Xcode, install any requested iOS platform components.
- Install Node.js 22 or newer. With Homebrew: `brew install node`.
- Confirm the tools: `node --version`, `npm --version`, and `xcodebuild -version`.

## 3. Create the iOS project

From the repository root:

```bash
npm install
npm run ios:setup
npm run ios:open
```

The first setup creates `ios/App/App.xcodeproj`. Later runs safely synchronize the current web build instead. Commit both `package-lock.json` and the generated `ios/` directory so every future checkout has the same native project:

```bash
git add package-lock.json ios
git commit -m "Add generated iOS project"
git push -u origin capacitor
```

## 4. Run on an iPhone

In Xcode:

1. Select the **App** project, then the **App** target.
2. Under **Signing & Capabilities**, select your Apple Developer team.
3. Leave the bundle identifier as `com.kpb98.rep`, or change it to a unique identifier owned by your team.
4. Connect and trust the iPhone, select it as the run destination, then press Run.

A free Apple ID can install development builds on a personal device. App Store/TestFlight distribution requires the paid Apple Developer Program.

## Everyday workflow

After editing `index.html` or pulling web changes:

```bash
npm run ios:sync
npm run ios:open
```

After changing native code in Xcode, commit the changes under `ios/` normally. Before switching computers, check that everything is pushed:

```bash
git status
git push
```

Avoid editing `dist/`; it is rebuilt by the scripts and intentionally ignored by Git.
