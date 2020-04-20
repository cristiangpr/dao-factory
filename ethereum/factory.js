import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0xDbdDFC2cb6c2573aA2C6ee41fa05c7f42e5Fe8BB'
)
export default instance;
