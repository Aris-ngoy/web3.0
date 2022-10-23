import React, { FC, useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartAtom } from '../../context/atom/TransactionAtom';
import { TransactionContext } from '../../context/TransactionProvider';
import { useProduct } from '../../hooks/useProducts';
import { ITransaction } from '../../interface/ITransaction';


const ProductPage: FC = () => {
    const [carts,setCarts] = useRecoilState(cartAtom)
    const { id } = useParams();
    const { data, isFetching } = useProduct(id)

    const { onPurchase , IsLoading } = useContext(TransactionContext)


   const generateAmount = useCallback(
      () => {
        if(data){
            return data.price * 0.000001
        }else{
            return 0.000001
        }
      },[])
    
    const addToCart = () =>{
        if(data){
            setCarts([...carts, data])
        }
    }

    const onBuy = async () =>{
        try {
            if(data){
                const item : ITransaction = {
                    productUID : data?.id.toString(),
                    amount : generateAmount(),
                    title : data?.title
                }
                await onPurchase(item)
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className='w-8/12 p-5 m-auto'>
            {
                data && (
                    <div className='gap-8 columns-2'>
                        <div className="stack">
                            {
                                data.images.map((image, index) => (
                                    <img key={index} src={image} alt={"image " + index} className="rounded" />
                                ))
                            }
                        </div>
                        <div className='py-5'>
                            <h1 className='font-bold text-base text-gray-600'>{data.description}</h1>
                            <div className='flex flex-row justify-between items-center my-2 rounded-lg px-3 py-2'>
                                <h1 className='font-bold text-xl'>ETH {generateAmount()}</h1>
                            </div>
                            <div className='flex'/>
                            <div className='flex flex-row items-center'>
                                <button onClick={onBuy} className={IsLoading ? 'btn btn-wide loading' : "btn btn-wide"}>
                                    buy
                                </button>
                                {/* <button onClick={addToCart} className='mx-3 btn btn-sm btn-outline'>
                                    Add to cart
                                </button> */}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductPage