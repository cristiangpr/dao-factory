import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0x06A5Aa83545821eA105444D765d861fA5CE58260'
)
export default instance;
