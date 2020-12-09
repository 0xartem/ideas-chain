// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "../helpers/BaseController.sol";
import "../ContractManager.sol";
import "./IdeaStorage.sol";
import "../users/UserStorage.sol";

contract IdeaController is BaseController {

  function createIdea(string memory _text) public returns (uint) {
    ContractManager _contractManager = ContractManager(managerAddress);

    address _userStorageAddress = _contractManager.getAddress("UserStorage");
    UserStorage _userStorage = UserStorage(_userStorageAddress);
    uint _userId = _userStorage.addresses(msg.sender);
    require(_userId != 0);

    address _storageAddress = _contractManager.getAddress("IdeaStorage");
    IdeaStorage _ideaStorage = IdeaStorage(_storageAddress);
    return _ideaStorage.createIdea(_userId, _text);
  }
}