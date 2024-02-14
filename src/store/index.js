import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import authSlice from "./ApiSlice/authSlice";
import cartApiSlice from "./ApiSlice/cartApiSlice";
import cartSlice from "./ApiSlice/cartSlice";
import categorySlice from "./ApiSlice/categorySlice";
import favouritesSlice from "./ApiSlice/favouritesSlice";
import orderSlice from "./ApiSlice/ordersSlice";
import singleProductSlice from "./ApiSlice/singleProduct";
import singleOrderSlice from "./ApiSlice/singleOrderSlice";
import bestSellingSlice from "./ApiSlice/bestSellingSlice";
import newLaunchSlice from "./ApiSlice/newLaunchSlice";
import socialMediaSlice from "./ApiSlice/socialMediaSlice";
import footerContentSlice from "./ApiSlice/footerContentSlice";
import dashboardContentSlice from "./ApiSlice/dashboardContentSlice";
import couponSlice from "./ApiSlice/couponSlice";
import colorSlice from "./ApiSlice/colorSlice";

const reducers = combineReducers({
  auth: authSlice,
  categrory: categorySlice,
  singleProduct: singleProductSlice,
  cart: cartSlice,
  apiCart: cartApiSlice,
  favourites: favouritesSlice,
  orders: orderSlice,
  singleOrder: singleOrderSlice,
  bestSelling: bestSellingSlice,
  newLaunch: newLaunchSlice,
  socialMedia: socialMediaSlice,
  footerContent: footerContentSlice,
  dashboardContent: dashboardContentSlice,
  couponData: couponSlice,
  colors : colorSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "categrory",
    "singleProduct",
    "cart",
    "apiCart",
    "favourites",
    "orders",
    "singleOrder",
    "bestSelling",
    "newLaunch",
    "socialMedia",
    "footerContent",
    "dashboardContent",
    "couponData",
    "colors",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
  // devTools: false,
});

export const persistor = persistStore(store);
export default store;
