import React, { FC } from 'react'
import MenuDropdown from './MenuDropdown';
import Wallet from './Wallet';
import {Link} from 'react-router-dom'

const Header: FC = () => {


    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to={`/`} className="btn btn-ghost normal-case text-xl">Smart Contract</Link>
            </div>
            <div className="flex-none">
                <Wallet />
                <MenuDropdown />
            </div>
        </div>
    )
}

export default Header