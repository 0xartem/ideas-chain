// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "truffle/Assert.sol";
import "../../contracts/ideas/IdeaStorage.sol";

contract TestIdeaStorage {

  IdeaStorage ideaStorage = new IdeaStorage();

  constructor() {
    ideaStorage = new IdeaStorage();
    ideaStorage.setControllerAddress(address(this));
  }

  function testCreateIdea() public {
    uint _userId = 1;
    uint _expectedIdeaId = 1;

    Assert.equal(ideaStorage.createIdea(_userId, "My super cool idea"), _expectedIdeaId, "Should create and idea with ID 1");
  }
}