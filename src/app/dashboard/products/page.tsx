import { ProductsList } from '@/list';
import { products } from '@/list/products/data/products';

export const metadata = {
    title: 'Products'
}

export default function Products () {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {products.map(product => (
        <ProductsList key={product.id} {...product} />
      ))}
    </div>
  )
}