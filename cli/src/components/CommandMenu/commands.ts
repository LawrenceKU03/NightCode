import type { Command } from "./commandTypes";

export const commands: Command[] = [
  {
    name: "new",
    description: "Start new convo",
    value: "/new",
  },
  {
    name: "models",
    description: "Select AI model to use",
    value: "/models",
  },
  {
    name: "agents",
    description: "Switch agent",
    value: "/agents",
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
