import ACTIONS from "../actions/price";
import _ from "lodash";

const defaultState = {
  rkmt_price: 0,
  hash_price: 0,
  usdt_price: 0,
  waves_price: 0,
  busd_price: 0,
  kusd_price: 0,
  usdc_price: 0,
  btc_price: 0,
  usdn_price: 0,
};

const priceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_PRICE: {
      let { type, value } = action.payload;
      let newState = _.cloneDeep(state);
      switch (type) {
        case "RKMT":
          newState.rkmt_price = value;
          break;
        case "WAVES":
          newState.waves_price = value;
          break;
        case "USDT":
          newState.usdt_price = value;
          break;
        case "HASH":
          newState.hash_price = value;
          break;
        case "BUSD":
          newState.busd_price = value;
          break;
        case "KUSD":
          newState.kusd_price = value;
          break;
        case "BTC":
          newState.btc_price = value;
          break;
        case "USDN":
          newState.usdn_price = value;
          break;
        case "USDC":
          newState.usdc_price = value;
          break;
        default:
          break;
      }
      return newState;
    }
    default:
      return state;
  }
};

export default priceReducer;
