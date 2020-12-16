const IdeasChainToken = artifacts.require("IdeasChainToken")
const IdeasChainICO = artifacts.require("IdeasChainICO")

contract("token", (accounts) => {

  it("distributes token supply", async () => {
    const token = await IdeasChainToken.deployed()
    const ico = await IdeasChainICO.deployed()

    const icoBalance = await token.balanceOf.call(ico.address)
    const founderBalance = await token.balanceOf.call(accounts[0])

    assert.equal(icoBalance.toString(), "750000")
    assert.equal(founderBalance.toString(), "250000")
  })
})