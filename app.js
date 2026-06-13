const STORAGE_KEY = "fof-turn-aid-state-v2";
const LEGACY_STORAGE_KEY = "fof-turn-aid-state-v1";

const ACTIVITY_LEVELS = [
  "No Contact",
  "Contact",
  "Engaged",
  "Heavily Engaged"
];

const GLOBAL_REMINDER = "Update VOF/PDF and Current Activity Level whenever the map changes, except during 3.7.4.";

const phases = [
  {
    id: "higher-hq",
    number: "3.1",
    title: "Friendly Higher HQ Event Phase",
    task: "Starting on Turn 2, check for a Friendly Higher HQ event before mission-specific activity.",
    reminder: "Starting on Turn 2, draw an Action card and check the HQ radio icon. Skip this phase on Turn 1.",
    groups: [
      {
        id: "event",
        heading: "Friendly Higher HQ Event",
        doNow: "Do now: check whether a Friendly Higher HQ event occurs.",
        skipWhen: "turn1",
        skipReason: "Starting on Turn 2.",
        steps: [
          {
            id: "3.1-event-draw",
            label: "Starting on Turn 2, draw an Action card and check for the HQ radio icon.",
            detail: "Draw only when this phase is active."
          },
          {
            id: "3.1-resolve-event",
            label: "If the HQ radio icon appears, draw again and use the R# on the Friendly Higher HQ Events Table.",
            detail: "Carry out the event if possible. If it is impossible, do not redraw."
          },
          {
            id: "3.1-scope",
            label: "Unless the event says otherwise, Friendly Higher HQ Events affect only Friendly units.",
            detail: "Continue the sequence after resolving or skipping the event."
          }
        ]
      }
    ]
  },
  {
    id: "enemy-defensive",
    number: "3.2",
    title: "Enemy Activity Phase: Defensive",
    task: "Run this phase only during Defensive Missions.",
    reminder: "Turn 1 skips only 3.2.1. Still run the Enemy Activity Check Segment.",
    missions: ["defensive"],
    groups: [
      {
        id: "3.2.1",
        heading: "3.2.1 Enemy Higher HQ Event Segment",
        doNow: "Do now: check for an Enemy Higher HQ event unless this is Turn 1.",
        skipWhen: "turn1",
        skipReason: "Starting on Turn 2.",
        steps: [
          {
            id: "3.2.1-draw",
            label: "Starting on Turn 2, draw an Action card and check for the HQ radio icon.",
            detail: "If the icon appears, resolve the Enemy Higher HQ Event."
          },
          {
            id: "3.2.1-resolve",
            label: "If the event is impossible, do not redraw.",
            detail: "Unless specified, Enemy Events affect only Enemy units."
          },
          {
            id: "3.2.1-skip-affected",
            label: "Enemy Higher HQ affected units skip further Activity Checks.",
            detail: "Enemy units placed on the map or taking/attempting actions because of the event do not perform further Activity Checks in this phase."
          }
        ]
      },
      {
        id: "3.2.2",
        heading: "3.2.2 Enemy Activity Check Segment",
        doNow: "Do now: place PC markers, then check every eligible enemy unit.",
        steps: [
          {
            id: "3.2.2-place-pc",
            label: "Place PC markers by mission instructions.",
            detail: "Defensive PC placement is controlled by the mission instructions."
          },
          {
            id: "3.2.2-check-units",
            label: "Check every enemy unit on the map for activity.",
            detail: "Use random card order and the Activity Check Hierarchy. Skip units affected by 3.2.1."
          },
          {
            id: "3.2.2-continue",
            label: "Complete all enemy activity before moving to Friendly Command.",
            detail: "Turn 1 does not skip this segment."
          }
        ]
      }
    ]
  },
  {
    id: "friendly-command",
    number: "3.3",
    title: "Friendly Command Phase",
    task: "Activate eligible HQs and staff, then use initiative commands.",
    reminder: "Limited Visibility applies when the overall Visibility Modifier is +2 or greater. HQ/Staff max spend 4. Save limits: Green 2, Line 4, Veteran 6. Max LOS without Illumination/Night Observation Devices is Close Range.",
    groups: [
      {
        id: "3.3.1",
        heading: "3.3.1 Activation Segment",
        doNow: "Do now: activate HQs and staff through the command chain.",
        steps: [
          {
            id: "3.3.1-bn",
            label: "Resolve the BN HQ Impulse.",
            detail: "If BN HQ is off-map, activate CO HQ when allowed. If BN HQ is on-map, give it maximum Commands and spend them; BN HQ does not save Commands."
          },
          {
            id: "3.3.1-co",
            label: "Resolve the CO HQ Impulse if activated.",
            detail: "Draw for Activated Commands, apply modifiers, then spend or save within limits."
          },
          {
            id: "3.3.1-plt-staff",
            label: "Resolve each activated PLT HQ or CO Staff Impulse.",
            detail: "Draw for Activated Commands, apply modifiers, then spend or save within limits."
          }
        ]
      },
      {
        id: "3.3.2",
        heading: "3.3.2 Initiative Segment",
        doNow: "Do now: use initiative for HQs, staff, and general commands that were not activated.",
        steps: [
          {
            id: "3.3.2-co",
            label: "If CO HQ was not activated, draw for Initiative Commands.",
            detail: "Spend or save within command limits."
          },
          {
            id: "3.3.2-plt",
            label: "For each PLT HQ not activated earlier, draw for Initiative Commands.",
            detail: "Spend or save within command limits."
          },
          {
            id: "3.3.2-staff",
            label: "Each CO Staff not activated earlier receives one Command.",
            detail: "Spend or save within command limits."
          },
          {
            id: "3.3.2-general",
            label: "Draw one Action card for General Initiative.",
            detail: "Spend the unmodified Initiative number on any units in play; halve first for single-platoon missions, rounding down. General Initiative commands cannot be saved."
          }
        ]
      }
    ]
  },
  {
    id: "enemy-offensive",
    number: "3.4",
    title: "Enemy Activity Phase: Offensive / Combat Patrol",
    task: "Run this phase for Offensive Missions or Combat Patrols.",
    reminder: "Turn 1 skips only 3.4.1. Still run the Enemy Activity Check Segment.",
    missions: ["offensive", "combatPatrol"],
    groups: [
      {
        id: "3.4.1",
        heading: "3.4.1 Enemy Higher HQ Event Segment",
        doNow: "Do now: check for an Enemy Higher HQ event unless this is Turn 1.",
        skipWhen: "turn1",
        skipReason: "Starting on Turn 2.",
        steps: [
          {
            id: "3.4.1-draw",
            label: "Starting on Turn 2, draw an Action card and check for the HQ radio icon.",
            detail: "If the icon appears, resolve the Enemy Higher HQ Event."
          },
          {
            id: "3.4.1-resolve",
            label: "If the event is impossible, do not redraw.",
            detail: "Unless specified, Enemy Events affect only Enemy units."
          },
          {
            id: "3.4.1-skip-affected",
            label: "Enemy Higher HQ affected units skip further Activity Checks.",
            detail: "Enemy units placed on the map or taking/attempting actions because of the event do not perform further Activity Checks in this phase."
          }
        ]
      },
      {
        id: "3.4.2",
        heading: "3.4.2 Enemy Activity Check Segment",
        doNow: "Do now: handle existing enemy fire, then check every eligible enemy unit.",
        steps: [
          {
            id: "3.4.2-no-target",
            label: "Enemies firing at cards without valid targets shift or cease fire.",
            detail: "Resolve this before Activity Checks."
          },
          {
            id: "3.4.2-check-units",
            label: "Check every enemy unit on the map for activity.",
            detail: "Use random card order and the Activity Check Hierarchy. Skip units affected by 3.4.1."
          },
          {
            id: "3.4.2-continue",
            label: "Complete all enemy activity before Mutual Capture & Retreat.",
            detail: "Turn 1 does not skip this segment."
          }
        ]
      }
    ]
  },
  {
    id: "capture-retreat",
    number: "3.5",
    title: "Mutual Capture & Retreat Phase",
    task: "Resolve Capture first, then Retreat.",
    reminder: "Prisoner/guard handling is part of Capture. Resolve CS Gas before Retreat.",
    groups: [
      {
        id: "3.5.1",
        heading: "3.5.1 Capture Segment",
        doNow: "Do now: capture qualifying teams before any retreat checks.",
        steps: [
          {
            id: "3.5.1-capture",
            label: "Capture qualifying Paralyzed or Litter Teams alone with unpinned opposing infantry that has a VOF rating.",
            detail: "Apply the 8.15.1 capture caveat when determining whether capture occurs; enemies do not capture casualties."
          },
          {
            id: "3.5.1-prisoners",
            label: "If prisoners are taken, designate guard steps and move guard/prisoner steps to the Command Display.",
            detail: "If no prisoners are taken, convert captured steps to casualties."
          },
          {
            id: "3.5.1-auto",
            label: "Enemy casualties on unoccupied or friendly-occupied cards are automatically captured.",
            detail: "Exception: enemy casualties in front of the MLR on unoccupied cards are not automatically captured. Enemies do not capture casualties."
          }
        ]
      },
      {
        id: "3.5.2",
        heading: "3.5.2 Retreat Segment",
        doNow: "Do now: resolve CS Gas, then retreat eligible teams under VOF.",
        steps: [
          {
            id: "3.5.2-cs-gas",
            label: "Check CS Gas on eligible Good Order units without gas masks.",
            detail: "Resolve this before Retreat."
          },
          {
            id: "3.5.2-retreat",
            label: "Retreat eligible unpinned, non-Exposed Paralyzed or Litter Teams under VOF.",
            detail: "Retreat one card toward that side's edge or LZ."
          },
          {
            id: "3.5.2-priority",
            label: "Use retreat priorities: no VOF, then best Cover & Concealment, random if tied.",
            detail: "Mark retreating teams Exposed. Enemy units at their map edge retreat off-map."
          }
        ]
      }
    ]
  },
  {
    id: "at-vehicles",
    number: "3.6",
    title: "AT Combat & Vehicle Movement Phase",
    task: "Alternate sides through anti-tank combat and vehicle movement.",
    reminder: "Player side starts in Offensive/Combat Patrol missions; enemy side starts in Defensive missions.",
    groups: [
      {
        id: "3.6-actions",
        heading: "AT Combat & Vehicle Movement",
        doNow: "Do now: alternate sides through activated AT-capable units and vehicles.",
        steps: [
          {
            id: "3.6-side-order",
            label: "If both sides have Activated units, alternate sides.",
            detail: "Player first in Offensive Missions or Combat Patrols; enemy first in Defensive Missions."
          },
          {
            id: "3.6-eligible",
            label: "Activated AT-capable units fire; activated vehicles may move, spot, or concentrate fire.",
            detail: "Activated AT-capable enemy infantry uses AT Fire on its turn if possible."
          },
          {
            id: "3.6-reaction",
            label: "Check for reaction fire before finishing the action.",
            detail: "Flip the unit's Activated marker after it has acted."
          }
        ]
      }
    ]
  },
  {
    id: "mutual-combat",
    number: "3.7",
    title: "Mutual Combat Phase",
    task: "Work through Mutual Combat in order.",
    reminder: "Do not update VOF/PDF from Combat Effects during 3.7.4.",
    groups: [
      {
        id: "3.7.1",
        heading: "3.7.1 Fire Mission Update Segment",
        doNow: "Do now: update active fire mission markers.",
        steps: [
          {
            id: "3.7.1-remove",
            label: "Remove existing Incoming!, Air Strike!, and WP Fire Mission VOF markers.",
            detail: "Then flip Pending fire mission markers to active sides."
          },
          {
            id: "3.7.1-activity",
            label: "Update Current Activity Level if the map state changes.",
            detail: "Activity Level does not drop to No Contact until no VOF/PDF markers are on the map, including unactivated mines and Pending fire missions, and no enemy units are Spotted."
          }
        ]
      },
      {
        id: "3.7.2",
        heading: "3.7.2 Potential Contact Evaluation Segment",
        doNow: "Do now: evaluate each PC marker on a friendly-occupied card.",
        steps: [
          {
            id: "3.7.2-draw",
            label: "PC marker + Current Activity Level -> Potential Contact Draw Chart",
            detail: "Resolve PC markers alphabetically; same-letter ties are random."
          },
          {
            id: "3.7.2-place",
            label: "Place package/VOF/PDF -> update Current Activity Level -> remove PC -> next PC",
            detail: "Update Current Activity Level immediately after placement before moving to the next PC marker."
          },
          {
            id: "3.7.2-no-drop",
            label: "Activity Level does not drop to No Contact until the map is clear of contact markers and Spotted enemies.",
            detail: "Activity Level does not drop to No Contact until no VOF/PDF markers are on the map, including unactivated mines and Pending fire missions, and no enemy units are Spotted."
          }
        ]
      },
      {
        id: "3.7.3",
        heading: "3.7.3 Pinned Recovery Segment",
        doNow: "Do now: remove Pinned markers from units that are not under VOF.",
        steps: [
          {
            id: "3.7.3-recover",
            label: "Remove Pinned from vehicle or infantry units not under VOF.",
            detail: "Include Mines situations whether activated or not."
          }
        ]
      },
      {
        id: "3.7.4",
        heading: "3.7.4 Combat Effects Segment",
        doNow: "Do now: resolve Combat Effects without updating VOF/PDF yet.",
        steps: [
          {
            id: "3.7.4-flamethrower",
            label: "Resolve flamethrowers before normal combat effects.",
            detail: "Then determine the Net Combat Modifier."
          },
          {
            id: "3.7.4-effective-fire",
            label: "Draw for effective fire and, if hit, draw hit effects by Experience Level.",
            detail: "Combat Effects are simultaneous."
          },
          {
            id: "3.7.4-no-vof",
            label: "Do not update VOF/PDF from Combat Effects during 3.7.4.",
            detail: "Wait until Clean Up for Combat Effects VOF/PDF updates."
          },
          {
            id: "3.7.4-ammo",
            label: "Update ammo for Basic VOF as required.",
            detail: "This does not override the VOF/PDF update restriction."
          }
        ]
      }
    ]
  },
  {
    id: "clean-up",
    number: "3.8",
    title: "Clean Up Phase",
    task: "Finish the turn, update markers, and prepare the next turn.",
    reminder: "Use End Turn when all clean up items are complete. Per-turn checklist checks clear when the next turn begins.",
    groups: [
      {
        id: "3.8-markers",
        heading: "Remove Markers",
        doNow: "Do now: remove expiring markers and handle end-of-turn cleanup.",
        steps: [
          {
            id: "3.8-remove-markers",
            label: "Remove Pyrotechnic, Smoke, Illumination, Exposed, Moved/Fired, Concentrated Fire, Booby Trap, Grenade, and Grenade Miss markers.",
            detail: "Remove all applicable markers before final updates."
          },
          {
            id: "3.8-casualties",
            label: "Evacuate casualties from designated cards.",
            detail: "Resolve casualty evacuation before final fire and marker updates."
          },
          {
            id: "3.8-no-target",
            label: "Enemies firing at cards without valid targets shift or cease fire.",
            detail: "Apply before final VOF/PDF updates."
          }
        ]
      },
      {
        id: "3.8-reset",
        heading: "Reset And Advance",
        doNow: "Do now: reset remaining turn markers, update fire markers, then advance the turn.",
        steps: [
          {
            id: "3.8-defensive-pc",
            label: "For Defensive Missions, remove unresolved PC markers.",
            detail: "Offensive and Combat Patrol missions follow their mission instructions."
          },
          {
            id: "3.8-mines-sniper",
            label: "Reset Mines and move Sniper VOF off non-vehicle targets as required.",
            detail: "Complete these before final VOF/PDF adjustment."
          },
          {
            id: "3.8-final-update",
            label: "Adjust VOF, PDF, and Current Activity Level.",
            detail: "Include Combat Effects and Clean Up changes. Activity Level does not drop to No Contact until no VOF/PDF markers are on the map, including unactivated mines and Pending fire missions, and no enemy units are Spotted."
          },
          {
            id: "3.8-advance",
            label: "Advance the turn marker and return to the top of the sequence.",
            detail: "The app clears checklist checks for the next turn but preserves mission, visibility, and Current Activity Level."
          }
        ]
      }
    ]
  }
];

