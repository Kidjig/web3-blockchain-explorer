import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import WalletPage from './pages/WalletPage';
import TokenPage from './pages/TokenPage';
import NFTPage from './pages/NFTPage';
import './index.css'; // Make sure this imports Tailwind CSS

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto px-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/tokens" element={<TokenPage />} />
                    <Route path="/nfts" element={<NFTPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;