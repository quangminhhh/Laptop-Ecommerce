import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	// State
	products: [], // Dữ liệu sản phẩm
	categories: [], // Dữ liệu categories
	loading: false,
	currentProduct: null,

	// Setters
	setProducts: (products) => set({ products }),
	setCategories: (categories) => set({ categories }),

	// Fetch tất cả sản phẩm
	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to fetch products");
		}
	},

	// Fetch sản phẩm theo category
	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to fetch products");
		}
	},

	// Fetch danh sách categories
	fetchCategories: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`/search/categories?query=`); // Lấy tất cả categories
			set({ categories: response.data, loading: false });
		} catch (error) {
			console.error("Error fetching categories:", error.response?.data || error.message);
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to fetch categories");
		}
	},


	// Tìm kiếm categories
	searchCategories: async (query) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/search/categories?query=${query}`);
			set({ categories: response.data, loading: false }); // Lưu kết quả tìm kiếm vào state categories
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to search categories");
		}
	},

	// Tìm kiếm sản phẩm
	searchProducts: async (query, category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/search/products?query=${query}&category=${category}`);
			set({ products: response.data, loading: false }); // Lưu kết quả tìm kiếm vào state products
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to search products");
		}
	},

	// Fetch sản phẩm nổi bật
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to fetch featured products");
		}
	},

	// Fetch sản phẩm chi tiết
	getProductById: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/${productId}`);
			set({ currentProduct: response.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to fetch product");
		}
	},

	// Tạo sản phẩm mới
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
			toast.success("Product created successfully");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to create product");
		}
	},

	// Xóa sản phẩm
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevState) => ({
				products: prevState.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to delete product");
		}
	},

	// Toggle trạng thái featured cho sản phẩm
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			set((prevState) => ({
				products: prevState.products.map((product) =>
					product._id === productId
						? { ...product, isFeatured: response.data.isFeatured }
						: product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.error || "Failed to update product");
		}
	},
}));
