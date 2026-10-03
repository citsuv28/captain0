"use client";

import { useState } from "react";
import { useProject } from "@/components/ProjectProvider";
import { getCopy } from "@/lib/content";

export function ProjectBrief() {
  const copy = getCopy();
  const { brief, setField, removeReference, saveOnDevice } = useProject();
  const [status, setStatus] = useState("");

  return (
    <section className="enquiry" id="enquiry">
      <div>
        <p className="eyebrow">YOUR PROJECT</p>
        <h2>
          Your project.
        </h2>
        <p>{copy.contact.lead}</p>
        <p className="small">
          Save your brief below. It stays on this device and is not sent.
        </p>
      </div>
      <form
        className="brief"
        onSubmit={(event) => {
          event.preventDefault();
          saveOnDevice();
          setStatus("Saved on this device. Nothing was sent.");
        }}
      >
        <label>
          Project or studio
          <input
            name="project"
            autoComplete="organization"
            maxLength={150}
            value={brief.project}
            onChange={(event) => setField("project", event.target.value)}
            required
          />
        </label>
        <label>
          Destination
          <input
            name="destination"
            placeholder="Country / postcode"
            maxLength={150}
            value={brief.destination}
            onChange={(event) => setField("destination", event.target.value)}
          />
        </label>
        <label className="full">
          Selected pieces
          <input
            name="references"
            readOnly
            value={brief.references.join(", ")}
            placeholder="Open a piece and add it"
          />
        </label>
        {brief.references.length > 0 ? (
          <div className="full chosenlist">
            {brief.references.map((id) => (
              <button
                key={id}
                type="button"
                className="textbutton"
                onClick={() => removeReference(id)}
              >
                Remove {id}
              </button>
            ))}
          </div>
        ) : null}
        <label className="full">
          What are you looking for?
          <textarea
            name="description"
            required
            maxLength={3000}
            value={brief.description}
            onChange={(event) => setField("description", event.target.value)}
            placeholder="Piece, intended use, delivery postcode…"
          />
        </label>
        <button className="button" type="submit">
          Save project brief
        </button>
        <p className="small full">
          The file stays on this device. Nothing is sent.
        </p>
        <div className="status full" role="status">
          {status}
        </div>
      </form>
    </section>
  );
}
