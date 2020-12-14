const IdeasChainToken = artifacts.require("IdeasChainToken")

module.exports = (deployer) => {
  deployer.deploy(IdeasChainToken)
}