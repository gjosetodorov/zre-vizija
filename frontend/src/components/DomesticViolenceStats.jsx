import { useEffect, useState, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from "recharts";

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length) {
        return null;
    }

    return (
        <div className="rounded-lg border border-purple-200 bg-white px-4 py-3 shadow-lg">
            <p className="text-xs font-medium text-slate-500">Година: {label}</p>
            <p className="text-base font-bold text-purple-900">{payload[0].value} случаи</p>
        </div>
    );
}

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export default function DomesticViolenceStats() {
    const [data, setData] = useState([]);
    const [latest, setLatest] = useState(null);
    const [sortBy, setSortBy] = useState("year");

    useEffect(() => {
        async function fetchStats() {
            const response = await new Promise((resolve) =>
                setTimeout(() => {
                    resolve({
                        json: () => Promise.resolve([
                            { year: 2021, cases: 1056 },
                            { year: 2022, cases: 1117 },
                            { year: 2023, cases: 1082 },
                            { year: 2024, cases: 1150 },
                            { year: 2025, cases: 640, provisional: true }
                        ])
                    });
                }, 600)
            );

            const stats = await response.json();
            setData(stats);
            setLatest(stats[stats.length - 1]);
        }

        fetchStats();
    }, []);

    const sortedData = useMemo(() => {
        const sorted = [...data];
        if (sortBy === "cases") {
            sorted.sort((a, b) => b.cases - a.cases);
        } else {
            sorted.sort((a, b) => a.year - b.year);
        }
        return sorted;
    }, [data, sortBy]);

    return (
        <Motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-linear-to-br from-purple-100 via-purple-50/50 to-purple-100 py-20 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <Motion.div variants={itemVariants} className="mb-16">
                    <div className="inline-block">
                        <h2 className="text-4xl sm:text-5xl font-black text-purple-900 mb-6">
                            Семејно насилство во<br /> Северна Македонија
                        </h2>
                        <Motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                            className="h-1 w-full origin-left rounded-full bg-linear-to-r from-purple-950 to-transparent"
                        />
                    </div>
                </Motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* LEFT - TEXT SECTION */}
                    <Motion.div variants={itemVariants} className="flex flex-col justify-center space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Контекст и значајност
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                Семејното насилство останува сериозен общественнен проблем во Северна Македонија, со стотици семејства погодени секоја година. Податоците покажуваат дека бројот на пријавени случаи не е изолиран инцидент, туку континуиран тренд што бара постојана институционална и заедничка реакција.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Зад секој број стои реална приказна на жена, дете или семејство кое има потреба од заштита, правна помош и психолошка поддршка. Навременото пријавување, информираноста за правата и пристапот до советувалишта се клучни за прекин на циклусот на насилство.
                            </p>
                        </div>

                        {/* Stats Highlights */}
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <div className="p-5 rounded-xl bg-purple-50 border border-purple-100">
                                <p className="text-sm text-purple-600 font-semibold mb-2">Просечно годишно</p>
                                <p className="text-3xl font-bold text-purple-900">1.065</p>
                                <p className="text-xs text-gray-600 mt-1">пријавени случаи</p>
                            </div>
                            <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
                                <p className="text-sm text-blue-600 font-semibold mb-2">Тренд од</p>
                                <p className="text-3xl font-bold text-blue-900">2021</p>
                                <p className="text-xs text-gray-600 mt-1">до 2025</p>
                            </div>
                        </div>
                    </Motion.div>

                    {/* RIGHT - CHART SECTION */}
                    <Motion.div variants={itemVariants} className="flex flex-col">
                        {/* Sort Controls */}
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">
                                Статистика по години
                            </h3>

                            <div className="flex items-center gap-3">
                                <label htmlFor="sort-domestic-violence" className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                                    Сортирај:
                                </label>

                                <div className="relative">
                                    <select
                                        id="sort-domestic-violence"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pr-8 pl-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all duration-200"
                                    >
                                        <option value="year">По година</option>
                                        <option value="cases">По случаи</option>
                                    </select>

                                    <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.14l3.71-3.9a.75.75 0 011.08 1.04l-4.25 4.46a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Highlight Box */}
                        {latest && (
                            <div className="mb-8 p-6 rounded-xl bg-linear-to-br from-purple-50 to-purple-100/50 border border-purple-200">
                                <p className="text-sm font-semibold text-purple-600 mb-2">Најнова година</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-5xl font-black text-purple-900">{latest.cases}</span>
                                    <span className="text-lg text-gray-700">пријавени случаи во {latest.year}</span>
                                </div>
                                {latest.provisional && (
                                    <p className="text-xs text-orange-600 font-medium mt-3">
                                        * Привремени податоци
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Chart Container */}
                        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={sortedData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#7c3aed" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#6b7280", fontSize: 12 }}
                                        width={40}
                                    />
                                    <Tooltip cursor={{ fill: "rgba(124, 58, 237, 0.1)" }} content={<CustomTooltip />} />

                                    <Bar
                                        dataKey="cases"
                                        radius={[8, 8, 0, 0]}
                                        fill="url(#barGradient)"
                                        barSize={44}
                                        isAnimationActive
                                        animationDuration={800}
                                    >
                                        {sortedData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    entry.year === latest?.year
                                                        ? "#7c3aed"
                                                        : "url(#barGradient)"
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Source */}
                        <p className="text-xs text-gray-500 mt-4 text-center">
                            Извор: Министерство за внатрешни работи / УНДП
                        </p>
                    </Motion.div>
                </div>
            </div>
        </Motion.section>
    );
}