const missionLabels = {
  defensive: "Defensive",
  offensive: "Offensive",
  combatPatrol: "Combat Patrol"
};

const state = {
  screen: "dashboard",
  currentPhaseId: "higher-hq",
  turn: 1,
  mission: "defensive",
  limitedVisibility: false,
  currentActivityLevel: "No Contact",
  checkedStepIds: []
};

let resetNotice = "";

const elements = {
  dashboard: document.querySelector("#dashboard"),
  phaseView: document.querySelector("#phaseView"),
  dashboardButton: document.querySelector("#dashboardButton"),
  jumpToggle: document.querySelector("#jumpToggle"),
  jumpPanel: document.querySelector("#jumpPanel"),
  closeJumpButton: document.querySelector("#closeJumpButton"),
  jumpList: document.querySelector("#jumpList"),
  phaseKicker: document.querySelector("#phaseKicker"),
  phaseTitle: document.querySelector("#phaseTitle"),
  turnInput: document.querySelector("#turnInput"),
  missionSelect: document.querySelector("#missionSelect"),
  limitedVisibilityInput: document.querySelector("#limitedVisibilityInput"),
  activitySelect: document.querySelector("#activitySelect"),
  dashboardPhase: document.querySelector("#dashboardPhase"),
  dashboardFilter: document.querySelector("#dashboardFilter"),
  startButton: document.querySelector("#startButton"),
  referenceButton: document.querySelector("#referenceButton"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  stateChips: document.querySelector("#stateChips"),
  phaseActivitySelect: document.querySelector("#phaseActivitySelect"),
  phaseVisibilityInput: document.querySelector("#phaseVisibilityInput"),
  phaseNumber: document.querySelector("#phaseNumber"),
  taskTitle: document.querySelector("#taskTitle"),
  taskCopy: document.querySelector("#taskCopy"),
  reminderStrip: document.querySelector("#reminderStrip"),
  globalReminder: document.querySelector("#globalReminder"),
  substeps: document.querySelector("#substeps"),
  previousButton: document.querySelector("#previousButton"),
  nextButton: document.querySelector("#nextButton")
};

function legacyMission(value) {
  return value === "patrol" ? "combatPatrol" : value;
}

function migrateLegacyState(saved) {
  const migrated = { ...state };

  if (saved.currentId) {
    migrated.currentPhaseId = saved.currentId;
  }
  if (saved.currentPhaseId) {
    migrated.currentPhaseId = saved.currentPhaseId;
  }
  if (Number.isFinite(Number(saved.turn))) {
    migrated.turn = Math.max(1, Number.parseInt(saved.turn, 10));
  }
  if (saved.mission) {
    migrated.mission = legacyMission(saved.mission);
  }
  if (typeof saved.limitedVisibility === "boolean") {
    migrated.limitedVisibility = saved.limitedVisibility;
  } else if (typeof saved.visibility === "string") {
    migrated.limitedVisibility = saved.visibility !== "Good";
  }
  if (ACTIVITY_LEVELS.includes(saved.currentActivityLevel)) {
    migrated.currentActivityLevel = saved.currentActivityLevel;
  }
  if (Array.isArray(saved.checkedStepIds)) {
    migrated.checkedStepIds = saved.checkedStepIds.filter((id) => typeof id === "string");
  }

  return migrated;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      Object.assign(state, migrateLegacyState(saved));
      return;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    if (legacy && typeof legacy === "object") {
      Object.assign(state, migrateLegacyState(legacy));
      saveState();
    }
  } catch {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    currentPhaseId: state.currentPhaseId,
    turn: state.turn,
    mission: state.mission,
    limitedVisibility: state.limitedVisibility,
    currentActivityLevel: state.currentActivityLevel,
    checkedStepIds: state.checkedStepIds
  }));
}

