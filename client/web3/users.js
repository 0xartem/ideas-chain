import { getInstance } from './contract-instance'
import UserStorage from './artifacts/UserStorage.json'
import UserController from "./artifacts/UserController.json"

export const getUserInfo = async (web3, userId) => {
  const storage = await getInstance(web3.currentProvider, UserStorage)
  const profile = await storage.profiles.call(userId)

  const {
    id, 
    username, 
    firstName, 
    lastName, 
    bio, 
    gravatarEmail, 
  } = profile
  
  if (!parseInt(id)) throw "Couldn't find user!"

  return {
    id: parseInt(id),
    username: web3.utils.toAscii(username).replace(/\u0000/g, ''),
    firstName: web3.utils.toAscii(firstName).replace(/\u0000/g, ''),
    lastName: web3.utils.toAscii(lastName).replace(/\u0000/g, ''),
    bio,
    gravatarEmail,
  }
}

export const createUser = async (web3, username, firstName, lastName, bio, gravatarEmail) => {
  const controller = await getInstance(web3.currentProvider, UserController)

  try {
    const addresses = await web3.eth.getAccounts();
    console.log(addresses)

    const result = await controller.createUser(
      web3.utils.asciiToHex(username),
      web3.utils.asciiToHex(firstName),
      web3.utils.asciiToHex(lastName),
      bio,
      gravatarEmail,
      {
        from: addresses[0]
      }
    );
    return result;
  } catch (err) {
    console.error("Err: ", err)
  }
}

export const getLoggedInUserId = async (web3) => {
  try {
    const addresses = await web3.eth.getAccounts()

    if (!addresses) return

    const storage = await getInstance(web3.currentProvider, UserStorage)
    const userId = await storage.addresses.call(addresses[0])

    return parseInt(userId)
  } catch (err) {
    console.error("Err:", err)
  }
}