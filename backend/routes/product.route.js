import express from 'express';
import { protectRoute,adminRoute } from '../middleware/auth.middleware.js';
import { getAllProducts,getFeaturedProducts,createProduct,deleteProduct,getRecommendedProducts,getProductsByCategory,toggleFeaturedProduct,getProduct } from '../controllers/product.controller.js';
const router = express.Router();


router.get('/',protectRoute,adminRoute, getAllProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.get("/featured", getFeaturedProducts);

router.get("/:id", getProduct);

export default router;