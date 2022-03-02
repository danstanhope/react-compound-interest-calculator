import React, { useContext, useState, useEffect } from 'react'
import Text from './Text'
import DropDown from './DropDown'
import { Context } from '../context/CalcValueContext'
import { GraphCtx } from '../context/GraphDataContext'
import { CalcProps, GraphProps, GraphItem } from '../types'
//https://www.vertex42.com/Calculators/compound-interest-calculator.html#rate-per-period
export default function Form () {
  const [context, setContext] = useContext(Context)
  const [graph, setGraphCtx] = useContext(GraphCtx)

  useEffect(() => {
    buildGraphData();
  }, [])

  const Rate = (
    interest: number,
    payment: number,
    compoundFrequency: number
  ): number => {
    return (
      Math.pow(1 + interest / compoundFrequency, compoundFrequency / payment) -
      1
    )
  }

  const nPer = (payment: number, years: number): number => {
    return payment * years
  }

  const FV = (
    initial: number,
    interest: number,
    nper: number,
    payment: number
  ): number => {
    return (
      initial * Math.pow(1 + interest, nper) +
      (payment * (Math.pow(1 + interest, nper) - 1)) / interest
    )
  }

  function * Calculate (): IterableIterator<GraphItem> {
    let {
      compoundFrequency,
      paymentFrequency,
      initial,
      interest,
      payment,
      years
    } = context

    let frequencyMap = {
      monthly: 12,
      quarterly: 4,
      semiannual: 2,
      yearly: 1
    }

    paymentFrequency = frequencyMap[paymentFrequency]
    compoundFrequency = frequencyMap[compoundFrequency]
    interest = interest / 100

    let rate = Rate(interest, paymentFrequency, compoundFrequency)
    let fv = 0

    for (let i = 1; i <= years; i++) {
      let nper = nPer(paymentFrequency, i)

      fv = FV(initial, rate, nper, payment)

      let totalPayments = payment * nper + initial
      let totalInterest = fv - totalPayments

      let graphItem: GraphItem = {
        year: i,
        totalPayment: totalPayments,
        totalInterest: totalInterest,
        totalMoney: fv
      }
      yield graphItem
    }

    return fv
  }

  const buildGraphData = () => {
    let graph: GraphItem[] = []

    for (let amount of Calculate()) {
      graph.push(amount)
    }

    setGraphCtx({ values: graph })
  }

  return (
    <div className='mt-10'>
      <div className='mt-1 grid grid-cols-2 gap-4 md:grid-cols-4 select-none p-8 md:p-0'>
        <div className='relative block border rounded-lg p-4 shadow col-span-1'>
          <span className='block text-sm mb-1'>I have a</span>
          <Text
            defaultValue={{ name: 'initial', value: context.initial }}
            increment={1000}
            type='money'
            bounds={{ min: 0, max: 999999999 }}
          />
          <span className='block text-sm mt-2'>initial investment</span>
        </div>
        <div className='relative block border rounded-lg p-4 shadow col-span-1'>
          <span className='block text-sm mb-1'>I&apos;ll add</span>
          <Text
            defaultValue={{ name: 'payment', value: context.payment }}
            increment={1000}
            type='money'
            bounds={{ min: 0, max: 999999 }}
          />
          <span className='block text-sm mt-2'>
            each{' '}
            <DropDown
              text='month'
              property='paymentFrequency'
              fields={[
                { value: 'monthly', label: 'month' },
                { value: 'yearly', label: 'year' }
              ]}
            />
          </span>
        </div>
        <div className='relative block border rounded-lg p-4 shadow col-span-1'>
          <span className='block text-sm mb-1'>I&apos;ll get a</span>
          <Text
            defaultValue={{ name: 'interest', value: context.interest }}
            increment={1}
            type='percent'
            showArrows={true}
            bounds={{ min: 1, max: 100 }}
          />
          <span className='block text-sm mt-2'>
            return compounded{' '}
            <DropDown
              text='monthly'
              property='compoundFrequency'
              fields={[
                { value: 'monthly', label: 'monthly' },
                { value: 'quarterly', label: 'quarterly' },
                { value: 'semiannual', label: 'semi-annually' },
                { value: 'yearly', label: 'annually' }
              ]}
            />
          </span>
        </div>
        <div className='relative block border rounded-lg p-4 shadow col-span-1'>
          <span className='block text-sm mb-1'>I&apos;ve got</span>
          <Text
            defaultValue={{ name: 'years', value: context.years }}
            increment={1}
            type='year'
            showArrows={true}
            bounds={{ min: 1, max: 100 }}
          />
          <span className='block text-sm mt-2'>
            years to watch my money grow
          </span>
        </div>
      </div>
      <div className='text-center'>
        <button
          onClick={buildGraphData}
          className='mt-12 inline-flex bg-pink-600 bg-origin-border px-6 py-3 border border-transparent font-bold text-lg rounded-3xl shadow-sm text-white hover:from-pink-700 hover:to-pink-700'
        >
          <span>Show me the money</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 m-1'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
