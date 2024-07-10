import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface NFTGalleryProps {
    address: string;
}

interface NFT {
    id: string;
    name: string;
    image: string;
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ address }) => {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNFTs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Replace this with your actual API endpoint
                const response = await axios.get(`https://api.example.com/nfts?address=${address}`);
                setNfts(response.data);
            } catch (error) {
                setError('Failed to fetch NFTs');
                console.error('Error fetching NFTs:', error);
            }
            setIsLoading(false);
        };

        fetchNFTs();
    }, [address]);

    if (isLoading) return <div className="text-center">Loading NFTs...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nfts.map((nft) => (
                <div key={nft.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold truncate">{nft.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NFTGallery;