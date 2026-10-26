const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user");

const router = express.Router();


// =====================================================
// EMAIL CONFIGURATION
// =====================================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// =====================================================
// REGISTER
// =====================================================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// LOGIN
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Send response
    res.json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// FORGOT PASSWORD - SEND OTP
// =====================================================

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        message: "Please enter your email",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // OTP expires after 10 minutes
    const otpExpiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Save OTP
    user.resetOTP = otp;
    user.resetOTPExpiry = otpExpiry;

    await user.save();

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,

      subject: "InterviewAI - Password Reset OTP",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 500px;
          margin: auto;
          padding: 30px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        ">

          <h2 style="color: #2563eb;">
            InterviewAI
          </h2>

          <h3>Password Reset</h3>

          <p>
            You requested to reset your InterviewAI password.
          </p>

          <p>
            Your OTP is:
          </p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #2563eb;
            margin: 20px 0;
          ">
            ${otp}
          </div>

          <p>
            This OTP will expire in
            <strong>10 minutes</strong>.
          </p>

          <p style="color: #64748b;">
            If you didn't request a password reset,
            you can safely ignore this email.
          </p>

        </div>
      `,
    });

    res.json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    res.status(500).json({
      message: "Unable to send OTP",
    });
  }
});


// =====================================================
// VERIFY OTP
// =====================================================

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check fields
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if OTP exists
    if (!user.resetOTP || !user.resetOTPExpiry) {
      return res.status(400).json({
        message:
          "OTP not found. Please request a new OTP.",
      });
    }

    // Check OTP expiry
    if (new Date() > user.resetOTPExpiry) {

      user.resetOTP = null;
      user.resetOTPExpiry = null;

      await user.save();

      return res.status(400).json({
        message:
          "OTP has expired. Please request a new OTP.",
      });
    }

    // Check OTP
    if (user.resetOTP !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // =================================================
    // OTP IS CORRECT
    // =================================================

    // Create temporary reset token
    const resetToken = jwt.sign(
      {
        userId: user._id,
        purpose: "password-reset",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    // Clear OTP after successful verification
    user.resetOTP = null;
    user.resetOTPExpiry = null;

    await user.save();

    // Send reset token to frontend
    res.json({
      message: "OTP verified successfully",
      resetToken,
    });

  } catch (error) {
    console.error(
      "Verify OTP error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// RESET PASSWORD
// =====================================================

router.post("/reset-password", async (req, res) => {
  try {

    const { resetToken, password } = req.body;

    // Check required fields
    if (!resetToken || !password) {
      return res.status(400).json({
        message:
          "Reset token and new password are required",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    // =================================================
    // VERIFY RESET TOKEN
    // =================================================

    let decoded;

    try {

      decoded = jwt.verify(
        resetToken,
        process.env.JWT_SECRET
      );

    } catch (error) {

      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          message:
            "Reset token has expired. Please request a new OTP.",
        });
      }

      return res.status(400).json({
        message: "Invalid reset token",
      });
    }


    // =================================================
    // CHECK TOKEN PURPOSE
    // =================================================

    if (decoded.purpose !== "password-reset") {
      return res.status(400).json({
        message: "Invalid reset token",
      });
    }


    // =================================================
    // FIND USER
    // =================================================

    const user = await User.findById(
      decoded.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    // =================================================
    // HASH NEW PASSWORD
    // =================================================

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // =================================================
    // UPDATE PASSWORD
    // =================================================

    user.password = hashedPassword;

    await user.save();


    // =================================================
    // SUCCESS
    // =================================================

    res.json({
      message:
        "Password reset successfully",
    });

  } catch (error) {

    console.error(
      "Reset password error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;