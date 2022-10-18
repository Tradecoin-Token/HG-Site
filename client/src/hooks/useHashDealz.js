import { useLocation } from "react-router-dom";
import { hashDealzTypeLabelMapping } from "config/misc";

export const useHashDealz = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const type = path[3];
  if (path[2] === "hashdealz")
    return { type, label: hashDealzTypeLabelMapping[type] };
  else return { type: "", label: "" };
};
