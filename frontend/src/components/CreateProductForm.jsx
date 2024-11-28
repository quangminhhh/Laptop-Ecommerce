import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle, FaTag, FaAlignLeft, FaDollarSign, FaLayerGroup, FaMicrochip, FaMemory, FaHdd, FaDesktop, FaExpand, FaBatteryFull, FaWeight, FaWindows, FaImage } from "react-icons/fa";
import { useProductStore } from "../stores/useProductStore";
import { PiGraphicsCardDuotone } from "react-icons/pi";

const categories = ["storage", "laptop", "gear", "ram", "cpu", "motherboard", "monitor", "pc"];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
		specifications: {
			processor: "",
			ram: "",
			storage: "",
			graphicsCard: "",
			screenSize: "",
			resolution: "",
			battery: "",
			weight: "",
			operatingSystem: "",
		},
	});
	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({
				name: "",
				description: "",
				price: "",
				category: "",
				image: "",
				specifications: {
					processor: "",
					ram: "",
					storage: "",
					graphicsCard: "",
					screenSize: "",
					resolution: "",
					battery: "",
					weight: "",
					operatingSystem: "",
				},
			});
		} catch {
			console.log("Error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSpecificationChange = (e) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({
			...prev,
			specifications: {
				...prev.specifications,
				[name]: value,
			},
		}));
	};

	return (
		<motion.div
			className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className="text-2xl font-semibold mb-6 text-emerald-300">Create New Product</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-300">
						<FaTag className="inline-block mr-2" /> Product Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						required
					/>
				</div>
				<div>
					<label htmlFor="description" className="block text-sm font-medium text-gray-300">
						<FaAlignLeft className="inline-block mr-2" /> Description
					</label>
					<textarea
						id="description"
						name="description"
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows="3"
						className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						required
					/>
				</div>
				<div>
					<label htmlFor="price" className="block text-sm font-medium text-gray-300">
						<FaDollarSign className="inline-block mr-2" /> Price
					</label>
					<input
						type="number"
						id="price"
						name="price"
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step="0.01"
						className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						required
					/>
				</div>
				<div>
					<label htmlFor="category" className="block text-sm font-medium text-gray-300">
						<FaLayerGroup className="inline-block mr-2" /> Category
					</label>
					<select
						id="category"
						name="category"
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						required
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
				{/* Specifications Fields */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="processor" className="block text-sm font-medium text-gray-300">
							<FaMicrochip className="inline-block mr-2" /> Processor
						</label>
						<input
							type="text"
							id="processor"
							name="processor"
							value={newProduct.specifications.processor}
							onChange={handleSpecificationChange}
							className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
					<div>
						<label htmlFor="ram" className="block text-sm font-medium text-gray-300">
							<FaMemory className="inline-block mr-2" /> RAM
						</label>
						<input
							type="text"
							id="ram"
							name="ram"
							value={newProduct.specifications.ram}
							onChange={handleSpecificationChange}
							className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
					<div>
						<label htmlFor="storage" className="block text-sm font-medium text-gray-300">
							<FaHdd className="inline-block mr-2" /> Storage
						</label>
						<input
							type="text"
							id="storage"
							name="storage"
							value={newProduct.specifications.storage}
							onChange={handleSpecificationChange}
							className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
					<div>
						<label htmlFor="graphicsCard" className="block text-sm font-medium text-gray-300">
							<PiGraphicsCardDuotone className="inline-block mr-2" /> Graphics Card
						</label>
						<input
							type="text"
							id="graphicsCard"
							name="graphicsCard"
							value={newProduct.specifications.graphicsCard}
							onChange={handleSpecificationChange}
							className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
					<div>
						<label htmlFor="screenSize" className="block text-sm font-medium text-gray-300">
							<FaExpand className="inline-block mr-2" /> Screen Size
						</label>
						<input
							type="text"
							id="screenSize"
							name="screenSize"
							value={newProduct.specifications.screenSize}
							onChange={handleSpecificationChange}
							className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
					<div>
						<label htmlFor="resolution" className="block text-sm font-medium text-gray-300">
							<FaDesktop className="inline-block mr-2" /> Resolution
						</label>
						<input
							type="text"
							id="resolution"
							name="resolution"
							value={newProduct.specifications.resolution}
							onChange={handleSpecificationChange}
							className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
					<div>
						<label htmlFor="battery" className="block text-sm font-medium text-gray-300">
							<FaBatteryFull className="inline-block mr-2" /> Battery
						</label>
						<input
							type="text"
							id="battery"
							name="battery"
							value={newProduct.specifications.battery}
							onChange={handleSpecificationChange}
							className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
					<div>
						<label htmlFor="weight" className="block text-sm font-medium text-gray-300">
							<FaWeight className="inline-block mr-2" /> Weight
						</label>
						<input
							type="text"
							id="weight"
							name="weight"
							value={newProduct.specifications.weight}
							onChange={handleSpecificationChange}
							className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
					<div>
						<label htmlFor="operatingSystem" className="block text-sm font-medium text-gray-300">
							<FaWindows className="inline-block mr-2" /> Operating System
						</label>
						<input
							type="text"
							id="operatingSystem"
							name="operatingSystem"
							value={newProduct.specifications.operatingSystem}
							onChange={handleSpecificationChange}
							className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
				</div>
				<div className="mt-1 flex items-center">
					<input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
					<label
						htmlFor="image"
						className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
					>
						<FaImage className="h-5 w-5 inline-block mr-2" />
						Upload Image
					</label>
					{newProduct.image && <span className="ml-3 text-sm text-gray-400">Image uploaded</span>}
				</div>
				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
					disabled={loading}
				>
					{loading ? (
						<>
							<FaPlusCircle className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
							Loading...
						</>
					) : (
						<>
							<FaPlusCircle className="mr-2 h-5 w-5" />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateProductForm;
