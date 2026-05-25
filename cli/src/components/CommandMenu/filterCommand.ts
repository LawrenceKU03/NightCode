import { commands } from "./commands";

import type { Command } from "./commandTypes";

export const getFilteredCommands = (query: string): Command[] => {
  if (query.length == 0) {
    return commands;
  }

  return commands.filter((cmd: Command) =>
    cmd.name.toLowerCase().startsWith(query.toLowerCase()),
  );
};
