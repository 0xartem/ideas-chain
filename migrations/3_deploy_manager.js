
const ContractManager = artifacts.require('ContractManager')
const UserStorage = artifacts.require('UserStorage');
const IdeaStorage = artifacts.require('IdeaStorage');

module.exports = (deployer) => {
  
  deployer.deploy(ContractManager)
  .then(() => {
    return ContractManager.deployed()
  })
  .then(manager => {
    return Promise.all([
      manager.setAddress("UserStorage", UserStorage.address),
      manager.setAddress("IdeaStorage", IdeaStorage.address),
    ])
  })

}