// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "../helpers/BaseStorage.sol";

contract IdeaStorage is BaseStorage {

  struct Idea {
    uint id;
    string text;
    uint userId;
    uint postedAt;
  }

  mapping (uint => Idea) public ideas;
  uint latestIdeaId = 0;

  function createIdea(uint _userId, string memory _text) public onlyController returns (uint) {
    latestIdeaId++;
    ideas[latestIdeaId] = Idea(latestIdeaId, _text, _userId, block.timestamp);
    return latestIdeaId;
  }
}