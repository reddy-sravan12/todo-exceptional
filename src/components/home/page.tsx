import { useEffect, useState } from "react";
import ProtectedRoute from "../global/protectedRoute/page";
import axiosInstance from "@/config/axios";
import music from "../../static/music.json";
import styles from "./page.module.css";
import Image from "next/image";

type Todo = {
  _id: number;
  title: string;
  description: string;
  estimatedTime: string;
  image: string;
  music: string;
  completed: boolean;
};

function HomeComp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    axiosInstance
      .get("/todo/todo-list", { signal: abortController.signal })
      .then((res) => res)
      .then((data) => {
        setTodos(data.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => abortController.abort();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className={styles.heading}>
        Select a task below to begin working on it
      </h1>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={styles.todoCard}
            style={{ backgroundImage: `url(${todo.image})` }}
          >
            {/* {todo.image && (
              <img
                src={todo.image}
                alt={todo.title}
                className={styles.todoImage}
              />
            )} */}

            <div className={styles.todoContent}>
              <h3
                className={`${styles.todoTitle} ${
                  todo.completed ? styles.completed : ""
                }`}
              >
                {todo.title}
              </h3>
              <div className={styles.todoDescription}>{todo.description}</div>
              <div className={styles.todoEstimated}>
                Estimated Time: {todo.estimatedTime}
              </div>
            </div>
            {todo.music && (
              <div className={styles.guitar}>
                <span className={styles.guitarLabel}>{todo.music}</span>
                <Image
                  src="/electric-guitar.gif"
                  alt="Electric guitar animation"
                  height={32}
                  width={32}
                  className={styles.guitarIcon}
                />
              </div>
            )}

            {/* {todo.music && (
              <div className={styles.todoAudio}>
                <audio
                  controls
                  src={music[todo.music as keyof typeof music]}
                  onPlay={(e) => {
                    document.querySelectorAll("audio").forEach((audio) => {
                      if (audio !== e.currentTarget) {
                        audio.pause();
                      }
                    });
                  }}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProtectedRoute(HomeComp);
