# 💻 Single Page Minter

## **What is Single Page Minter ?**

Single Page Minter is a lightweight frontend NFT minting solution that uses [Web3.js](https://github.com/ChainSafe/web3.js) & Component based framework [Chakra UI](https://chakra-ui.com/)

# Screenshot

![screenshot of the minter](https://i.imgur.com/a8v8oaP.png)

# Installation

1. Clone the repo

   ```sh
   git clone https://github.com/HC3R3SOL/ethmintingsite
   ```

2. Change directory to the project folder

   ```sh
   cd ethmintingsite
   ```

3. Edit the `CONTRACT_ADDRESS` in `ReCaptach.js` and add your contract address.

   ```sh
   CONTRACT_ADDRESS = "Your contract Address";
   ```

4. Edit the `MintingContract` file & add your `abi` data

   ```sh
   {
   "abi": ["Here your abi data"]
   }
   ```

5. Edit the `ReCaptach.js ` for minting timer variable `difference` && `difference0` for setdate and time for WL and Public Mint

6. Edit the ` Setting.js` for `headerText` Collection Name , `collectionDescription` Collection Description and label which lies in `App.js ` && Also Edit `ReCaptach.js` for `"mintText"` for Whitelist mint description && Public Mint description

7. Run the app locally

   ```sh
   yarn start
   ```

# Features

## Current features

- Single page
- Multi-collection / contract support
- Multi-chain support (Dev & mainnet)
- Responsive mobile design ([Chakra UI](https://chakra-ui.com/))
- Light & Dark Modes
- Showcases random tokens (When enabled)

# Smart contract

The smart contract is current hosted on the [Ropsten Testnet Network
](https://ropsten.etherscan.io/address/0x77C9e7733550026AcE28950e973681C0F74191E3) and uses the [OpenZeppelin Library](https://docs.openzeppelin.com/contracts)

Contract address:

```sh
example

 0x77C9e7733550026AcE28950e973681C0F74191E3
```

# Disclaimer

This project is a fully functional prototype made for practice/educational purposes.
