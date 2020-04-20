import web3 from './web3';
import Crowdsale from '../build/contracts/Crowdsale.json';

export default address => {
  return new web3.eth.Contract(Crowdsale.abi, address);
};