import { getInstance } from './contract-instance'
import IdeaStorage from './artifacts/IdeaStorage.json'
import IdeaController from './artifacts/IdeaController.json'

export const getIdea = async (web3, ideaId) => {
  const storage = await getInstance(web3.currentProvider, IdeaStorage)
  const idea = await storage.ideas.call(ideaId)
  return {
    id: parseInt(idea.id),
    text: idea.text,
    userId: parseInt(idea.userId),
    postedAt: parseInt(idea.postedAt)
  }
}

export const createIdea = async (web3, userId, text) => {
  const controller = await getInstance(web3.currentProvider, IdeaController)
  try {
    const addresses = await web3.eth.getAccounts()
    const result = await controller.createIdea(userId, text, { from: addresses[0] })
    return result
  } catch (err) {
    console.error("Err: ", err)
  }
}