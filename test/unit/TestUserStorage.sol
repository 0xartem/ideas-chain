// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "truffle/Assert.sol";
import "../../contracts/users/UserStorage.sol";

contract TestUserStorage {
  UserStorage userStorage;

  constructor() {
    userStorage = new UserStorage();
    userStorage.setControllerAddress(address(this));
  }

  function testCreateFirstUser() public {
    uint _expectedUserId = 1;
    Assert.equal(userStorage.createUser(
      address(0),
      "artem",
      "Artem",
      "B.",
      "I like new ideas",
      "example@example.com"
    ), _expectedUserId, "Should create user with ID 1");
  }

}