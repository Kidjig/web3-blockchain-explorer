import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <ul className="flex space-x-4">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/wallet">Wallet Info</Link></li>
                <li><Link to="/tokens">Token Info</Link></li>
                <li><Link to="/nfts">NFT Info</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;