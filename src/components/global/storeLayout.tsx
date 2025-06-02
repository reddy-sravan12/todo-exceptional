"use client";

import store from "@/store/store";
import { Provider } from "react-redux";
import React from "react";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreLayout;
