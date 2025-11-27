import { Product } from "@/entities/product";

export const CATEGORIES = [
	"Одежда",
	"Электроника",
	"Аксессуары",
	"Для дома",
] as const;

export const SHAPES = ["box", "sphere", "torus"] as const;

export const COLORS = [
	"#ffffff",
	"#000000",
	"#ff0000",
	"#00ff00",
	"#0000ff",
] as const;

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const MOCK_PRODUCTS: Product[] = [
	{
		id: "1",
		name: "Неоклассическое пальто",
		price: 3500.0,
		description:
			"Шерстяное твидовое пальто с высоким воротником. Разработано для городского путешественника.",
		color: "#D4C3B5",
		category: "Одежда",
		shape: "box",
		sizes: ["S", "M", "L", "XL"],
		inStock: true,
	},
	{
		id: "2",
		name: "Квантовые кроссовки",
		price: 450.0,
		description: "Самозашнуровывающиеся кроссовки с адаптивной амортизацией.",
		color: "#10B981",
		category: "Одежда",
		shape: "sphere",
		sizes: ["US 8", "US 9", "US 10", "US 11"],
		inStock: true,
	},
	{
		id: "3",
		name: "Интерфейс Nexus Ring",
		price: 120.0,
		description:
			"Умный носимый интерфейс. Управляйте своей цифровой жизнью жестом.",
		color: "#F472B6",
		category: "Электроника",
		shape: "torus",
		sizes: ["Размер 6", "Размер 7", "Размер 8"],
		inStock: true,
	},
	{
		id: "4",
		name: "Монолитный хаб Void",
		price: 899.0,
		description:
			"Домашний помощник с искусственным интеллектом. Тихий, мощный и везде.",
		color: "#1F2937",
		category: "Для дома",
		shape: "box",
		sizes: ["Стандарт"],
		inStock: false,
	},
	{
		id: "5",
		name: "Шелковое киберплатье",
		price: 1200.0,
		description:
			"Жидкий шелк, изменяющий прозрачность в зависимости от окружающего света.",
		color: "#8B5CF6",
		category: "Одежда",
		shape: "box",
		sizes: ["XS", "S", "M"],
		inStock: true,
	},
	{
		id: "6",
		name: "Виртуальный козырек Aero",
		price: 299.0,
		description: "Очки дополненной реальности с бесшовным стеклянным дисплеем.",
		color: "#60A5FA",
		category: "Аксессуары",
		shape: "torus",
		sizes: ["Стандарт"],
		inStock: true,
	},
	{
		id: "7",
		name: "Кинетические тактильные перчатки",
		price: 150.0,
		description:
			"Перчатки с тактильной обратной связью для погружающихся VR опытов.",
		color: "#DC2626",
		category: "Аксессуары",
		shape: "box",
		sizes: ["S", "M", "L"],
		inStock: true,
	},
	{
		id: "8",
		name: "Голографический проектор",
		price: 2100.0,
		description: "Портативный генератор объемного дисплея 8K.",
		color: "#A855F7",
		category: "Электроника",
		shape: "box",
		sizes: ["Стандарт"],
		inStock: true,
	},
	{
		id: "9",
		name: "Левитирующий горшок для растений",
		price: 85.0,
		description: "Магнитный подвесной вазон для нулевой гравитации ботаники.",
		color: "#059669",
		category: "Для дома",
		shape: "sphere",
		sizes: ["Малый", "Средний"],
		inStock: true,
	},
	{
		id: "10",
		name: "Звуковой ткач",
		price: 340.0,
		description: "Синтезаторный модуль для генеративных звуковых ландшафтов.",
		color: "#FBBF24",
		category: "Электроника",
		shape: "box",
		sizes: ["Стандарт"],
		inStock: false,
	},
	{
		id: "11",
		name: "Модульный технологический рюкзак",
		price: 220.0,
		description:
			"Водонепроницаемый городской рюкзак с встроенными зарядными блоками.",
		color: "#374151",
		category: "Одежда",
		shape: "box",
		sizes: ["20L", "30L"],
		inStock: true,
	},
	{
		id: "12",
		name: "Умное зеркало-дисплей",
		price: 650.0,
		description:
			"Отражающая поверхность с интегрированной панелью показателей здоровья.",
		color: "#E5E7EB",
		category: "Для дома",
		shape: "box",
		sizes: ['24"', '32"'],
		inStock: true,
	},
];
