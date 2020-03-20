const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');


const provider = ganache.provider();
const web3 = new Web3(provider);
const events = require('events').EventEmitter.defaultMaxListeners = 0;

const compiledFactory = require('../ethereum/build/CampFactory.json');
const compiledEntity = require('../ethereum/build/Entity.json');

let accounts;
let factory;
let entity;
let entityAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy( { data: compiledFactory.bytecode} )
  .send( {from: accounts[0], gas: '1000000'} );

  await factory.methods.createEntity('100').send( { from: accounts[0], gas: '1000000' } );
  const addresses = await factory.methods.getDeployedEntitys().call();
  entityAddress = addresses[0];
 entity = await new web3.eth.Contract(JSON.parse(compiledEntity.interface), entityAddress);
});

describe('Entities', () => {
  it('deploys a factory and a entity', () => {
    assert.ok(factory.options.address);
    assert.ok(entity.options.address);

  });
  it('assigns caller as manager', async () => {
    const manager = await entity.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute and assigns them as approvers', async () => {
    await entity.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });
    const isContributor = await entity.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });
  it('requires a minimum contribution', async () => {
      try {
        await entity.methods.contribute().send({
          from: accounts[1],
          value: '99'  // less than minimum
        });
      } catch(error) {
        assert(true); // if it fails, the test passes
        return;   // exit the test
      }
      assert(false); // code didn't fail, so test fail
    });

    it('allows manager to make a request', async () => {
      await entity.methods.createRequest('buy shit', '100', accounts[1]).send({
        from: accounts[0],
        gas: '1000000'
      });
      const request = await entity.methods.requests(0).call();
      assert.equal(request.description, 'buy shit');
    });
    it('processes requests', async () => {
      await entity.methods.contribute().send({
           from: accounts[0],
           value: web3.utils.toWei('10', 'ether')
      });
      await entity.methods.createRequest('hey', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
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
      let balance = await web3.eth.getBalance(accounts[1]);
      balance = web3.utils.fromWei(balance, 'ether');
      balance = parseFloat(balance);
      console.log(balance);
      assert(balance > '104' )
    });
});
