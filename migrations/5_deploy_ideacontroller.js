const IdeaController = artifacts.require('IdeaController')
const IdeaStorage = artifacts.require('IdeaStorage');
const ContractManager = artifacts.require('ContractManager')

module.exports = (deployer) => {

  deployer.deploy(IdeaController)
  .then(() => {
    return IdeaController.deployed()
  })
  .then(ideaCtrl => {
    ideaCtrl.setManagerAddress(ContractManager.address) 

    return Promise.all([
      ContractManager.deployed(),
      IdeaStorage.deployed(),
    ])
  })
  .then(([manager, storage]) => {
    return Promise.all([
      manager.setAddress("IdeaController", IdeaController.address),
      storage.setControllerAddress(IdeaController.address),
    ])
  })

} 