import abi from './Transactions.json';

export const contractABI = abi.abi;
//replace this with your own metamask address
export const contractAddress : string = "0xd91ff229d32392DF1cC504C974D4C250De333348"

export enum API_KEY{
    GET_PRODUCTS = 'GET_PRODUCTS',
    GET_PRODUCT = 'GET_PRODUCT'
}


export const formatAddress = (address : string) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;