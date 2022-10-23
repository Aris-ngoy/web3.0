import React, { FC, useRef, useState } from 'react'
import {
    Link
} from "react-router-dom";

const MenuDropdown : FC = () => {

   const [isOpen, setisOpen] = useState(false)

    const onClickItem = () => {
        setisOpen(!isOpen)
    }

    return(
        <div className="dropdown dropdown-end relative">
            <label onClick={onClickItem} className="btn btn-ghost btn-circle avatar">
                {/* <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/80/80/people" />
                </div> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            {
                isOpen && (
                    <ul className={"right-0 z-50 shadow-xl menu menu-compact absolute mt-3 p-2 shadow bg-base-100 rounded-box w-52"}>
                        {/* <li><a>Settings</a></li>
                        <li><a>Logout</a></li> */}
                        <li><Link onClick={onClickItem} to="transactions">Transactions</Link></li>
                        <li><a>Login</a></li>
                    </ul>
                )
            }
        </div>
    )
}
export default MenuDropdown;