import { useEffect, useRef, useState } from "react";

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
					{images.map((image) => (
						<div
							key={image.id}
							className="group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300"
						>
							<img
								src={image.src}
								alt={`Gallery ${year} ${image.id}`}
								className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-110 sm:h-48 md:h-52"
							/>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<section className="w-full bg-white px-4 py-16 sm:px-8 md:px-12 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{Object.entries(galleryData)
					.sort(([yearA], [yearB]) => yearB - yearA)
					.map(([year, images], index) =>
						renderYearSection(year, images, index * 120)
					)}
			</div>
		</section>
	);
}
