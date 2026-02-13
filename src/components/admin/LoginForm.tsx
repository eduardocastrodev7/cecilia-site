"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/admin/blog");
        router.refresh();
      }
    } catch (err) {
      setError("Error signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <div className={styles.errorText}>
              <h3 className={styles.errorMessage}>{error}</h3>
            </div>
          </div>
        </div>
      )}

      <div className={styles.fieldContainer}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}
