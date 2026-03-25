import { Link } from "react-router-dom";

const adviceCards = [
	{
		id: 1,
		title: "Правна насока",
		text: "Добијте практична правна насока и разберете ги своите права во јасни, едноставни чекори.",
		image: "/src/images/card_images/legal_consultation.jpg",
		alt: "Консултација за правна насока",
	},
	{
		id: 2,
		title: "Емоционална поддршка",
		text: "Разговарајте со обучен стручњак во безбедна и поддржувачка средина.",
		image: "/src/images/card_images/therapy.jpg",
		alt: "Состанок за емоционална поддршка",
	},
	{
		id: 3,
		title: "Планирање на безбедност",
		text: "Изградете персонализиран план насочен кон непосредна безбедност и долгорочна стабилност.",
		image: "/src/images/card_images/safety.jpg",
		alt: "Белешки за планирање на безбедност",
	},
	{
		id: 4,
		title: "Кризна интервенција",
		text: "Добијте итна насока за спешни ситуации и брзо поврзување со соодветна поддршка.",
		image: "/src/images/card_images/crisis.jpg",
		alt: "Поддршка при кризна интервенција",
	},
];

const AskForAdvice = () => {
	return (
		<section className="bg-white px-4 py-16 sm:px-6 lg:px-10">
			<div className="mx-auto w-full max-w-7xl">
				<h2 className="text-center text-5xl font-extrabold tracking-wide text-purple-900 sm:text-6xl md:text-7xl">
					Побарај совет!
				</h2>

				<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
					<div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
						{adviceCards.map((card) => (
							<article
								key={card.id}
											className="mx-auto w-full max-w-90 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
							>
								<img
									src={card.image}
									alt={card.alt}
												className="mx-auto h-54 w-90 max-w-full object-cover"
								/>
								<div className="space-y-2 p-5">
									<h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
									<p className="text-sm leading-6 text-slate-600">{card.text}</p>
								</div>
							</article>
						))}
					</div>

					<div className="flex justify-center lg:justify-end">
						<Link
							to="/sovetuvalishen-centar"
							className="min-w-48 rounded-full bg-purple-900 px-10 py-5 text-center text-xl font-bold text-white shadow-md outline-none ring-purple-300 transition-all duration-300 hover:translate-x-2 hover:-translate-y-1 hover:bg-purple-800 hover:shadow-[0_16px_40px_rgba(76,29,149,0.35)] focus-visible:ring-4 active:scale-[0.98]"
						>
							Побарај совет
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AskForAdvice;




