// authController.js

import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv"; // Add this line

// Configure dotenv
dotenv.config();

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;

    // Check if the user already exists
    const exuser = await userModel.findOne({ email });

    // Existing user
    if (exuser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPass = await hashPassword(password);

    // Create a new user and save it
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPass,
      question,
    });

    await user.save();

    // Send a success response
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate and send token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const [email, question, newPassword] = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!question) {
      res.status(400).send({ message: "question is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "newPassword is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Wrong email or question",
      });
    }
    const hashed = await hashedPass(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset SucessFully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
      err,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Updated successfully",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      err,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "error in getting order",
      err,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Updating Orders",
      error,
    });
  }
};
