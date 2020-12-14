const IdeasChainToken = artifacts.require("IdeasChainToken")

contract("token", (accounts) => {

  it("distributes token supply", async () => {
    const token = await IdeasChainToken.deployed()

    const founderBalance = await token.balanceOf.call(accounts[0])

    assert.equal(founderBalance.toString(), "1000000")
  })
})