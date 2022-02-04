import React, { useState, useEffect, Fragment } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

interface FieldInputProps {
    increment: number;
    defaultValue: number;
    type?: 'money' | 'percent' | 'year';
};

const formatMoney = (value: number) => {
    if (value >= 1000000) {
        return `${Intl.NumberFormat().format(value / 1000000)}M`;
    } else if (value >= 1000) {
        return `${Intl.NumberFormat().format(value / 1000)}K`;
    } else {
        return Intl.NumberFormat().format(value)
    }
};

const fieldString = ({ increment, defaultValue, type }: FieldInputProps) => {
    if (type === 'money') {
        let tmp = formatMoney(defaultValue);
        return `$${tmp}`;
    } else if (type === 'percent') {
        return `${defaultValue}%`;
    } else {
        return `${defaultValue}`;
    }
};

export default function Text(props: FieldInputProps) {
    const { increment, type, defaultValue } = props;
    let fieldstr = fieldString(props);

    const [text, setText] = useState(fieldstr);
    const [count, setCount] = useState(defaultValue);
    const [visible, setVisible] = useState(false);

    useEffect(() => {        
        let fieldstr = fieldString({
            increment,
            defaultValue: count,
            type
        });

        setText(fieldstr);
    }, [count]);

    function increase() {
        setCount(prevState => prevState + increment);
    }

    function decrease() {        
        let newCount = count - increment;
        
        if (newCount < 0) return;

        setCount(prevState => newCount);
    }

    return (
        <Fragment>
            {!visible &&
                <div
                    className="w-auto inline-block"
                >
                    <div className="flex select-none">
                        <strong
                            onClick={() => setVisible(!visible)}
                            className="font-bold text-5xl text-slate-800 inline-block underline cursor-pointer">{text}</strong>
                        <div className="flex flex-col justify-center"> 
                            <ChevronUpIcon
                                onClick={increase}
                                className="h-5 w-5 inline-block text-slate-500 cursor-pointer" /> 
                            <ChevronDownIcon
                                onClick={decrease}
                                className="h-5 w-5 inline-block text-slate-500 cursor-pointer" /> 
                        </div>
                    </div>
                </div>}
            {visible &&
            
                <input
                    className="border border-slate-300 text-5xl inline-block w-full shadow-sm py-4 px-6"
                    type="text"
                    value={text}
                    onBlur={() => setVisible(!visible)}
                    onChange={e => setText(e.target.value)} />}

        </Fragment>
    )
}
