const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ===== OUTLOOK SMTP CONFIG =====
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "david.olney@outlook.com", // ← CHANGE THIS
    pass: "YOUR_PASSWORD", // ← CHANGE THIS (or App Password)
  },
});

// ===== ROUTE =====
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Website Contact" <david.olney@outlook.com>`, // ← CHANGE THIS
      replyTo: email,
      to: ["email1@example.com", "email2@example.com"].join(","),

      subject: `New Contact Form Message from ${name}`,

      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.status(200).send("Email sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
});

// ===== START SERVER =====
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
