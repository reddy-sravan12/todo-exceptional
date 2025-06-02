"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "Tasks", href: "/tasks" },
  { name: "About", href: "/about" },
  { name: "Add Todo", href: "/todo-form" },
];

function ThemeSwitcher() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(
      theme === "light" ? "light-theme" : "dark-theme",
    );
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      className={styles["theme-switcher"]}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

const Navbar: React.FC = () => {
  const { user } = useSelector((store: RootState) => store.userSlice);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    const token = tokenValue !== null && tokenValue.length > 0;
    setIsUser(
      (typeof user === "object" && Object.keys(user || {}).length !== 0) ||
        token,
    );
    setIsLoading(false);
  }, [router, user]);

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className={styles["navbar-brand"]}>Todo</span>
        <ul className={styles["navbar-links"]}>
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className={styles["navbar-link"]}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles["navbar-actions"]}>
        {!isLoading && (
          <div className={styles["auth-buttons"]}>
            {isUser ? (
              <button className={styles["auth-button"]} onClick={handleLogOut}>
                LogOut
              </button>
            ) : (
              <>
                <button
                  className={styles["auth-button"]}
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
                <button className={styles["auth-button"]} onClick={handleLogin}>
                  Login
                </button>
              </>
            )}
          </div>
        )}
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
