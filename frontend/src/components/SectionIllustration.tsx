type IllustrationKind = "creatures" | "sightings" | "report" | "new-creature";

interface SectionIllustrationProps {
  kind: IllustrationKind;
}

export function SectionIllustration({ kind }: SectionIllustrationProps) {
  return (
    <div className={`illus illus--${kind}`} aria-hidden="true" role="presentation">
      <svg viewBox="0 0 180 135" focusable="false">
        {kind === "creatures" && (
          <>
            <path d="M55 48a35 35 0 0 1 70 0v13H55z" fill="var(--blue)" stroke="var(--ink)" strokeWidth="3" />
            <rect x="42" y="60" width="96" height="52" fill="var(--orange)" stroke="var(--ink)" strokeWidth="3" />
            <circle cx="91" cy="48" r="12" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
            <circle cx="94" cy="48" r="4" fill="var(--ink)" />
            <path d="M60 23 48 4 76 17zM118 17l27-13-11 24z" fill="var(--red)" stroke="var(--ink)" strokeWidth="3" />
            <path d="M55 112v17h15v-17m25 0v17h15v-17m17-1v18h15v-18" fill="var(--ink)" />
          </>
        )}
        {kind === "sightings" && (
          <>
            <path d="M16 24h148M16 49h148M16 74h148M16 99h148M34 12v111M62 12v111M90 12v111M118 12v111M146 12v111" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <circle cx="91" cy="67" r="39" fill="var(--blue)" stroke="var(--ink)" strokeWidth="3" />
            <circle cx="91" cy="67" r="19" fill="var(--ink)" />
            <path d="m127 29 25 42h-50z" fill="var(--orange)" stroke="var(--ink)" strokeWidth="3" />
            <rect x="24" y="87" width="11" height="11" fill="var(--red)" />
            <rect x="143" y="95" width="11" height="11" fill="var(--red)" />
          </>
        )}
        {kind === "report" && (
          <>
            <path d="M46 93a28 28 0 0 1 56 0v8H46z" fill="var(--green)" stroke="var(--ink)" strokeWidth="3" />
            <circle cx="53" cy="67" r="7" fill="var(--ink)" />
            <circle cx="73" cy="59" r="7" fill="var(--ink)" />
            <circle cx="94" cy="67" r="7" fill="var(--ink)" />
            <rect x="111" y="77" width="14" height="58" fill="var(--orange)" stroke="var(--ink)" strokeWidth="3" transform="rotate(-42 118 106)" />
            <circle cx="94" cy="49" r="31" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="7" />
          </>
        )}
        {kind === "new-creature" && (
          <>
            <path d="M40 18h86l20 20v82H40z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
            <path d="M126 18v21h20" fill="none" stroke="var(--ink)" strokeWidth="3" />
            <rect x="54" y="54" width="72" height="48" fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="89" cy="80" r="12" fill="var(--green)" stroke="var(--ink)" strokeWidth="3" />
            <path d="m78 70-8-12 18 7zm23-5 17-8-7 16z" fill="var(--green)" stroke="var(--ink)" strokeWidth="3" />
            <path d="M132 14v28m-14-14h28" stroke="var(--orange)" strokeWidth="7" />
          </>
        )}
      </svg>
    </div>
  );
}
