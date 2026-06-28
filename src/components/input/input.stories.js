export default {
  title: "Components/Input",
  component: "ga-input",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    type: { control: "select", options: ["text", "email", "password", "number", "search"] },
    hint: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
    hint: "We'll never share it.",
    error: "",
    required: false,
    disabled: false,
  },
};

export const Playground = {
  render: ({ label, placeholder, type, hint, error, required, disabled }) => `
    <div style="max-width:320px">
      <ga-input
        label="${label}" placeholder="${placeholder}" type="${type}"
        ${hint ? `hint="${hint}"` : ""} ${error ? `error="${error}"` : ""}
        ${required ? "required" : ""} ${disabled ? "disabled" : ""}>
      </ga-input>
    </div>
  `,
};

export const States = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:16px; max-width:320px;">
      <ga-input label="Default" placeholder="Type here"></ga-input>
      <ga-input label="With hint" placeholder="Username" hint="3–20 characters"></ga-input>
      <ga-input label="Required" placeholder="Required field" required></ga-input>
      <ga-input label="Error" value="nope" error="That username is taken"></ga-input>
      <ga-input label="Disabled" placeholder="Can't touch this" disabled></ga-input>
    </div>
  `,
};
