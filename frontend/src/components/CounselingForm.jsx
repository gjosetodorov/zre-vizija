import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LdDGyQtAAAAABY1YfnzDulok4qlAiwoTyWy--kr";
const RECAPTCHA_SCRIPT_SRC = "https://www.google.com/recaptcha/api.js";

let recaptchaScriptPromise;

function loadRecaptchaScript() {
	if (typeof window === "undefined") {
		return Promise.resolve(null);
	}

	if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
		return Promise.resolve(window.grecaptcha);
	}

	if (!recaptchaScriptPromise) {
		recaptchaScriptPromise = new Promise((resolve, reject) => {
			const existingScript = document.querySelector(`script[src="${RECAPTCHA_SCRIPT_SRC}"]`);
			if (existingScript) {
				if (window.grecaptcha) {
					resolve(window.grecaptcha);
					return;
				}
				const checkReady = setInterval(() => {
					if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
						clearInterval(checkReady);
						resolve(window.grecaptcha);
					}
				}, 50);
				return;
			}

			const script = document.createElement("script");
			script.src = RECAPTCHA_SCRIPT_SRC;
			script.async = true;
			script.defer = true;
			script.onload = () => {
				if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
					resolve(window.grecaptcha);
				} else {
					const checkReady = setInterval(() => {
						if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
							clearInterval(checkReady);
							resolve(window.grecaptcha);
						}
					}, 50);
				}
			};
			script.onerror = () => reject(new Error("Не успеа вчитување на reCAPTCHA."));
			document.head.appendChild(script);
		});
	}

	return recaptchaScriptPromise;
}

