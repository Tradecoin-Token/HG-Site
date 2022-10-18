import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./About";
import Gigs from "./Gigs";
import Hire from "./Hire";
import Payments from "./Payments";
import styles from "./HashGig.module.scss";

const HashGig = () => {
  const [menuIndex, selectMenu] = React.useState(0);
  const menuItems = ["About", "Hire", "Gigs", "Payments"];
  const components = [<About />, <Hire />, <Gigs />, <Payments />];
  const menu = { menuItems, menuIndex, selectMenu };
  return (
    <div className={styles.container}>
      <Header {...menu} />
      {components[menuIndex]}
      <Footer {...menu} />
    </div>
  );
};

export default HashGig;
