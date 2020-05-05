import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0x29D6E0B971C4E92315f87f0377ef5860E10569d3'
)
export default instance;
