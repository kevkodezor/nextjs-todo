import Image from 'next/image';
import { RatingStart } from '@/components';
import { ButtonsActions } from './buttons-actions';

interface Props {
    id: string;
    name: string;
    price: number;
    rating: number;
    image: string;
}

export const ProductsList = ({ id, name, price, rating, image}:Props) => {
    return (
        <div className='bg-white shadow rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-100'>

            <div className='p-2'>
                <Image
                    width={500}
                    height={500}
                    className='rounded'
                    src={image}
                    alt='product image' />
            </div>

            <div className='px-5 pb-5'>
                <a href='#'>
                    <h3 className='text-gray-900 font-semibold text-xl tracking-tight dark:text-white'>
                        {name}
                    </h3>
                </a>

                <div className='flex items-center mt-2.5 mb-5'>
                    {Array(rating).fill(0).map((x, i) => (
                        <RatingStart key={i} />
                    ))}
                    <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>
                        {rating.toFixed(2)}
                    </span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='text-3xl font-bold text-gray-900 dark:text-white'>{`$${price}`}</span>
                    <ButtonsActions id={id} />
                </div>
            </div>
        </div>
    );
}