import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@/en": path.resolve(__dirname, "./src/entities"),
			"@/fe": path.resolve(__dirname, "./src/features"),
			"@/pg": path.resolve(__dirname, "./src/pages"),
			"@/sh": path.resolve(__dirname, "./src/shared"),
			"@/wd": path.resolve(__dirname, "./src/widgets"),
			"@/sh/ui/context": path.resolve(__dirname, "./src/shared/ui/context"),
			"@/wd/layout": path.resolve(__dirname, "./src/widgets/layout"),
			"@/pg/index": path.resolve(__dirname, "./src/pages/index.ts"),
		},
	},
});
