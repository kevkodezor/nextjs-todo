'use client'
import { useRouter } from 'next/navigation';
import { IoAddCircleOutline, IoTrashOutline } from 'react-icons/io5'
import { addProductCart } from '@/actions';

interface Props {
    id: string;
    price: number;
}

export const ButtonsActions = ({ id, price }:Props) => {

    const router = useRouter();

    const onAdd = () => {
        addProductCart(id);
        router.refresh();
    }

  return (
      <div className='flex items-center justify-between'>
          <span className='text-3xl font-bold text-gray-900 dark:text-white'>{`$${price}`}</span>

          <div className='flex'>
              <button
                  onClick={onAdd}
                  className='text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  <IoAddCircleOutline size={25} />
              </button>
              <button
                  className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
                  <IoTrashOutline size={20} />
              </button>
          </div>

      </div>
  )
}
