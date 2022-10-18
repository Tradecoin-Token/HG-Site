import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Overview from "pages/Overview";
import Receive from "pages/Manage/Receive";
import Send from "pages/Manage/Send";
import MassTransfer from "pages/Manage/MassSend";
import FileCertify from "pages/Certification/File";
import EmailCertify from "pages/Certification/Email";
import MutualCertify from "pages/Certification/Mutual";
import HashDealzExplorer from "pages/Auction/HashDealz/Explorer";
import HashDealzCreate from "pages/Auction/HashDealz/Create";
import ArtNFTsExplorer from "pages/Auction/ArtNFTs/Explorer";
import ArtNFTsCreate from "pages/Auction/ArtNFTs/Create";
import SportNFTsExplorer from "pages/Auction/SportNFTs/Explorer";
import MusicEventsNFTsExplorer from "pages/Auction/MusicEventsNFTs/Explorer";
import MusicEventsNFTsCreate from "pages/Auction/MusicEventsNFTs/Create";
import RealEstateNFTsExplorer from "pages/Auction/RealEstateNFTs/Explorer";
import RealEstateNFTsCreate from "pages/Auction/RealEstateNFTs/Create";
import ServicesNFTsExplorer from "pages/Auction/ServicesNFTs/Explorer";
import ServicesNFTsCreate from "pages/Auction/ServicesNFTs/Create";
import AirTimeCreate from "pages/Auction/Airtime/Create";
import AirTimeExplorer from "pages/Auction/Airtime/Explorer";
import CollectibleCreate from "pages/Auction/CollectiblesNFT/Create";
import CollectibleExplorer from "pages/Auction/CollectiblesNFT/Explorer";
import ElectricityCreate from "pages/Auction/Electricity/Create";
import ElectricityExplorer from "pages/Auction/Electricity/Explorer";
import FoodCreate from "pages/Auction/Food/Create";
import FoodExplorer from "pages/Auction/Food/Explorer";
import HealthCreate from "pages/Auction/HealthNFT/Create";
import HealthExplorer from "pages/Auction/HealthNFT/Explorer";
import NestCreate from "pages/Auction/Nest/Create";
import NestExplorer from "pages/Auction/Nest/Explorer";
import ProductsCreate from "pages/Auction/ProductsNFT/Create";
import ProductsExplorer from "pages/Auction/ProductsNFT/Explorer";
import UserNFTs from "pages/Tools/UserNFTs";
import Defi from "pages/Defi";
import Stake from "pages/Defi/Stake";
import Lockityy from "pages/Defi/Lockityy";
import Loans from "pages/Defi/Loan";
import RepayLoan from "pages/Defi/RepayLoan";
import HashGig from "pages/Defi/HashGig";
import MintNFT from "pages/Tools/MintNFT";
import { hashDealzSub, realEstateSub } from "config/misc";
import CreateAlias from "pages/Tools/CreateAlias";

