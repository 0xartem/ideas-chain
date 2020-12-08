// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "./helpers/Owned.sol";

contract ContractManager is Owned {

  mapping (string => address) addresses;

  function setAddress(string memory _name, address _address) public /*onlyOwner*/ {
    addresses[_name] = _address;
  }

  function getAddress(string memory _name) public view /*onlyOwner*/ returns (address) {
    return addresses[_name];
  }

  function deleteAddress(string memory _name) public /*onlyOwner*/ {
    addresses[_name] = address(0);
  }
}