import React, { FC } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { Link } from 'react-router-dom'
const HomePage: FC = () => {

    const { data, isFetching } = useProducts()


    return (
        <div className='flex justify-center p-5'>
            <div className="flex flex-col justify-center items-center">
                {
                    isFetching && (
                        <div className="alert justify-center items-center shadow-lg mb-5">
                            <span className='text-center'>Loading...</span>
                        </div>)
                }
                <div className='gap-8 md:columns-3 sm:columns-2 xs:columns-1'>
                    {
                        data && data.products.map(({ title, thumbnail, price, description, id }, index) => (
                            <Link key={index} to={`/product/${id}`}>
                                <div className='shadow-lg bg-white rounded-xl w-80 p-3 mb-6'>
                                    <img className='bg-gray-300 rounded-lg w-full' src={thumbnail} />
                                    <h3 className='font-bold text-sm mt-3 mb-2'>{title}</h3>
                                    <p className='text-gray-500 text-opacity-80 text-xs'>{description}</p>
                                    <div className="flex-row">
                                        <button className='btn btn-outline rounded-lg mt-3 self-center'>
                                            R{price}
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage