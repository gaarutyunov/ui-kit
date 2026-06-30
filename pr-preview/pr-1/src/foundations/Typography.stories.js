export default {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Geist Sans for UI and body, Geist/Fira Mono for code and labels — the same families used across the source projects.",
      },
    },
  },
};

export const Scale = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:18px; color:var(--ga-fg);">
      <div style="font-size:var(--ga-fs-3xl); line-height:1.1; letter-spacing:-0.02em; font-weight:600;">
        Display — depth from a single photo
      </div>
      <div style="font-size:var(--ga-fs-xl); letter-spacing:-0.01em; font-weight:600;">
        Heading — universal components
      </div>
      <div style="font-size:var(--ga-fs-base); line-height:var(--ga-lh-base); max-width:60ch; color:var(--ga-muted);">
        Body — A buildless set of static ES modules and a Next.js portfolio, unified
        into one design language. The quick brown fox jumps over the lazy dog.
      </div>
      <div style="font-family:var(--ga-font-mono); font-size:var(--ga-fs-sm); color:var(--ga-muted);">
        Mono — const accent = "#54a2ff";
      </div>
    </div>
  `,
};
