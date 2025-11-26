/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				display: ["Playfair Display", "serif"],
			},
			colors: {
				soft: {
					50: "#F5EBE0",
					100: "#EFDDD7",
					200: "#E3D5CA",
					300: "#D4C3B5",
					400: "#C9A690",
					500: "#8d7f76",
					600: "#6B5F54",
					700: "#433A36",
					800: "#292524",
					900: "#1A1515",
				},
			},
		},
	},
	plugins: [],
};
