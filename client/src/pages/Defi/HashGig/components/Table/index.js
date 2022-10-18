import { Spinner } from "@chakra-ui/react";
import { useMobile } from "hooks/useMobile";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";

const Table = ({ header, data, loading }) => {
  const isMobile = useMobile();
  return loading ? (
    <div
      style={{
        width: "100%",
        height: "160px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  ) : !isMobile ? (
    <TableDesktop header={header} data={data} />
  ) : (
    <TableMobile header={header} data={data} />
  );
};

export default Table;
