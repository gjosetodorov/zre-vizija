import { MapPin } from "lucide-react";
import bannerImage from "../example_images/counseling-center-866x406.png";

export default function BannerCounselingCenter() {
	return (
		<section
			className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: `url(${bannerImage})` }}
		>
			<div className="absolute inset-0 bg-purple-300/45" />
			<div className="absolute inset-0 bg-linear-to-r from-purple-950/25 via-transparent to-purple-950/35" />

			<div className="relative flex h-70 items-center justify-center px-4 sm:h-85 md:h-105">
				<div className="rounded-2xl border border-white/35 bg-white/12 px-6 py-5 text-center shadow-2xl backdrop-blur-sm sm:px-10 sm:py-7">
					<p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-purple-100 sm:text-sm">
						Безбедност - Поддршка - Доверба
					</p>
					<h1 className="text-center text-4xl font-black tracking-wide text-white drop-shadow-[0_4px_20px_rgba(49,15,93,0.95)] sm:text-5xl md:text-6xl">
						Советувалишен центар
					</h1>
					<p className="mt-3 text-sm font-medium text-white/90 sm:text-base">
						Простор каде секоја жена добива стручна поддршка и охрабрување.
					</p>
					<div className="mt-4 flex items-center justify-center gap-2 text-white">
						<MapPin className="h-5 w-5" />
						<span className="text-sm font-semibold sm:text-base">Kavadarci, North Macedonia</span>
					</div>
				</div>
			</div>
		</section>
	);
}


