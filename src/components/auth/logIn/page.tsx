"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import axiosInstance from "@/config/axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ProtectedRoute from "@/components/global/protectedRoute/page";

const LogInComp: React.FC = () => {
  const dispatchEvent = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"login" | "otp">("login");
  const router = useRouter();

  const searchParams = useSearchParams();
  const authStep = searchParams.get("authStep");

  useEffect(() => {
    if (authStep === "otp") {
      setStep("otp");
    }
  }, [authStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (step === "login") {
      axiosInstance
        .post("/auth/login", { email, password })
        .then((_: any) => {
          router.push("/login?authStep=otp");
          setStep("otp");
        })
        .catch((err: any) => {
          setError(
            err.response?.data?.message || "Login failed. Please try again.",
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (step === "otp") {
      axiosInstance
        .post("/auth/verify-otp", { email, otp })
        .then((res: any) => {
          dispatchEvent(setUser(res.data.user));
          localStorage.setItem("token", res.data.token);
          axiosInstance.defaults.headers.common["Authorization"] =
            `Bearer ${res.data.token}`;
          router.push("/");
          setEmail("");
          setPassword("");
          setOtp("");
        })
        .catch((err: any) => {
          setError(
            err.response?.data?.message ||
              err.message ||
              "OTP verification failed. Please try again.",
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {error && <div className={styles.errorMsg}>{error}</div>}
      {step === "login" && (
        <>
          <div className={styles.formGroup} style={{ marginBottom: "22px" }}>
            <label className={styles.formLabel}>Email</label>
            <input
              className={styles.formInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          <div className={styles.formGroup} style={{ marginBottom: "22px" }}>
            <label className={styles.formLabel}>Password</label>
            <input
              className={styles.formInput}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
        </>
      )}
      {step === "otp" && (
        <div className={styles.formGroup} style={{ marginBottom: "22px" }}>
          <label className={styles.formLabel}>Enter OTP</label>
          <input
            className={styles.formInput}
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter the OTP sent to your email"
            disabled={loading}
          />
        </div>
      )}
      <button className={styles.submitBtn} type="submit" disabled={loading}>
        {loading
          ? step === "login"
            ? "Logging In..."
            : "Verifying OTP..."
          : step === "login"
            ? "Log In"
            : "Verify OTP"}
      </button>
    </form>
  );
};

export default LogInComp;
