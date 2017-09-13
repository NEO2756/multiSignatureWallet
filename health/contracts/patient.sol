pragma solidity ^0.4.0;
contract patient
{
    string public p  = "my Prescription data";
    // Here we can have ipfs links in future

    function senddata()  returns (string)
    {
        return p;
    }

    //fallback function
    function ()
    {

    }
}
