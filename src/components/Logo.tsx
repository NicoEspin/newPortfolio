import { LOGO_DOT, LOGO_E_PATH, LOGO_N_PATH, LOGO_VIEWBOX } from "@/lib/logo";

export default function Logo({
  style,
  className,
}: {
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      style={style}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="currentColor" d={LOGO_N_PATH} />
      <path fill="currentColor" d={LOGO_E_PATH} />
      <circle fill="var(--color-signal)" cx={LOGO_DOT.cx} cy={LOGO_DOT.cy} r={LOGO_DOT.r} />
    </svg>
  );
}
