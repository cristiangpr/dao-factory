import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0x23f45908b4C9303dED3f76208016AD26C58218f6'
)
export default instance;
