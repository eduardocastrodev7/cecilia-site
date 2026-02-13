'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './UserList.module.css';

interface User {
  _id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export default function UserList() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Error loading users');
      }
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError('Error loading users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      // Remove o usuário da lista
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      alert('Error deleting user');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <p className={styles.emptyTitle}>No users found.</p>
        <p className={styles.emptySubtitle}>Create your first user to get started.</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user._id} className={styles.listItem}>
            <div className={styles.listItemContent}>
              <div className={styles.listItemInner}>
                <div className={styles.listItemLeft}>
                  <p className={styles.listItemEmail}>{user.email}</p>
                  {user.name && (
                    <p className={styles.listItemName}>{user.name}</p>
                  )}
                  <p className={styles.listItemDate}>
                    Created on {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className={styles.listItemRight}>
                  <Link
                    href={`/admin/user/${user._id}`}
                    className={`${styles.button} ${styles.buttonSecondary}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className={`${styles.button} ${styles.buttonDanger}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


