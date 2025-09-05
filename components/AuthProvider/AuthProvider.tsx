'use client';
import { sessionStatus, getMe } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';

interface AuthProviderProp {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProp) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuth = await sessionStatus();
        if (isAuth) {
          const user = await getMe();
          if (user) {
            setUser(user);
          } else {
            clearIsAuth();
          }
        } else {
          clearIsAuth();
        }
      } catch (error) {
        clearIsAuth();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuth]);

  if (loading) return <Loading />;

  return children;
};

export default AuthProvider;
