import "opentui-spinner/react";
import { useTheme } from "../providers/ThemeProvider";

const index = () => {
	const { colors } = useTheme();
	return <spinner name="aesthetic" color={colors.primary} />;
};

export default index;
