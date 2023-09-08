const LIGHT_THEME = "light";
const DARK_THEME = "dark";
const sun_btn = document.getElementById("sun");
const moon_btn = document.getElementById("moon");

export const initializeTheme = () => {
	const theme =
		localStorage.getItem("theme") ||
		(window.matchMedia("(prefers-color-scheme: dark)").matches
			? DARK_THEME
			: LIGHT_THEME);
	updateTheme(theme);
};

export const updateTheme = (theme) => {
	const root = document.documentElement;
	root.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);
};

export const toggleTheme = () => {
	const currentTheme = document.documentElement.getAttribute("data-theme") || LIGHT_THEME;
	const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
	updateTheme(newTheme);
	updateThemeButtons();
};

export const updateThemeButtons = () => {
	const isDarkTheme = document.documentElement.getAttribute("data-theme") === DARK_THEME;
	sun_btn.classList.toggle("hidden", !isDarkTheme);
	moon_btn.classList.toggle("hidden", isDarkTheme);
};
