# Blockchain Data Fetcher

This project is a simple server application that interacts with the Ethereum blockchain to fetch various types of data, such as account balances and token details. The server is built using Node.js and Express, and it leverages the Web3.js library to communicate with the blockchain via the Alchemy API.

## Features

- **Fetch Account Balance**: Retrieve the Ether balance of a specified Ethereum address.
- **Fetch ERC-20 Token Details**: Get details like name, symbol, and total supply of an ERC-20 token.
- **Fetch ERC-721 Token IDs**: Retrieve the list of token IDs owned by a specified address for an ERC-721 token.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Alchemy API Key

## Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `server` directory with the following content:
   ```env
   ALCHEMY_API_URL=https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY
   PORT=3001
   ```

4. Start the application:
   ```sh
   npm start
   ```

## API Endpoints

### Fetch Account Balance

- **URL**: `/api/balance`
- **Method**: `GET`
- **Query Parameters**: 
  - `address` (string): Ethereum address to fetch the balance for.
- **Response**:
  ```json
  {
    "balance": "0.123456789"
  }
  ```

### Fetch ERC-20 Token Details

- **URL**: `/api/token/:address`
- **Method**: `GET`
- **URL Parameters**: 
  - `address` (string): Contract address of the ERC-20 token.
- **Response**:
  ```json
  {
    "name": "TokenName",
    "symbol": "TKN",
    "totalSupply": "1000000"
  }
  ```

### Fetch ERC-721 Token IDs

- **URL**: `/api/nfts/:address`
- **Method**: `GET`
- **URL Parameters**: 
  - `address` (string): Contract address of the ERC-721 token.
- **Query Parameters**: 
  - `owner` (string): Ethereum address of the token owner.
- **Response**:
  ```json
  {
    "tokenIds": ["1", "2", "3"]
  }
  ```

## License

This project is open source. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Alchemy](https://www.alchemy.com/) for providing the blockchain API.
- [Web3.js](https://github.com/ChainSafe/web3.js) for the Ethereum JavaScript API.
- [Express](https://expressjs.com/) for the web framework.
