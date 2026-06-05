import { useCallback, useEffect, useRef } from "react";
import { useRenderer } from "@opentui/react";
import { TextareaRenderable, type TextRenderable } from "@opentui/core";
import type { KeyBinding } from "@opentui/core";

import StatusBar from "./StatusBar";
import CommandMenu from "./CommandMenu";
import type { Command } from "./CommandMenu/commandTypes";
import { UseCommandMenuReturn } from "./CommandMenu/useCommandMenuHook";
import { useToast } from "../providers/ToastProvider";
import { useKeyboardLayer } from "../providers/KeyboardLayer";
import { useDialog } from "../providers/DialogProvider";
import { useTheme } from "../providers/ThemeProvider";

type Props = {
	onSubmit: (text: string) => void;
	disabled?: boolean;
};

const TEXT_AREA_BINDING: KeyBinding[] = [
	{ name: "enter", action: "submit" },

	{ name: "n", ctrl: true, action: "newline" },
];

const index = ({ disabled, onSubmit }: Props) => {
	const textareaRef = useRef<TextareaRenderable>(null);
	const onSubmitRef = useRef<() => void>(() => {});
	const toast = useToast();
	const dialog = useDialog();
	const { isTopLayer, setResponder } = useKeyboardLayer();
	const { colors } = useTheme();

	const renderer = useRenderer();

	const {
		showCommandMenu,
		commandQuery,
		selectedIndex,
		scrollRef,
		handleContentChange,
		resolveCommand,
		setSelectedIndex,
	} = UseCommandMenuReturn();

	const handleCommand = useCallback(
		(command: Command | undefined) => {
			const textarea = textareaRef.current;
			if (!textarea || !command) return;
			textarea.setText("");
			if (command.action) {
				command.action({
					exit: () => renderer.destroy(),
					toast: toast,
					dialog: dialog,
				});
			} else {
				textarea.insertText(command.value + " ");
			}
		},
		[renderer, toast, dialog],
	);

	const handleTextareaContentChange = useCallback(() => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		handleContentChange(textarea.plainText);
	}, []);

	const handleCommandExecute = useCallback((index: string) => {
		const command: Command = resolveCommand(index);
		handleCommand(command);
	}, []);

	const handleSubmit = useCallback(() => {
		if (disabled) return;

		const textarea = textareaRef.current;

		if (showCommandMenu) {
			const command = resolveCommand(selectedIndex);
			handleCommand(command);
			return;
		}

		if (!textarea) return;

		const text = textarea.plainText.trim();
		if (text.length === 0) return;

		onSubmit(text);
		textarea.setText("");
	}, [disabled, onSubmit,showCommandMenu,selectedIndex]);

	useEffect(() => {
		const textarea = textareaRef.current;

		if (!textarea) return;

		onSubmitRef.current = () => {
			handleSubmit();
		};

		textarea.onSubmit = () => {
			onSubmitRef.current();
		};
	}, [selectedIndex, disabled, showCommandMenu]);

	useEffect(() => {
		setResponder("base", () => {
			if (disabled) return false;

			const textarea = textareaRef.current;

			if (textarea && textarea.plainText.length > 0) {
				textarea.setText("");
				return true;
			}
			return false;
		});

		return () => setResponder("base", null);
	}, [disabled, setResponder]);

	return (
		<box width="100%" alignItems="center">
			<box
							width="100%"
				border={["left"]}
				borderColor={colors.primary}
			>
				<box
					position="relative"
					justifyContent="center"
					paddingX={2}
					paddingY={1}
					backgroundColor={"#1A1A1A"}
					gap={1}
				>
					{showCommandMenu && (
						<box
							position="absolute"
							bottom="100%"
							left={0}
							width="100%"
							backgroundColor={"#1A1A124"}
							zIndex={24}
						>
							<CommandMenu
								query={commandQuery}
								selectIndex={selectedIndex}
								scrollRef={scrollRef}
								onSelect={setSelectedIndex}
								onExecute={handleCommandExecute}
							/>
						</box>
					)}
					<textarea
						ref={textareaRef}
						onContentChange={handleTextareaContentChange}
						keyBindings={TEXT_AREA_BINDING}
						focused={!disabled && (isTopLayer("base") || isTopLayer("command"))}
						placeholder={"Ask anything... 'fix a bug in the database'"}
						onSubmit={() => handleSubmit()}
					></textarea>
					<StatusBar />
				</box>
			</box>
		</box>
	);
};

export default index;
