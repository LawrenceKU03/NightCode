import { TextAttributes } from "@opentui/core";

const index = () => {
  return (
    <box flexDirection="row" gap={1}>
      <text fg="cyan">Build</text>
      <text attributes={TextAttributes.DIM} fg="gray">></text>
      <text>Opus 4.6</text>
    </box>
  )
}

export default index;
