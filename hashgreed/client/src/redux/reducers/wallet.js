import ACTIONS from "../actions/wallet";
import _ from "lodash";

const defaultState = {
  address: "",
  publicKey: "",
  rkmt_balance: 0,
  hash_balance: 0,
  usdt_balance: 0,
  waves_balance: 0,
  busd_balance: 0,
  kusd_balance: 0,
  usdc_balance: 0,
  btc_balance: 0,
  usdn_balance: 0,
  gateway: "",
  segWit: "",
};

const walletReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.UNLOCK_WALLET: {
      let { address, publicKey } = action.payload;
      let newState = _.cloneDeep(state);
      newState.address = address;
      newState.publicKey = publicKey;
      return newState;
    }
    case ACTIONS.Types.LOCK_WALLET: {
      let newState = _.cloneDeep(state);
      newState.address = "";
      newState.publicKey = "";
      window.waves = null;
      return newState;
    }
    case ACTIONS.Types.SET_GATEWAY: {
      const { gateway } = action.payload;
      return { ...state, gateway };
    }
    case ACTIONS.Types.SET_BTC_SEGWIT: {
      const { segWit } = action.payload;
      return { ...state, segWit };
    }
    case ACTIONS.Types.SET_BALANCE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default walletReducer;
