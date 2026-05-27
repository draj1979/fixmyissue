import {
  BRAND_NAME,
  BRAND_INITIAL,
  CREAM,
  INK,
  INK_SOFT,
  PAPER_BORDER,
} from "../lib/constants";

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: PAPER_BORDER }}>
      <div
        className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-sm"
        style={{ color: INK_SOFT }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: INK, color: CREAM }}
          >
            <span className="font-display text-xs font-semibold leading-none translate-y-[1px]">
              {BRAND_INITIAL}
            </span>
          </div>
          <span>{BRAND_NAME} · We chase, so you don't have to.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:opacity-70">Privacy</a>
          <a href="#" className="hover:opacity-70">Terms</a>
          <a href="#" className="hover:opacity-70">For businesses</a>
        </div>
      </div>
    </footer>
  );
}
