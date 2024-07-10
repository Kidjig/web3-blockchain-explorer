import React, { useState } from 'react';
import AddressInput from '../components/AddressInput';
import TokenDetailsDisplay from '../components/TokenDetailsDisplay';

const TokenPage: React.FC = () => {
    const [tokenAddress, setTokenAddress] = useState('');

    const handleAddressSubmit = (newAddress: string) => {
        setTokenAddress(newAddress);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center animate-pulse">
                    Token Explorer
                </h1>
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Enter Token Address</h2>
                    <AddressInput 
                        onSubmit={handleAddressSubmit} 
                        placeholder="Enter Token Contract Address"
                        buttonText="Explore Token"
                    />
                </div>
                {tokenAddress && <TokenDetailsDisplay address={tokenAddress} />}
            </div>
        </div>
    );
};

export default TokenPage;