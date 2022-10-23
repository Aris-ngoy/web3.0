import { IProduct } from './../../interface/IProduct';
import { atom } from 'recoil';

export const walletAtom = atom<string | null>({
    key : '_transaction_',
    default : null
});


export const cartAtom = atom<IProduct[]>({
    key : '_cart_',
    default : []
});
