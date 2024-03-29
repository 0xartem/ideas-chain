import getWeb3 from '../web3/get-web3'
import { getInstance } from './contract-instance'
import IdeaStorage from './artifacts/IdeaStorage.json'
import IdeaController from './artifacts/IdeaController.json'
import { getUserInfo } from './users'

export const getIdea = async (ideaId) => {
  const web3 = await getWeb3()
  const storage = await getInstance(web3.currentProvider, IdeaStorage)
  const idea = await storage.ideas.call(ideaId)
  return {
    id: parseInt(idea.id),
    text: idea.text,
    userId: parseInt(idea.userId),
    postedAt: parseInt(idea.postedAt)
  }
}

export const createIdea = async (text) => {
  const web3 = await getWeb3()
  const controller = await getInstance(web3.currentProvider, IdeaController)
  try {
    const addresses = await web3.eth.getAccounts()
    const result = await controller.createIdea(text, { from: addresses[0] })
    return result
  } catch (err) {
    console.error("Err: ", err)
  }
}

export const getIdeaIdsFromUser = async (userId) => {
  const web3 = await getWeb3()
  const storage = await getInstance(web3.currentProvider, IdeaStorage)
  const ideaIds = await storage.getIdeaIdsFromUser.call(userId)

  return ideaIds.map(ideaId => parseInt(ideaId))
}

export const loadIdeasWithUsers = async (ideas) => {
  const userPromises = ideas.map(idea => {
    const { userId } = idea
    return getUserInfo(userId)
  })

  const users = await Promise.all(userPromises)

  return ideas.map((idea, index) => {
    return {
      user: users[index],
      ...idea
    }
  })
}

export const getLatestIdeaIds = async (amount = 5, page = 1) => {
  const web3 = await getWeb3()
  const storage = await getInstance(web3.currentProvider, IdeaStorage)

  const numIdeas = await storage.getNumIdeas.call()
  const ideaIdPromises = []

  const lastIndex = numIdeas - 1 // Latest
  const pageIndex = page - 1
  const startIndex = lastIndex - (amount * pageIndex)
  const maxIndex = startIndex - amount

  for (let i = startIndex; i > maxIndex; i--) {
    if (i < 0) break

    ideaIdPromises.push(storage.ideaIds(i))
  }

  const ideaIds = await Promise.all(ideaIdPromises)

  return ideaIds
}