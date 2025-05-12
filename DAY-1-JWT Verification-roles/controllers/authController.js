const User = require('../models/User');
const jwt = require("jsonwebtoken");

// Signup Controller
const signup = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered!" });
        }

        const newUser = new User({ name, username, email, password });
        await newUser.save();
        res.status(200).json({ success: true, message: "Signup successful!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error during signup!" });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("the user",user)
        if (!user) {
            return res.status(400).json({ success: false, message: "Please signup first." });
        }
        let token;
         try {
            //Creating jwt token
            token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_URI,
                 { expiresIn: "1h" }
            );
        } catch (err) {
            console.log(err);
            const error =
                new Error("Error! Something went wrong.");
            return next(error);
        }

        if (user.password === password) {
            res.status(200).json({ success: true, message: "Login successful!",user,token });
        } else {
            res.status(400).json({ success: false, message: "Incorrect password!" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Error during login!" });
    }
};


//PUT Method
const updateuser = async (req, res) => {
    console.log("Request body:", req.body);
    
    const { email, ...updateData } = req.body; // Extract email and other fields

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email }, // Find user by email
            { $set: updateData }, // Apply updates
            { new: true } // Return updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Error updating user", error: error.message });
    }
};

// DELETE Method 
const deleteuser = async (req, res) => {
    console.log("Request body:", req.body);
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    try {
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, message: "User deleted successfully", deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
    }
};




module.exports = { signup, login, updateuser,deleteuser };
