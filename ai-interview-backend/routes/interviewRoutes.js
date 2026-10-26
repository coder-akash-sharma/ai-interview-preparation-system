const express = require("express");
const path = require("path");
const fs = require("fs");

const authMiddleware = require("../middleware/authMiddleware");
const Resume = require("../models/Resume");
const Interview = require("../models/Interview");

const router = express.Router();


// =====================================================
// START MOCK INTERVIEW
// =====================================================

router.post("/start", authMiddleware, async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    // Check role
    if (!role) {
      return res.status(400).json({
        message: "Job role is required.",
      });
    }

    // Check difficulty
    if (!difficulty) {
      return res.status(400).json({
        message: "Difficulty level is required.",
      });
    }

    // Find user's resume
    const resume = await Resume.findOne({
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        message:
          "Please upload your resume before starting the interview.",
      });
    }

    // Create complete resume path
    const resumePath = path.join(
      __dirname,
      "..",
      "uploads",
      "resumes",
      resume.filePath
    );

    // Check whether resume exists
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({
        message: "Resume file could not be found.",
      });
    }

    // Console information
    console.log("================================");
    console.log("MOCK INTERVIEW STARTING");
    console.log("User ID:", req.userId);
    console.log("Role:", role);
    console.log("Difficulty:", difficulty);
    console.log("Resume:", resume.fileName);
    console.log("Resume Path:", resumePath);
    console.log("================================");

    return res.status(200).json({
      message: "Interview setup successful.",

      role,
      difficulty,

      resume: {
        fileName: resume.fileName,
        filePath: resume.filePath,
      },
    });

  } catch (error) {
    console.error("Start interview error:", error);

    return res.status(500).json({
      message: "Failed to start interview.",
    });
  }
});


// =====================================================
// SAVE COMPLETED INTERVIEW
// =====================================================

router.post("/save", authMiddleware, async (req, res) => {
  try {
    const {
      role,
      difficulty,
      answers,
    } = req.body;

    // Check role
    if (!role) {
      return res.status(400).json({
        message: "Job role is required.",
      });
    }

    // Check difficulty
    if (!difficulty) {
      return res.status(400).json({
        message: "Difficulty level is required.",
      });
    }

    // Check answers
    if (
      !answers ||
      !Array.isArray(answers) ||
      answers.length === 0
    ) {
      return res.status(400).json({
        message: "Interview answers are required.",
      });
    }

    // Save interview
    const interview = await Interview.create({
      userId: req.userId,
      role,
      difficulty,
      answers,
      status: "completed",
    });

    // Console information
    console.log("================================");
    console.log("INTERVIEW SAVED");
    console.log("User ID:", req.userId);
    console.log("Role:", role);
    console.log("Difficulty:", difficulty);
    console.log("Questions Answered:", answers.length);
    console.log("Interview ID:", interview._id);
    console.log("================================");

    return res.status(201).json({
      message: "Interview saved successfully.",

      interview: {
        id: interview._id,
        role: interview.role,
        difficulty: interview.difficulty,
        answers: interview.answers,
        score: interview.score,
        status: interview.status,
        createdAt: interview.createdAt,
      },
    });

  } catch (error) {
    console.error("Save interview error:", error);

    return res.status(500).json({
      message: "Failed to save interview.",
    });
  }
});


// =====================================================
// GET INTERVIEW HISTORY
// =====================================================

router.get("/history", authMiddleware, async (req, res) => {
  try {
    // Get only interviews of logged-in user
    const interviews = await Interview.find({
      userId: req.userId,
    })
      .sort({ createdAt: -1 })
      .select(
        "role difficulty answers score status createdAt"
      );

    return res.status(200).json({
      interviews,
    });

  } catch (error) {
    console.error("Get interview history error:", error);

    return res.status(500).json({
      message: "Failed to fetch interview history.",
    });
  }
});


// =====================================================
// GET SINGLE INTERVIEW DETAILS
// =====================================================

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    // Find interview belonging to logged-in user
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).select(
      "role difficulty answers score status createdAt"
    );

    // Interview doesn't exist
    if (!interview) {
      return res.status(404).json({
        message: "Interview not found.",
      });
    }

    return res.status(200).json({
      interview,
    });

  } catch (error) {
    console.error(
      "Get interview details error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch interview details.",
    });
  }
});


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;