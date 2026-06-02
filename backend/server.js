require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ===========================
   APPOINTMENT APIs
=========================== */

app.post("/appointments", (req, res) => {
    const { name, age, phone, doctorType, symptoms } = req.body;

    const sql =
        "INSERT INTO appointments (name, age, phone, doctor_type, symptoms) VALUES (?, ?, ?, ?, ?)";

    db.query(
        sql,
        [name, age, phone, doctorType, symptoms],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to save appointment"
                });
            }

            res.json({
                message: "Appointment saved successfully"
            });
        }
    );
});

app.get("/appointments", (req, res) => {
    const sql = "SELECT * FROM appointments";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to fetch appointments"
            });
        }

        res.json(results);
    });
});

app.delete("/appointments/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM appointments WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to delete appointment"
            });
        }

        res.json({
            message: "Appointment deleted successfully"
        });
    });
});

/* ===========================
   MEDICINE API
=========================== */

app.get("/medicines/:name", (req, res) => {
    const medicineName = req.params.name;

    const sql =
        "SELECT * FROM medicines WHERE LOWER(name) LIKE LOWER(?)";

    db.query(sql, [`%${medicineName}%`], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to fetch medicine"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Medicine not found"
            });
        }

        res.json(results[0]);
    });
});

/* ===========================
   SERVER
=========================== */

app.post("/ai-symptom", async (req, res) => {
    try {
        const { symptoms } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
            User symptoms: ${symptoms}

            Give:
            1. Possible condition
            2. Recommended doctor
            3. Basic advice

            Keep response short and easy to understand.
            `
        });

        res.json({
            result: response.text  || "No response from AI"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "AI analysis failed"
        });
    }
});
app.post("/admin-login", (req, res) => {

    const { username, password } = req.body;

    const sql =
    "SELECT * FROM admins WHERE username = ? AND password = ?";

    db.query(sql, [username, password], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error"
            });
        }

        if (results.length > 0) {

            res.json({
                success: true
            });

        } else {

            res.json({
                success: false
            });

        }

    });

});
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Email already exists or database error"
            });
        }

        res.json({
            success: true,
            message: "Signup successful"
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (results.length > 0) {
            res.json({
                success: true,
                user: results[0]
            });
        } else {
            res.json({
                success: false,
                message: "Invalid email or password"
            });
        }
    });
});
app.post("/ai-medicine", async (req, res) => {
    try {
        const { medicineName } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
            Medicine name: ${medicineName}

            Give short and simple information:
            1. What is it used for?
            2. Common dosage guidance
            3. Side effects
            4. Warnings

            Important: Do not suggest exact personal dosage. Mention consult doctor/pharmacist.
            `
        });

        res.json({
            result: response.text || "No AI response found."
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "AI medicine info failed"
        });
    }
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});