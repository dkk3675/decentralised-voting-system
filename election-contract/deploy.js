const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const contract = require("./compile");
require('dotenv');
// console.log(interface)

const provider = new HDWalletProvider(
  process.env.PERSONAL_KEY,
  process.env.INFURA_API_KEY
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(contract.interface))
    .deploy({ data: contract.bytecode })
    .send({ gas: "5000000", from: accounts[0] });

  // console.log(result);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
