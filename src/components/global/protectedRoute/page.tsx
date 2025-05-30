"use client";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const { user } = useSelector((store: RootState) => store.userSlice);
    const [token, setToken] = useState<string | null>("");

    useEffect(() => {
      const token = localStorage.getItem("token");
      setToken(token);
      if (token || Object.keys(user).length !== 0) {
        router.replace("/");
      }
    }, []);

    return token || Object.keys(user).length !== 0 ? (
      <WrappedComponent {...props} />
    ) : null;
  };
};

export default ProtectedRoute;