function eligiblePhases() {
  return phases.filter((phase) => !phase.missions || phase.missions.includes(state.mission));
}

function currentPhaseIndex() {
  const list = eligiblePhases();
  const index = list.findIndex((phase) => phase.id === state.currentPhaseId);
  return index >= 0 ? index : 0;
}

function currentPhase() {
  return eligiblePhases()[currentPhaseIndex()];
}

function isSkipped(item) {
  return item.skipWhen === "turn1" && state.turn === 1;
}

function visibleStepIds() {
  const ids = new Set();
  eligiblePhases().forEach((phase) => {
    phase.groups.forEach((group) => {
      if (!isSkipped(group)) {
        group.steps.forEach((step) => {
          if (!isSkipped(step)) {
            ids.add(step.id);
          }
        });
      }
    });
  });
  return ids;
}

function pruneCheckedStepIds() {
  const validIds = visibleStepIds();
  state.checkedStepIds = state.checkedStepIds.filter((id) => validIds.has(id));
}

function checkedSet() {
  return new Set(state.checkedStepIds);
}

function syncControls() {
  elements.turnInput.value = state.turn;
  elements.missionSelect.value = state.mission;
  elements.limitedVisibilityInput.checked = state.limitedVisibility;
  elements.phaseVisibilityInput.checked = state.limitedVisibility;
  elements.activitySelect.value = state.currentActivityLevel;
  elements.phaseActivitySelect.value = state.currentActivityLevel;
}

