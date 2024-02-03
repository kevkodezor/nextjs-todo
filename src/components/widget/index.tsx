import React from 'react'

interface Props {
    title: string;
    total: number;
}

export const Widget = ({ title = 'All todos', total }: Props) => {
  return (
      <div className='md:col-span-2 lg:col-span-1' >
          <div className='h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white'>
              <div>
                  <h5 className='text-xl text-gray-600 text-center'>{title}</h5>
                  <div className='mt-2 flex justify-center gap-4'>
                      <h3 className='text-3xl font-bold text-gray-700'>{total}</h3>
                  </div>
                  <span className='block text-center text-gray-500'>Number of todos</span> 
              </div>
          </div>
      </div>
  )
}
