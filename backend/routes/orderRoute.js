import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
const orderRouter = express.Router();

orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/status/', adminAuth, updateStatus);
orderRouter.post('/verifyStripe', verifyStripe);

export default orderRouter
