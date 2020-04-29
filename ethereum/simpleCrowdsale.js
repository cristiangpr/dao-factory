import web3 from './web3';
import SimpleCrowdsale from '../build/contracts/SimpleCrowdsale.json';

export default address => {
  return new web3.eth.Contract(SimpleCrowdsale.abi, address);
};