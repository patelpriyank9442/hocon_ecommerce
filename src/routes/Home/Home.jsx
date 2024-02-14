import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../components/login";
import { getBestSelling } from "../../store/ApiSlice/bestSellingSlice";
import { getCartApiProduct } from "../../store/ApiSlice/cartApiSlice";
import { getFavourite } from "../../store/ApiSlice/favouritesSlice";
import {
  getAboutUs,
  getHelp,
  getPrivacyPolicy,
  getTermsConditions,
} from "../../store/ApiSlice/footerContentSlice";
import { getNewLaunch } from "../../store/ApiSlice/newLaunchSlice";
import { getOrders } from "../../store/ApiSlice/ordersSlice";
import { getSocialMedia } from "../../store/ApiSlice/socialMediaSlice";
import BannerContent from "./BannerContent";
import BestSeller from "./BestSeller";
import Category from "./Category";
import Herobanner from "./Herobanner";
import NewCollection from "./NewCollection";
import NewLaunch from "./NewLaunch";
import NewsLetter from "./NewsLetter";
import TopSelling from "./TopSelling";
import { getColors } from "./../../store/ApiSlice/colorSlice";
import {
  getOffers,
  getNewCollection,
  getBanner,
} from "./../../store/ApiSlice/dashboardContentSlice";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = user.email ? true : false;
  const dispatch = useDispatch();
  const mapKey =
    "pk.eyJ1IjoidW1hbmdiaGFsb2RpeWEiLCJhIjoiY2xheGd4eXBkMDN4bzN4bzExN2M0amFxYiJ9.aVskDEtTxBoJCxpsRt1aMQ";

  const handleLocation = async (loc) => {
    const latLng = `${loc.longitude},${loc.latitude}`;
    await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${latLng}.json?types=district&access_token=${mapKey}`
      )
      .then((res) => {
        localStorage.setItem(
          "userLocation",
          JSON.stringify(res.data.features[0].place_name)
        );
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCartApiProduct());
      dispatch(getFavourite());
      dispatch(getOrders());
    }
    dispatch(getBestSelling());
    dispatch(getNewLaunch());
    dispatch(getSocialMedia());
    dispatch(getTermsConditions());
    dispatch(getAboutUs());
    dispatch(getPrivacyPolicy());
    dispatch(getOffers());
    dispatch(getBanner());
    dispatch(getNewCollection());
    dispatch(getColors());
    dispatch(getHelp());
  }, [isLoggedIn]);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((val) => {
      handleLocation(val.coords);
    });

    document.title = "Hoconn";
  }, []);
  return (
    <div>
      <Herobanner />
      <Category />
      <TopSelling />
      <NewCollection />
      {/* <BestSeller /> */}
      <NewLaunch />
      <BannerContent />
      <NewsLetter />
      {/* <Login/> */}
    </div>
  );
}
