"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getCollectionPieces } from "@/lib/collection";

const STORAGE_KEY = "captain0-project-brief";
const CHANGE_EVENT = "captain0-brief";

export type ProjectBrief = {
  project: string;
  destination: string;
  description: string;
  references: string[];
};

const EMPTY: ProjectBrief = {
  project: "",
  destination: "",
  description: "",
  references: [],
};

type ProjectApi = {
  brief: ProjectBrief;
  setField: (
    field: "project" | "destination" | "description",
    value: string,
  ) => void;
  addReference: (id: string) => void;
  removeReference: (id: string) => void;
  saveOnDevice: () => void;
};

const ProjectContext = createContext<ProjectApi | null>(null);

function knownIds(): Set<string> {
  return new Set(getCollectionPieces().map((piece) => piece.id));
}

function parseBrief(raw: string): ProjectBrief {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as Partial<ProjectBrief>;
    const known = knownIds();
    const references = Array.isArray(parsed.references)
      ? parsed.references.filter(
          (id): id is string => typeof id === "string" && known.has(id),
        )
      : [];
    return {
      project: typeof parsed.project === "string" ? parsed.project : "",
      destination: typeof parsed.destination === "string" ? parsed.destination : "",
      description: typeof parsed.description === "string" ? parsed.description : "",
      references,
    };
  } catch {
    return EMPTY;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function readRaw(): string {
  return localStorage.getItem(STORAGE_KEY) ?? "";
}

function writeBrief(brief: ProjectBrief) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(brief));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function briefText(brief: ProjectBrief): string {
  return [
    "CAPTAIN0 | PROJECT BRIEF",
    "",
    `Project: ${brief.project}`,
    `Destination: ${brief.destination}`,
    `Pieces: ${brief.references.join(", ")}`,
    "",
    brief.description,
    "",
    "Saved on this device. Nothing was sent.",
  ].join("\n");
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  const brief = useMemo(() => parseBrief(raw), [raw]);

  function setField(
    field: "project" | "destination" | "description",
    value: string,
  ) {
    writeBrief({ ...brief, [field]: value });
  }

  function addReference(id: string) {
    if (!knownIds().has(id) || brief.references.includes(id)) return;
    writeBrief({ ...brief, references: [...brief.references, id] });
  }

  function removeReference(id: string) {
    writeBrief({
      ...brief,
      references: brief.references.filter((entry) => entry !== id),
    });
  }

  function saveOnDevice() {
    const file = new Blob([briefText(brief)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Captain0-project-brief.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <ProjectContext.Provider
      value={{ brief, setField, addReference, removeReference, saveOnDevice }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject(): ProjectApi {
  const value = useContext(ProjectContext);
  if (!value) {
    throw new Error("useProject must be used inside ProjectProvider");
  }
  return value;
}
