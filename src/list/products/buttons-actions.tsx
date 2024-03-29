'use client'
import { useRouter } from 'next/navigation';
import { IoAddCircleOutline, IoTrashOutline } from 'react-icons/io5'
import { addProductCart, removeProductCart } from '@/actions';

interface Props { id: string }

export const ButtonsActions = ({ id }:Props) => {

    const router = useRouter();

    const onAdd = () => {
        addProductCart(id);
        router.refresh();
    }

    const onRemove = () => {
        removeProductCart(id);
        router.refresh();
    }

  return (
        <div className='flex'>
            <button
                onClick={onAdd}
                className='text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                <IoAddCircleOutline size={25} />
            </button>
            <button
                onClick={onRemove}
                className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
                <IoTrashOutline size={20} />
            </button>
        </div>
  )
}
