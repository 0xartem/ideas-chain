const IdeasChainToken = artifacts.require("IdeasChainToken")
const IdeasChainICO = artifacts.require("IdeasChainICO")

module.exports = (deployer) => {
  
  deployer.deploy(IdeasChainICO, IdeasChainToken.address)
  .then(() => {
    return IdeasChainToken.deployed()
  })
  .then(token => {
    return token.fundICO(IdeasChainICO.address)
  })

}