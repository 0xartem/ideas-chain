const IdeaStorage = artifacts.require('IdeaStorage');
const IdeaController = artifacts.require('IdeaController');

const assertVMException = error => {
  const hasException = error.toString().search("VM Exception");
  assert(hasException, "Should expect a VM Exception error");
}

contract('ideas', async () => {

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

    const tx = await controller.createIdea(1, "My super cool idea");

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
})