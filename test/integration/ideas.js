const IdeaStorage = artifacts.require('IdeaStorage');
const IdeaController = artifacts.require('IdeaController');
const UserController = artifacts.require('UserController');

const assertVMException = error => {
  const hasException = error.toString().search("VM Exception");
  assert(hasException, "Should expect a VM Exception error");
}

contract('ideas', async () => {

  before(async () => {
    const userCtrl = await UserController.deployed();
    
    await userCtrl.createUser(
      web3.utils.fromAscii('artem'),
      web3.utils.fromAscii('Artem'),
      web3.utils.fromAscii('B.'),
      "I like new ideas",
      "example@example.com"
    );
  });

  it("can't create idea without controller", async () => {
    const storage = await IdeaStorage.deployed()

    try {
      const tx = await storage.createIdea(1, "My super cool idea");
      assert.fail();
    } catch (err) {
      assertVMException(err);
    }
  });

  it("can create idea with controller", async () => {
    const controller = await IdeaController.deployed();

    const tx = await controller.createIdea("My super cool idea");

    assert.isOk(tx);
  });

  it('can get idea', async () => {
    const storage = await IdeaStorage.deployed();

    const ideaId = 1;
    const idea = await storage.ideas.call(ideaId);
    const { id, text, userId, postedAt } = idea;

    assert.equal(parseInt(id), 1);
    assert.equal(text, "My super cool idea");
    assert.equal(parseInt(userId), 1);
    console.log(parseInt(postedAt));
  })

  it("can get all idea IDs from user", async () => {
    const storage = await IdeaStorage.deployed()

    const userId = 1
    const ids = await storage.getIdeaIdsFromUser.call(userId)

    const expectedIdeaId = 1

    assert.isOk(Array.isArray(ids))
    assert.equal(ids[0], expectedIdeaId)
  })

  it("can get idea ID based on index", async () => {
    const storage = await IdeaStorage.deployed()

    const ideaId = await storage.ideaIds.call(0)

    assert.equal(ideaId, 1)
  })
})