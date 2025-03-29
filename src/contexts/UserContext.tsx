import * as SplashScreen from "expo-splash-screen";
import { createContext, useContext, useEffect, useState } from "react";
import { ID, type Models } from "react-native-appwrite";

import { account } from "@/utils/appwrite";
import { toast } from "@/utils/toast";

type User = Models.User<Models.Preferences> | null;

interface UserContextType {
  current: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState<User>(null);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      setUser(await account.get());

      toast("Welcome back. You are logged in");
    } catch {
      toast("Login failed. Please check your credentials");
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);

      toast("Logged out");
    } catch {
      toast("Logout failed. Please try again");
    }
  }

  async function register(email: string, password: string, name?: string) {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      setUser(await account.get());

      toast("Account created");
    } catch {
      toast("Registration failed. Please check your credentials");
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    init()
      .then(() => {
        SplashScreen.hideAsync();
      })
      .catch((err) => {
        console.error(err);
        SplashScreen.hideAsync();
      });
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}
