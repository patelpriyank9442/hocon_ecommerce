import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import DefaultLayout from "../components/defaultLayout/defaultLayout";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import CategoryPage from "./CategoryPage";
import Checkout from "./Checkout";
import { Home } from "./Home";
import MyProfile from "./MyProfile";
import OrderDetails from "./OrderDetails";
import PrivacyPolicy from "./PrivacyPolicy";
import ProductDetailsPage from "./ProductDetailsPage";
import { Protectedroute } from "./protectedroute";
import TermsConditions from "./TermsNConditions";
import Whishlist from "./Whishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    ),
  },
  {
    path: "/category",
    element: (
      <DefaultLayout>
        <CategoryPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/product",
    element: (
      <DefaultLayout>
        <ProductDetailsPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <DefaultLayout>
        <Checkout />
      </DefaultLayout>
    ),
  },
  {
    path: "/order-details",
    element: (
      <DefaultLayout>
        <OrderDetails />
      </DefaultLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <DefaultLayout>
        <Cart />
      </DefaultLayout>
    ),
  },
  {
    path: "/terms&conditions",
    element: (
      <DefaultLayout>
        <TermsConditions />
      </DefaultLayout>
    ),
  },
  {
    path: "/aboutus",
    element: (
      <DefaultLayout>
        <AboutUs />
      </DefaultLayout>
    ),
  },
  {
    path: "/privacypolicy",
    element: (
      <DefaultLayout>
        <PrivacyPolicy />
      </DefaultLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protectedroute>
        <DefaultLayout>
          <MyProfile />
        </DefaultLayout>
      </Protectedroute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <DefaultLayout>
        <Whishlist />
      </DefaultLayout>
    ),
  },
]);

export default router;
