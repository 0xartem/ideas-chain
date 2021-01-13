// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

import "./IdeasChainToken.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract IdeasChainICO {
  using SafeMath for uint256;

  IdeasChainToken token;
  uint256 public RATE = 1000; // 1 ETH = 1000 ICT

  constructor(address _tokenAddr) {
    token = IdeasChainToken(_tokenAddr);
  }

  fallback() external payable {
    uint256 _tokenAmount = _getTokenAmount(msg.value);
    token.transfer(msg.sender, _tokenAmount);
  }

  function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
    return _weiAmount.div(10 ** 18).mul(RATE);
  }
}