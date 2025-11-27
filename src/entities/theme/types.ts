export enum ThemeType {
	GLASS = "glass",
	AMOLED = "amoled",
	MINIMAL = "minimal",
	SOFT = "soft",
}

export interface ThemeContextType {
	theme: ThemeType;
	setTheme: (theme: ThemeType) => void;
}
