const IdeasChainToken = artifacts.require("IdeasChainToken")
const IdeasChainICO = artifacts.require("IdeasChainICO")

const web3 = require("web3")

const { 
  utils: { toWei },
} = web3

contract("token", (accounts) => {

  it("distributes token supply", async () => {
    const token = await IdeasChainToken.deployed()
    const ico = await IdeasChainICO.deployed()

    const icoBalance = await token.balanceOf.call(ico.address)
    const founderBalance = await token.balanceOf.call(accounts[0])

    assert.equal(icoBalance.toString(), "750000")
    assert.equal(founderBalance.toString(), "250000")
  })

  it("can buy tokens", async () => {
    const token = await IdeasChainToken.deployed()
    const ico = await IdeasChainICO.deployed()

    const userAddr = accounts[1] // A random account that we control
    const wei = toWei("1", "ether") // We need to specify the value in wei

    await ico.sendTransaction({
      from: userAddr,
      value: wei,
    })

    const userBalance = await token.balanceOf.call(userAddr);

    assert.equal(userBalance.toString(), "1000")

    const icoBalance = await token.balanceOf.call(ico.address);

    assert.equal(icoBalance.toString(), "749000")
  })
})