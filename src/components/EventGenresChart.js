/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
    PieChart,
    Pie, Cell,
    Legend,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const colors = [
        '#dad7cd',
        '#a3b18a',
        '#588157',
        '#52796f',
        '#52796f'
    ]
    const genres = [
        'React',
        'JavaScript',
        'Node',
        'jQuery',
        'Angular'
    ];

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    const getData = () => {
        const data = genres.map((genre) => {
            const filteredGenreEvents = events.filter((event) =>
                event.summary.includes(genre)
            ).length;

            return {
                name: genre,
                value: filteredGenreEvents,
            };
        });
        return data;
    };

    //Render customised label from Recharts - PieChart
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        outerRadius,
        percent,
        index,
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#black"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };


    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={130}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} iconType="plainline" />
                <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                        color: "black",
                        backgroundColor: "#7C9D96",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        border: "none",
                        padding: "3px"
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default EventGenresChart;