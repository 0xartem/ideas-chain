const UserStorage = artifacts.require('UserStorage');
const UserController = artifacts.require('UserController');

const assertVMException = error => {
  const hasException = error.toString().search("VM Exception");
  assert(hasException, "Should expect a VM Exception error");
}

contract('users', async () => {

  it("can't create user without controller", async () => {
    const storage = await UserStorage.deployed();

    try {
      await storage.createUser(
        0x0,
        web3.utils.fromAscii('artem'),
        web3.utils.fromAscii('Artem'),
        web3.utils.fromAscii('B.'),
        "I like new ideas",
        "example@example.com"
      );
      assert.fail();
    } catch (err) {
      assertVMException(err);
    }
  });

  it('can create user with controller', async () => {
    const controller = await UserController.deployed();

    const tx = await controller.createUser(
      web3.utils.fromAscii('artem'),
      web3.utils.fromAscii('Artem'),
      web3.utils.fromAscii('B.'),
      "I like new ideas",
      "example@example.com"
    );

    assert.isOk(tx);
  });

  it('can get user', async () => {
    const storage = await UserStorage.deployed();

    const userId = 1;
    const userInfo = await storage.profiles.call(userId);

    const username = web3.utils.toAscii(userInfo[1]).replace(/\u0000/g, '');
    assert.equal(username, 'artem');
  });
})