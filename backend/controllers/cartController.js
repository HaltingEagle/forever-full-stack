import userModel from "../models/userModel.js"

//add products to user cart
const addToCart = async (req, res) => {
    try{
        const {userId, itemId, size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.status(200).json({success:true, message: "Product added to cart successfully"})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}

//Update Cart
const updateCart = async (req, res) => {
    try{
        const {userId, itemId, size, quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.status(200).json({success:true, message: "Cart updated successfully"})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}

//get user cart data
const getUserCart = async (req, res) => {
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        res.status(200).json({success:true, cartData})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}


export {addToCart, updateCart, getUserCart}