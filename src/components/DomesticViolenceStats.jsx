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
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-4">

                <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-stretch">

                    {/* LEFT - TEXT */}
                    <div className="md:pr-10 border-b md:border-b-0 md:border-r border-gray-200 pb-8 md:pb-0 h-full">
                        <h2 className="text-2xl font-bold text-purple-900 mb-4">
                            Семејно насилство во Северна Македонија
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-4">
                            Тука можеш да додадеш текст — објаснување за податоците,
                            причини, последици или што било релевантно.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            На пример: трендови низ годините, споредби, или повик за акција.
                        </p>
                    </div>

                    {/* RIGHT - STATS */}
                    <div className="w-full md:pl-10 h-full">

                        {/* SORT */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Статистика
                            </h3>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border rounded-md px-2 py-1 text-sm"
                            >
                                <option value="year">По година</option>
                                <option value="cases">По случаи</option>
                            </select>
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
                        <div className="w-full h-55">
                            <ResponsiveContainer>
                                <BarChart data={sortedData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />

                                    <Bar
                                        dataKey="cases"
                                        radius={[6, 6, 0, 0]}
                                        isAnimationActive
                                        animationDuration={600}
                                    >
                                        {sortedData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    entry.year === latest?.year
                                                        ? "#4c1d95"
                                                        : "#7c3aed"
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