import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TokenDetailsProps {
    address: string;
}

interface TokenDetails {
    name: string;
    symbol: string;
    totalSupply: string;
    decimals?: number;
    owner?: string;
}

const TokenDetailsDisplay: React.FC<TokenDetailsProps> = ({ address }) => {
    const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTokenDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:3001/api/token/${address}`);
                setTokenDetails(response.data);
            } catch (error) {
                console.error('Error fetching token details:', error);
                setError('Failed to fetch token details');
            }
            setIsLoading(false);
        };

        fetchTokenDetails();
    }, [address]);

    if (isLoading) return <div className="text-center text-white">Loading token details...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!tokenDetails) return <div className="text-center text-white">No token details available.</div>;

    const detailItems = [
        { label: 'Name', value: tokenDetails.name, tooltip: 'The official name of the token.' },
        { label: 'Symbol', value: tokenDetails.symbol, tooltip: 'The abbreviated symbol used to represent the token on exchanges and wallets.' },
        { label: 'Total Supply', value: tokenDetails.totalSupply, tooltip: 'The total number of tokens in existence.' },
        { label: 'Decimals', value: tokenDetails.decimals?.toString() || 'N/A', tooltip: 'The number of decimal places the token can be divided into.' },
        { label: 'Owner', value: tokenDetails.owner || 'N/A', tooltip: 'The address of the entity that deployed the token contract.' }
    ];

    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Token Details</h2>
            {detailItems.map((item, index) => (
                <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-center">
                        <span className="text-gray-400 mr-2">{item.label}:</span>
                        <span className="font-semibold">{item.value}</span>
                        <div className="relative ml-2 group">
                            <span className="cursor-help text-gray-400 hover:text-gray-300">ⓘ</span>
                            <div className="absolute hidden group-hover:block bg-black text-white text-sm rounded p-2 -mt-2 ml-2 w-64 z-10">
                                {item.tooltip}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TokenDetailsDisplay;