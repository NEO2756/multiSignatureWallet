pragma solidity ^0.4.4;
contract MultiSigHealthWallet {


  mapping (uint => Transaction) public m_txs;
  // confirmations[transaction id][address of owners] = true or false
  mapping (uint => mapping (address => bool)) public confirmations;
  uint public m_txCount;
  address[] public owners;
  uint public threshold;

  struct Transaction {
      address destination;
      uint value;
      bytes data;
      bool executed;
  }

  event NewTransaction (uint txID); // Send notification to the owners for transaction approval.
  event Confirmation(address add, uint txID); //This address (owner) has confirmed the transaction.
  event Approved(string result);

   modifier ownerExists(address a)
   {
     if (owners[0] != a) throw;
     _;
   }
   // Add validators and Min. number of approval required for any transaction to execute
  function MultiSigHealthWallet(address[] _owners, uint _threshold) {
    owners = _owners;
    threshold = _threshold;
  }

  function addTransaction(address dest, uint256 value, bytes data) returns (uint txID) {
    txID = m_txCount;
    m_txs[txID] = Transaction({destination:dest, value:value, data:data, executed:false});
    m_txCount = m_txCount + 1;
    NewTransaction(txID);
  }

   //dest : address of Doctor's or Pharmacist smart contract
   //value: if medical research want some data, they can quote price in value here
   //data : any other raw data
  function MakeTransaction(address dest, uint256 value, bytes data) public returns (uint txID) {
    txID = addTransaction(dest, value, data);
    ConfirmTransaction(txID);
  }

  function ConfirmTransaction(uint txID) ownerExists(msg.sender) {
    Confirmation(msg.sender, txID);  //Send notifications to all the owners that a transaction has been submitted, pls take actions
    confirmations[txID][msg.sender] = true;
    execute(txID);
  }

  function isConfirmed(uint txID) internal returns (bool)
  {
    uint count= 0;
    for (uint i = 0; i < owners.length; i++)
    {
      if (confirmations[txID][owners[i]]) count ++;
      if (count == threshold) return true;
    }
    return false;
  }

  function execute(uint txID) {
    if (isConfirmed(txID))
    {
      Transaction t = m_txs[txID];
      t.executed = true;
      Approved("ipfs-link of data");
    }
  }
}
