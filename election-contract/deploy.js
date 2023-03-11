const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const contract = require("./compile");
// console.log(interface)

const provider = new HDWalletProvider(
  "genre snake large cloth rare basic confirm tiger bread unable police pill",
  "https://goerli.infura.io/v3/68bef7a42aaa4bd88ccb0fd4065ca789"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(contract.interface))
    .deploy({ data: contract.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  // console.log(result);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
