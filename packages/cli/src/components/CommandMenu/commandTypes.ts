import type { DialogContextValue } from "../../providers/DialogProvider";
import type { ToastContextValue } from "../../providers/ToastProvider";
import type { ThemeContext } from "../../providers/ThemeProvider";

export type CommandContext = {
	exit: () => void;
	toast: ToastContextValue;
	dialog: DialogContextValue;
};

export type Command = {
	name: string;
	description: string;
	value: string;
	action?: (ctx: CommandContext) => Promise<void>;
};
