const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/authMiddleware");

// ======================================================
// UPLOAD DIRECTORY
// ======================================================

const uploadDir = path.join(__dirname, "../uploads/resumes");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ======================================================
// MULTER STORAGE
// ======================================================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },
});

// ======================================================
// FILE FILTER
// ======================================================

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error("Only PDF, DOC, and DOCX files are allowed."),
            false
        );
    }
};

// ======================================================
// MULTER CONFIGURATION
// ======================================================

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: fileFilter,
});

// ======================================================
// UPLOAD RESUME
// POST /api/resume/upload
// ======================================================

router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "Please upload a resume.",
                });
            }

            const existingResume = await Resume.findOne({
                userId: req.userId,
            });

            // Delete old resume
            if (existingResume) {
                const oldFilePath = path.join(
                    uploadDir,
                    existingResume.filePath
                );

                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }

                await Resume.deleteOne({
                    _id: existingResume._id,
                });
            }

            // Save new resume
            const resume = new Resume({
                userId: req.userId,
                fileName: req.file.originalname,
                filePath: req.file.filename,
            });

            await resume.save();

            res.status(201).json({
                message: "Resume uploaded successfully.",
                resume: {
                    id: resume._id,
                    fileName: resume.fileName,
                    filePath: resume.filePath,
                    uploadedAt: resume.createdAt,
                },
            });
        } catch (error) {
            console.error("Resume upload error:", error);

            if (req.file) {
                const uploadedFilePath = path.join(
                    uploadDir,
                    req.file.filename
                );

                if (fs.existsSync(uploadedFilePath)) {
                    fs.unlinkSync(uploadedFilePath);
                }
            }

            res.status(500).json({
                message: "Unable to upload resume.",
            });
        }
    }
);

// ======================================================
// GET MY RESUME
// GET /api/resume/my-resume
// ======================================================

router.get("/my-resume", authMiddleware, async (req, res) => {
    try {
        const resume = await Resume.findOne({
            userId: req.userId,
        });

        if (!resume) {
            return res.status(404).json({
                message: "No resume found.",
            });
        }

        res.json({
            id: resume._id,
            fileName: resume.fileName,
            filePath: resume.filePath,
            uploadedAt: resume.createdAt,
        });
    } catch (error) {
        console.error("Get resume error:", error);

        res.status(500).json({
            message: "Unable to fetch resume.",
        });
    }
});

// ======================================================
// DELETE RESUME
// DELETE /api/resume/delete
// ======================================================

router.delete("/delete", authMiddleware, async (req, res) => {
    try {
        const resume = await Resume.findOne({
            userId: req.userId,
        });

        if (!resume) {
            return res.status(404).json({
                message: "No resume found.",
            });
        }

        const filePath = path.join(
            uploadDir,
            resume.filePath
        );

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Resume.deleteOne({
            _id: resume._id,
        });

        res.json({
            message: "Resume deleted successfully.",
        });
    } catch (error) {
        console.error("Delete resume error:", error);

        res.status(500).json({
            message: "Unable to delete resume.",
        });
    }
});

// ======================================================
// ANALYZE RESUME WITH AI
// POST /api/resume/analyze
// ======================================================

router.post("/analyze", authMiddleware, async (req, res) => {
    try {
        // --------------------------------------------------
        // Find user's resume
        // --------------------------------------------------

        const resume = await Resume.findOne({
            userId: req.userId,
        });

        if (!resume) {
            return res.status(404).json({
                message: "No resume uploaded.",
            });
        }

        // --------------------------------------------------
        // Get actual file path
        // --------------------------------------------------

        const filePath = path.join(
            uploadDir,
            resume.filePath
        );

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                message: "Resume file not found.",
            });
        }

        // --------------------------------------------------
        // Get file extension
        // --------------------------------------------------

        const extension = path
            .extname(resume.fileName)
            .toLowerCase();

        let resumeText = "";

        // ==================================================
        // PDF
        // ==================================================

        if (extension === ".pdf") {
            console.log("Reading PDF resume...");

            const fileBuffer = fs.readFileSync(filePath);

            const parser = new PDFParse({
                data: fileBuffer,
            });

            const pdfData = await parser.getText();

            resumeText = pdfData.text;

            await parser.destroy();

            console.log("PDF text extracted successfully.");
        }

        // ==================================================
        // DOCX
        // ==================================================

        else if (extension === ".docx") {
            console.log("Reading DOCX resume...");

            const result = await mammoth.extractRawText({
                path: filePath,
            });

            resumeText = result.value;

            console.log("DOCX text extracted successfully.");
        }

        // ==================================================
        // DOC
        // ==================================================

        else if (extension === ".doc") {
            return res.status(400).json({
                message:
                    "AI analysis currently supports PDF and DOCX resumes only.",
            });
        }

        // ==================================================
        // UNSUPPORTED FORMAT
        // ==================================================

        else {
            return res.status(400).json({
                message: "Unsupported resume format.",
            });
        }

        // --------------------------------------------------
        // Check extracted text
        // --------------------------------------------------

        if (!resumeText || !resumeText.trim()) {
            return res.status(400).json({
                message:
                    "Could not extract text from the resume.",
            });
        }

        console.log(
            "Resume text extracted successfully."
        );

        // --------------------------------------------------
        // Send resume to FastAPI AI service
        // --------------------------------------------------

        console.log(
            "Sending resume to AI service..."
        );

        // AI service is running on PORT 8001
        const aiServiceUrl =
            process.env.AI_SERVICE_URL ||
            "http://127.0.0.1:8001";

        console.log(
            `AI Service URL: ${aiServiceUrl}/analyze`
        );

        const aiResponse = await axios.post(
            `${aiServiceUrl}/analyze`,
            {
                resume_text: resumeText,
            },
            {
                timeout: 120000,
            }
        );

        console.log(
            "AI analysis received successfully."
        );

        // --------------------------------------------------
        // Send result to frontend
        // --------------------------------------------------

        return res.json({
            message: "Resume analyzed successfully.",
            analysis: aiResponse.data,
        });

    } catch (error) {
        console.error(
            "Resume analysis error:",
            error
        );

        // Show FastAPI error
        if (error.response) {
            console.error(
                "FastAPI status:",
                error.response.status
            );

            console.error(
                "FastAPI error:",
                error.response.data
            );

            return res.status(502).json({
                message: "AI service returned an error.",
                error: error.response.data,
            });
        }

        // Connection error
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({
                message:
                    "AI service is not running on port 8001. Please start FastAPI on port 8001.",
            });
        }

        // Timeout error
        if (
            error.code === "ECONNABORTED" ||
            error.code === "ETIMEDOUT"
        ) {
            return res.status(500).json({
                message:
                    "AI analysis took too long. Please try again.",
            });
        }

        return res.status(500).json({
            message: "Unable to analyze resume.",
            error: error.message,
        });
    }
});

// ======================================================
// MULTER ERROR HANDLER
// ======================================================

router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message:
                    "Resume file must be smaller than 5 MB.",
            });
        }

        return res.status(400).json({
            message: error.message,
        });
    }

    if (error) {
        return res.status(400).json({
            message: error.message,
        });
    }

    next();
});

// ======================================================
// EXPORT ROUTER
// ======================================================

module.exports = router;