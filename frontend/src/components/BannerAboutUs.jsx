import { useEffect, useState } from "react";
import aboutBannerImage from "../images/banner_images/aboutus_banner.jpg";

export default function BannerAboutUs() {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToTeam = () => {
		document.getElementById("team-members")?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 80);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section
			className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: `url(${aboutBannerImage})` }}
		>
			<div className="absolute inset-0 bg-linear-to-b from-purple-950/82 via-purple-900/58 to-purple-700/40" />

			<div className="relative mx-auto flex h-72 w-full max-w-6xl items-center justify-center px-6 sm:h-88 md:h-108 lg:h-120">
				<div
					className={`mx-auto flex w-full max-w-4xl flex-col items-center text-center transition-all duration-900 ease-out ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
					}`}
				>
					<div className="mx-auto mb-4 inline-flex items-center gap-3">
						<span className="h-px w-10 bg-white/70" />
						<p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-100 sm:text-sm">
						Поддршка - Еднаквост - Сила
					</p>
						<span className="h-px w-10 bg-white/70" />
					</div>

					<h1 className="mx-auto text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:max-w-3xl lg:text-7xl">
						За нас
					</h1>

					<p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-relaxed text-white/95 sm:text-base md:text-lg">
						ЗРЕ Визија гради безбедна заедница каде жените се слушнати, поддржани и охрабрени.
					</p>

					<button
						type="button"
						onClick={scrollToTeam}
						className="mt-7 inline-block min-w-52 cursor-pointer rounded-[999px] bg-purple-900 px-8 py-3 text-center text-base font-bold text-white shadow-md outline-none ring-purple-300 transition-all duration-300 hover:translate-x-2 hover:-translate-y-1 hover:bg-purple-800 hover:shadow-[0_16px_40px_rgba(76,29,149,0.35)] focus-visible:ring-4 active:scale-[0.98]"
					>
						Запознај го тимот
					</button>

				</div>
			</div>
		</section>
	);
}

