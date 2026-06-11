const STORAGE_KEY = "fof-turn-aid-state-v1";

const phases = [
  {
    id: "higher-hq",
    number: "3.1",
    title: "Friendly Higher HQ Event",
    task: "Check for a Friendly Higher HQ event before mission-specific activity.",
    reminder: "Turn 1: skip this phase. Turn 2+: draw an Action card; the HQ radio icon triggers the event check.",
    steps: [
      ["Check turn", "If this is Turn 1, no draw is made."],
      ["Draw event", "On Turn 2 or later, draw an Action card. If the HQ radio icon appears, draw again and use the R# on the Friendly Higher HQ Events Table."],
      ["Apply event", "Carry out the event if possible. If it is impossible, do not redraw."]
    ],
    details: [
      ["Scope", "Unless the event says otherwise, Friendly Higher HQ Events affect only Friendly units."],
      ["No redraw", "If an event cannot be carried out, continue the sequence instead of drawing a replacement."]
    ]
  },
  {
    id: "enemy-defensive",
    number: "3.2",
    title: "Enemy Activity: Defensive",
    task: "Run this phase only during Defensive Missions.",
    reminder: "Turn 1: skip Enemy Higher HQ Event. Turn 2+: draw for it before placing PC and checking enemy activity.",
    missions: ["defensive"],
    steps: [
      ["Enemy Higher HQ Event", "On Turn 2 or later, draw an Action card. If the HQ radio icon appears, resolve the Enemy Higher HQ Event."],
      ["Place PC", "Place Potential Contact markers as indicated by the mission instructions."],
      ["Enemy Activity Checks", "Check every enemy unit on the map for activity, using random card order and the Activity Check Hierarchy."]
    ],
    details: [
      ["Event caveat", "If an Enemy Higher HQ Event is impossible, do not redraw. Unless specified, Enemy Events affect only Enemy units."],
      ["Skip affected units", "Enemy units placed on the map or taking/attempting actions because of the Enemy Higher HQ Event do not perform further Activity Checks in this phase."]
    ]
  },
  {
    id: "friendly-activation",
    number: "3.3.1",
    title: "Friendly Command: Activation",
    task: "Activate eligible HQs and staff, then spend or save commands within command limits.",
    reminder: "Check chain of command and communication before commands are issued.",
    steps: [
      ["BN HQ", "If BN HQ is off-map, activate CO HQ. If BN HQ is on-map, give it its maximum Commands and spend them; BN HQ does not save Commands."],
      ["CO HQ", "If activated by BN HQ, draw for Activated Commands, then spend or save within visibility and experience limits."],
      ["PLT HQ / CO Staff", "For each activated PLT HQ or CO Staff, draw for Activated Commands, then spend or save within limits."]
    ],
    details: [
      ["No BN HQ available", "If BN HQ is unavailable and no Runners are on the map, move on to the CO HQ Initiative Impulse."],
      ["Command limits", "Use the Command Display for visibility and experience maximums. A unit or HQ receiving an order must be in chain of command and in communication with the issuing HQ or leader."]
    ]
  },
  {
    id: "friendly-initiative",
    number: "3.3.2",
    title: "Friendly Command: Initiative",
    task: "Use initiative commands for eligible HQs, staff, and units.",
    reminder: "General Initiative commands cannot be saved.",
    steps: [
      ["CO HQ", "If the CO HQ was not activated, draw for Initiative Commands, then spend or save within limits."],
      ["PLT HQ", "For each PLT HQ not activated earlier, draw for Initiative Commands, then spend or save within limits."],
      ["CO Staff", "Each CO Staff not activated earlier receives one Command, then spends or saves within limits."],
      ["General Initiative", "Draw one Action card and spend the unmodified Initiative number on any units in play; halve first for single-platoon missions, rounding down."]
    ],
    details: [
      ["General Initiative", "General Initiative does not require chain of command or communication for ordinary orders, but its Commands cannot be saved."],
      ["Command Display", "Use the Command Display for visibility and experience maximums when HQs or staff spend or save Commands."]
    ]
  },
  {
    id: "enemy-offensive",
    number: "3.4",
    title: "Enemy Activity: Offensive / Patrol",
    task: "Run this phase for Offensive Missions or Combat Patrols.",
    reminder: "Turn 1: skip Enemy Higher HQ Event. Turn 2+: draw for it. Enemy fire without valid targets shifts or ceases.",
    missions: ["offensive", "patrol"],
    steps: [
      ["Enemy Higher HQ Event", "On Turn 2 or later, draw an Action card. If the HQ radio icon appears, resolve the Enemy Higher HQ Event."],
      ["No valid targets", "Before checks, enemies firing at cards without valid targets shift or cease fire."],
      ["Enemy Activity Checks", "Check every enemy unit on the map for activity, using random card order and the Activity Check Hierarchy."]
    ],
    details: [
      ["Event caveat", "If an Enemy Higher HQ Event is impossible, do not redraw. Unless specified, Enemy Events affect only Enemy units."],
      ["Skip affected units", "Enemy units placed on the map or taking/attempting actions because of the Enemy Higher HQ Event do not perform further Activity Checks in this phase."]
    ]
  },
  {
    id: "capture-retreat",
    number: "3.5",
    title: "Capture & Retreat",
    task: "Resolve Capture first, then Retreat.",
    reminder: "Prisoner/guard handling is part of Capture. Resolve CS Gas before Retreat.",
    steps: [
      ["Capture", "Capture qualifying Paralyzed or Litter Teams alone with unpinned opposing infantry that has a VOF rating."],
      ["Prisoners", "If prisoners are taken, designate guard steps and remove guard/prisoner steps to the Command Display; if not, convert captured steps to casualties."],
      ["Retreat", "After CS Gas checks, retreat eligible unpinned, non-Exposed Paralyzed or Litter Teams under VOF."]
    ],
    details: [
      ["Retreat priorities", "Retreat one card toward that side's edge or LZ. Prefer no VOF, then best Cover & Concealment, random if tied, and mark Exposed."],
      ["Retreat exceptions", "Enemy units at their map edge retreat off-map. Retreat can override LAT movement restrictions and may temporarily break stacking."]
    ]
  },
  {
    id: "at-vehicles",
    number: "3.6",
    title: "AT & Vehicle Actions",
    task: "Alternate sides through anti-tank and vehicle actions.",
    reminder: "Player side starts in Offensive/Combat Patrol missions; enemy side starts in Defensive missions.",
    steps: [
      ["Alternating side order", "If both sides have Activated units, alternate sides: player first in Offensive Missions/Combat Patrols; enemy first in Defensive Missions."],
      ["Reaction fire", "Check for reaction fire before finishing the action."],
      ["Activated marker", "Flip the marker after the unit has acted."]
    ],
    details: [
      ["Eligible actions", "Activated AT-capable units fire. Activated vehicles may move, spot, or concentrate fire."],
      ["Clarification", "Activated AT-capable enemy infantry uses AT Fire on its turn if possible."]
    ]
  },
  {
    id: "mutual-combat",
    number: "3.7",
    title: "Mutual Combat",
    task: "Work through Mutual Combat in order.",
    reminder: "Do not adjust VOF/PDF during Combat Effects.",
    steps: [
      ["Fire Mission Update", "Remove existing Incoming!, Air Strike!, and WP Fire Mission VOF markers; flip Pending markers active."],
      ["Potential Contact", "For each friendly-occupied card with a PC marker, draw based on PC marker and Current Activity Level."],
      ["Pinned Recovery", "Remove Pinned from vehicle or infantry units not under VOF, including Mines situations whether activated or not."],
      ["Combat Effects", "Resolve flamethrowers, determine NCM, draw for effective fire, and draw hit effects by Experience Level if hit."]
    ],
    details: [
      ["Potential Contact", "If Contact occurs, determine enemy package and placement. Place VOF/PDF, update Current Activity, and remove/finish the PC marker before moving to the next one."],
      ["Ammo and markers", "Update ammo for Basic VOF as required, but wait until Clean Up to adjust VOF/PDF from Combat Effects."]
    ]
  },
  {
    id: "clean-up",
    number: "3.8",
    title: "Clean Up",
    task: "Finish the turn, update markers, and prepare the next turn.",
    reminder: "Use End Turn when all clean up items are complete.",
    steps: [
      ["Remove markers", "Remove Pyrotechnic, Smoke, Illumination, Exposed, Moved/Fired, Concentrated Fire, Booby Trap, Grenade, and Grenade Miss markers."],
      ["Casualties and fire", "Evacuate casualties from designated cards. Enemies firing at cards without valid targets shift or cease fire."],
      ["Reset and update", "For Defensive Missions, remove unresolved PC markers. Reset Mines, then adjust VOF, PDF, and Activity Levels."]
    ],
    details: [
      ["Sniper VOF", "Move Sniper VOF off non-vehicle targets as required before final VOF/PDF updates."],
      ["Advance turn", "After all cleanup is complete, End Turn returns to the Dashboard and advances the turn."]
    ]
  }
];

