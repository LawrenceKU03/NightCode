import { Outlet } from "react-router";
import ToastProvider from "../providers/ToastProvider";
import { KeyboardLayerProvider } from "../providers/KeyboardLayer";
import { DialogProvider } from "../providers/DialogProvider";
import ThemeProvider from "../providers/ThemeProvider";
import ThemeRoot from "./ThemeRoot";

const index = () => {
  return (
    <ThemeProvider>
      <KeyboardLayerProvider>
        <DialogProvider>
          <ToastProvider>
            <ThemeRoot>
              <Outlet />
            </ThemeRoot>
          </ToastProvider>
        </DialogProvider>
      </KeyboardLayerProvider>
    </ThemeProvider>
  );
};

export default index;
