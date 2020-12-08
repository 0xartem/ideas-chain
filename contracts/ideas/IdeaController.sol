// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "../helpers/BaseController.sol";
import "../ContractManager.sol";
import "./IdeaStorage.sol";

contract IdeaController is BaseController {

  function createIdea(uint _userId, string memory _text) public returns (uint) {
    ContractManager _contractManager = ContractManager(managerAddress);
    address _storageAddress = _contractManager.getAddress("IdeaStorage");
    IdeaStorage _ideaStorage = IdeaStorage(_storageAddress);
    return _ideaStorage.createIdea(_userId, _text);
  }
}