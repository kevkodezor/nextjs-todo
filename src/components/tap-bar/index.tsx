'use client'
import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface Props {
    indexTab?: number;
    optionsTab?: number[];
}

export const TabBar = ({ indexTab = 1, optionsTab = [1,2,3,4,5] }:Props) => {

    const router = useRouter();
    const [selected, setSetselected] = useState(indexTab);

    const onTab = (tab:number) => {
        setSetselected(tab);
        setCookie('selectedTab', tab.toString());
        router.refresh();
    }

    return (
        <div className={`flex flex-row space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-${optionsTab.length}`}>
            {optionsTab.map(tab => (
                <div key={tab} className='w-full'>
                    <input type='radio' id={tab.toString()} className='peer hidden' checked={selected === tab} onChange={() => {}} />
                    <label
                        onClick={() => onTab(tab)}
                        className='transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
                        {tab}
                    </label>
                </div>
            ))}
        </div>
    )
}
