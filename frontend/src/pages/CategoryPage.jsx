import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { category } = useParams();
	const { fetchProductsByCategory, searchProducts, products, loading } = useProductStore();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	const handleSearch = async (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			await searchProducts(searchQuery, category);
		} else {
			await fetchProductsByCategory(category);
		}
	};

	return (
		<div className="min-h-screen">
			<div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<h1 className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8">
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</h1>
				<form className="mb-6 flex justify-center" onSubmit={handleSearch}>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search products..."
						className="w-1/2 px-4 py-2 text-gray-900 rounded-md"
					/>
					<button
						type="submit"
						className="ml-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
					>
						Search
					</button>
				</form>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
					{loading ? (
						<p className="text-center text-gray-300 col-span-full">Loading...</p>
					) : products.length > 0 ? (
						products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))
					) : (
						<p className="text-center text-gray-300 col-span-full">
							No products found.
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default CategoryPage;
