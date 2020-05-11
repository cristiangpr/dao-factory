import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0xa264304D3AAe61e1715dc0cc7AAC8ade3FA9d95C'
)
export default instance;
