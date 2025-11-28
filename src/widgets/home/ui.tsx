import React, { useState, useRef } from "react";
import { Product, ProductCategory } from "@/en/product";
import { useProducts } from "@/shared/api/products-queries";
import { HomeFind, HomeHero, HomeSection } from "@/features/home";
export const RootHome: React.FC = () => {
	const { data: productsData = [], isLoading } = useProducts();
	const [selectedCategory, setSelectedCategory] = useState<
		ProductCategory | "Все"
	>("Все");
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const catalogRef = useRef<HTMLDivElement>(null);

	const ITEMS_PER_PAGE = 8;
	const products = (productsData as Product[]) || [];

	const filteredProducts = products.filter((p) => {
		const matchesCategory =
			selectedCategory === "Все" || p.category === selectedCategory;
		const searchLower = searchQuery.toLowerCase();
		const matchesSearch =
			p.name.toLowerCase().includes(searchLower) ||
			p.description.toLowerCase().includes(searchLower);
		return matchesCategory && matchesSearch;
	});

	const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
	const displayedProducts = filteredProducts.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	React.useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory, searchQuery]);

	const scrollToCatalog = () => {
		catalogRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleCategoryChange = (category: ProductCategory | "Все") => {
		setSelectedCategory(category);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
			<HomeHero onScrollToCatalog={scrollToCatalog} />

			<section
				ref={catalogRef}
				className="min-h-screen w-full snap-start pt-24 px-4 md:px-8 pb-12 flex flex-col relative z-10 bg-inherit"
			>
				<HomeFind
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					selectedCategory={selectedCategory}
					onCategoryChange={handleCategoryChange}
				/>

				<HomeSection
					displayedProducts={displayedProducts}
					isLoading={isLoading}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</section>
		</div>
	);
};
