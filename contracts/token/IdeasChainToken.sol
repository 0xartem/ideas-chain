// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IdeasChainToken is ERC20 {

  uint256 public FOR_ICO = 750000;
  uint256 public FOR_FOUNDER = 250000;

  constructor() public ERC20("IdeasChainToken", "ICT") {
    _setupDecimals(0);
    _mint(msg.sender, FOR_ICO + FOR_FOUNDER);
  }
}