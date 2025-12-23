 import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  token: string;
}

interface UserContextType {
  user: User 
  | null;
  setUser: (user:
     User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = (
  { children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new
   Error("useUser must be used within UserProvider");
  return context;
};    