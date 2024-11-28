import express from 'express';
import { getOrdersByUserId,getOrders,updateOrderStatus, removeOrder} from '../controllers/order.controller.js';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.get('/',protectRoute, getOrdersByUserId);
router.get('/all',protectRoute, adminRoute, getOrders);
router.put('/:id',protectRoute, adminRoute, updateOrderStatus);
router.delete('/:orderId',protectRoute, removeOrder);

export default router;