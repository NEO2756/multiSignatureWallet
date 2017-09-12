var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var MultiSigHealthWallet = artifacts.require("./MultiSigHealthWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(MultiSigHealthWallet, ["0xff7f19501d30171b1e7f9922c4b51c5c9ca9ee22"], 1);
};
