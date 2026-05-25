import { useCallback, useEffect, useRef } from "react";
import { useRenderer } from "@opentui/react";
import { TextareaRenderable, type TextRenderable } from "@opentui/core";
import type { KeyBinding } from "@opentui/core";

import StatusBar from "./StatusBar";
import CommandMenu from "./CommandMenu";
import type { Command } from "./CommandMenu/commandTypes";
import { UseCommandMenuReturn } from "./CommandMenu/useCommandMenuHook";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
};

const TEXT_AREA_BINDING: KeyBinding[] = [
  { name: "n", ctrl: true, action: "newline" },
  { name: "enter", action: "submit" },
];

const index = ({ disabled, onSubmit }: Props) => {
  const textareaRef = useRef<TextareaRenderable>(null);
  const onSubmitRef = useRef<() => void>(() => { });
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
        });
      } else {
        textarea.insertText(command.value + " ");
      }
    },
    [renderer],
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
    if (!textarea) return;

    const text = textarea.plainText.trim();
    if (text.length === 0) return;

    onSubmit(text);
    textarea.setText("");
  }, [disabled, onSubmit]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.onSubmit = () => {
      onSubmitRef.current();
    };

    onSubmitRef.current = () => {
      if (disabled) return;

      if (showCommandMenu) {
        const command = resolveCommand(selectedIndex);
        handleCommand(command);
        return;
      }
      handleSubmit();
    };
  }, [selectedIndex, disabled, showCommandMenu]);

  return (
    <box width="100%" alignItems="center">
      <box width="100%" width={68} border={["left"]} borderColor={"cyan"}>
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
            focused={!disabled}
            placeholder={"Ask anything... 'fix a bug in the database'"}
            onSubmit={handleSubmit}
          ></textarea>
          <StatusBar />
        </box>
      </box>
    </box>
  );
};

export default index;
