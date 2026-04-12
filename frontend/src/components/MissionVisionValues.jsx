import { motion } from "framer-motion";
import {
    Target,
    Eye,
    Award
} from "lucide-react";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.25
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const iconAnim = {
    hidden: { scale: 0.6, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5 }
    }
};

const MissionVisionValues = () => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-10 py-12 px-6 max-w-6xl mx-auto"
        >

            {/* Mission */}
            <motion.div
                variants={item}
                whileHover={{ y: -6 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-4 flex-1 p-6 rounded-xl"
            >
                <motion.div variants={iconAnim}>
                    <Target className="w-12 h-12 text-purple-900 shrink-0" />
                </motion.div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Нашата <span className="text-xl font-bold text-purple-900 drop-shadow-xs tracking-tight">Мисија</span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        Зајакнување на жените, унапредување на нивните права и превенција на родово базирано насилство, со цел создавање безбедно, праведно и еднакво општество.
                    </p>
                </div>
            </motion.div>

            {/* Vision */}
            <motion.div
                variants={item}
                whileHover={{ y: -6 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-4 flex-1 p-6 rounded-xl"
            >
                <motion.div variants={iconAnim}>
                    <Eye className="w-12 h-12 text-purple-900 shrink-0" />
                </motion.div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Нашата <span className="text-xl font-bold text-purple-900 drop-shadow-xs tracking-tight">Визија</span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        Општество во кое жените се достоинствени, безбедни и еднакви, со целосна поддршка да ги остварат своите права и лидерска улога – јакнење, заштита, еднаквост.
                    </p>
                </div>
            </motion.div>

            {/* Values */}
            <motion.div
                variants={item}
                whileHover={{ y: -6 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-4 flex-1 p-6 rounded-xl"
            >
                <motion.div variants={iconAnim}>
                    <Award className="w-12 h-12 text-purple-900 shrink-0" />
                </motion.div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Нашите <span className="text-xl font-bold text-purple-900 drop-shadow-xs tracking-tight">Вредности</span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        Градење општество на правда, почит и безбедност, во кое жените се јакнат, се слуша нивниот глас и се штитат нивните права.
                    </p>
                </div>
            </motion.div>

        </motion.div>
    );
};

export default MissionVisionValues;