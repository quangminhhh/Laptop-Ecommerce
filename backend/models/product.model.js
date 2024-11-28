import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		category: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		specifications: {
			processor: { type: String, required: true }, 
			ram: { type: String, required: true }, 
			storage: { type: String, required: true }, 
			graphicsCard: { type: String }, 
			screenSize: { type: String }, 
			resolution: { type: String }, 
			battery: { type: String }, 
			weight: { type: String }, 
			operatingSystem: { type: String }, 
		},
		releaseDate: {
			type: Date,
		},
		stockQuantity: {
			type: Number,
			default: 0,
		},

	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
