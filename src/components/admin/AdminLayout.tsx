'use client';

import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
  children: ReactNode;
  session: Session | null;
}

export default function AdminLayout({ children, session }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: clientSession } = useSession();
  const isLoginPage = pathname === '/admin';
  const isAuthenticated = session || clientSession;

  // Se não estiver na página de login e não estiver autenticado, redireciona
  useEffect(() => {
    if (!isLoginPage && !isAuthenticated) {
      router.push('/admin');
    }
  }, [isLoginPage, isAuthenticated, router]);

  // Se estiver na página de login, renderiza apenas o conteúdo sem o layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Se não estiver autenticado, não renderiza nada (aguardando redirect)
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin' });
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <div className={styles.navLeft}>
              <div className={styles.navBrand}>
                <h1 className={styles.navTitle}>Cecilia Admin</h1>
              </div>
              <div className={styles.navLinks}>
                <Link
                  href="/admin/blog"
                  className={`${styles.navLink} ${pathname?.startsWith('/admin/blog') ? styles.navLinkActive : ''}`}
                >
                  Posts
                </Link>
                <Link
                  href="/admin/user"
                  className={`${styles.navLink} ${pathname?.startsWith('/admin/user') ? styles.navLinkActive : ''}`}
                >
                  Users
                </Link>
              </div>
            </div>
            <div className={styles.navRight}>
              <button
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