function renderDashboard() {
  const phase = currentPhase();
  elements.dashboardPhase.textContent = `${phase.number} ${phase.title}`;
  elements.dashboardFilter.textContent = resetNotice || `${missionLabels[state.mission]} sequence. ${state.limitedVisibility ? "Limited Visibility" : "Normal Visibility"}. Current Activity Level: ${state.currentActivityLevel}.`;
  resetNotice = "";
}

function renderChips() {
  const chips = [
    `Turn ${state.turn}`,
    missionLabels[state.mission],
    state.limitedVisibility ? "Limited Visibility" : "Normal Visibility",
    `Current Activity Level: ${state.currentActivityLevel}`
  ];

  elements.stateChips.replaceChildren(...chips.map((label) => {
    const chip = document.createElement("span");
    chip.className = "state-chip";
    chip.textContent = label;
    return chip;
  }));
}

function renderPhase() {
  const list = eligiblePhases();
  const index = currentPhaseIndex();
  const phase = list[index];
  const percent = ((index + 1) / list.length) * 100;

  state.currentPhaseId = phase.id;
  pruneCheckedStepIds();
  syncControls();
  elements.phaseKicker.textContent = `Turn ${state.turn} | ${missionLabels[state.mission]}`;
  elements.phaseTitle.textContent = phase.title;
  elements.progressText.textContent = `Phase ${index + 1} of ${list.length}`;
  elements.progressBar.style.width = `${percent}%`;
  renderChips();
  elements.phaseNumber.textContent = phase.number;
  elements.taskTitle.textContent = phase.title;
  elements.taskCopy.textContent = phase.task;
  elements.reminderStrip.textContent = phase.reminder;
  elements.globalReminder.textContent = GLOBAL_REMINDER;
  elements.substeps.replaceChildren(...phase.groups.map(createGroup));
  elements.previousButton.disabled = index === 0;
  elements.nextButton.textContent = phase.id === "clean-up" ? "End Turn" : "Next Phase";
  saveState();
}

