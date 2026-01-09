import { Platform } from "react-native";

export const Fonts = Platform.select({
	ios: {
		/** iOS `UIFontDescriptorSystemDesignDefault` */
		sans: "system-ui",
		/** iOS `UIFontDescriptorSystemDesignSerif` */
		serif: "ui-serif",
		/** iOS `UIFontDescriptorSystemDesignRounded` */
		rounded: "ui-rounded",
		/** iOS `UIFontDescriptorSystemDesignMonospaced` */
		mono: "ui-monospace",
	},
	default: {
		sans: "normal",
		serif: "serif",
		rounded: "normal",
		mono: "monospace",
	},
	web: {
		sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded:
			"'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
});

export const lightColors = {
	background: "#fcfcfc",
	foreground: "#313e38",
	card: "#ffffff",
	cardForeground: "#313e38",
	popover: "#ffffff",
	popoverForeground: "#313e38",
	primary: "#00b262",
	primaryForeground: "#effffa",
	secondary: "#d2e0ea",
	secondaryForeground: "#12161f",
	muted: "#d3e0ea",
	mutedForeground: "#5c6375",
	accent: "#d3e0ea",
	accentForeground: "#313e38",
	destructive: "#f1113e",
	border: "#e5ecf1",
	input: "#c3d0da",
	ring: "#00b262",

	// Text colors
	text: "#000000",
	textMuted: "#71717a",

	// Legacy support for existing components
	tint: "#18181b",
	icon: "#71717a",
	tabIconDefault: "#71717a",
	tabIconSelected: "#18181b",

	// Default buttons, links, Send button, selected tabs
	blue: "#007AFF",

	// Success states, FaceTime buttons, completed tasks
	green: "#34C759",

	// Delete buttons, error states, critical alerts
	red: "#FF3B30",

	// VoiceOver highlights, warning states
	orange: "#FF9500",

	// Notes app accent, Reminders highlights
	yellow: "#FFCC00",

	// Pink accent color for various UI elements
	pink: "#FF2D92",

	// Purple accent for creative apps and features
	purple: "#AF52DE",

	// Teal accent for communication features
	teal: "#5AC8FA",

	// Indigo accent for system features
	indigo: "#5856D6",
};

export const darkColors = {
	background: "#080b14",
	foreground: "#e9f0f5",
	card: "#12161f",
	cardForeground: "#e9f0f5",
	popover: "#12161f",
	popoverForeground: "#e9f0f5",
	primary: "#00b262",
	primaryForeground: "#080b14",
	secondary: "#282d3d",
	secondaryForeground: "#e9f0f5",
	muted: "#282d3d",
	mutedForeground: "#798093",
	accent: "#282d3d",
	accentForeground: "#e9f0f5",
	destructive: "#ff1648",
	border: "#e9f0f526",
	input: "#e9f0f533",
	ring: "#00b262",

	// Text colors
	text: "#FFFFFF",
	textMuted: "#a1a1aa",

	// Legacy support for existing components
	tint: "#FFFFFF",
	icon: "#a1a1aa",
	tabIconDefault: "#a1a1aa",
	tabIconSelected: "#FFFFFF",

	// Default buttons, links, Send button, selected tabs
	blue: "#0A84FF",

	// Success states, FaceTime buttons, completed tasks
	green: "#30D158",

	// Delete buttons, error states, critical alerts
	red: "#FF453A",

	// VoiceOver highlights, warning states
	orange: "#FF9F0A",

	// Notes app accent, Reminders highlights
	yellow: "#FFD60A",

	// Pink accent color for various UI elements
	pink: "#FF375F",

	// Purple accent for creative apps and features
	purple: "#BF5AF2",

	// Teal accent for communication features
	teal: "#64D2FF",

	// Indigo accent for system features
	indigo: "#5E5CE6",
};

export const Colors = {
	light: lightColors,
	dark: darkColors,
};
