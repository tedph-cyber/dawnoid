"use client";
export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="w-full bg-gradient-to-b from-card to-background border-t border-border text-foreground px-4 py-4 sm:px-6 font-sans"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
        <p className="m-0 text-sm sm:text-base leading-tight text-foreground/90">
          Let your light so shine before men... - Matthew 5:16
        </p>

        <p className="m-0 text-xs sm:text-sm text-muted-foreground">
          © 2025 DawnOID enterprise | Where Faith meets excellence.
        </p>
      </div>
    </footer>
  );
}
