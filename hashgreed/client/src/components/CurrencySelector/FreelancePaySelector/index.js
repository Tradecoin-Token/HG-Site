import WavesConfig from "config/waves";
import CurrencySelector from "../component";

import HASH from "assets/icons/HASH.svg";
import BUSD from "assets/icons/BUSD.svg";
import WAVES from "assets/icons/WAVES.svg";
import KUSD from "assets/icons/KUSD.svg";
import BTC from "assets/icons/BTC.svg";
import ETH from "assets/icons/ETH.svg";
import BNB from "assets/icons/BNB.svg";
import USDC from "assets/icons/USDC.svg";
import USDN from "assets/icons/USDN.svg";
import USDT from "assets/icons/USDT.svg";

const FreelancerPaySelector = ({ handleChange }) => {
  const currencyList = [
    { label: "BUSD", value: WavesConfig.BUSD_ID, image: BUSD },
    { label: "WAVES", value: WavesConfig.WAVES_ID, image: WAVES },
    { label: "USDT", value: WavesConfig.USDT_ID, image: USDT },
    { label: "USDC", value: WavesConfig.USDC_ID, image: USDC },
    { label: "BTC", value: WavesConfig.BTC_ID, image: BTC },
    { label: "ETH", value: WavesConfig.ETH_ID, image: ETH },
    { label: "BNB", value: WavesConfig.BNB_ID, image: BNB },
    { label: "USDN", value: WavesConfig.USDN_ID, image: USDN },
    { label: "HASH", value: WavesConfig.HASH_ID, image: HASH },
    { label: "KUSD", value: WavesConfig.KUSD_ID, image: KUSD },
  ];
  return <CurrencySelector handleChange={handleChange} data={currencyList} />;
};

export default FreelancerPaySelector;
