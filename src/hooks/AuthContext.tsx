import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(updateData: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const setupInvalidSessionInterceptor = useCallback(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const { response } = error;

        if (response.data.message === 'Invalid JWT token') {
          signOut();
        }

        return Promise.reject(error);
      },
    );
  }, [signOut]);

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('@GoBarber:token', token);
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setupInvalidSessionInterceptor();
      setData({ token, user });
    },
    [setData, setupInvalidSessionInterceptor],
  );

  const updateUser = useCallback(
    (updateData: Partial<User>) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(updateData));
      setData({
        token: data.token,
        user: {
          ...data.user,
          ...updateData,
        },
      });
    },
    [setData, data],
  );
  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth };
