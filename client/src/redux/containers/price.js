import { connect } from "react-redux";
import ACTIONS from "../actions/price";

const mapStateToProps = (state) => ({
  priceState: {
    waves_price: state.priceReducer.waves_price,
    busd_price: state.priceReducer.busd_price,
    usdt_price: state.priceReducer.usdt_price,
    usdc_price: state.priceReducer.usdc_price,
    btc_price: state.priceReducer.btc_price,
    usdn_price: state.priceReducer.usdn_price,
    hash_price: state.priceReducer.hash_price,
    kusd_price: state.priceReducer.kusd_price,
    rkmt_price: state.priceReducer.rkmt_price,
  },
});

const mapDispatchToProps = (dispatch) => ({
  priceActions: {
    setPrice: (type, value) => dispatch(ACTIONS.setPrice(type, value)),
  },
});

function priceContainer(component) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
export default priceContainer;
