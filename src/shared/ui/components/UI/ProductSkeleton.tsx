import React from "react";
import { useTheme } from "../../context";
import { ThemeType } from "@/entities";

export const ProductSkeleton: React.FC = () => {
	const { theme } = useTheme();

	const getContainerStyle = () => {
		switch (theme) {
			case ThemeType.SOFT:
				return "bg-[#F5EBE0]/40 border border-[#D4C3B5]/30 shadow-none";
			case ThemeType.MINIMAL:
				return "bg-white border border-gray-100 shadow-sm";
			case ThemeType.AMOLED:
				return "bg-gray-900 border border-gray-800";
			case ThemeType.GLASS:
			default:
				return "bg-white/5 border border-white/10 shadow-none";
		}
	};

	const getPulseColor = () => {
		switch (theme) {
			case ThemeType.SOFT:
				return "bg-[#D4C3B5]/40";
			case ThemeType.MINIMAL:
				return "bg-gray-200";
			case ThemeType.AMOLED:
				return "bg-gray-800";
			case ThemeType.GLASS:
			default:
				return "bg-white/10";
		}
	};

	return (
		<div
			className={`relative overflow-hidden flex flex-col h-[450px] rounded-[2rem] ${getContainerStyle()}`}
		>
			<div className={`h-3/5 w-full animate-pulse ${getPulseColor()}`}></div>
			<div className="p-6 flex-grow flex flex-col justify-between">
				<div className="w-full">
					<div
						className={`h-3 w-20 rounded-full mb-3 animate-pulse ${getPulseColor()}`}
					></div>
					<div
						className={`h-6 w-3/4 rounded-md mb-2 animate-pulse ${getPulseColor()}`}
					></div>
					<div
						className={`h-6 w-1/2 rounded-md animate-pulse ${getPulseColor()}`}
					></div>
				</div>
				<div className="mt-4 flex gap-2">
					<div
						className={`flex-1 h-12 rounded-xl animate-pulse ${getPulseColor()}`}
					></div>
					<div
						className={`w-12 h-12 rounded-xl animate-pulse ${getPulseColor()}`}
					></div>
				</div>
			</div>
		</div>
	);
};
