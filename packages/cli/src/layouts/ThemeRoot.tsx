import type { ReactNode } from "react";
import Header from "../components/Header";
import InputBar from "../components/InputBar";
import { useTheme } from "../providers/ThemeProvider";

type Props = {
	children: ReactNode;
};

const ThemeRoot = ({ children }: Props) => {
	const { colors } = useTheme();

	return (
		<box
			backgroundColor={colors.background}
			width="100%"
			height="100%"
			flexGrow={1}
		>
			{children}
		</box>
	);

	/*
return (
	<box
		flexDirection="column"
		alignItems="center"
		justifyContent="center"
		backgroundColor={colors.background}
		width="100%"
		height="100%"
		gap={2}
	>
		<Header />
		<box
			flexShrink={0} // ← prevents resize on input
			paddingX={2}
		>
			<InputBar onSubmit={() => { }} />
		</box>
	</box>
);*/
};

export default ThemeRoot;
