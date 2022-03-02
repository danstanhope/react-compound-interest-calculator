import React, { useContext } from 'react';
import { GraphCtx } from '../context/GraphDataContext';
import { formatMoney } from '../helpers';

export default function Table () {
  const [graphCtx, setGraphCtx] = useContext(GraphCtx);

  return (
    <div className='mt-8'>
      <h2 className='text-base font-semibold tracking-wider text-pink-600 uppercase text-center'>
        Data
      </h2>
      <p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl text-center'>
        Your year-by-year breakdown
      </p>
      <div className='flex flex-col mt-10 bg-gray-50 rounded-xl p-6'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider'
                    >
                      Year
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider'
                    >
                      Payment
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider'
                    >
                      Interest
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider'
                    >
                      Earned
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {graphCtx.values.map((item) => (
                    <tr
                      key={item.year}
                      className={
                        item.year % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }
                    >
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {item.year}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        {formatMoney(item.totalPayment.toFixed(2))}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {formatMoney(item.totalInterest.toFixed(2))}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {formatMoney(item.totalMoney.toFixed(2))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
