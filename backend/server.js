import express from 'express';
import dotenv from 'dotenv';   
import authRoutes from './routes/auth.route.js';
import searchRoutes from './routes/search.route.js';
import { connectDB } from './lib/db.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';

import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js';
import analyticsRoutes from './routes/analystics.route.js';


import orderRoutes from './routes/orders.route.js';

dotenv.config(); 


const app = express(); 
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
const PORT = process.env.PORT || 3000;  
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use('/api/search', searchRoutes);


app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);





app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);



app.listen(PORT, () => {
    console.log('Server is running on http://localhost:'+PORT);
    connectDB();
});
