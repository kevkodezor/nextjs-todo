import { ProductsList } from '@/list';

export const metadata = {
    title: 'Products'
}

export default function Products () {
  return (
    <div className='flex flex-col gap-2'>
        <ProductsList />
    </div>
  )
}