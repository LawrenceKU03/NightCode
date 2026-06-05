import { useCallback, useRef, type ReactNode, useEffect } from "react";
import { useDialog } from "../providers/DialogProvider";
import { useTheme } from "../providers/ThemeProvider";
import DialogSearchList from "./DialogSearchList";
import { THEMES } from "../theme";
import type { Theme } from "../theme";

export const ThemeDialogContent = () => {
	const dialog = useDialog();

	const { setTheme, currentTheme } = useTheme();
	const ogThemeRef = useRef(currentTheme);
	const confirmedRef = useRef(false);

	useEffect(() => {
		return () => {
			if (!confirmedRef.current) {
				setTheme(ogThemeRef.current);
			}
		};
	}, []);

	const handleSelect = useCallback(
		(theme: Theme) => {
			confirmedRef.current = true;
			setTheme(theme);
			dialog.close();
		},
		[setTheme, dialog],
	);

	const handleHightLight = useCallback(
		(theme: Theme) => {
			setTheme(theme);
		},
		[setTheme],
	);

	return (
		<DialogSearchList
			items={THEMES}
			onSelect={handleSelect}
			onHighlight={handleHightLight}
			filterFn={(t, query) =>
				t.name.toLowerCase().includes(query.toLowerCase())
			}
			renderItem={(theme, isSelected) => {
				return (
					<text selectable={false} fg={isSelected ? "#000" : "#fff"}>
						{theme.name === ogThemeRef.current.name
							? "\u0020\u2022\u0020"
							: "\u0020\u0020\u0020"}
						{theme.name}
					</text>
				);
			}}
			getKey={(t) => t.name}
			placeholder="Search themes"
			emptyText="No matching Texts"
		/>
	);
};
