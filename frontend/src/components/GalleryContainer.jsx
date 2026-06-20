import { useEffect, useRef, useState, useCallback } from "react";

const galleries2026 = import.meta.glob("../images/gallery_images/SLIKI 2026/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
	eager: true,
	import: "default",
});

const galleries2025 = import.meta.glob("../images/gallery_images/SLIKI 2025/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
	eager: true,
	import: "default",
});

const galleries2024 = import.meta.glob("../images/gallery_images/SLIKI 2024/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
	eager: true,
	import: "default",
});

const galleries2023 = import.meta.glob("../images/gallery_images/SLIKI 2023/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
	eager: true,
	import: "default",
});

const galleries2022 = import.meta.glob("../images/gallery_images/SLIKI 2022/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
	eager: true,
	import: "default",
});

const galleries2021 = import.meta.glob("../images/gallery_images/SLIKI 2021/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
	eager: true,
	import: "default",
});

// Helper function to convert modules to image array
const createImageArray = (modules) => {
	return Object.values(modules).map((src, index) => ({
		id: index,
		src,
	}));
};

// Create gallery data object
const galleryData = {
	"2026": createImageArray(galleries2026),
	"2025": createImageArray(galleries2025),
	"2024": createImageArray(galleries2024),
	"2023": createImageArray(galleries2023),
	"2022": createImageArray(galleries2022),
	"2021": createImageArray(galleries2021),
};

export default function GalleryContainer() {
	const yearRefs = useRef({});
	const [visibleYears, setVisibleYears] = useState({});

	// Lightbox state: which year + index within that year's image array is open
	const [lightbox, setLightbox] = useState(null); // { year, index } | null

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const year = entry.target.getAttribute("data-year");
					if (!year) return;

					if (entry.isIntersecting) {
						setVisibleYears((prev) => (prev[year] ? prev : { ...prev, [year]: true }));
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3, rootMargin: "0px 0px -8% 0px" }
		);

		Object.values(yearRefs.current).forEach((element) => {
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, []);

	const openLightbox = (year, index) => setLightbox({ year, index });
	const closeLightbox = useCallback(() => setLightbox(null), []);

	const showPrev = useCallback(() => {
		setLightbox((current) => {
			if (!current) return current;
			const images = galleryData[current.year];
			const nextIndex = (current.index - 1 + images.length) % images.length;
			return { year: current.year, index: nextIndex };
		});
	}, []);

	const showNext = useCallback(() => {
		setLightbox((current) => {
			if (!current) return current;
			const images = galleryData[current.year];
			const nextIndex = (current.index + 1) % images.length;
			return { year: current.year, index: nextIndex };
		});
	}, []);

	// Keyboard navigation while lightbox is open
	useEffect(() => {
		if (!lightbox) return;

		const handleKeyDown = (event) => {
			if (event.key === "Escape") closeLightbox();
			if (event.key === "ArrowLeft") showPrev();
			if (event.key === "ArrowRight") showNext();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [lightbox, closeLightbox, showPrev, showNext]);

	// Lock background scroll while lightbox is open
	useEffect(() => {
		document.body.style.overflow = lightbox ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [lightbox]);

	const renderYearSection = (year, images, sectionDelayMs = 0) => {
		if (images.length === 0) return null;

		const isVisible = Boolean(visibleYears[year]);

		return (
			<div className="mb-20" key={year}>
				<div
					ref={(element) => {
						yearRefs.current[year] = element;
					}}
					data-year={year}
					className="mb-16 flex items-center gap-4"
					style={{ transitionDelay: `${sectionDelayMs}ms` }}
				>
					<div
						className={`h-1 w-12 origin-left rounded-full bg-purple-950 transition-all duration-500 ease-out ${
							isVisible ? "translate-x-0 scale-x-100" : "-translate-x-5 scale-x-0"
						}`}
						style={{ transitionDelay: `${sectionDelayMs + 120}ms` }}
					/>
					<h3
						className={`text-2xl font-black text-purple-900 transition-all duration-500 ease-out sm:text-3xl ${
							isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
						}`}
						style={{ transitionDelay: `${sectionDelayMs + 80}ms` }}
					>
						{year}
					</h3>
					<div
						className={`h-1 grow origin-left rounded-full bg-linear-to-r from-purple-950 to-transparent transition-all duration-700 ease-out ${
							isVisible ? "translate-x-0 scale-x-100" : "-translate-x-8 scale-x-0"
						}`}
						style={{ transitionDelay: `${sectionDelayMs + 180}ms` }}
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
					{images.map((image, index) => (
						<button
							key={image.id}
							type="button"
							onClick={() => openLightbox(year, index)}
							className="group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
							aria-label={`Open gallery image ${index + 1} from ${year}`}
						>
							<img
								src={image.src}
								alt={`Gallery ${year} ${image.id}`}
								className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-110 sm:h-48 md:h-52"
							/>
						</button>
					))}
				</div>
			</div>
		);
	};

	const lightboxImages = lightbox ? galleryData[lightbox.year] : null;
	const currentImage = lightboxImages ? lightboxImages[lightbox.index] : null;

	return (
		<section className="w-full bg-white px-4 py-16 sm:px-8 md:px-12 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{Object.entries(galleryData)
					.sort(([yearA], [yearB]) => yearB - yearA)
					.map(([year, images], index) =>
						renderYearSection(year, images, index * 120)
					)}
			</div>

			{lightbox && currentImage && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
					onClick={closeLightbox}
					role="dialog"
					aria-modal="true"
					aria-label={`Image viewer, ${lightbox.year}`}
				>
					{/* Close button */}
					<button
						type="button"
						onClick={closeLightbox}
						className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
						aria-label="Close"
					>
						<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
						</svg>
					</button>

					{/* Prev button */}
					{lightboxImages.length > 1 && (
						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								showPrev();
							}}
							className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
							aria-label="Previous image"
						>
							<svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
							</svg>
						</button>
					)}

					{/* Next button */}
					{lightboxImages.length > 1 && (
						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								showNext();
							}}
							className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
							aria-label="Next image"
						>
							<svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
							</svg>
						</button>
					)}

					{/* Image + counter */}
					<div
						className="flex max-h-full max-w-full flex-col items-center gap-3"
						onClick={(event) => event.stopPropagation()}
					>
						<img
							src={currentImage.src}
							alt={`Gallery ${lightbox.year} ${currentImage.id}`}
							className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
						/>
						<span className="text-sm font-medium text-white/80">
							{lightbox.year} — {lightbox.index + 1} / {lightboxImages.length}
						</span>
					</div>
				</div>
			)}
		</section>
	);
}