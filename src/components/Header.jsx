import {
  BRAND_NAME,
  BRAND_INITIAL,
  CREAM,
  CREAM_DEEP,
  INK,
  INK_SOFT,
  PAPER_BORDER,
} from "../lib/constants";

export default function Header({ onLogoClick }) {
  return (
    <header className="max-w-6xl mx-auto px-6 md:px-10 pt-7 pb-3 flex items-center justify-between">
      <button onClick={onLogoClick} className="flex items-center gap-2 group">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: INK, color: CREAM }}
        >
          <span className="font-display text-lg font-semibold leading-none translate-y-[1px]">
            {BRAND_INITIAL}
          </span>
        </div>
        <span className="font-display text-xl tracking-tight">{BRAND_NAME}</span>
      </button>
      <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: INK_SOFT }}>
        <a href="#" className="hover:opacity-70 transition">How it works</a>
        <a href="#" className="hover:opacity-70 transition">For businesses</a>
        <a href="#" className="hover:opacity-70 transition">Stories</a>
        <a
          href="#"
          className="px-3.5 py-1.5 rounded-full text-sm transition"
          style={{ background: CREAM_DEEP, color: INK, border: `1px solid ${PAPER_BORDER}` }}
        >
          Sign in
        </a>
      </nav>
    </header>
  );
}
