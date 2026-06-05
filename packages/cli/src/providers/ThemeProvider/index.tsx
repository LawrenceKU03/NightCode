import { mkdirSync, readFile, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import type { ReactNode } from "react";
import {
	type ThemeColors,
	type Theme,
	THEMES,
	DEFAULT_THEME,
} from "../../theme";

const CONFIG_DIR = join(homedir(), ".nightcode");
const THEME_PREFERENCES_PATH = join(CONFIG_DIR, "preferences.json");

type ThemePreferences = {
	themeName: string;
};

export const getInitialTheme = (): Theme | undefined => {
	try {
		const preferences = JSON.parse(
			readFileSync(THEME_PREFERENCES_PATH, "utf-8"),
		) as Partial<ThemePreferences>;
		const savedTheme = THEMES.find(
			(theme) => theme.name === preferences.themeName,
		);
		return savedTheme ?? DEFAULT_THEME;
	} catch {
		return undefined;
	}
};

const persistTheme = (theme: Theme) => {
	try {
		mkdirSync(CONFIG_DIR, { recursive: true });
		writeFileSync(
			THEME_PREFERENCES_PATH,
			JSON.stringify(
				{ themeName: theme.name } satisfies ThemePreferences,
				null,
				2,
			),
			"utf8",
		);
	} catch {}
};

type ThemeContextValue = {
	colors: ThemeColors;
	currentTheme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
	const value = useContext(ThemeContext);

	if (!value) {
		throw new Error("Must be called Outside the theme provider");
	}

	return value;
};

type ThemeProviderProps = {
	children: ReactNode;
};

const index = ({ children }: ThemeProviderProps) => {
	const [currentTheme, setCurrentTheme] = useState<Theme>(
		DEFAULT_THEME as Theme,
	);

	const setTheme = useCallback((theme: Theme) => {
		setCurrentTheme(theme);
		persistTheme(theme);
	}, []);

	useEffect(() => {
		setCurrentTheme(getInitialTheme());
	}, []);

	return (
		<ThemeContext.Provider
			value={{ colors: currentTheme.colors, currentTheme, setTheme }}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export default index;
