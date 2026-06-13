# Feature Priorities

This file is the inspectable feature source of truth for agents working on the app. The priorities below are copied from the `Core Feature Priorities` section of `.codex/agents/product-designer.toml` and should be implemented in order unless the user explicitly reprioritizes them.

## 1. Sequence of Play Workflow

Status: First draft implemented

Players should step through phases of the Sequence of Play with conditional behavior filtered out based on initial game settings, such as Offensive, Defensive, or Combat Patrol mission, turn number, and BN HQ in-play.

Instructions should be bullet-oriented so new players can see all steps and veteran players can skim them as a checklist.

## 2. Contextual Chart Access

Status: Proposed

Supplementary charts from other player aids, such as possible Commands, Potential Contact resolution, Spotting resolution, and similar references, should be available as unobtrusive links from the sequence steps where they are needed.

## 3. Reference Library

Status: Proposed

Provide an easily accessed library with links to all charts and necessary definitions, organized similarly to the player aid reference documents.

It should be reachable from a nav-bar link or dropdown and let users return to their place in the Sequence of Play.

## 4. Chart Filtering

Status: Proposed

Charts with condition-based columns, such as contact/no-contact, or modifier columns, such as green/line/veteran, should have toggles or filters that show only relevant information for the current scenario.

## 5. Game-State-Aware Filtering

Status: Proposed

Store helpful game state that filters rules, sequence steps, and chart data to current-game relevance.