function createGroup(group) {
  const section = document.createElement("section");
  const heading = document.createElement("h3");
  const doNow = document.createElement("p");
  const steps = document.createElement("div");
  const skipped = isSkipped(group);

  section.className = skipped ? "phase-group is-skipped" : "phase-group";
  heading.textContent = group.heading;
  doNow.className = "do-now";
  doNow.textContent = skipped ? `${group.skipReason} ${group.doNow}` : group.doNow;
  steps.className = "checklist";

  if (skipped) {
    const note = document.createElement("p");
    note.className = "skip-reason";
    note.textContent = group.skipReason;
    section.append(heading, doNow, note);
    return section;
  }

  steps.replaceChildren(...group.steps.map((step) => (
    isSkipped(step) ? createSkippedRow(step) : createChecklistRow(step)
  )));
  section.append(heading, doNow, steps);
  return section;
}

function createSkippedRow(step) {
  const row = document.createElement("div");
  const marker = document.createElement("span");
  const copy = document.createElement("span");
  const label = document.createElement("strong");
  const detail = document.createElement("span");

  row.className = "check-row is-skipped-row";
  marker.className = "check-marker";
  marker.textContent = "-";
  copy.className = "check-copy";
  label.textContent = step.label;
  detail.textContent = step.skipReason || "Skipped for the current turn.";
  copy.append(label, detail);
  row.append(marker, copy);
  return row;
}

