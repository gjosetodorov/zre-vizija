import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function DomesticViolenceStats() {
    const [data, setData] = useState([]);
    const [latest, setLatest] = useState(null);

    useEffect(() => {
        async function fetchStats() {

            // Simulated API request (replace with real endpoint if available)
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

    return (
        <section className="py-14 bg-linear-to-r from-purple-200 via-purple-100 to-blue-200">
            <div className="max-w-4xl mx-auto px-6">

                {/* TITLE */}
                <h2 className="text-2xl font-bold text-purple-900 text-center mb-8">
                    Семејно насилство во Северна Македонија
                </h2>

                {/* HIGHLIGHT CARD */}
                {latest && (
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center mb-8 border border-purple-200">
                        <div className="text-5xl font-bold text-purple-700">
                            {latest.cases}
                        </div>

                        <p className="text-gray-700 mt-2">
                            пријавени случаи во {latest.year}
                        </p>

                        {latest.provisional && (
                            <p className="text-sm text-orange-600 mt-1">
                                * привремени податоци
                            </p>
                        )}
                    </div>
                )}

                {/* GRAPH CARD */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

                            <XAxis dataKey="year" />

                            <YAxis />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "1px solid #ddd"
                                }}
                            />

                            <Bar
                                dataKey="cases"
                                fill="#7c3aed"
                                radius={[6,6,0,0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>

                </div>

                {/* SOURCE */}
                <p className="text-center text-gray-500 text-sm mt-4">
                    Извор: Министерство за внатрешни работи / УНДП / Извештаи за родова еднаквост
                </p>

            </div>
        </section>
    );
}