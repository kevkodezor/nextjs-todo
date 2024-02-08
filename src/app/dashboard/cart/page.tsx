import { cookies } from 'next/headers'
import { ShoppingCard } from '@/list'
import { products, type Product } from '@/list/products/data/products'

export const metadata = {
    title: 'Shopping Car'
}

interface ProductCart {
    product: Product;
    quantity: number;
}

const getProductCart = (cart: {[id:string]:number}) => {
    const productsCart: ProductCart[] = [];

    for (const id of Object.keys(cart)) {
        const productAdded = products.find(prod => prod.id === id);
        if (productAdded) {
            productsCart.push({ product: productAdded, quantity: cart[id] });
        }
    }
    return productsCart;
}

export default function CartPage () {

    const cookiesStore = cookies();
    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as {[id:string]:number};
    const productsCart = getProductCart(cart);

    return (
        <div>
            <h1 className='text-5xl'>Your Products</h1>
            <hr className='mb-2' />

            <div className='flex flex-col sm:flex-row gap-2 w-full'>
                <div className='flex flex-col gap-2 w-full sm:w-8/12'>
                    {productsCart.map(({ product, quantity }) => (
                        <ShoppingCard key={product.id} product={product} quantity={quantity} />
                    ))}
                        
                </div>
            </div>
        </div>
    )
}