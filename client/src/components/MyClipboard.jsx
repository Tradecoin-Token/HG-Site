import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToast } from "@chakra-ui/react";

const MyClipboard = ({
  text,
  style,
  showNotify = true,
  notifyMsg = "Copied",
  children,
}) => {
  const toast = useToast();

  const notifyCopy = () => {
    if (showNotify === true)
      toast({
        description: notifyMsg,
        status: "info",
        duration: 1500,
        isClosable: true,
      });
  };
  return (
    <CopyToClipboard text={text} style={style}>
      <div onClick={notifyCopy}>{children}</div>
    </CopyToClipboard>
  );
};

export default MyClipboard;
