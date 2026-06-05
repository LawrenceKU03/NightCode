import type { Command, CommandContext } from "./commandTypes";
import { ThemeDialogContent } from "../ThemeDialog";

export const commands: Command[] = [
	{
		name: "new",
		description: "Start new convo",
		value: "/new",
		action: async (ctx: CommandContext) => {
			ctx.toast.show({ message: "New chat started!" });
		},
	},
	{
		name: "models",
		description: "Select AI model to use",
		value: "/models",
		action: async (ctx: CommandContext) => {
			ctx.toast.show({ message: "Models coming soon!" });
		},
	},
	{
		name: "agents",
		description: "Switch agent",
		value: "/agents",
		action: async (ctx: CommandContext) => {
			ctx.dialog.open({
				title: "Select Mode",
				children: "Agent selection coming soon!",
				type: "text",
			});
		},
	},
	{
		name: "logout",
		description: "Sign out of your account",
		value: "/logout",
	},
	{
		name: "theme",
		description: "Change color",
		value: "/theme",
		action: async (ctx: CommandContext) => {
			ctx.dialog.open({
				title: "Select Theme",
				children: <ThemeDialogContent />,
			});
		},
	},
	{
		name: "sessions",
		description: "Browser past session in browser",
		value: "/sessions",
	},
	{
		name: "login",
		description: "Sign in to your account",
		value: "/login",
	},
	{
		name: "usage",
		description: "Open billing portal in browser",
		value: "/usage",
	},
	{
		name: "upgrade",
		description: "Buy more credits",
		value: "/upgrade",
	},

	{
		name: "exit",
		description: "Quit the application",
		value: "/exit",
		action: async (ctx) => {
			ctx.exit();
		},
	},
];
