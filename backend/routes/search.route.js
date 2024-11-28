import express from 'express';
import Product from '../models/product.model.js';

const router = express.Router();

// Tìm kiếm categories
router.get('/categories', async (req, res) => {
    const { query } = req.query;
    try {
        const categories = await Product.aggregate([
            { $group: { _id: '$category' } }, // Lấy danh sách unique categories
            { $match: { _id: { $regex: query, $options: 'i' } } }, // Lọc theo từ khóa
        ]);
        // Dữ liệu categories hiển thị giống frontend
        const formattedCategories = categories.map((cat) => ({
            name: cat._id,
            href: `/${cat._id.toLowerCase()}`,
            imageUrl: `/${cat._id.toLowerCase()}.jpg`, // Gắn đường dẫn ảnh từ frontend
        }));
        res.status(200).json(formattedCategories);
    } catch (error) {
        res.status(500).json({ message: 'Error searching categories', error });
    }
});

// Tìm kiếm products trong một category cụ thể
router.get('/products', async (req, res) => {
    const { query, category } = req.query;
    try {
        const products = await Product.find({
            category: category,
            name: { $regex: query, $options: 'i' }, // Lọc theo name
        }).select('name price image description'); // Chỉ lấy các trường cần thiết
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error searching products', error });
    }
});

export default router;
