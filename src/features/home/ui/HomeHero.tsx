import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ProductStage, useTheme } from "@/shared";
import { ThemeType } from "@/entities";
import { If } from "@/shared/ui/if";

interface IProps {
	onScrollToCatalog: () => void;
}

export const HomeHero: React.FC<IProps> = ({ onScrollToCatalog }) => {
	const { theme } = useTheme();

	return (
		<section className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0">
				<If is={theme === ThemeType.SOFT}>
					<div className="w-full h-full bg-[#E3D5CA]">
						<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A690]/30 rounded-full blur-3xl"></div>
						<div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#F5EBE0]/40 rounded-full blur-3xl"></div>
					</div>
				</If>
				<If is={theme !== ThemeType.SOFT}>
					<div className="w-full h-full bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-black/80">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px]"></div>
					</div>
				</If>
			</div>

			<div className="absolute inset-0 z-0 opacity-60">
				<ProductStage
					shape="torus"
					color={theme === ThemeType.SOFT ? "#8d7f76" : "#a855f7"}
					interactive={false}
				/>
			</div>

			<div className="relative z-10 text-center px-4">
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className={`text-sm md:text-lg font-bold tracking-[0.5em] uppercase mb-4 ${
						theme === ThemeType.SOFT ? "text-[#433A36]" : "text-purple-200"
					}`}
				>
					Komil Muminov
				</motion.p>
				<motion.h1
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className={`text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 ${
						theme === ThemeType.SOFT ? "text-[#292524]" : "text-white"
					}`}
				>
					PHENOMEN
				</motion.h1>

				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1 }}
					onClick={onScrollToCatalog}
					className={`group flex flex-col items-center gap-2 mx-auto text-sm font-bold tracking-widest uppercase transition-colors ${
						theme === ThemeType.SOFT
							? "text-[#292524] hover:text-black"
							: "text-white/60 hover:text-white"
					}`}
				>
					<span>Исследовать коллекцию</span>
					<ArrowDown className="animate-bounce mt-2" size={20} />
				</motion.button>
			</div>
		</section>
	);
};
