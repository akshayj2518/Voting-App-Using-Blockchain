# BallotBlock : Voting-App-Using-Blockchain
Full Stack decentralized voting application that is secured by blockchain.

### Introduction
This is a decentralized voting application which can be used for safe and secure voting systems which can prevent manipulation
as the smart contract which is deployed on the blockchain is Immutable once deployed.
In this project Smart Contract is developed using Solidity language and build and migrated using truffle framework with Ganache used as a local blockchain network.
Client Side application is developed using Html, Css and Javascript with metamask used to connect client side to communicate with the smart contract.

### Technologies Used
- Truffle Framework v5.0.2
- Ganache
- Solidity
- Metamask Ethereum Wallet
- Mocha test framework
- Chai Assertion Library
- HTML, CSS, JS

### Why do we need this?
- Secure and anonymous votes, which can be verified at any moment
- Impossibility to vote twice or to commit electoral fraud
- Low operational cost, manual control is not required
- Voting can be done from home, no need to visiting polling booth.
- Every vote transaction is verified by everyone on the node. 

### Some disadvantages
- Smart Contract deployed is immutable, 
so one needs to consider every circumstance before deploying the smart contract.
 It takes time to process a new transaction depending upon how many systems are hashing.
 
 ### To Run
 - Clone the repo.
 - Install trufflev5.0.2, ganache and node.
 - Run npm install to download dependencies.
 - run npm build
 - run npm migrate --reset
 - run npm run dev



Credits : @dappuniversity
