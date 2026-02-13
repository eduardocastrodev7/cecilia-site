'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UserForm.module.css';

interface User {
  _id?: string;
  email: string;
  name?: string;
}

interface UserFormProps {
  user?: User;
}

export default function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const isEditing = !!user;

  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validação básica
      if (!email.trim()) {
        setError('Email is required');
        setLoading(false);
        return;
      }

      if (!isEditing && !password.trim()) {
        setError('Password is required for new users');
        setLoading(false);
        return;
      }

      if (password.trim() && password.length < 8) {
        setError('Password must be at least 8 characters');
        setLoading(false);
        return;
      }

      const body: any = {
        email: email.trim().toLowerCase(),
        name: name.trim() || undefined,
      };

      if (password.trim()) {
        body.password = password;
      }

      const url = isEditing ? `/api/users/${user._id}` : '/api/users';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error saving user');
      }

      router.push('/admin/user');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing || !user._id) return;

    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      router.push('/admin/user');
      router.refresh();
    } catch (err) {
      alert('Error deleting user');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            placeholder="user@example.com"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Name <span className={styles.labelOptional}>(optional)</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="User name"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Password {!isEditing && '*'}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!isEditing}
            minLength={8}
            className={styles.input}
            placeholder="••••••••"
          />
          {isEditing && (
            <p className={styles.helpText}>
              Leave blank to keep current password
            </p>
          )}
        </div>

        <div className={styles.actions}>
          <div className={styles.actionsLeft}>
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className={`${styles.button} ${styles.buttonDanger}`}
              >
                Delete User
              </button>
            )}
          </div>
          <div className={styles.actionsRight}>
            <button
              type="button"
              onClick={() => router.push('/admin/user')}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}


