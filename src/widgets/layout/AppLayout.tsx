import React, { ReactNode } from "react";
import { Navbar } from "../navbar";
import { useTheme } from "@/shared";
import { ThemeType } from "@/entities";

interface AppLayoutProps {
	children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
	const { theme } = useTheme();

	const bgClass = () => {
		if (theme === ThemeType.SOFT) return "bg-[#E3D5CA] text-[#292524]";
		if (theme === ThemeType.MINIMAL) return "bg-white text-black";
		if (theme === ThemeType.AMOLED) return "bg-black text-white";
		return "bg-gradient-to-br from-blue-950 via-purple-900 to-black text-white";
	};

	return (
		<div className={`min-h-screen w-full ${bgClass()}`}>
			<Navbar />
			<div className="pt-20">{children}</div>
		</div>
	);
};

export default AppLayout;
