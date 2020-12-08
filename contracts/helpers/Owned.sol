// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

contract Owned {
  
  address public ownerAddress;

  constructor() {
    ownerAddress = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == ownerAddress);
    _;
  }

  function transferOwnership(address _newOwner) public onlyOwner {
    require(_newOwner != address(0));
    ownerAddress = _newOwner;
  }
}