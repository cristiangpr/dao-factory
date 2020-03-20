require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.ACCOUNT_MNEMONIC;
const network = process.env.RINKEBY_ENDPOINT;

module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
    rinkeby: {
           provider: () => new HDWalletProvider(
              mnemonic, network
            ),
            networkId: 4,
            gasPrice: 10e9
          }
  },
};
