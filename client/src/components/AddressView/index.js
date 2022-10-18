import React from "react";

import Address from "./Address";
import walletContainer from "redux/containers/wallet";

function AddressView({ walletState }) {
  return (
    <>
      <Address
        title={"Your Address"}
        value={walletState.address}
        isBalance={false}
        isCopy
      />
      <Address
        title={"BUSD-BEP20 Address"}
        value={walletState.gateway}
        isBalance={false}
        isCopy
      />
      <Address
        title={"BTC(Segwit) Address"}
        value={walletState.segWit}
        isBalance={false}
        isCopy
      />
    </>
  );
}

export default walletContainer(AddressView);
