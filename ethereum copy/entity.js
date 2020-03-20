import web3 from './web3';
import Entity from './build/Entity.json';

export default address => {
  return new web3.eth.Contract(Entity.abi, address);
};
