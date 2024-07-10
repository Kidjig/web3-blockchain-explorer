import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WalletInfo {
    balance: string;
}

const BalanceDisplay: React.FC<{ address: string }> = ({ address }) => {
    const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ethPrice, setEthPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchWalletInfo = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [balanceResponse, priceResponse] = await Promise.all([
                    axios.get(`http://localhost:3001/api/balance?address=${address}`),
                    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
                ]);
                setWalletInfo({ balance: balanceResponse.data.balance });
                setEthPrice(priceResponse.data.ethereum.usd);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch wallet information');
            }
            setIsLoading(false);
        };

        fetchWalletInfo();
    }, [address]);

    if (isLoading) return <div className="text-center text-white">Loading wallet information...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!walletInfo) return <div className="text-center text-white">No wallet information available.</div>;

    const balanceInEth = parseFloat(walletInfo.balance);
    const balanceInUsd = ethPrice ? (balanceInEth * ethPrice).toFixed(2) : 'N/A';

    return (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Wallet Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Address" value={address} />
                <InfoItem label="Balance" value={`${balanceInEth.toFixed(4)} ETH`} />
                <InfoItem label="Balance in USD" value={`$${balanceInUsd}`} />
                <InfoItem label="ETH Price" value={ethPrice ? `$${ethPrice.toFixed(2)}` : 'N/A'} />
            </div>
            <div className="mt-6 flex space-x-4">
                <a 
                    href={`https://etherscan.io/address/${address}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                    View on Etherscan
                </a>
                <a 
                    href={`https://ethplorer.io/address/${address}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                    View on Ethplorer
                </a>
            </div>
        </div>
    );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="mb-2">
        <span className="text-gray-400">{label}:</span>
        <span className="ml-2 font-semibold">{value}</span>
    </div>
);

export default BalanceDisplay;