function AuthRoutes() {
  return (
    <Switch>
      {/*Overview*/}
      <Route path={"/overview"} exact component={Overview} />
      {/* Manage Tokens */}
      <Route path={"/manage/send"} exact component={Send} />
      <Route path={"/manage/receive"} exact component={Receive} />
      <Route path={"/manage/mass"} exact component={MassTransfer} />
      {/* Tools */}
      <Route path={"/tools/file"} exact component={FileCertify} />
      <Route path={"/tools/email"} exact component={EmailCertify} />
      <Route path={"/tools/mutual"} exact component={MutualCertify} />
      <Route path={"/tools/user-nfts"} exact component={UserNFTs} />
      <Route path={"/tools/mint-nft"} exact component={MintNFT} />
      <Route path={"/tools/create-alias"} exact component={CreateAlias} />
      {/*Auction Tools*/}
      {/*Auction Art NFTs*/}
      <Route
        path={"/auction/artnfts/explorer"}
        exact
        component={ArtNFTsExplorer}
      />
      <Route path={"/auction/artnfts/create"} exact component={ArtNFTsCreate} />
      {/*Auction HashDealz*/}
      {hashDealzSub.map(({ type }, index) => (
        <Route
          key={`explore_${index}`}
          path={`/auction/hashdealz/${type}/explorer`}
          exact
          component={HashDealzExplorer}
        />
      ))}
      {hashDealzSub.map(({ type }, index) => (
        <Route
          key={`create_${index}`}
          path={`/auction/hashdealz/${type}/create`}
          exact
          component={HashDealzCreate}
        />
      ))}
      {/*Auction SportNFTs*/}
      <Route
        path={"/auction/sportnfts/explorer"}
        exact
        component={SportNFTsExplorer}
      />
      {/*Auction Music/EventsNFTs*/}
      <Route
        path={"/auction/musiceventsnfts/explorer"}
        exact
        component={MusicEventsNFTsExplorer}
      />
      <Route
        path={"/auction/musiceventsnfts/create"}
        exact
        component={MusicEventsNFTsCreate}
      />
      {/*Auction RealEstateNFTs*/}
      {realEstateSub.map(({ type }, index) => (
        <Route
          key={`explore_${index}`}
          path={`/auction/realestatenfts/${type}/explorer`}
          exact
          component={RealEstateNFTsExplorer}
        />
      ))}
      {realEstateSub.map(({ type }, index) => (
        <Route
          key={`create_${index}`}
          path={`/auction/realestatenfts/${type}/create`}
          exact
          component={RealEstateNFTsCreate}
        />
      ))}
      {/*Auction ServicesNFTs*/}
      <Route
        path={"/auction/servicesnfts/explorer"}
        exact
        component={ServicesNFTsExplorer}
      />
      <Route
        path={"/auction/servicesnfts/create"}
        exact
        component={ServicesNFTsCreate}
      />
      {/*Auction Health/Wellness NFT*/}
      <Route
        path={"/auction/health/explorer"}
        exact
        component={HealthExplorer}
      />
      <Route path={"/auction/health/create"} exact component={HealthCreate} />
      {/*Auction HashPawa Airtime/Data NFT*/}
      <Route
        path={"/auction/airtime/explorer"}
        exact
        component={AirTimeExplorer}
      />
      <Route path={"/auction/airtime/create"} exact component={AirTimeCreate} />
      {/*Auction HashPawa Products NFT*/}
      <Route
        path={"/auction/products/explorer"}
        exact
        component={ProductsExplorer}
      />
      <Route
        path={"/auction/products/create"}
        exact
        component={ProductsCreate}
      />
      {/*Auction Collectibles NFT*/}
      <Route
        path={"/auction/collectibles/explorer"}
        exact
        component={CollectibleExplorer}
      />
      <Route
        path={"/auction/collectibles/create"}
        exact
        component={CollectibleCreate}
      />
      {/*Auction HashPawa Electricity*/}
      <Route
        path={"/auction/electricity/explorer"}
        exact
        component={ElectricityExplorer}
      />
      <Route
        path={"/auction/electricity/create"}
        exact
        component={ElectricityCreate}
      />
      {/*Auction Food/Beverage NFT*/}
      <Route path={"/auction/food/explorer"} exact component={FoodExplorer} />
      <Route path={"/auction/food/create"} exact component={FoodCreate} />
      {/*Auction Nest NFT(Startups)*/}
      <Route path={"/auction/nest/explorer"} exact component={NestExplorer} />
      <Route path={"/auction/nest/create"} exact component={NestCreate} />
      {/*Staking*/}
      <Route path={"/defi"} exact component={Defi} />
      <Route path={"/defi/stake"} exact component={Stake} />
      <Route path={"/defi/loan"} exact component={Loans} />
      <Route path={"/defi/repayloan"} exact component={RepayLoan} />
      <Route path={"/defi/escrow"} exact component={Lockityy} />
      <Route path={"/defi/hashgig"} exact component={HashGig} />
      {/*NotFound*/}
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
}

export default AuthRoutes;
