// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "./Owned.sol";

contract BaseStorage is Owned {

  address public controllerAddress;

  function setControllerAddress(address _controllerAddress) public onlyOwner {
    controllerAddress = _controllerAddress;
  }

  modifier onlyController() {
    require(msg.sender == controllerAddress);
    _;
  }
}