import { useEffect, useState, useMemo } from "react";
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
        <div className="rounded-xl border border-purple-100 bg-white/95 px-3 py-2 shadow-lg">
            <p className="text-xs font-medium text-slate-500">Година: {label}</p>
            <p className="text-sm font-semibold text-purple-900">{payload[0].value} пријавени случаи</p>
        </div>
    );
}

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
        <section className="bg-linear-to-r from-purple-200 via-purple-100 to-blue-200 py-16">
            <div className="max-w-6xl mx-auto px-4">

                <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-stretch">

                    {/* LEFT - TEXT */}
                    <div className="h-full border-b border-purple-200 pb-8 md:border-r md:border-b-0 md:pr-10 md:pb-0">
                        <h2 className="text-2xl font-bold text-purple-900 mb-4">
                            Семејно насилство во Северна Македонија
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-4">
                            Семејното насилство останува сериозен општествен проблем во Северна
                            Македонија, со стотици семејства погодени секоја година. Податоците
                            покажуваат дека бројот на пријавени случаи не е изолиран инцидент,
                            туку континуиран тренд што бара постојана институционална и
                            заедничка реакција.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Зад секој број стои реална приказна на жена, дете или семејство кое
                            има потреба од заштита, правна помош и психолошка поддршка. Навременото
                            пријавување, информираноста за правата и пристапот до советувалишта
                            се клучни за прекин на циклусот на насилство.
                        </p>
                    </div>

                    {/* RIGHT - STATS */}
                    <div className="w-full md:pl-10 h-full">

                        {/* SORT */}
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Статистика
                            </h3>

                            <div className="flex items-center gap-2">
                                <label htmlFor="sort-domestic-violence" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Сортирај
                                </label>

                                <div className="relative">
                                    <select
                                        id="sort-domestic-violence"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="min-w-36 appearance-none rounded-xl border border-transparent bg-white/90 py-2 pr-9 pl-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all duration-200 hover:border-transparent hover:bg-white focus:border-transparent focus:ring-0"
                                    >
                                        <option value="year">По година</option>
                                        <option value="cases">По случаи</option>
                                    </select>

                                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-purple-900">
                                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.14l3.71-3.9a.75.75 0 011.08 1.04l-4.25 4.46a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* HIGHLIGHT */}
                        {latest && (
                            <div className="mb-6 text-center">
                                <div className="text-4xl font-bold text-purple-900">
                                    {latest.cases}
                                </div>
                                <p className="text-sm text-gray-600">
                                    случаи во {latest.year}
                                </p>
                                {latest.provisional && (
                                    <p className="text-xs text-orange-500">
                                        * привремени
                                    </p>
                                )}
                            </div>
                        )}

                        {/* CHART */}
                        <div className="h-55 w-full rounded-2xl border border-purple-100 bg-white/80 p-3 shadow-sm backdrop-blur-sm sm:p-4">
                            <ResponsiveContainer>
                                <BarChart data={sortedData}>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#7c3aed" />
                                            <stop offset="100%" stopColor="#4c1d95" />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#475569", fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#475569", fontSize: 12 }}
                                        width={42}
                                    />
                                    <Tooltip cursor={{ fill: "rgba(124,58,237,0.07)" }} content={<CustomTooltip />} />

                                    <Bar
                                        dataKey="cases"
                                        radius={[10, 10, 0, 0]}
                                        fill="url(#barGradient)"
                                        barSize={34}
                                        isAnimationActive
                                        animationDuration={700}
                                    >
                                        {sortedData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    entry.year === latest?.year
                                                        ? "#4c1d95"
                                                        : "url(#barGradient)"
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* SOURCE (CENTERED) */}
                        <p className="text-sm text-gray-600 mt-4 text-center">
                            Извор: Министерство за внатрешни работи / УНДП
                        </p>

                    </div>

                </div>
            </div>
        </section>
    );
}