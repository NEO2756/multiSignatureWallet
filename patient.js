
var Web3 = require('web3');
// set your web3 object
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var walletString = '[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"owners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"txID","type":"uint256"}],"name":"ConfirmTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"m_confirmations","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"threshold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"m_txs","outputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"},{"name":"executed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"m_txCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"isConfirmed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dest","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"addTransaction","outputs":[{"name":"txID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dest","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"MakeTransaction","outputs":[{"name":"txID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"txID","type":"uint256"}],"name":"execute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owners","type":"address[]"},{"name":"_threshold","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"txID","type":"uint256"}],"name":"NewTransaction","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"add","type":"address"},{"indexed":false,"name":"txID","type":"uint256"}],"name":"Confirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"string"}],"name":"Approved","type":"event"}]';
var walletABI = JSON.parse(walletString);
var multiSigAddress = "0xff7f19501d30171b1e7f9922c4b51c5c9ca9ee22";
var walletContract = web3.eth.contract(walletABI).at(multiSigAddress);

var patientString = '[{"constant":false,"inputs":[{"name":"ipfsHash","type":"bytes32"}],"name":"storeEMRData","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfsHash","type":"bytes32"}],"name":"storePrescriptionData","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfsHash","type":"bytes32"}],"name":"storeGearData","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getPrescriptionData","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]';
var patientABI = JSON.parse(patientString);
var patientAddr = '';
var patientContract = web3.eth.contract(patientABI).at(patientAddr);


console.log(web3.version.api);
console.log(web3.isConnected());
console.log(web3.version.node);



 //I have preloaded the sample files on ipfs server, so we can directly store the
 // links directly.
 //QmY9Si4SRHyTssMXN74P2SJLqDEKt1kazbhzpfuVNPA3EY   hash of prescription.gif
 //QmUhQKQ7qzpZaeeT5apEjhuyNNBfAcGpkXxStfTcLsryhc   hash of EMR.gif
 //QmUhQKQ7qzpZaeeT5apEjhuyNNBfAcGpkXxStfTcLsryhc   hash of gear.jpg


  //store data prescription data.
patientContract.storePrescriptionData.sendTransaction("QmY9Si4SRHyTssMXN74P2SJLqDEKt1kazbhzpfuVNPA3EY", from : web3.eth.accounts[0], gas: 2100000);

var event = walletContract.NewTransaction({}, function (error, result) {
  if (!error) {
    console.log(result);
    console.log("New Transaction pending for your approval, Enter yes or no");
    // write logic for yes and no, for me its always yes :)
    walletContract.execute.call(result.args.txID);
  }
  else console.log("Failed NewTransaction event");
});
