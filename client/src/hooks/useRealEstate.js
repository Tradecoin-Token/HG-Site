import { useLocation } from "react-router-dom";
import { realEstateTypeLabelMapping } from "config/misc";

export const useRealEstate = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const type = path[3];
  if (path[2] === "realestatenfts")
    return { type, label: realEstateTypeLabelMapping[type] };
  else return { type: "", label: "" };
};
