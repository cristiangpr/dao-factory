import web3 from './web3';
import EntityFactory from './build/EntityFactory.json';

const instance = new web3.eth.Contract(
  EntityFactory.abi,
  '0x0714DDfD3f2CEdEa494e3f9ffC685693416d30E1'
)
export default instance;
