import { motion } from "framer-motion";
import biljana from "../images/team_members/biljana.jpg";
import joana from "../images/team_members/joana.jpg";
import anastasija from "../images/team_members/anastasija.jpg";
import florida from "../images/team_members/florida.jpg";
import marija from "../images/team_members/marija.jpg";
import blagica from "../images/team_members/blagica.jpg";

export default function TeamMembers() {
	const teamMembers = [
		{ id: 1, name: "Анастасија Танева", position: "Психотерапевт", image: anastasija },
		{ id: 2, name: "Благица Коцева-Тодорова", position: "Претседателка", image: blagica },
		{ id: 3, name: "Билјана Ташева", position: "Правна советничка", image: biljana },
		{ id: 4, name: "Марија Камчева", position: "Лице за комуникација", image: marija },
		{ id: 5, name: "Јоана Коцева", position: "Подпретседателка", image: joana },
		{ id: 6, name: "Флорида Илиевска", position: "Социјален работник", image: florida },
	];

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.45, ease: "easeOut" },
		},
	};

	const MotionDiv = motion.div;

	return (
		<section id="team-members" className="bg-white px-4 py-10 sm:py-12 md:py-16">
			<div className="mx-auto w-full max-w-450">
				<h1 className="mb-8 px-4 text-center text-5xl font-extrabold tracking-wide text-purple-900 sm:text-6xl md:text-7xl">
					Нашиот тим
				</h1>

				<div className="grid w-full grid-cols-1 justify-items-center gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
					{teamMembers.slice(0, 6).map((member) => {
						return (
							<MotionDiv
								key={member.id}
								variants={cardVariants}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.4 }}
								className="flex w-full max-w-sm flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
							>
								<div className="h-72 w-72 shrink-0 overflow-hidden rounded-lg border-2 border-gray-400 bg-gray-300 shadow-lg md:h-56 md:w-56 lg:h-72 lg:w-72">
									<img src={member.image} alt={member.name} className="h-full w-full object-cover" />
								</div>
								<h3 className="mt-4 text-lg font-semibold text-slate-900">{member.name}</h3>
								<p className="mt-1 text-sm font-medium text-slate-600">{member.position}</p>
							</MotionDiv>
						);
					})}
				</div>
			</div>
		</section>
	);
}











