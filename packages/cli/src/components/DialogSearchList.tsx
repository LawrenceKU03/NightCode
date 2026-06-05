import { useCallback, useState, useRef, type ReactNode } from "react";
import { useKeyboard, useRenderer } from "@opentui/react";
import {
	InputRenderable,
	ScrollBoxRenderable,
	TextAttributes,
	type TextRenderable,
} from "@opentui/core";
import { useKeyboardLayer } from "../providers/KeyboardLayer";
import { useTheme } from "../providers/ThemeProvider";

const MAX_VISIBLE_ITEMS = 6;

type DialogSearchListProps<T> = {
	items: T[];
	onSelect: (item: T) => void;
	onHighlight?: (item: T, isSelect: boolean) => ReactNode;
	filterFn: (items: T, query: string) => void;
	renderItem: (item: T, isSelected: boolean) => ReactNode;
	getKey: (item: T) => string;
	placeholder?: string;
	emptyText?: string;
};

const DialogSearchList = <T,>({
	items,
	onSelect,
	onHighlight,
	filterFn,
	renderItem,
	getKey,
	placeholder = "Search",
	emptyText = "No Results",
}: DialogSearchListProps<T>) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	const inputRef = useRef<InputRenderable | null>(null);
	const scrollRef = useRef<ScrollBoxRenderable | null>(null);
	const { colors } = useTheme();

	const { isTopLayer } = useKeyboardLayer();

	const handleContentChange = useCallback(() => {
		const text = inputRef.current?.value ?? "";
		setSearchValue(text);
		setSelectedIndex(0);

		const scrollbox = scrollRef.current;

		if (scrollbox) {
			scrollbox.scrollTo(0);
		}
	}, []);

	const filtered = searchValue
		? items.filter((item) => filterFn(item, searchValue))
		: items;

	const visibleHeight = Math.min(filtered.length, MAX_VISIBLE_ITEMS);

	useKeyboard((key) => {
		if (!isTopLayer("dialog")) return;

		if (key.name === "e") {
			key.preventDefault();

			const item = filtered[selectedIndex];
			if (item) {
				onSelect(item);
			}
		} else if (key.name === "up") {
			key.preventDefault();

			setSelectedIndex((i) => {
				const newIndex = Math.max(0, i - 1);

				const sb = scrollRef.current;
				if (sb && newIndex < sb.scrollTop) {
					sb.scrollTo(newIndex);
				}
				const item = filtered[newIndex];
				if (item && onHighlight) onHighlight[item];
				return newIndex;
			});
		} else if (key.name === "down") {
			key.preventDefault();

			setSelectedIndex((i) => {
				const newIndex = Math.min(filtered.length - 1, i + 1);
				const sb = scrollRef.current;

				const viewHeight = sb?.viewport?.height;
				const visibleEnd = sb.scrollTop + viewHeight - 1;

				if (newIndex > visibleEnd) {
					sb.scrollTo(newIndex - visibleEnd + 1);
				}
				const item = filtered[newIndex];
				if (item && onHighlight) onHighlight[item];
				return newIndex;
			});
		}
	});

	return (
		<box flexDirection="column" gap={1}>
			<input
				ref={inputRef}
				placeholder={placeholder}
				focused
				onContentChange={handleContentChange}
			/>
			<scrollbox ref={scrollRef} height={visibleHeight}>
				{filtered.length == 0 ? (
					<text attributes={TextAttributes.DIM}>{emptyText}</text>
				) : (
					filtered.map((item, i: number) => {
						const isSelected = i === selectedIndex;
						return (
							<box
								key={getKey(item)}
								flexDirection="row"
								height={1}
								overflow="hidden"
								backgroundColor={isSelected ? colors.selection : "#000"}
								onMouseMove={() => {
									setSelectedIndex(i);
									if (onHighlight) {
										onHighlight(item, isSelected);
									}
								}}
								onMouseDown={() => onSelect(item)}
							>
								{renderItem(item, isSelected)}
							</box>
						);
					})
				)}
			</scrollbox>
		</box>
	);
};

export default DialogSearchList;
