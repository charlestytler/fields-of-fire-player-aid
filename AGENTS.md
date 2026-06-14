# Project Guidance

## Product Goals

- Build this project as a Progressive Web App that can be installed on iPhone, iPad mini, and Android tablets.
- The app must also work well as a static webpage hosted online.
- Favor static, offline-friendly behavior. Do not add runtime API calls or features that require a network connection unless explicitly requested.
- Treat small mobile screens as the primary experience, especially iPhone mini dimensions (1080 x 2340 pixels). Treat iPad mini as the secondary layout target.

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

- Design mobile-first. The iPhone mini viewport (1080 x 2340 pixels) should be comfortable, readable, and fully usable without layout overlap.
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
- Never perform a --force action or any other that would overwrite/delete history.

## Approval Process
- You may perform file edits without approval if directly related to the feature you are working on.
- You may make focused git commits without additional approval when the commit only includes files in this working directory and changes directly related to the requested task.
- Show a brief summary of committed changes after committing.

## Local Verification

- For static PWA smoke tests, Codex may run `python3 -m http.server <port>` from this working directory.
- Codex may run `curl` against `http://127.0.0.1:<port>/` and local asset URLs to verify served files.
- Prefer an unused local port if the default port is busy.
- Stop any verification server after checks complete.
- If sandbox approval is required for local port binding, request approval once using the command prefix `["python3", "-m", "http.server"]`.

## Blocked Source Files

- If required source files, references, images, PDFs, or other assets are missing, inaccessible, unreadable, or present only as Git LFS pointer files, pause and ask the user how to proceed.
- Do not treat inaccessible source material as validated. Clearly describe what is blocked and which file or asset is affected.
- Do not replace missing source material with guesses or unsourced rules/content.

## Subagent Workflows

Codex has these project subagents:

- `rules-expert`: validates Fields of Fire rules accuracy, caveats, terminology, player aid alignment, and source references.
- `product-designer`: designs player-aid replacement workflows, information architecture, game-state filtering, and mobile-first feature behavior.
- `software-developer`: implements static PWA changes in vanilla HTML, CSS, and JavaScript.
- `tutorial-player`: reviews player-facing flow as if actively playing through the app with tutorial missions and player aids.
- `ux-reviewer`: reviews CSS, HTML structure, layout, readability, mobile fit, touch usability, and visual direction.

Codex only spawns subagents when the user explicitly asks for subagents, delegation, or a named subagent workflow. When a subagent workflow is active, keep the main agent responsible for planning, orchestration, integration review, final verification, and the final response.

All software file edits must be done by the `software-developer` subagent. Software files include `.html`, `.js`, and `.css` files. The main agent may inspect, review, and coordinate those changes, but should not directly edit software files during a subagent workflow.

### New Feature Workflow

When the user explicitly asks to use the new-feature subagent workflow:

1. Main agent: select one feature to implement, define the feature scope, identify likely rules/content, UX, and implementation risks, and assign non-overlapping work.
2. Start a new session of subagents with cleared context for the selected feature.
3. Spawn `product-designer` to propose a design for the selected feature that builds upon the current web app. The design should cover player-aid replacement goals, information architecture, game-state filtering, reference-library flow when relevant, and mobile-first product behavior.
4. Provide the proposed design to `tutorial-player`, `rules-expert`, and `ux-reviewer` for feedback.
5. Ask `product-designer` to modify the design according to the feedback. `product-designer` may consult the other subagents for clarifying questions or disputed recommendations.
6. Once the design is documented, spawn `software-developer` and ask it to generate an implementation plan for the design.
7. Share the `software-developer` implementation plan with `product-designer`, `tutorial-player`, `rules-expert`, and `ux-reviewer` for feedback.
8. Ask `software-developer` to incorporate the feedback, then implement the plan in code. All software file edits must still be done by `software-developer`.
9. `software-developer` should make focused git commits for all implemented changes when the commit only includes files in this working directory and changes directly related to the requested task. All commit messages for commits made by a subagent must be prefixed with `[agent]`.
10. Once the design has been implemented and committed, ask `product-designer`, `tutorial-player`, and `ux-reviewer` to do a final test use of the web app against their expectations for the feature.
11. For minor issues found during final test use, ask `software-developer` to implement focused fixes and make additional `[agent]`-prefixed commits when the commit only includes files in this working directory and changes directly related to the requested task.
12. For large issues found during final test use, document them in a root `ISSUES.md` file instead of expanding the feature scope without approval.
13. Main agent: integrate findings, run relevant checks, verify the working tree and commit state, and summarize the completed work.

Subagents should return concise findings with file references. Do not ask multiple subagents to edit the same files in parallel.

### Design Change Workflow

When the user explicitly asks to use the design-change subagent workflow:

1. Spawn a `product-designer` session with cleared context for the change.
2. product-designer: Review the design change and identify if there are similar changes elsewhere in the web app that would be needed to maintain consistency, if so ask the user if they would like those modified in the same or similar way.
3. product-designer: define the total change scope, identify likely rules/content, UX, and implementation risks, and assign non-overlapping work.
4. Present a summary of the proposed changes to the user for approval before proceeding.
4. Start a new session of subagents with cleared context for the change.
5. Spawn `rules-expert` and `ux-reviewer` to review the change.
6. If `rules-expert` proposes a modification from what the user requested, ask the user if the change should be implemented.
7. Spawn `software-developer` to implement the change in code. All software file edits must still be done by `software-developer`.
8. `product-designer` and `ux-reviewer` should review the implementation and ask `software-developer` to make focused changes if there are issues.
9. `product-designer` shall document any design concepts that are not obvious from `FEATURES.md` in a root `DESIGN.md` file for future reference.
10. Main agent: commit the changes with a summary message prefixed with `[agent]`.

### Improvement Workflow

When the user explicitly asks to use the improvement subagent workflow:

1. Main agent: classify the improvement as product design, rules/content, UX/CSS, play-flow, implementation quality, or a combination.
2. Spawn only the relevant review subagents for the improvement type.
3. Spawn `software-developer` for all required `.html`, `.js`, and `.css` edits.
4. Prefer read-only review subagents before implementation when the requested improvement is ambiguous.
5. Main agent: coordinate follow-up revisions through `software-developer`, then run relevant checks and summarize the result.
