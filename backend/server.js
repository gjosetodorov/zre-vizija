const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

// Validate required environment variables on startup
const requiredEnvVars = ["EMAIL_USER", "EMAIL_PASS"];
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		console.error(`❌ Missing required environment variable: ${envVar}`);
		process.exit(1);
	}
}

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const API_KEY = process.env.API_KEY || "dev-key-change-in-production";

// Nodemailer transporter with timeout
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS,
	},
	connectionTimeout: 5000,
	socketTimeout: 5000,
});

// Verify transporter on startup
transporter.verify((error, _success) => {
	if (error) {
		console.error("❌ Email transporter verification failed:", error.message);
	} else {
		console.log("✅ Email transporter verified successfully");
	}
});

// Security: helmet, request limits, rate limiting
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

const emailRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: "Too many emails sent from this IP, please try again later.",
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(
	cors({
		origin: CORS_ORIGIN,
		methods: ["GET", "POST"],
		credentials: false,
	})
);

app.get("/health", (req, res) => {
	res.status(200).json({ ok: true, service: "zre-vizija-backend" });
});

// Placeholder for upcoming form endpoints.
app.get("/api", (req, res) => {
	res.status(200).json({ message: "API is ready." });
});

// Middleware: API key authentication
const requireApiKey = (req, res, next) => {
	const providedKey = req.headers["x-api-key"];
	if (!providedKey || providedKey !== API_KEY) {
		return res.status(401).json({ success: false, error: "Unauthorized" });
	}
	next()
};

app.post("/send-email", emailRateLimiter, requireApiKey, async (req, res) => {
	const { name, subject, contactInfo, contact, message } = req.body;
	const normalizedContactInfo = contactInfo || contact;

	// Input validation with length limits
	if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
		return res.status(400).json({
			success: false,
			error: "Невалидно име: мора да содржи 1-100 знакови",
		});
	}

	if (!subject || typeof subject !== "string" || subject.trim().length === 0 || subject.length > 100) {
		return res.status(400).json({
			success: false,
			error: "Невалиден наслов: мора да содржи 1-100 знакови",
		});
	}

	if (!normalizedContactInfo || typeof normalizedContactInfo !== "string" || normalizedContactInfo.trim().length === 0 || normalizedContactInfo.length > 150) {
		return res.status(400).json({
			success: false,
			error: "Невалидна контакт информација: мора да содржи 1-150 знакови",
		});
	}

	if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 5000) {
		return res.status(400).json({
			success: false,
			error: "Невалидна порака: мора да содржи 1-5000 знакови",
		});
	}

	const mailSubject = `Нов формулар за контакт: ${subject}`;
	const textBody = `Нова пријава од веб-страницата ЗРЕ Визија\n\nИме: ${name}\nКонтакт: ${normalizedContactInfo}\n\nНаслов: ${subject}\n\nПорака:\n${message}`;
	const htmlBody = `
		<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
			<h2 style="margin-bottom: 8px;">📩 Нова порака од веб-страницата ЗРЕ Визија</h2>
			<p><strong>👤 Име:</strong> ${escapeHtml(name)}</p>
			<p><strong>📞 Контакт:</strong> ${escapeHtml(normalizedContactInfo)}</p>
			<p><strong>📝 Наслов:</strong> ${escapeHtml(subject)}</p>
			<p><strong>💬 Порака:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
		</div>
	`;

	try {
		const info = await transporter.sendMail({
			from: EMAIL_USER,
			to: EMAIL_USER,
			subject: mailSubject,
			text: textBody,
			html: htmlBody,
		});

		console.log(`✅ Email sent [ID: ${info.messageId}] from ${name}`);
		return res.status(200).json({
			success: true,
			message: "Email sent successfully.",
		});
	} catch (error) {
		console.error(`❌ Email send failed:`, error.message);
		return res.status(500).json({
			success: false,
			error: "Failed to send email.",
		});
	}
});

app.use((req, res) => {
	res.status(404).json({ success: false, error: "Route not found" });
});

app.use((err, req, res, _next) => {
	console.error(`❌ Server error:`, err.message);
	res.status(500).json({ success: false, error: "Внатрешна грешка на серверот" });
});

// Graceful shutdown
const server = app.listen(PORT, () => {
	console.log(`🚀 Backend running on http://localhost:${PORT}`);
	console.log(`📧 Email: ${EMAIL_USER}`);
	console.log(`🔐 API key protection: enabled`);
	console.log(`⏱️  Rate limit: 5 requests per 15 minutes per IP`);
});

process.on("SIGTERM", () => {
	console.log("SIGTERM received, shutting down gracefully...");
	server.close(() => {
		console.log("Server closed");
		process.exit(0);
	});
});

// Utility function: escape HTML to prevent XSS
function escapeHtml(text) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#039;",
	};
	return text.replace(/[&<>"']/g, (char) => map[char]);
}

