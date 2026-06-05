import {
	useRef,
	useContext,
	useCallback,
	useState,
	createContext,
} from "react";
import type { ReactNode } from "react";
import { TextAttributes, RGBA } from "@opentui/core";
import { useKeyboard, useTerminalDimensions } from "@opentui/react";
import type { DialogConfig } from "./types";
import { useKeyboardLayer } from "../KeyboardLayer";
import { useTheme } from "../ThemeProvider";

export type DialogContextValue = {
	open: (config: DialogConfig) => void;
	close: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export const useDialog = (): DialogContextValue | null => {
	const value = useContext(DialogContext);

	if (!value) {
		return null;
	}

	return value;
};

type DialogProviderProps = {
	children: ReactNode;
};

type DialogProps = {
	currentDialog: DialogConfig | null;
	close: () => void;
};

const Dialog = ({ currentDialog, close }: DialogProps) => {
	const { isTopLayer } = useKeyboardLayer();
	const dimensions = useTerminalDimensions();
	const { colors } = useTheme();

	useKeyboard((key) => {
		if (!currentDialog || !isTopLayer("dialog")) return;

		if (key.name == "c" || key.name == "escape") {
			close();
			return;
		}
	});

	if (!currentDialog) {
		return null;
	}

	const { title, children, type } = currentDialog as DialogConfig;

	return (
		<box
			position="absolute"
			left={0}
			top={0}
			width={dimensions.width}
			height={dimensions.height}
			justifyContent="center"
			alignItems="center"
			backgroundColor={RGBA.fromInts(0, 0, 0, 150)}
			zIndex={100}
			onMouseDown={() => close()}
		>
			<box
				width={Math.min(60, dimensions.width - 4)}
				height="auto"
				backgroundColor={colors.dialogSurface}
				paddingX={4}
				paddingY={1}
				flexDirection="column"
				gap={1}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<box
					paddingBottom={1}
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<text attributes={TextAttributes.BOLD}>{title}</text>
					<text attributes={TextAttributes.BOLD} onMouseDown={() => close()}>
						ESC
					</text>
				</box>
				{type === "text" ? (
					<box flexGrow={1}>
						<text>{children}</text>
					</box>
				) : (
					<box flexGrow={1}>{children}</box>
				)}
			</box>
		</box>
	);
};

export const DialogProvider = ({ children }: DialogProviderProps) => {
	const [currentDialog, setCurrentDialog] = useState<DialogConfig | null>(null);
	const { push, pop } = useKeyboardLayer();

	const close = useCallback(() => {
		setCurrentDialog(null);
		pop("dialog");
	}, [pop]);

	const open = useCallback(
		(config: DialogConfig) => {
			setCurrentDialog(config);
			push("dialog", () => {
				close();
				return true;
			});
		},
		[push, close],
	);

	return (
		<DialogContext.Provider value={{ close, open }}>
			{children}
			<Dialog currentDialog={currentDialog} close={close} />
		</DialogContext.Provider>
	);
};
