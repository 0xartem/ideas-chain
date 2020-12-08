import contract from "truffle-contract"

export const getInstance = (provider, artifact) => {
  const contracObj = contract(artifact)
  contracObj.setProvider(provider)
  return contracObj.deployed()
}