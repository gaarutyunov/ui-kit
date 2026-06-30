export default {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The palette shared by garutyunov.com and stereoscope. Every value is exposed as a `--ga-*` custom property in `tokens.css`.",
      },
    },
  },
};

const swatch = (name, varName) => `
  <div style="display:flex; flex-direction:column; gap:6px;">
    <div style="height:64px; border-radius:8px; border:1px solid var(--ga-border-strong);
      background:var(${varName});"></div>
    <code style="font-size:12px; color:var(--ga-fg);">${name}</code>
    <code style="font-size:11px; color:var(--ga-muted);">${varName}</code>
  </div>
`;

export const Palette = {
  render: () => `
    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:16px;">
      ${swatch("Background", "--ga-bg")}
      ${swatch("Elevated", "--ga-bg-elev")}
      ${swatch("Elevated hover", "--ga-bg-elev-hover")}
      ${swatch("Foreground", "--ga-fg")}
      ${swatch("Muted", "--ga-muted")}
      ${swatch("Dim", "--ga-dim")}
      ${swatch("Border", "--ga-border")}
      ${swatch("Accent / Blue", "--ga-blue")}
      ${swatch("Green", "--ga-green")}
      ${swatch("Amber", "--ga-amber")}
      ${swatch("Purple", "--ga-purple")}
      ${swatch("Red", "--ga-red")}
    </div>
  `,
};
