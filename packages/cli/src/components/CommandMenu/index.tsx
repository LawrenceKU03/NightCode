import { commands } from "./commands";
import { TextAttributes, type ScrollBarRenderable } from "@opentui/core";
import type { RefObject } from "react";
import { getFilteredCommands } from "./filterCommand";
import { useTheme } from "../../providers/ThemeProvider";

const MAX_VISIBLE_ITEMS = 8;

const MAX_COL_WIDTH = Math.max(...commands.map((cmd) => cmd.name.length)) + 4;

type CommandMenuProps = {
	query: string;
	selectIndex: number;
	scrollRef: RefObject<ScrollBarRenderable | null>;
	onSelect: (index: number) => void;
	onExecute: (index: number) => void;
};

const index = ({
	query,
	selectIndex,
	scrollRef,
	onSelect,
	onExecute,
}: CommandMenuProps) => {
	const filtered = getFilteredCommands(query);
	const visibleHeight = Math.min(filtered.length, MAX_VISIBLE_ITEMS);
	const { colors } = useTheme();

	if (filtered.length == 0) {
		return (
			<box paddingX={2}>
				<text attributes={TextAttributes.DIM}>No Matching Commands</text>
			</box>
		);
	}
	return (
		<scrollbox ref={scrollRef} height={visibleHeight}>
			{filtered.map((cmd, i: number) => {
				const isSelected = i === selectIndex;
				return (
					<box
						key={cmd.value}
						flexDirection="row"
						paddingX={2}
						height={1}
						overflow="hidden"
						backgroundColor={isSelected ? colors.selection : "#000"}
						onMouseMove={() => onSelect(i)}
						onMouseDown={() => onExecute(i)}
					>
						<box width={MAX_COL_WIDTH} flexShrink={0}>
							<text selectable={false} fg={isSelected ? "black" : "white"}>
								/{cmd.name}
							</text>
						</box>
						<box
							width={MAX_COL_WIDTH}
							flexGrow={1}
							flexShrink={1}
							overflow="hidden"
						>
							<text selectable={false} fg={isSelected ? "black" : "gray"}>
								{cmd.description}
							</text>
						</box>
					</box>
				);
			})}
		</scrollbox>
	);
};

export default index;
