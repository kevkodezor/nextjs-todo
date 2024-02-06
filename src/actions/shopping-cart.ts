import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCart = ():{[id:string]:number} => {
    if (hasCookie('cart')) {
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');
        return cookieCart;
    }
    return {};
}

export const addProductCart = (id:string) => {
    const cookieCart = getCart();

    if (cookieCart[id]) {
        cookieCart[id] = cookieCart[id]+1;
    } else {
        cookieCart[id] = 1;
    }
    setCookie('cart', JSON.stringify(cookieCart));
}