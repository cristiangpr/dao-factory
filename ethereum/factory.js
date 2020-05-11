import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0x2280911a84fA38b915acFaaBcac03Bc849Ee79Aa'
)
export default instance;
