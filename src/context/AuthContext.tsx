// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  proveedor: unknown;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [proveedor, setProveedor] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/verify')
      .then(res => res.json())
      .then(data => {
        if (data.proveedor) {
          setProveedor(data.proveedor);
        } else {
          router.push('/login');
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <AuthContext.Provider value={{ proveedor, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);