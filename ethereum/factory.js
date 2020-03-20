import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0xD9863B6fF4F0becE2c65567d92C36435894910f6'
)
export default instance;
