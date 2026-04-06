import { useEffect, useRef, useState } from "react";

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

	const galleryImages2026 = [
		{ id: 1, src: new URL("../example_images/counseling-center-866x406.png", import.meta.url).href },
		{ id: 2, src: new URL("../example_images/Untitled-1.jpg", import.meta.url).href },
		{ id: 3, src: new URL("../example_images/Untitled-2.jpg", import.meta.url).href },
		{ id: 4, src: new URL("../example_images/Untitled-3.jpg", import.meta.url).href },
		{ id: 5, src: new URL("../example_images/profile.png", import.meta.url).href },
		{ id: 10, src: new URL("../example_images/profile.png", import.meta.url).href },
		{ id: 11, src: new URL("../example_images/profile.png", import.meta.url).href },
		{ id: 12, src: new URL("../example_images/profile.png", import.meta.url).href },
		{ id: 13, src: new URL("../example_images/profile.png", import.meta.url).href },
	];

	const galleryImages2025 = [
		{ id: 6, src: new URL("../example_images/Untitled-3.jpg", import.meta.url).href },
		{ id: 7, src: new URL("../example_images/Untitled-2.jpg", import.meta.url).href },
		{ id: 8, src: new URL("../example_images/Untitled-1.jpg", import.meta.url).href },
		{ id: 9, src: new URL("../example_images/counseling-center-866x406.png", import.meta.url).href },
	];

	const renderYearSection = (year, images, sectionDelayMs = 0) => {
		const isVisible = Boolean(visibleYears[year]);

		return (
		<div className="mb-20">
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

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
				{images.map((image) => (
					<div
						key={image.id}
						className="group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300"
					>
						<img
							src={image.src}
							alt={`Gallery ${year} ${image.id}`}
							className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
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
				{renderYearSection("2026", galleryImages2026, 0)}
				{renderYearSection("2025", galleryImages2025, 120)}
			</div>
		</section>
	);
}
