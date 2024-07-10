import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-pulse">
                    Blockchain Explorer
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                    Dive into the world of blockchain data with ease and precision
                </p>
                <div className="flex justify-center space-x-4">
                    <Link to="/wallet" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                        Explore Wallets
                    </Link>
                    <Link to="/tokens" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                        Discover Tokens
                    </Link>
                    <Link to="/nfts" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                        Browse NFTs
                    </Link>
                </div>
            </div>

            {/* Feature Boxes */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureBox
                        title="Wallet Analysis"
                        description="Explore wallet balances, transaction history, and more."
                        icon="💼"
                        link="/wallet"
                    />
                    <FeatureBox
                        title="Token Insights"
                        description="Discover detailed information about various tokens and their performance."
                        icon="🪙"
                        link="/tokens"
                    />
                    <FeatureBox
                        title="NFT Collections"
                        description="Browse and analyze unique NFT collections across different blockchains."
                        icon="🖼️"
                        link="/nfts"
                    />
                </div>
            </div>
        </div>
    );
};

interface FeatureBoxProps {
    title: string;
    description: string;
    icon: string;
    link: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ title, description, icon, link }) => {
    return (
        <Link to={link} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-300">{description}</p>
        </Link>
    );
};

export default HomePage;