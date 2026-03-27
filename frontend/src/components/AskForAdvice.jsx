import { motion } from "framer-motion";
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

const cardsContainer = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const cardItem = {
	hidden: { opacity: 0, y: 22 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

const MotionDiv = motion.div;
const MotionArticle = motion.article;

const AskForAdvice = () => {
	return (
		<section className="bg-white px-4 py-16 sm:px-6 lg:px-10">
			<div className="mx-auto w-full max-w-7xl space-y-12">
				<div className="rounded-3xl bg-purple-50/60 p-7 sm:p-9">
					<p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-900">
						Побарај совет
					</p>

					<p className="mt-5 min-h-56 text-lg leading-8 text-slate-700 md:text-xl md:leading-9">
						Ниту една жена не треба да се чувствува сама или засрамена кога се соочува со
						притисок, страв или неправда. Барањето совет е храбар чекор кон безбедност,
						самодоверба и стабилна иднина. Кога ќе побарате поддршка, вие ја враќате
						контролата врз сопствениот живот и испраќате силна порака дека вашето здравје,
						достоинство и мир се секогаш важни. Нашиот тим е тука да ве слушне без осуда,
						да ви помогне да направите јасен план и чекор по чекор да стигнете до
						решенија што одговараат на вашата ситуација. Со вистинска поддршка, секоја
						жена може да ја зајакне својата сигурност, да ги заштити своите најблиски и
						да изгради иднина во која се чувствува почитувано, безбедно и слободно.
					</p>

					<MotionDiv
						variants={cardItem}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.5 }}
						className="mt-8 flex justify-center lg:justify-start"
					>
						<Link
							to="/sovetuvalishen-centar"
							className="min-w-52 rounded-[999px] bg-purple-900 px-10 py-5 text-center text-xl font-bold text-white shadow-md outline-none ring-purple-300 transition-all duration-300 hover:translate-x-2 hover:-translate-y-1 hover:bg-purple-800 hover:shadow-[0_16px_40px_rgba(76,29,149,0.35)] focus-visible:ring-4 active:scale-[0.98]"
						>
							Побарај совет
						</Link>
					</MotionDiv>
				</div>

				<MotionDiv
					variants={cardsContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.25 }}
					className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-4"
				>
					{adviceCards.map((card) => (
						<MotionArticle
							key={card.id}
							variants={cardItem}
							className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:max-w-none"
						>
							<img
								src={card.image}
								alt={card.alt}
								className="h-52 w-full object-cover sm:h-56"
							/>
							<div className="space-y-2 p-5 sm:p-6">
								<h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
								<p className="text-sm leading-6 text-slate-600">{card.text}</p>
							</div>
						</MotionArticle>
					))}
				</MotionDiv>
			</div>
		</section>
	);
};

export default AskForAdvice;




