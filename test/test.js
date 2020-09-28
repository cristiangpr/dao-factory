const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const events = require('events').EventEmitter.defaultMaxListeners = 0;

const compiledFactory = require('../build/contracts/EntityFactory.json');
const compiledEntity = require('../build/contracts/Entity.json');
const compiledToken = require('../build/contracts/Token.json');


let accounts;
let factory;
let entity;
let entityAddress;
let tokenAddress;
let token;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(compiledFactory.abi)
  .deploy( { data: compiledFactory.bytecode} )
  .send( {from: accounts[0], gas: '5000000'} );

  await factory.methods.createEntity('foo', 'foo', 'foo', 'FOO', 1/.1).send( { from: accounts[0], gas: '5000000' } );
  const addresses = await factory.methods.getDeployedEntities().call();
  entityAddress = addresses[0];
  entity = await new web3.eth.Contract(compiledEntity.abi, entityAddress);
  tokenAddress = await entity.methods.token().call();
  token = await new web3.eth.Contract(compiledToken.abi, tokenAddress);
});

describe('Entities', () => {
  it('deploys a factory a entity and a token', () => {
    assert.ok(factory.options.address);
    assert.ok(entity.options.address);
    assert.ok(token.options.address);

  });
  it('assigns caller as manager', async () => {
    const manager = await entity.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows manager to add members', async () => {
    await entity.methods.verify(accounts[1]).send({
      from: accounts[0]
    });
    const isMember = await entity.methods.members(accounts[1]).call();
    assert(isMember);
  });

  it('allows manager to remove members', async () => {
    await entity.methods.verify(accounts[1]).send({
      from: accounts[0]
    });
    await entity.methods.unverify(accounts[1]).send({
      from: accounts[0]
    });
    const isMember = await entity.methods.members(accounts[1]).call();
    assert(!isMember);
  });


    it('allows member to make a request', async () => {
      await entity.methods.createRequest('work', 8, 2,  accounts[0]).send({
        from: accounts[0],
        gas: '1000000'
      });
      const request = await entity.methods.requests(0).call();
      assert.equal(request.description, 'work');
    });
    it('processes requests', async () => {
   
      await entity.methods.createRequest('work', 8, 2,  accounts[0]).send({
        from: accounts[0],
        gas: '1000000'
      });
      await entity.methods.approveRequest(0).send({
        from: accounts[0],
        gas: '1000000'
      });
      await entity.methods.finalizeRequest(0).send({
        from: accounts[0],
        gas: '1000000'
      });
      let value = await token.methods.balanceOf(accounts[0]).call();
      console.log(value);
      assert.strictEqual(value, '16' )
    });
});

