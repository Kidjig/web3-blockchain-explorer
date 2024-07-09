
const ERC20_ABI = [
    // Only include the necessary methods
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"name": "", "type": "string"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"name": "", "type": "uint256"}],
        "type": "function"
    }
];

const ERC721_ABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "tokensOfOwner",
        "outputs": [{"name": "", "type": "uint256[]"}],
        "type": "function"
    }
];

const express = require('express');
   const Web3 = require('web3');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   // Initialize Web3 connection using Alchemy
   const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ALCHEMY_API_URL));

   // Define an endpoint to fetch blockchain data
   app.get('/api/balance', async (req, res) => {
       const { address } = req.query;
       try {
           const balance = await web3.eth.getBalance(address);
           res.json({ balance: web3.utils.fromWei(balance, 'ether') });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   });

   // Endpoint to fetch token details
app.get('/api/token/:address', async (req, res) => {
    const { address } = req.params;
    const tokenContract = new web3.eth.Contract(ERC20_ABI, address);
    
    try {
        const name = await tokenContract.methods.name().call();
        const symbol = await tokenContract.methods.symbol().call();
        const totalSupply = await tokenContract.methods.totalSupply().call();
        
        res.json({
            name,
            symbol,
            totalSupply: web3.utils.fromWei(totalSupply, 'ether')
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/nfts/:address', async (req, res) => {
    const { address } = req.params;
    const nftContract = new web3.eth.Contract(ERC721_ABI, address);
    
    try {
        const tokenIds = await nftContract.methods.tokensOfOwner(req.query.owner).call();
        res.json({ tokenIds });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

   // Start the server
   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
   });