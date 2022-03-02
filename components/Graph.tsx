import React, { useContext, useState } from 'react';
import { GraphCtx } from '../context/GraphDataContext';
import { formatMoney } from '../helpers';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Graph () {
  const [graphCtx, setGraphCtx] = useContext(GraphCtx);
  const [chartData, setChartData] = useState({});

  const labels = graphCtx.values.map((value) => `Year ${value.year}`);
  const totalMoney = graphCtx.values.map((value) => value.totalMoney);
  const totalInterest = graphCtx.values.map((value) => value.totalInterest);
  const totalPayment = graphCtx.values.map((value) => value.totalPayment);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: ''
      },
      tooltip: {
        callbacks: {
          footer: function(items) {
            return `Total: ${formatMoney(totalMoney[items[0].dataIndex].toFixed(2))}`
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'payments',
        data: totalPayment,
        backgroundColor: 'rgba(219, 39, 119, 0.5)'
      },
      {
        label: 'interest',
        data: totalInterest,
        backgroundColor: 'rgba(219, 39, 119, 1)'
      }
    ]
  };

  return (
    <>
      <div className='mt-10 bg-gray-50 rounded-xl'>
        <div className='mt-10'>
          <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto pt-8'>
              <dl className='rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3'>
                <div className='flex flex-col border-b border-gray-100 p-4 text-center sm:border-0 sm:border-r'>
                  <dd className='text-3xl font-extrabold text-gray-600'>
                    {formatMoney(
                      totalPayment[totalPayment.length - 1]?.toFixed(0)
                    ) ?? 0}
                  </dd>
                  <dt className='mt-0 text-md leading-6  text-sm text-gray-500'>
                    Total Payments Made
                  </dt>
                </div>
                <div className='flex flex-col border-t border-b border-gray-100 p-4 text-center sm:border-0 sm:border-l sm:border-r'>
                  <dd className='text-3xl font-extrabold text-gray-600'>
                    {formatMoney(
                      totalInterest[totalInterest.length - 1]?.toFixed(0)
                    ) ?? 0}
                  </dd>
                  <dt className='mt-0 text-md leading-6  text-sm text-gray-500'>
                    Total Interest Earned
                  </dt>
                </div>
                <div className='flex flex-col border-t border-gray-100 p-4 text-center sm:border-0 sm:border-l'>
                  <dd className='text-3xl font-extrabold text-pink-600'>
                    {formatMoney(totalMoney[totalMoney.length - 1]?.toFixed(0)) ?? 0 }
                  </dd>
                  <dt className='mt-0 text-md leading-6  text-sm text-gray-500'>
                    Grand Total
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className='p-6'>
          <Bar options={options} data={data} />
        </div>
      </div>
    </>
  )
}