const missionLabels = {
  defensive: "Defensive",
  offensive: "Offensive",
  patrol: "Combat Patrol"
};

const state = {
  screen: "dashboard",
  currentId: "higher-hq",
  turn: 1,
  mission: "defensive",
  visibility: "Good",
  activity: "Normal"
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
  visibilitySelect: document.querySelector("#visibilitySelect"),
  activitySelect: document.querySelector("#activitySelect"),
  dashboardPhase: document.querySelector("#dashboardPhase"),
  dashboardFilter: document.querySelector("#dashboardFilter"),
  startButton: document.querySelector("#startButton"),
  referenceButton: document.querySelector("#referenceButton"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  phaseNumber: document.querySelector("#phaseNumber"),
  taskTitle: document.querySelector("#taskTitle"),
  taskCopy: document.querySelector("#taskCopy"),
  reminderStrip: document.querySelector("#reminderStrip"),
  substeps: document.querySelector("#substeps"),
  previousButton: document.querySelector("#previousButton"),
  nextButton: document.querySelector("#nextButton")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      Object.assign(state, saved);
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function eligiblePhases() {
  return phases.filter((phase) => !phase.missions || phase.missions.includes(state.mission));
}

function currentPhaseIndex() {
  const list = eligiblePhases();
  const index = list.findIndex((phase) => phase.id === state.currentId);
  return index >= 0 ? index : 0;
}

function currentPhase() {
  return eligiblePhases()[currentPhaseIndex()];
}

function syncControls() {
  elements.turnInput.value = state.turn;
  elements.missionSelect.value = state.mission;
  elements.visibilitySelect.value = state.visibility;
  elements.activitySelect.value = state.activity;
}

function renderDashboard() {
  const phase = currentPhase();
  elements.dashboardPhase.textContent = `${phase.number} ${phase.title}`;
  elements.dashboardFilter.textContent = resetNotice || `Showing ${missionLabels[state.mission]} sequence. Visibility: ${state.visibility}. Activity: ${state.activity}.`;
  resetNotice = "";
}

function renderPhase() {
  const list = eligiblePhases();
  const index = currentPhaseIndex();
  const phase = list[index];
  const percent = ((index + 1) / list.length) * 100;

  state.currentId = phase.id;
  elements.phaseKicker.textContent = `Turn ${state.turn} | ${missionLabels[state.mission]}`;
  elements.phaseTitle.textContent = phase.title;
  elements.progressText.textContent = `Phase ${index + 1} of ${list.length}`;
  elements.progressBar.style.width = `${percent}%`;
  elements.phaseNumber.textContent = phase.number;
  elements.taskTitle.textContent = phase.title;
  elements.taskCopy.textContent = phase.task;
  elements.reminderStrip.textContent = phase.reminder;
  elements.substeps.replaceChildren(
    ...phase.steps.map(createSubstep),
    ...((phase.details || []).map(createDetail))
  );
  elements.previousButton.disabled = index === 0;
  elements.nextButton.textContent = phase.id === "clean-up" ? "End Turn" : "Next Phase";
}

function createSubstep(step) {
  const item = document.createElement("div");
  const title = document.createElement("strong");
  const copy = document.createElement("span");
  item.className = "substep";
  title.textContent = step[0];
  copy.textContent = step[1];
  item.append(title, copy);
  return item;
}

function createDetail(detail) {
  const item = document.createElement("details");
  const summary = document.createElement("summary");
  const copy = document.createElement("p");
  item.className = "detail-block";
  summary.textContent = detail[0];
  copy.textContent = detail[1];
  item.append(summary, copy);
  return item;
}

function renderJumpList() {
  const activeId = currentPhase().id;
  const visibleIds = new Set(eligiblePhases().map((phase) => phase.id));
  elements.jumpList.replaceChildren(...phases.map((phase) => {
    const item = document.createElement("li");

    if (!visibleIds.has(phase.id)) {
      const skipped = document.createElement("div");
      skipped.className = "skip-note";
      skipped.textContent = `${phase.number} ${phase.title} skipped for ${missionLabels[state.mission]}`;
      item.append(skipped);
      return item;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${phase.number} ${phase.title}`;
    if (phase.id === activeId) {
      button.setAttribute("aria-current", "step");
    }
    button.addEventListener("click", () => {
      state.currentId = phase.id;
      showPhase();
      closeJump();
    });
    item.append(button);
    return item;
  }));
}

function showDashboard() {
  state.screen = "dashboard";
  elements.dashboard.hidden = false;
  elements.phaseView.hidden = true;
  elements.phaseKicker.textContent = "Turn Dashboard";
  elements.phaseTitle.textContent = "Fields of Fire";
  renderDashboard();
  saveState();
}

function showPhase() {
  state.screen = "phase";
  elements.dashboard.hidden = true;
  elements.phaseView.hidden = false;
  renderPhase();
  renderDashboard();
  saveState();
}

function nextPhase() {
  const list = eligiblePhases();
  const index = currentPhaseIndex();
  const phase = list[index];

  if (phase.id === "clean-up") {
    state.turn += 1;
    state.currentId = "higher-hq";
    syncControls();
    showDashboard();
    return;
  }

  state.currentId = list[Math.min(index + 1, list.length - 1)].id;
  showPhase();
}

function previousPhase() {
  const list = eligiblePhases();
  const index = currentPhaseIndex();
  state.currentId = list[Math.max(index - 1, 0)].id;
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
  const previousId = state.currentId;
  state.turn = Math.max(1, Number.parseInt(elements.turnInput.value, 10) || 1);
  state.mission = elements.missionSelect.value;
  state.visibility = elements.visibilitySelect.value;
  state.activity = elements.activitySelect.value;

  if (!eligiblePhases().some((phase) => phase.id === state.currentId)) {
    state.currentId = eligiblePhases()[0].id;
    if (previousId !== state.currentId) {
      resetNotice = "Mission changed; sequence reset to 3.1.";
    }
  }

  renderDashboard();
  if (state.screen === "phase") {
    renderPhase();
  }
  saveState();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
}

loadState();
state.screen = "dashboard";
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
elements.visibilitySelect.addEventListener("change", handleSettingsChange);
elements.activitySelect.addEventListener("change", handleSettingsChange);

registerServiceWorker();
