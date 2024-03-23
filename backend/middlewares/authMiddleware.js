import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected routes token base basically u can't access like dashboard if you don't have the jwt token that u have signed in
// authMiddleware.js

// authMiddleware.js
export const requireSignIn = async (req, res, next) => {
  try {
    const decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log('Decoded User:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};



//admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "unauthroized access",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
