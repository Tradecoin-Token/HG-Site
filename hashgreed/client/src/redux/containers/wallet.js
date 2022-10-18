import { connect } from "react-redux";
import ACTIONS from "../actions/wallet";

const mapStateToProps = (state) => ({
  walletState: {
    address: state.walletReducer.address,
    publicKey: state.walletReducer.publicKey,
    waves_balance: state.walletReducer.waves_balance,
    busd_balance: state.walletReducer.busd_balance,
    usdt_balance: state.walletReducer.usdt_balance,
    usdc_balance: state.walletReducer.usdc_balance,
    btc_balance: state.walletReducer.btc_balance,
    usdn_balance: state.walletReducer.usdn_balance,
    hash_balance: state.walletReducer.hash_balance,
    kusd_balance: state.walletReducer.kusd_balance,
    rkmt_balance: state.walletReducer.rkmt_balance,
    gateway: state.walletReducer.gateway,
    segWit: state.walletReducer.segWit,
  },
});

const mapDispatchToProps = (dispatch) => ({
  walletActions: {
    unlockWallet: (address, publicKey) =>
      dispatch(ACTIONS.unlockWallet(address, publicKey)),
    lockWallet: () => dispatch(ACTIONS.lockWallet()),
    setGateway: (gateway) => dispatch(ACTIONS.setGateway(gateway)),
    setBtcSegWit: (segWit) => dispatch(ACTIONS.setBtcSegWit(segWit)),
    setBalance: (balances) => dispatch(ACTIONS.setBalance(balances)),
  },
});

function walletContainer(component) {
  return connect(mapStateToProps, mapDispatchToProps)(component);
}
export default walletContainer;
