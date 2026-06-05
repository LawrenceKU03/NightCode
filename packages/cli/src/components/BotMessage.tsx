import { useTheme } from "../providers/ThemeProvider";

type Props = {
	content: string;
	model: string;
};

const index = ({ content, model }: Props) => {
	const { colors } = useTheme();

	return (
		<box width="100%" alignItems="center">
			<box paddingY={1} width="100%">
				<box paddingX={3} width="100%">
					<text>{content}</text>
				</box>
			</box>
			<box paddingX={3} paddingBottom={1} width="100%">
				<box flexDirection="row" gap={2}>
					<text fg={colors.primary}>◉</text>
					<text>{model}</text>
				</box>
			</box>
		</box>
	);
};

export default index;