function createChecklistRow(step) {
  const checked = checkedSet().has(step.id);
  const row = document.createElement("button");
  const marker = document.createElement("span");
  const copy = document.createElement("span");
  const label = document.createElement("strong");
  const detail = document.createElement("span");

  row.type = "button";
  row.className = checked ? "check-row is-checked" : "check-row";
  row.setAttribute("aria-pressed", String(checked));
  marker.className = "check-marker";
  marker.textContent = checked ? "X" : "";
  copy.className = "check-copy";
  label.textContent = step.label;
  detail.textContent = step.detail;
  copy.append(label, detail);
  row.append(marker, copy);

  row.addEventListener("click", () => {
    toggleCheckedStep(step.id);
  });

  return row;
}

function toggleCheckedStep(stepId) {
  const ids = checkedSet();
  if (ids.has(stepId)) {
    ids.delete(stepId);
  } else {
    ids.add(stepId);
  }
  state.checkedStepIds = [...ids];
  renderPhase();
}

function renderJumpList() {
  const activeId = currentPhase().id;
  const visibleIds = new Set(eligiblePhases().map((phase) => phase.id));

  elements.jumpList.replaceChildren(...phases.map((phase) => {
    const item = document.createElement("li");

    if (!visibleIds.has(phase.id)) {
      const skipped = document.createElement("div");
      skipped.className = "skip-note mission-filtered";
      skipped.textContent = `${phase.number} ${phase.title} mission-filtered for ${missionLabels[state.mission]}.`;
      item.append(skipped);
      return item;
    }

    const button = document.createElement("button");
    const label = document.createElement("span");
    const meta = document.createElement("small");

    button.type = "button";
    label.textContent = `${phase.number} ${phase.title}`;
    meta.textContent = turnSkippedGroups(phase).length > 0 ? "Turn 1 has skipped rows/segments inside this phase." : "Included in current mission sequence.";
    button.append(label, meta);
    if (phase.id === activeId) {
      button.setAttribute("aria-current", "step");
    }
    button.addEventListener("click", () => {
      state.currentPhaseId = phase.id;
      showPhase();
      closeJump();
    });
    item.append(button);
    return item;
  }));
}

