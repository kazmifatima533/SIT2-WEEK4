const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Signup Controller
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered!" });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       
        const newUser = new User({
            name,
            email,
            password: hashedPassword, 
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "Signup successful!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error during signup!", error: err.message });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Please signup first." });
        }

     
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password!" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_URI, 
            { expiresIn: "2h" }
        );

        res.status(200).json({ success: true, message: "Login successful!", user, token });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error during login!", error: err.message });
    }
};

// PUT Method - Update User
const updateuser = async (req, res) => {
    const { email, password, ...updateData } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
  
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user", error: error.message });
    }
};

// DELETE Method - Delete User
const deleteuser = async (req, res) => {
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
        res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
    }
};

module.exports = { signup, login, updateuser, deleteuser };
