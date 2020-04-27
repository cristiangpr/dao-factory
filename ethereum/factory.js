import web3 from './web3';
import EntityFactory from '../build/contracts/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0xa7a2606a46383f3d57876961570E48435593ec5D'
)
export default instance;
