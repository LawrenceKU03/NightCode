export type ThemeColors = {
	primary: string;
	planMode: string;
	selection: string;
	thinking: string;
	success: string;
	error: string;
	info: string;
	background: string;
	surface: string;
	dialogSurface: string;
	thinkingBorder: string;
	dimSeparator: string;
};

export type Theme = {
	name: string;
	colors: ThemeColors;
};

export const THEMES: Theme[] = [
	{
		name: "NightFox",
		colors: {
			primary: "#56D6C2",
			planMode: "#CF8EF4",
			selection: "#89B4FA",
			thinking: "#CF8EF4",
			success: "#82E0AA",
			error: "#E74C5E",
			info: "#56D6C2",
			background: "#0D0D12",
			surface: "#1a1a1a",
			dialogSurface: "#0A0A0A",
			thinkingBorder: "#34344A",
			dimSeparator: "#4E4E66",
		},
	},
	{
		name: "PureMatrix",
		colors: {
			primary: "#00FF00", // Pure Lime Green
			planMode: "#00FFFF", // Pure Cyan
			selection: "#333333",
			thinking: "#00FFFF",
			success: "#00FF00",
			error: "#FF0000", // Pure Red
			info: "#00FFFF",
			background: "#000000", // Solid Pitch Black
			surface: "#111111",
			dialogSurface: "#080808",
			thinkingBorder: "#222222",
			dimSeparator: "#333333",
		},
	},
	{
		name: "MonochromeStark",
		colors: {
			primary: "#FFFFFF", // Flat White
			planMode: "#888888", // Mid Gray
			selection: "#CCCCCC",
			thinking: "#888888",
			success: "#FFFFFF",
			error: "#FF0055",
			info: "#FFFFFF",
			background: "#000000", // Stark Black
			surface: "#1A1A1A",
			dialogSurface: "#0D0D0D",
			thinkingBorder: "#333333",
			dimSeparator: "#444444",
		},
	},
	{
		name: "LaserTag",
		colors: {
			primary: "#FF00FF", // Magenta
			planMode: "#00FFCC", // Electric Teal
			selection: "#440044",
			thinking: "#00FFCC",
			success: "#00FF00",
			error: "#FF3333",
			info: "#FF00FF",
			background: "#0A0512", // Pure Deep Blue-Black
			surface: "#170D26",
			dialogSurface: "#0F081A",
			thinkingBorder: "#341B54",
			dimSeparator: "#522A84",
		},
	},
	{
		name: "GruvboxHard",
		colors: {
			primary: "#FABD2F", // Solid Yellow
			planMode: "#D3869B", // Solid Pink-Purple
			selection: "#504945",
			thinking: "#D3869B",
			success: "#B8BB26", // Solid Green
			error: "#FB4934", // Solid Red
			info: "#83A598", // Solid Blue
			background: "#1D2021", // Flat Dark Charcoal
			surface: "#282828",
			dialogSurface: "#141617",
			thinkingBorder: "#3C3836",
			dimSeparator: "#665C54",
		},
	},
	{
		name: "CrimsonVoid",
		colors: {
			primary: "#FF3344", // Crimson
			planMode: "#FFAA00", // Amber Orange
			selection: "#3A1115",
			thinking: "#FFAA00",
			success: "#00FF88",
			error: "#FF0000",
			info: "#FF3344",
			background: "#0A0204", // Deep Red-Tinted Black
			surface: "#17080B",
			dialogSurface: "#0D0305",
			thinkingBorder: "#361219",
			dimSeparator: "#541D26",
		},
	},
	{
		name: "IceCap",
		colors: {
			primary: "#00A2FF", // Pure Blue
			planMode: "#A600FF", // Pure Purple
			selection: "#112A45",
			thinking: "#A600FF",
			success: "#00E575",
			error: "#FF1A43",
			info: "#00A2FF",
			background: "#050B14", // Solid Navy Black
			surface: "#0E192B",
			dialogSurface: "#08101C",
			thinkingBorder: "#1C355E",
			dimSeparator: "#2C5394",
		},
	},
	{
		name: "HighContrastAmber",
		colors: {
			primary: "#FFB000", // Industrial Amber
			planMode: "#FFFFFF",
			selection: "#4D3500",
			thinking: "#FFFFFF",
			success: "#00FF00",
			error: "#FF0000",
			info: "#FFB000",
			background: "#000000", // Pure Terminal Black
			surface: "#151100",
			dialogSurface: "#0A0800",
			thinkingBorder: "#473A00",
			dimSeparator: "#7A6400",
		},
	},
	{
		name: "ChromaBlue",
		colors: {
			primary: "#3366FF", // True Blue
			planMode: "#00FFCC", // Mint Cyan
			selection: "#112255",
			thinking: "#00FFCC",
			success: "#00FF66",
			error: "#FF2255",
			info: "#3366FF",
			background: "#050814",
			surface: "#0D1326",
			dialogSurface: "#070A14",
			thinkingBorder: "#1F2D59",
			dimSeparator: "#33498F",
		},
	},
	{
		name: "SynthWave84",
		colors: {
			primary: "#FFE600", // Yellow Neon
			planMode: "#FF007F", // Neon Pink
			selection: "#3E0066",
			thinking: "#FF007F",
			success: "#00FF66",
			error: "#FF0033",
			info: "#00FFFF",
			background: "#180030", // Pure Solid Purple Base
			surface: "#2A004D",
			dialogSurface: "#100021",
			thinkingBorder: "#590099",
			dimSeparator: "#8C00FF",
		},
	},
	{
		name: "FlatDaylight", // A stark, non-blurry light theme
		colors: {
			primary: "#0000FF", // Pure Blue
			planMode: "#FF0000", // Pure Red
			selection: "#EEEEEE",
			thinking: "#FF0000",
			success: "#008000",
			error: "#FF0000",
			info: "#0000FF",
			background: "#FFFFFF", // Flat Solid White
			surface: "#F0F0F0",
			dialogSurface: "#E0E0E0",
			thinkingBorder: "#CCCCCC",
			dimSeparator: "#999999",
		},
	},
];
export const DEFAULT_THEME = THEMES.find((t) => t.name === "NightFox");
