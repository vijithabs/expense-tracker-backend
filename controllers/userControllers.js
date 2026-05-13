
let User = require("../models/userModel.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//SIGNUP USER

let userRegister = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password.trim();

        let existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "User already exist" })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "password must be atleast of 8 characters" })

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        let token = jwt.sign(
            { id: user._id, email: user.email },
            "JWT-SECRET",
            { expiresIn: "1d" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.log("SIGNUP ERROR:", err);
        res.status(500).json(err);
    }
}



//LOGIN USER

let userLogin = async (req, res) => {
    try {
        const email = req.body.email.trim().toLowerCase();
        const password = req.body.password.trim();

        if (!password || password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            })
        }

        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        console.log("Entered password:", password);
        console.log("Stored hash:", user.password);
        const isMatch = await bcrypt.compare(password, user.password)
        console.log("Password match:", isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }


        let token = jwt.sign(
            { id: user._id, email: user.email },
            "JWT-SECRET",
            { expiresIn: "1d" }
        )

        res.status(200).json({
            message: "Login successfully", token, user: {
                name: user.name,
                email: user.email
            }
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Cannot login", error });
    }

}


//GET USER PROFILE

let userData = async (req, res) => {
    try {
        let response = await User.find()
        res.json({ message: "users list", data: response })

    } catch (error) {
        res.json({ message: "data cannot be fetched" })

    }


}

//UPDATE USER PROFILE

let updateProfile = async (req, res) => {

    try {
        let response = await User.updateOne({ _id: req.params.id },
            { $set: req.body })
        res.json({ message: " Updated User", response })

    } catch (error) {
        res.status(500).json({ message: " fail updated data", error })
    }
}

//change password

let updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: "password invalid or too short" })
    }
    try {
        const user = await User.findById(req.user.id).select("password");
        if (!user) {
            return res.status(404).json({ message: "User not found" })

        }
        const match = await bcrypt.compare(currentPassword, user.password)
        if (!match) {
            return res.status(401).json({ message: "Current password is incorrect" })

        }
        user.password = await bcrypt.hash(newPassword, 10)
        await user.save();
        res.json({ message: "password changed" });
    } catch (error) {
        res.status(500).json({ message: " fail updated data", error })
    }
}


//DELETE USER

let userDelete = async (req, res) => {
    console.log(req.params);

    try {
        let response = await User.deleteOne({ _id: req.params.id })
        res.json({ message: "deleted data", response })

    } catch (error) {
        res.json({ message: " fail to delete data", error })
    }

}



module.exports = {
    userRegister,
    userLogin,
    userData,
    updateProfile,
    updatePassword,
    userDelete
}