import useMediaQuery from "./useMediaQuery";
export const useMobile = () => {
  return useMediaQuery("(max-width: 600px)");
};
