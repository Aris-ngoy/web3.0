import React, { FC, useContext, useState } from 'react'
import { FiShoppingBag } from 'react-icons/fi'
import { BiWallet } from 'react-icons/bi'

import { walletAtom } from '../../context/atom/TransactionAtom';
import { useRecoilValue } from 'recoil';
import { TransactionContext } from '../../context/TransactionProvider';

const Wallet: FC = () => {

    const wallet = useRecoilValue(walletAtom)
    const { connectWallet , IsLoading } = useContext(TransactionContext)

    const [isOpen, setisOpen] = useState(false)

    const onClickItem = () => {
        setisOpen(!isOpen)
    }


    return (
        <div className="dropdown dropdown-end mx-2 relative">

            {
                wallet ? (
                    <>
                        <button className={ !IsLoading ? "btn btn-ghost" : "btn btn-ghost loading"}>
                            {
                                IsLoading && (
                                    <span className='normal-case text-primary mx-3'>Please wait...</span>
                                )
                            }
                            <FiShoppingBag className={ IsLoading ? "text-primary" : ""} size={20} />
                        </button>

                        {/* <label onClick={onClickItem} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <FiShoppingBag size={20} />
                                <span className="badge badge-sm indicator-item">0</span>
                            </div>
                        </label> */}
                        {
                            // isOpen && (
                            //     <div className="right-0 absolute mt-3 card card-compact w-52 bg-base-100 shadow">
                            //         <div className="card-body">
                            //             <span className="font-bold text-lg">1 Item</span>
                            //             <span className="text-info">Subtotal: E0.0001</span>
                            //             <div className="card-actions">
                            //                 <button onClick={onClickWallet} className={ !IsLoading ? "btn btn-primary btn-block" : "btn btn-primary btn-block loading"}>View cart</button>
                            //             </div>
                            //         </div>
                            //     </div>
                            // )
                        }
                    </>
                ) : (
                    <button onClick={connectWallet} className="btn gap-2 btn-sm px-5 text-xs">
                        Connect to wallet
                        <BiWallet />
                    </button>
                )
            }
        </div>
    )
}

export default Wallet;