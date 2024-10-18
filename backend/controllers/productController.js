import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import dotenv from "dotenv";
dotenv.config();
//Add Product
const addProduct = async (req, res) => {
    try{
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(images.map(async (image) => {
            let result = await cloudinary.uploader.upload(image.path, {resource_type: "image"})
            return result.secure_url
        }))

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            images: imagesUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        res.status(201).json({success:true, message: "Product added successfully"})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}
//Total Product List
const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({})
        res.status(200).json({success:true, products})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}
//Remove Product
const removeProduct = async (req, res) => {
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success:true, message: "Product removed successfully"})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}
//Get Single Product Details
const singleProduct = async (req, res) => {
    try{
        const product = await productModel.findById(req.body.id)
        res.status(200).json({success:true, product})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}

export { addProduct, listProducts, removeProduct, singleProduct }