/**
 * Static atmospheric layer for the studio theme.
 *
 * Deliberately motionless: fine architectural rules plus two very restrained
 * colour washes that give the frosted surfaces something to refract. No
 * drifting blobs or particles — the composition should carry the page, not
 * ambient animation.
 */
export default function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--page)]" />

      {/* Restrained pale-blue and lavender washes */}
      <div className="ambient -left-[14%] -top-[10%] h-[30rem] w-[30rem] bg-accent-300/40 dark:bg-accent-700/40" />
      <div className="ambient -right-[12%] top-[18%] h-[26rem] w-[26rem] bg-lavender-300/40 dark:bg-violet-800/40" />
      <div className="ambient -bottom-[12%] left-[22%] h-[26rem] w-[26rem] bg-sky-300/35 dark:bg-sky-800/35" />

      {/* Fine grid, faded out below the first screen */}
      <div className="grid-lines absolute inset-x-0 top-0 h-[100vh]" />

      {/* Vertical column rules — the "studio" structure */}
      <div className="absolute inset-0 mx-auto hidden max-w-6xl lg:block">
        <div className="absolute inset-y-0 left-1/4 w-px bg-[rgb(var(--rule))]" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-[rgb(var(--rule))]" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-[rgb(var(--rule))]" />
      </div>

      {/* Lifts the centre so body copy keeps strong contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgb(255_255_255/0.78),transparent_100%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgb(8_11_20/0.72),transparent_100%)]" />
    </div>
  );
}
