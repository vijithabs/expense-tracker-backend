
const express = require("express")
const userRouter = express.Router();


const authMiddleware = require("../middleware/authMiddleware.js");
const {
    userSignup,
    userLogin,
    userData,
    updateUser,
    userDelete

} = require("../controllers/userControllers.js")

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);

userRouter.get("/profile", authMiddleware, userData)

userRouter.put("/update", authMiddleware, updateUser)

userRouter.delete("/delete", authMiddleware, userDelete)

module.exports = userRouter;