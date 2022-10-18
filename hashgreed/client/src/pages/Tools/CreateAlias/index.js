import React from "react";
import About from "./About";
import Create from "./Create";

const CreateAlias = () => {
  const [page, setPage] = React.useState(0);
  const showCreationPage = () => {
    setPage(1);
  };
  return page === 0 ? (
    <About toCreate={showCreationPage} />
  ) : (
    <Create toAbout={() => setPage(0)} />
  );
};

export default CreateAlias;