export default function CounselingForm() {
	const [formData, setFormData] = useState({
		name: "",
		subject: "",
		contactInfo: "",
		message: "",
	});

	const [isSent, setIsSent] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [recaptchaReady, setRecaptchaReady] = useState(false);
	const [showCaptcha, setShowCaptcha] = useState(false); // ← controls the pop-out animation
	const captchaContainerRef = useRef(null);
	const captchaWidgetIdRef = useRef(null);
	const formDataRef = useRef(formData);

	useEffect(() => {
		formDataRef.current = formData;
	}, [formData]);

	const sendForm = useCallback(async (recaptchaToken) => {
		setSubmitError("");

		const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

		try {
			const response = await fetch(`${apiBaseUrl}/send-email`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-API-Key": "dev-key-change-in-production",
				},
				body: JSON.stringify({
					...formDataRef.current,
					recaptchaToken,
				}),
			});

			const data = await response.json();
			if (!response.ok || !data.success) {
				throw new Error(data.error || "Испраќањето не беше успешно.");
			}

			setIsSent(true);
			setFormData({ name: "", subject: "", contactInfo: "", message: "" });
		} catch (err) {
			setIsSent(false);
			setSubmitError(err.message || "Се појави грешка при испраќање на формата.");
		} finally {
			// Hide the captcha and reset it so the form is clean for the next attempt
			setShowCaptcha(false);
			if (captchaWidgetIdRef.current !== null && window.grecaptcha) {
				window.grecaptcha.reset(captchaWidgetIdRef.current);
			}
			setIsSubmitting(false);
		}
	}, []);

	useEffect(() => {
		let isMounted = true;

		loadRecaptchaScript()
			.then((grecaptcha) => {
				if (!isMounted || !captchaContainerRef.current || !grecaptcha) {
					return;
				}

				try {
					captchaWidgetIdRef.current = grecaptcha.render(captchaContainerRef.current, {
						sitekey: RECAPTCHA_SITE_KEY,
						callback: (token) => {
							// User ticked the box — Submit was already clicked, so send immediately.
							setIsSubmitting(true);
							void sendForm(token);
						},
						"expired-callback": () => {
							// Token expired before the user ticked — widget resets itself,
							// just clear the submitting state in case it was set.
							setIsSubmitting(false);
						},
						"error-callback": () => {
							setIsSubmitting(false);
							if (isMounted) {
								setSubmitError("reCAPTCHA не е достапна. Обидете се повторно.");
							}
						},
					});
					setRecaptchaReady(true);
				} catch (err) {
					if (isMounted) {
						setSubmitError("Не успеа при вчитување на reCAPTCHA.");
					}
				}
			})
			.catch((err) => {
				if (isMounted) {
					setSubmitError(err.message || "Не успеа вчитување на reCAPTCHA.");
				}
			});

		return () => {
			isMounted = false;
		};
	}, [sendForm]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (isSent) {
			setIsSent(false);
		}
		if (submitError) {
			setSubmitError("");
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSent(false);
		setSubmitError("");

		if (!recaptchaReady || captchaWidgetIdRef.current === null || !window.grecaptcha) {
			setSubmitError("reCAPTCHA не е подготвена. Обидете се повторно.");
			return;
		}

		// Reveal the checkbox widget — once the user ticks it the callback fires and
		// sendForm is called automatically. No execute() needed for the checkbox type.
		setShowCaptcha(true);
	};

	return (
		<section className="w-full bg-linear-to-br from-purple-100 via-purple-50/50 to-purple-100 px-4 py-14 sm:px-6 lg:px-10">
			<div className="mx-auto grid w-full max-w-7xl gap-8 rounded-3xl border border-purple-100 bg-white/70 p-6 shadow-sm lg:grid-cols-2 lg:gap-10 lg:p-10">
				<div className="rounded-2xl bg-white/70 p-6 lg:p-8">
					<p className="text-sm font-semibold uppercase tracking-[0.16em] text-purple-900">
						Како функционира
					</p>
					<h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
						Безбедно, приватно и едноставно
					</h2>
					<p className="mt-4 text-base leading-7 text-slate-700">
						Пополнете ја формата со основни информации и опишете ја вашата ситуација со свои
						зборови. Нашиот тим внимателно ја разгледува секоја порака и ве контактира преку
						начинот што сте го навеле. Можете да споделите онолку колку што ви е удобно.
					</p>
					<ul className="mt-3 space-y-3 text-base leading-7 text-slate-700">
						<li>
							<strong>Име и презиме:</strong> ни помага да ви се обратиме лично и со почит.
						</li>
						<li>
							<strong>Контакт (е-пошта или телефон):</strong> ова е начинот преку кој ќе ви
							одговориме и ќе договориме понатамошна поддршка.
						</li>
						<li>
							<strong>Наслов:</strong> краток опис на темата (на пример: правен совет,
							емоционална поддршка, безбедносен план) за побрзо насочување.
						</li>
						<li>
							<strong>Порака:</strong> тука слободно опишете што се случува, каква помош ви е
							најпотребна и дали има итност. Колку детали ќе споделите е целосно ваша
							одлука.
						</li>
					</ul>
					<p className="mt-4 text-base leading-7 text-slate-700">
						По испраќањето, добивате потврда дека пораката е примена. Потоа нашиот тим ви
						се јавува во најкус можен рок преку оставениот контакт. Овој чекор е само
						почеток - не сте сами, а барањето совет е храбра и важна одлука кон поддршка и
						сигурност.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
					<div className="grid gap-5">
						<label className="grid gap-2">
							<span className="text-sm font-semibold text-slate-800">Име и презиме</span>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								placeholder="Вашето име и презиме"
								className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-purple-900"
							/>
						</label>

						<label className="grid gap-2">
							<span className="text-sm font-semibold text-slate-800">Контакт (е-пошта или телефон)</span>
							<input
								type="text"
								name="contactInfo"
								value={formData.contactInfo}
								onChange={handleChange}
								required
								placeholder="Е-пошта или телефон"
								className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-purple-900"
							/>
						</label>

						<label className="grid gap-2">
							<span className="text-sm font-semibold text-slate-800">Наслов</span>
							<input
								type="text"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								required
								placeholder="Краток наслов"
								className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-purple-900"
							/>
						</label>

						<label className="grid gap-2">
							<span className="text-sm font-semibold text-slate-800">Порака</span>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
								rows={6}
								placeholder="Напишете ја вашата порака"
								className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-purple-900"
							/>
						</label>

						{/* reCAPTCHA slides in after Submit is clicked */}
						<div
							className={`overflow-hidden transition-all duration-300 ease-out ${
								showCaptcha ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
							}`}
						>
							<div ref={captchaContainerRef} />
						</div>

						{showCaptcha && !isSubmitting && (
							<p className="text-xs text-slate-500">
								Потврдете дека не сте робот за да се испрати пораката.
							</p>
						)}

						<button
							type="submit"
							disabled={isSubmitting || !recaptchaReady || showCaptcha}
							className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-purple-900 px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-800 hover:shadow-lg disabled:opacity-90"
						>
							{isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
							{isSubmitting ? "Се испраќа..." : "Испрати"}
						</button>

						{submitError ? (
							<p className="text-sm font-medium text-red-700">{submitError}</p>
						) : null}

						{isSent ? (
							<p className="text-sm font-medium text-green-700">
								Ви благодариме на довербата. Вашата порака е успешно испратена и ќе ве контактираме наскоро.
							</p>
						) : null}
					</div>
				</form>
			</div>
		</section>
	);
}