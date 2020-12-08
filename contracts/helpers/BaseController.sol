// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "./Owned.sol";

contract BaseController is Owned {

  address managerAddress;

  function setManagerAddress(address _managerAddress) public onlyOwner {
    managerAddress = _managerAddress;
  }
}