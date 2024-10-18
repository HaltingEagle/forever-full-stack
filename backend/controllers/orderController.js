
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "usd";
const deliveryCharge = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.status(200).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const {origin} = req.headers
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        const line_items = items.map((item) => ({
            price_data:{
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data:{
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.status(200).json({ success: true, message: "Order placed successfully", session });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//Verify Stripe
const verifyStripe = async (req, res) => {
    const {orderId, success, userId} = req.body;
    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});
            res.status(200).json({success: true, message: "Order placed successfully"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({success: false, message: "Order cancelled"});
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

//Place orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { products, address, paymentMethod } = req.body;
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData;
        const amount = cartData;
        let orderData = {
            products,
            address,
            paymentMethod,
            amount,
        };
        const order = await orderModel.create(orderData);
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.status(200).json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}

//User Order Data for Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId});
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}

//Update Order Status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.status(200).json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export{placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe}