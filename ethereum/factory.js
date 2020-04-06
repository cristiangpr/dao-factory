import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0xd6dD185f8f096F20C5F809dcA837fD09801b3393'
)
export default instance;
