import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import InputBar from "../components/InputBar";

const index = () => {
	const navig = useNavigate();
	const handleSubmit = useCallback(
		(text: string) => {
			navig("/sessions/new", { state: { message: text } });
		},
		[navig],
	);

	return (
		<box
			alignItems="center"
			justifyContent="center"
			flexGrow={1}
			gap={2}
			position="relative"
			width="100%"
			height="100%"
		>
			<Header />
			<box width="100%" maxWidth={78} paddingX={2}>
				<InputBar onSubmit={handleSubmit} />
			</box>
		</box>
	);
};

export default index;
