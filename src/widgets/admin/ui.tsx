import React, { useState } from "react";
import { Product } from "@/en/product";
import { AdminMutate } from "@/features";
import { useMutationQuery } from "@/shared";
import { AdminList } from "./ui/AdminList";

export const RootAdmin: React.FC = () => {
	const [isEditing, setIsEditing] = useState<Product | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	// Загрузка списка товаров
	const fetchProductsMutation = useMutationQuery<void, Product[]>({
		url: "/products",
		method: "POST",
		messages: {
			cb: (data: any) => setProducts(data),
		},
	});

	React.useEffect(() => {
		fetchProductsMutation.mutate();
	}, []);

	const openEdit = (product: Product) => {
		setIsEditing(product);
		setIsCreating(false);
	};

	const openCreate = () => {
		setIsEditing(null);
		setIsCreating(true);
	};

	const handleClose = () => {
		setIsEditing(null);
		setIsCreating(false);
		// Перезагрузка списка после закрытия модалки
		fetchProductsMutation.mutate();
	};

	const handleDelete = (id: string) => {
		setProducts((prev) => prev.filter((p) => p.id !== id));
	};

	return (
		<>
			<AdminList
				products={products}
				onEdit={openEdit}
				onDelete={handleDelete}
				onCreate={openCreate}
			/>
			<AdminMutate
				isOpen={isEditing !== null || isCreating}
				isCreating={isCreating}
				editingProduct={isEditing}
				onClose={handleClose}
			/>
		</>
	);
};
