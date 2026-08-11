import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404: Not Found · Enterprise AI Galaxy',
};

const VIDEO_SRC = '/404-background.mp4';

/**
 * 404: full-viewport error screen.
 *
 * Composition: the background video (lowest layer, no overlays), the brand
 * lockup centered at top, and a centered 404 column set in Geist Mono
 * SemiBold. Mobile (≤640px) scales the lockup to 75% and tightens the
 * content column. Adapted from the Vite + Tailwind v4 reference to this
 * Next.js + Tailwind v3 build: the mono face is a system mono stack
 * (Tailwind's default `font-mono`) rather than a downloaded webfont, so
 * the error page keeps its compact mono character without adding a font
 * preload to the critical path of / and /galaxy.
 */
export default function NotFound() {
  return (
    <main
      className="relative min-h-[100svh] overflow-y-auto bg-void font-mono"
    >
      {/* Full-viewport background video: lowest layer, its own motion is the
          only background animation. No tint, blur, or overlay of any kind. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        src={VIDEO_SRC}
      />

      {/* Brand lockup: neutral star mark + wordmark (233px × 40px frame). */}
      <div
        aria-label="Enterprise AI Transformation Galaxy"
        role="img"
        className="absolute left-1/2 top-20 z-10 -translate-x-1/2 max-[640px]:top-8"
      >
        <div className="flex items-center gap-[14px] max-[640px]:scale-[0.75]">
          <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
            <path
              d="M32 4 L38.5 25.5 L60 32 L38.5 38.5 L32 60 L25.5 38.5 L4 32 L25.5 25.5 Z"
              fill="white"
            />
          </svg>
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white">
            Enterprise AI Galaxy
          </span>
        </div>
      </div>

      {/* Centered 404 column: 483px, 44px gaps (28px on mobile). */}
      <div className="absolute left-1/2 top-1/2 z-10 flex w-[483px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[44px] pb-10 text-center max-[640px]:w-[min(100%-40px,360px)] max-[640px]:gap-[28px]">
        <h1 className="bg-[linear-gradient(247.33deg,rgb(255,255,255)_2.53%,rgba(255,255,255,0.4)_93.61%)] bg-clip-text pb-[0.04em] text-[295.751px] font-semibold leading-[1.1] tracking-[-24.6459px] text-transparent max-[640px]:min-h-0 max-[640px]:text-[clamp(140px,52vw,200px)] max-[640px]:tracking-[-0.09em]">
          404
        </h1>
        <div className="h-px w-[425px] bg-white max-[640px]:w-full" />
        <p className="w-full text-[24px] font-semibold leading-[1.1] tracking-[-2px] text-white max-[640px]:text-[clamp(16px,4.5vw,20px)] max-[640px]:tracking-[-1.3px]">
          The path may be broken, but the journey isn&apos;t. Let&apos;s get you back.
        </p>
      </div>
    </main>
  );
}
