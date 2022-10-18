import React from "react";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Deposit from "./Deposit";
import Withdrawal from "./Withdrawal";
import Transactions from "./Transactions";
import Header from "./Header";
import styles from "./Lockitty.module.scss";
const Lockityy = () => {
  const [menuIndex, selectMenu] = React.useState(0);

  const menuItems = [
    "Home",
    "Dashboard",
    "Deposit",
    "Withdrawal",
    "Transactions",
  ];
  const components = [
    <Home />,
    <Dashboard
      onViewTxs={() => {
        selectMenu(4);
      }}
    />,
    <Deposit />,
    <Withdrawal />,
    <Transactions />,
  ];

  return (
    <div className={styles.container}>
      <Header {...{ menuItems, menuIndex, selectMenu }} />
      {components[menuIndex]}
    </div>
  );
};

export default Lockityy;
