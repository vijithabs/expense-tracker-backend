
const express = require("express")
const userRouter = express.Router();


const authMiddleware = require("../middleware/authMiddleware.js");
const {
    userRegister,
    userLogin,
    userData,
    updateProfile,
    updatePassword,
    userDelete

} = require("../controllers/userControllers.js")

userRouter.post("/register", userRegister);

userRouter.post("/login", userLogin);

userRouter.get("/me", authMiddleware, userData)

userRouter.put("/password", authMiddleware, updatePassword)

userRouter.put("/profile", authMiddleware, updateProfile)

userRouter.delete("/delete/:id", authMiddleware, userDelete)

module.exports = userRouter;