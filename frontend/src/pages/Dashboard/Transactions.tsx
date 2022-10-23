import React, { FC, useContext } from 'react'
import { TransactionContext } from '../../context/TransactionProvider'
import {Link} from 'react-router-dom'
import { formatAddress } from '../../utils/constants'
const TransactionsPage: FC = () => {

    const { transactions } = useContext(TransactionContext)

    return (
        <div className='flex w-10/12 m-auto mt-5'>
            <div className="overflow-x-auto w-full">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Time</th>
                            <th>Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map(({ title, timestamp, sender, receiver, amount, productUID }, index)=>(
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{title}</td>
                                    <td>ETH {amount}</td>
                                    <td>
                                        <a href={`https://goerli.etherscan.io/address/${sender}`} target="_blank" rel="noreferrer">{formatAddress(sender)}</a>
                                    </td>
                                    <td>
                                        <a href={`https://goerli.etherscan.io/address/${receiver}`} target="_blank" rel="noreferrer">{formatAddress(receiver)}</a>
                                    </td>
                                    <td className='text-xs'>{timestamp}</td>
                                    <td><Link to={`/product/${productUID}`}>View</Link></td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransactionsPage