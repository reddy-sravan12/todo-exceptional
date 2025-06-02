"use client";
import React, { useRef, useState } from "react";
import axiosInstance from "@/config/axios";
import styles from "./page.module.css";
import { sendGTMEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/global/protectedRoute/page";

const professions = ["Developer", "Designer", "Manager", "Student", "Other"];

const SignUpComp: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
    userName: "",
  });

  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    profession: false,
    userName: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: false }));
    setSignupError(null); // Clear any previous global error when user starts typing
  };

  const validate = () => {
    const errors: any = {};
    if (!form.userName.trim()) errors.userName = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = true;
    if (!form.password || form.password.length < 6) errors.password = true;
    if (!form.confirmPassword || form.confirmPassword !== form.password)
      errors.confirmPassword = true;
    if (!form.profession) errors.profession = true;
    setFieldErrors({
      email: !!errors.email,
      password: !!errors.password,
      confirmPassword: !!errors.confirmPassword,
      profession: !!errors.profession,
      userName: !!errors.userName,
    });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSignupError(null); // clear any existing error

    axiosInstance
      .post("/auth/signup", form)
      .then(() => {
        sendGTMEvent({
          event: "signup_success",
          user_email: form.email,
          user_profession: form.profession,
        });

        setForm({
          email: "",
          password: "",
          confirmPassword: "",
          profession: "",
          userName: "",
        });

        setFieldErrors({
          email: false,
          password: false,
          confirmPassword: false,
          profession: false,
          userName: false,
        });

        router.replace("/login");
      })
      .catch((err: any) => {
        console.log(err.response);
        setSignupError(
          err?.response?.data?.errors[0]?.msg ||
            "An error occurred. Please try again.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Sign Up</h2>

      <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="userName">
            User Name:
          </label>
          <input
            id="userName"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            className={`${styles.input} ${fieldErrors.userName ? styles.inputError : ""}`}
            autoComplete="username"
            placeholder="Enter your name"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`${styles.input} ${fieldErrors.email ? styles.inputError : ""}`}
            autoComplete="email"
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`${styles.input} ${fieldErrors.password ? styles.inputError : ""}`}
            autoComplete="new-password"
            placeholder="Create a password"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`${styles.input} ${fieldErrors.confirmPassword ? styles.inputError : ""}`}
            autoComplete="new-password"
            placeholder="Re-enter your password"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="profession">
            Profession:
          </label>
          <select
            id="profession"
            name="profession"
            value={form.profession}
            onChange={handleChange}
            className={`${styles.select} ${fieldErrors.profession ? styles.inputError : ""}`}
          >
            <option value="">Select your profession</option>
            {professions.map((prof) => (
              <option key={prof} value={prof}>
                {prof}
              </option>
            ))}
          </select>
        </div>

        {signupError && <div className={styles.errorMsg}>{signupError}</div>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpComp;
