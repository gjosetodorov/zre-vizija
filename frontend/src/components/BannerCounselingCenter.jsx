import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import bannerImage from "../example_images/counseling-center-866x406.png";

export default function BannerCounselingCenter() {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToLocation = () => {
		const locationSection = document.getElementById("counseling-center-location");
		if (!locationSection) {
			return;
		}
		locationSection.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 80);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section
			className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: `url(${bannerImage})` }}
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
							Безбедност - Поддршка - Доверба
						</p>
						<span className="h-px w-10 bg-white/70" />
					</div>

					<h1 className="mx-auto text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:max-w-3xl lg:text-7xl">
						<span className="block">Регионален</span>
						<span className="block whitespace-nowrap">советувалишен центар</span>
						<span className="block">Визија</span>
					</h1>

					<p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-relaxed text-white/95 sm:text-base md:text-lg">
						Простор каде секоја жена добива стручна поддршка и охрабрување.
					</p>

					<button
						type="button"
						onClick={scrollToLocation}
						className="mx-auto mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-white"
					>
						<MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
						<span className="text-sm font-semibold sm:text-base">7-ми Септември, Кавадарци</span>
					</button>
				</div>
			</div>
		</section>
	);
}
