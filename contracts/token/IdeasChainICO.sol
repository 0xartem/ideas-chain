// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "./IdeasChainToken.sol";

contract IdeasChainICO {

  IdeasChainToken token;

  constructor(address _tokenAddr) {
    token = IdeasChainToken(_tokenAddr);
  }
}