const UserStorage = artifacts.require('UserStorage');
const IdeaStorage = artifacts.require('IdeaStorage');

module.exports = (deployer) => {
  deployer.deploy(UserStorage);
  deployer.deploy(IdeaStorage);
}