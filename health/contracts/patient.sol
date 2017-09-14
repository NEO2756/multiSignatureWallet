pragma solidity ^0.4.0;
contract patient
{
      address owner;
      bytes32 private prescriptionHash;
      bytes32 private gearHash;
      bytes32 private EMRhash;

    function patient()
    {
      owner = msg.sender;
    }

    function storePrescriptionData(bytes32 ipfsHash) returns (bool) {
         prescriptionHash = ipfsHash;
    }
    function storeGearData(bytes32 ipfsHash)  returns (bool) {
         gearHash = ipfsHash;
    }

    function storeEMRData(bytes32 ipfsHash)  returns (bool) {
         EMRhash = ipfsHash;
    }

    function getPrescriptionData() returns (bytes32)
    {
        return prescriptionHash;
    }

}
