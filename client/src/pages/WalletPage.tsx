import React, { useState } from 'react';
import AddressInput from '../components/AddressInput';
import BalanceDisplay from '../components/BalanceDisplay';

const WalletPage: React.FC = () => {
    const [address, setAddress] = useState('');

    const handleAddressSubmit = (newAddress: string) => {
        setAddress(newAddress);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white p-8">
            <div className="max-w-4xl mx-auto"> {/* Increased max-width for more space */}
                <h1 className="text-4xl font-bold mb-8 text-center animate-pulse">
                    Ethereum Wallet Explorer
                </h1>
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Enter Wallet Address</h2>
                    <AddressInput 
                        onSubmit={handleAddressSubmit} 
                        placeholder="Enter Ethereum Wallet Address"
                        buttonText="Explore Wallet"
                    />
                </div>
                {address && <BalanceDisplay address={address} />}
            </div>
        </div>
    );
};

export default WalletPage;