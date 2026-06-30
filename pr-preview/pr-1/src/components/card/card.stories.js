export default {
  title: "Components/Card",
  component: "ga-card",
  tags: ["autodocs"],
  argTypes: {
    interactive: { control: "boolean" },
    padding: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
    href: { control: "text" },
  },
  args: { interactive: false, padding: "md", href: "" },
};

export const Basic = {
  render: ({ interactive, padding, href }) => `
    <ga-card style="max-width:360px" padding="${padding}"
      ${interactive ? "interactive" : ""} ${href ? `href="${href}"` : ""}>
      <h3 style="margin:0 0 8px; font-size:18px;">Depth from a single photo</h3>
      <p style="margin:0; color:var(--ga-muted);">
        Convert any flat image into a stereoscopic 3D pair, entirely in your browser.
      </p>
    </ga-card>
  `,
};

export const WithHeaderFooter = {
  render: () => `
    <ga-card style="max-width:360px">
      <span slot="header">Project</span>
      <p style="margin:0; color:var(--ga-muted);">
        A buildless set of static ES modules — no bundler, no install step.
      </p>
      <div slot="footer">Updated 2 days ago</div>
    </ga-card>
  `,
};

export const Interactive = {
  render: () => `
    <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:16px; max-width:560px;">
      <ga-card interactive>
        <strong>stereoscope</strong>
        <p style="margin:6px 0 0; color:var(--ga-muted); font-size:14px;">WebGPU depth estimation</p>
      </ga-card>
      <ga-card interactive>
        <strong>garutyunov.com</strong>
        <p style="margin:6px 0 0; color:var(--ga-muted); font-size:14px;">Next.js portfolio</p>
      </ga-card>
    </div>
  `,
};
