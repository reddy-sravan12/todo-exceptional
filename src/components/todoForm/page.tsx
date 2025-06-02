"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ProtectedRoute from "../global/protectedRoute/page";
import axiosInstance from "@/config/axios";

const musicOptions = [
  { value: "none", label: "No Music" },
  { value: "lofi", label: "lofi" },
  { value: "classical", label: "classical" },
  { value: "pop", label: "pop" },
  { value: "jazz", label: "jazz" },
];

const TodoFormComp: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [music, setMusic] = useState(musicOptions[0].value);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      estimatedTime,
      image,
      music,
    };
    axiosInstance
      .post("/todo/form", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.mainHeading}>Add a todo to your list</h2>
      <div className={styles.field}>
        <label className={styles.label}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Short Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.textarea}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Estimated Time (minutes):</label>
        <input
          type="number"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          min={1}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Image to Display:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Music:</label>
        <select
          value={music}
          onChange={(e) => setMusic(e.target.value)}
          className={styles.input}
        >
          {musicOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={styles.button}>
        Add Todo
      </button>
    </form>
  );
};

export default ProtectedRoute(TodoFormComp);