function turnSkippedGroups(phase) {
  return phase.groups.filter((group) => isSkipped(group));
}

function showDashboard() {
  state.screen = "dashboard";
  elements.dashboard.hidden = false;
  elements.phaseView.hidden = true;
  elements.phaseKicker.textContent = "Turn Dashboard";
  elements.phaseTitle.textContent = "Fields of Fire";
  pruneCheckedStepIds();
  syncControls();
  renderDashboard();
  saveState();
}

function showPhase() {
  state.screen = "phase";
  elements.dashboard.hidden = true;
  elements.phaseView.hidden = false;
  renderPhase();
  renderDashboard();
}

function nextPhase() {
  const list = eligiblePhases();
  const index = currentPhaseIndex();
  const phase = list[index];

  if (phase.id === "clean-up") {
    state.turn += 1;
    state.currentPhaseId = "higher-hq";
    state.checkedStepIds = [];
    syncControls();
    showDashboard();
    return;
  }

  state.currentPhaseId = list[Math.min(index + 1, list.length - 1)].id;
  showPhase();
}

function previousPhase() {
  const list = eligiblePhases();
  const index = currentPhaseIndex();
  state.currentPhaseId = list[Math.max(index - 1, 0)].id;
  showPhase();
}

function openJump() {
  renderJumpList();
  elements.jumpPanel.hidden = false;
  elements.jumpToggle.setAttribute("aria-expanded", "true");
}

