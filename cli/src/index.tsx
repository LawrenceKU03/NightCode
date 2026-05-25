import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import Header from "./components/Header";
import InputBar from "./components/InputBar";

function App() {
	return (
		<box
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			backgroundColor="#0D0D12"
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
	);
}

const renderer = await createCliRenderer({
	targetFps: 60,
	exitOnCtrlC: false,
});
createRoot(renderer).render(<App />);
