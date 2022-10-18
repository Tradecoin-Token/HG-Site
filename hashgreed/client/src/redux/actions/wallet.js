const Types = {
  UNLOCK_WALLET: "WALLET.UNLOCK",
  LOCK_WALLET: "WALLET.LOCK",
  SET_BALANCE: "WALLET.SET.BALANCE",
  SET_GATEWAY: "WALLET.SET.GATEWAY",
  SET_BTC_SEGWIT: "WALLET.SET.BTC.SEGWIT",
};

// actions
const unlockWallet = (address, publicKey) => ({
  type: Types.UNLOCK_WALLET,
  payload: { address, publicKey },
});
const lockWallet = () => ({
  type: Types.LOCK_WALLET,
});
const setGateway = (gateway) => ({
  type: Types.SET_GATEWAY,
  payload: {
    gateway,
  },
});
const setBalance = (balances) => ({
  type: Types.SET_BALANCE,
  payload: {
    ...balances,
  },
});
const setBtcSegWit = (segWit) => ({
  type: Types.SET_BTC_SEGWIT,
  payload: {
    segWit,
  },
});

const walletActions = {
  unlockWallet,
  lockWallet,
  setBalance,
  Types,
  setGateway,
  setBtcSegWit,
};

export default walletActions;
