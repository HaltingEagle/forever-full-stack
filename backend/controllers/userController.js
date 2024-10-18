import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

//Route for user login
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body
        //check if user exists
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message: "User does not exist"})
        }
        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({success:false,message: "Incorrect password"})
        }
        const token = createToken(user._id)
        res.status(200).json({success:true, token})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}

//Route for user registration
const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.status(400).json({success:false,message: "User already exists"})
        }
        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message: "Please enter a valid email"})
        }
        if(password.length < 8){
            return res.status(400).json({success:false,message: "Please enter a password that is 8 characters long"})
        }
        //Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //Creating user
        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.status(201).json({success:true, token})
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}

//Route for admin login
const adminLogin = async (req, res) => {
    try{
        const {email, password} = req.body
        //check if user exists
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.status(200).json({success:true, token})
        }
        else{
            res.status(400).json({success:false, message: "Invalid credentials"})
        }
    }catch(err){
        res.status(500).json({success:false, message: err.message})
    }
}



export { loginUser, registerUser, adminLogin }