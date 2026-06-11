# Project Guidance

## Product Goals

- Build this project as a Progressive Web App that can be installed on iPhone, iPad mini, and Android tablets.
- The app must also work well as a static webpage hosted online.
- Favor static, offline-friendly behavior. Do not add runtime API calls or features that require a network connection unless explicitly requested.
- Treat small mobile screens as the primary experience, especially iPhone mini dimensions. Treat iPad mini as the secondary layout target.

## Code Organization

- Keep HTML, CSS, and JavaScript in separate files.
- Use readable, maintainable vanilla JavaScript only. Do not introduce frontend frameworks, build systems, or heavy dependencies unless explicitly requested.
- Keep scripts static and browser-native. Prefer plain modules, local assets, and deterministic client-side logic.
- Organize code by responsibility so features are easy to find and change.
- Use clear names for functions, variables, classes, files, and folders.
- Avoid clever code when direct code is easier to read.

## PWA Requirements

- Maintain a valid web app manifest with appropriate app name, icons, display mode, theme color, and mobile-friendly metadata.
- Include the platform-specific metadata needed for a polished install experience on iOS and iPadOS.
- Use a service worker only for static assets and offline behavior.
- Keep the app usable when installed and launched from the home screen.
- Ensure all required assets are local to the project and can be served statically.

## UI And UX

- Design mobile-first. The iPhone mini viewport should be comfortable, readable, and fully usable without layout overlap.
- Make touch targets large enough for finger input and keep common actions easy to reach.
- Use responsive layouts that adapt gracefully from phone to iPad mini/tablet sizes.
- Keep text readable, controls clear, and interactions predictable.
- Test both portrait and landscape behavior when changing layout-sensitive UI.

## Git Hygiene

- Keep commits focused on one cohesive change whenever possible.
- Prefer small, understandable commits so feature changes are easy to follow in git history.
- Do not mix unrelated refactors, formatting churn, and feature work in the same commit.
- Use clear commit messages that describe the user-visible or developer-facing purpose of the change.
- Check the working tree before editing and avoid overwriting unrelated user changes.
- Run relevant local checks before committing when practical.
