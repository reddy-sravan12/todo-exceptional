'use client';
import React, { useRef, useState } from "react";
import axiosInstance from "@/config/axios";
import styles from "./page.module.css";


const professions = [
    "Developer",
    "Designer",
    "Manager",
    "Student",
    "Other",
];

const SignUpComp: React.FC = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        profession: "",
        userName:''
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const formRef=useRef<HTMLFormElement>(null)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (
            !form.email ||
            !form.password ||
            !form.confirmPassword ||
            !form.profession
        ) {
            setError("All fields are required.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await axiosInstance.post('/auth/signup', form);
            setForm({
                email: "",
                password: "",
                confirmPassword: "",
                profession: "",
                userName: ""
              });
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
            alert(err.response.data.message);
            } else {
            alert("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
        
    };
    

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Sign Up</h2>
            <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
            <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">
                        UserName:
                    </label>
                    <input
                        id="userName"
                        name="userName"
                        value={form.userName}
                        onChange={handleChange}
                        required
                        className={styles.input}
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
                        required
                        className={styles.input}
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
                        required
                        className={styles.input}
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
                        required
                        className={styles.input}
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
                        required
                        className={styles.select}
                    >
                        <option value="" className={styles.option}>Select your profession</option>
                        {professions.map((prof) => (
                            <option key={prof} value={prof} className={styles.option}>
                                {prof}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default SignUpComp;