pragma solidity ^0.4.4;
contract MultiSigHealthWallet {


  mapping (uint => Transaction) public m_txs;
  uint public m_txCount;
  address[] public owners;
  uint public threshold;
  uint public  m_confirmations;

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
    m_confirmations = m_confirmations + 1;
    execute(txID); // start execution 1
  }

  function isConfirmed() returns (bool)
  {
    if (m_confirmations <= 1) {
      return true;
    }
  }

  function execute(uint txID) {
    if (isConfirmed())
    {
      Transaction t = m_txs[txID];
      t.executed = true;
      m_confirmations = 0; //reset this global for the time being
      Approved("ipfs-link of data");
    }
  }
}
