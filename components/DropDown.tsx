import React, { useState, useEffect, Fragment, useContext } from 'react'
import { Context } from '../context/CalcValueContext'
import { CalcProps } from '../types'
import { formatMoney } from '../helpers'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'

interface FieldObj{
    label: string;
    value: string;
}

interface FieldDropDownProps {
  fields: FieldObj[]
  text?: string
  property: 'paymentFrequency' | 'compoundFrequency';
}

export default function Text (props: FieldDropDownProps) {
  const { fields, property, text:defaultText } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [text, setText] = useState<string>(defaultText);
  const [context, setContext] = useContext(Context);

  const toggle = (isVisible: boolean) => {
    setVisible(isVisible)
  }

  const setValue = (label:string, value: string) => {
    context[property] = value;

    setText(label);
    setVisible(false);    
    setContext(context);
  }

  
  return (
    <Fragment>
      <div className='relative inline-block text-left'>
        <div
          className='inline-flex cursor-pointer underline font-bold'
          onClick={() => toggle(!visible)}
        >
          {text}
          <ChevronDownIcon className='-mr-1 ml-0 h-5 w-5' aria-hidden='true' />
        </div>
        {visible && (
          <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {(() => {
              if (fields && fields.length > 0) {
                return (
                  <div className='py-1' role='none'>
                    <ul>
                      {fields.map((item, personIdx) => (
                        <li
                          className='text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-slate-900'
                          key={item.value}
                          onClick={() => setValue(item.label, item.value)}
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
            })()}
          </div>
        )}
      </div>
    </Fragment>
  )
}
