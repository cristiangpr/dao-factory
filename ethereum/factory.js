import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0x0f8B6249740b41D79cbaba61a39F52e8E5b415D1'
)
export default instance;
