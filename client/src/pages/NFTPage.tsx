import React, { useState } from 'react';
import AddressInput from '../components/AddressInput';
import NFTGallery from '../components/NFTGallery';

const NFTPage: React.FC = () => {
    const [nftAddress, setNftAddress] = useState('');

    const handleAddressSubmit = (newAddress: string) => {
        setNftAddress(newAddress);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center animate-pulse">
                    NFT Collection Explorer
                </h1>
                
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Enter NFT Contract Address</h2>
                    <AddressInput onSubmit={handleAddressSubmit} />
                </div>

                {nftAddress ? (
                    <NFTGallery address={nftAddress} />
                ) : (
                    <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
                        <p className="text-xl">Enter an NFT contract address to view the collection.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NFTPage;