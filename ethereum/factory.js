import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0x52c16D844B5ba5d386e081dAC81fcb81a796B537'
)
export default instance;
