import type { ExperienceEntry as ExperienceEntryData } from "@/lib/experience";
import SignalLink from "@/components/SignalLink";

/**
 * A single career-signal row. Pure content — active/past/future state and
 * the moving track node are applied by the parent (ExperienceTrack) via
 * data-state on the <li>, so this stays a plain server-renderable row.
 */
export default function ExperienceEntry({
  entry,
  rowRef,
  markerRef,
  initialState,
}: {
  entry: ExperienceEntryData;
  rowRef: (el: HTMLLIElement | null) => void;
  markerRef: (el: HTMLSpanElement | null) => void;
  initialState: "active" | "past" | "future";
}) {
  return (
    <li
      ref={rowRef}
      className="experience-row"
      data-state={initialState}
      aria-current={initialState === "active" ? "step" : undefined}
    >
      <span ref={markerRef} className="experience-row__marker" aria-hidden="true" />

      <div className="experience-row__meta mono-label">
        
        {entry.startDate ? (
          <time dateTime={entry.startDate}>{entry.period}</time>
        ) : (
          <span>{entry.period}</span>
        )}
      </div>

      <h3 className="experience-row__role">{entry.role}</h3>
      <p className="experience-row__org">{entry.company}</p>
      <p className="experience-row__desc reading-measure">{entry.description}</p>

      {entry.technologies.length > 0 && (
        <span className="mono-label experience-row__focus">{entry.technologies.join(" · ")}</span>
      )}
      <span className="mono-label experience-row__location">{entry.location}</span>

      {entry.projectSlug && (
        <SignalLink
          href={`/work/${entry.projectSlug}`}
          className="experience-row__link"
          data-cursor-hover
        >
          Ver proyecto relacionado →
        </SignalLink>
      )}
    </li>
  );
}
