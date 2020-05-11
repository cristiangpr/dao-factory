import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0x4d30d59A474aD55e4A8eDA9698e6e5a18fC0A8cf'
)
export default instance;
