import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../context/CalcValueContext";
import { GraphCtx } from "../context/GraphDataContext";
import { formatMoney } from '../helpers';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Graph() {
    const [context, setContext] = useContext(Context);
    const [graph, setGraphCtx] = useContext(GraphCtx);

    const [chartData, setChartData] = useState({})

    const labels = graph.values.map((value, index) => `Year ${value.year}`);
    const totalMoney = graph.values.map((value, index) => value.totalMoney);
    const totalInterest = graph.values.map((value, index) => value.totalInterest);
    const totalPayment = graph.values.map((value, index) => value.totalPayment);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: totalMoney,
                backgroundColor: 'rgba(219, 39, 119, 0.5)',
            },
        ],
    };

    return (
        <>
            <div className="mt-10 bg-gray-50 rounded-xl">
                <div className="mt-10">
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto pt-8">
                            <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                <div className="flex flex-col border-b border-gray-100 p-4 text-center sm:border-0 sm:border-r">
                                    <dd className="text-3xl font-extrabold text-gray-600">{formatMoney(totalPayment.pop()?.toFixed(0))}</dd>
                                    <dt className="mt-0 text-md leading-6  text-sm text-gray-500">Total Payments Made</dt>
                                </div>
                                <div className="flex flex-col border-t border-b border-gray-100 p-4 text-center sm:border-0 sm:border-l sm:border-r">
                                    <dd className="text-3xl font-extrabold text-gray-600">{formatMoney(totalInterest.pop()?.toFixed(0))}</dd>
                                    <dt className="mt-0 text-md leading-6  text-sm text-gray-500">Total Interest Earned</dt>
                                </div>
                                <div className="flex flex-col border-t border-gray-100 p-4 text-center sm:border-0 sm:border-l">
                                    <dd className="text-3xl font-extrabold text-pink-600">{formatMoney(totalMoney.pop()?.toFixed(0))}</dd>
                                    <dt className="mt-0 text-md leading-6  text-sm text-gray-500">Grand Total</dt>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <Bar
                        options={options} data={data}
                    />
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-base font-semibold tracking-wider text-pink-600 uppercase text-center">Data</h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl text-center">Your year-by-year breakdown</p>
                <div className="flex flex-col mt-10 bg-gray-50 rounded-xl p-6">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                            >
                                                Year
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                            >
                                                Payment
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                            >
                                                Interest
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                            >
                                                Earned
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {graph.values.map((item, personIdx) => (
                                            <tr key={item.year} className={item.year % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.year}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{formatMoney(item.totalPayment.toFixed(2))}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatMoney(item.totalInterest.toFixed(2))}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatMoney(item.totalMoney.toFixed(2))}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
