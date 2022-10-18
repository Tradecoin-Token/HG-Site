import CurrencySelector from "../component";
import HASH from "assets/icons/HASH.svg";
import BUSD from "assets/icons/BUSD.svg";
import WAVES from "assets/icons/WAVES.svg";
import KUSD from "assets/icons/KUSD.svg";
import BTC from "assets/icons/BTC.svg";
import USDC from "assets/icons/USDC.svg";
import USDN from "assets/icons/USDN.svg";
import USDT from "assets/icons/USDT.svg";
import RKMT from "assets/icons/RKMT.svg";

import WavesConfig from "config/waves";

const PaymentTokenSelector = ({ handleChange, creatable }) => {
  const currencyList = [
    { label: "BUSD", value: WavesConfig.BUSD_ID, image: BUSD },
    { label: "WAVES", value: WavesConfig.WAVES_ID, image: WAVES },
    { label: "USDT", value: WavesConfig.USDT_ID, image: USDT },
    { label: "USDC", value: WavesConfig.USDC_ID, image: USDC },
    { label: "BTC", value: WavesConfig.BTC_ID, image: BTC },
    { label: "USDN", value: WavesConfig.USDN_ID, image: USDN },
    { label: "HASH", value: WavesConfig.HASH_ID, image: HASH },
    { label: "KUSD", value: WavesConfig.KUSD_ID, image: KUSD },
    { label: "RKMT", value: WavesConfig.RKMT_ID, image: RKMT },
  ];
  return (
    <CurrencySelector
      handleChange={handleChange}
      data={currencyList}
      creatable={creatable}
    />
  );
};

export default PaymentTokenSelector;