function closeJump() {
  elements.jumpPanel.hidden = true;
  elements.jumpToggle.setAttribute("aria-expanded", "false");
}

function handleSettingsChange() {
  const previousId = state.currentPhaseId;
  const previousTurn = state.turn;
  state.turn = Math.max(1, Number.parseInt(elements.turnInput.value, 10) || 1);
  state.mission = elements.missionSelect.value;
  state.limitedVisibility = elements.limitedVisibilityInput.checked;
  state.currentActivityLevel = elements.activitySelect.value;

  if (state.turn !== previousTurn) {
    state.checkedStepIds = [];
  }
  if (!eligiblePhases().some((phase) => phase.id === state.currentPhaseId)) {
    state.currentPhaseId = eligiblePhases()[0].id;
    if (previousId !== state.currentPhaseId) {
      resetNotice = "Mission changed; sequence reset to 3.1.";
    }
  }

  pruneCheckedStepIds();
  syncControls();
  renderDashboard();
  if (state.screen === "phase") {
    renderPhase();
  }
  saveState();
}

function handlePhaseSettingsChange() {
  state.limitedVisibility = elements.phaseVisibilityInput.checked;
  state.currentActivityLevel = elements.phaseActivitySelect.value;
  syncControls();
  renderDashboard();
  renderPhase();
  saveState();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
}

function populateActivitySelects() {
  [elements.activitySelect, elements.phaseActivitySelect].forEach((select) => {
    select.replaceChildren(...ACTIVITY_LEVELS.map((level) => {
      const option = document.createElement("option");
      option.value = level;
      option.textContent = level;
      return option;
    }));
  });
}

loadState();
populateActivitySelects();
state.screen = "dashboard";
pruneCheckedStepIds();
syncControls();
renderDashboard();
showDashboard();

elements.dashboardButton.addEventListener("click", showDashboard);
elements.jumpToggle.addEventListener("click", openJump);
elements.closeJumpButton.addEventListener("click", closeJump);
elements.startButton.addEventListener("click", showPhase);
elements.referenceButton.addEventListener("click", openJump);
elements.nextButton.addEventListener("click", nextPhase);
elements.previousButton.addEventListener("click", previousPhase);
elements.turnInput.addEventListener("change", handleSettingsChange);
elements.missionSelect.addEventListener("change", handleSettingsChange);
elements.limitedVisibilityInput.addEventListener("change", handleSettingsChange);
elements.activitySelect.addEventListener("change", handleSettingsChange);
elements.phaseVisibilityInput.addEventListener("change", handlePhaseSettingsChange);
elements.phaseActivitySelect.addEventListener("change", handlePhaseSettingsChange);

registerServiceWorker();
