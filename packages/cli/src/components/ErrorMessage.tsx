import { TextAttributes } from "@opentui/core";
import { useTheme } from "../providers/ThemeProvider";

type Props = {
  message: string;
};

const index = ({ message }: Props) => {
  const { colors } = useTheme();

  return (
    <box width="100%" alignItems="center">
      <box border={["left"]} borderColor={colors.error} width="100%">
        <box
          width="100%"
          paddingX={2}
          paddingY={1}
          backgroundColor={colors.surface}
        >
          <text attributes={TextAttributes.DIM}>{message}</text>
        </box>
      </box>
    </box>
  );
};

export default index;
