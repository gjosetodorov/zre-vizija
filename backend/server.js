const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const https = require("https"); // ← NEW: built-in, no install needed

dotenv.config();

// Validate required environment variables on startup
const requiredEnvVars = ["EMAIL_USER", "EMAIL_PASS", "RECAPTCHA_SECRET_KEY"]; // ← RECAPTCHA_SECRET_KEY added
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		console.error(`❌ Missing required environment variable: ${envVar}`);
		process.exit(1);
	}
}

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // ← NEW

// Nodemailer transporter with timeout
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
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
	message: "Премногу обиди за испраќање. Следната порака можете да ја испратете подоцна.",
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

app.post("/send-email", emailRateLimiter, async (req, res) => {
	const { name, subject, contactInfo, contact, message, recaptchaToken } = req.body; // ← recaptchaToken added

	// ── NEW: reCAPTCHA verification (runs before any other validation) ──────────
	if (!recaptchaToken || typeof recaptchaToken !== "string") {
		return res.status(400).json({
			success: false,
			error: "Недостасува reCAPTCHA токен.",
		});
	}

	const captchaResult = await verifyRecaptcha(recaptchaToken);
	if (!captchaResult.success) {
		console.warn("⚠️ reCAPTCHA verification failed:", captchaResult["error-codes"]);
		return res.status(400).json({
			success: false,
			error: "reCAPTCHA верификацијата не успеа. Обидете се повторно.",
		});
	}
	// ────────────────────────────────────────────────────────────────────────────

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
	console.log(`⏱️ Rate limit: 5 requests per 15 minutes per IP`);
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

// ── NEW: Verify a reCAPTCHA token against Google's API ──────────────────────
// Uses the built-in https module — no extra dependencies required.
function verifyRecaptcha(token) {
	return new Promise((resolve, reject) => {
		const postData = `secret=${encodeURIComponent(RECAPTCHA_SECRET_KEY)}&response=${encodeURIComponent(token)}`;

		const options = {
			hostname: "www.google.com",
			path: "/recaptcha/api/siteverify",
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Content-Length": Buffer.byteLength(postData),
			},
		};

		const req = https.request(options, (res) => {
			let data = "";
			res.on("data", (chunk) => { data += chunk; });
			res.on("end", () => {
				try {
					resolve(JSON.parse(data));
				} catch {
					reject(new Error("Invalid JSON from reCAPTCHA API"));
				}
			});
		});

		req.on("error", reject);
		req.write(postData);
		req.end();
	});
}