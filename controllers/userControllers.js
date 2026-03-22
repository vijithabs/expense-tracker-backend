
let User = require ("../models/userModel.js")
const bcrypt = require ("bcrypt")
const jwt = require   ("jsonwebtoken")


//SIGNUP USER

let userSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body

        let existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "User already exist" })
        }

        if (password.length < 8) {
            return res.status(400).json ({ message: "password must be atleast of 8 characters" })

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.json({ message: "User register successfully" })

    } catch (err) {
        res.status(500).json(err)
    }
}



//LOGIN USER

let userLogin = async (req, res) => {

    const { password, email } = req.body;

    let user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    try {
        let token = jwt.sign(
            { id: user._id, email: user.email },
            "JWT-SECRET",
            { expiresIn: "1d" }
        )

        res.json({
            message: "Login successfully", token, data: {
                name: user.username,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Canno't login" })
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

let updateUser = async (req, res) => {

    try {
        let response = await User.updateOne({ _id: req.params.id },
            { $set: req.body })
        res.json({ message: " Updated User", response })

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
    userSignup,
    userLogin,
    userData,
    updateUser,
    userDelete
}