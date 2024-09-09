import { createContext, Dispatch, SetStateAction } from 'react';

interface User {
  name: string;
  logged: boolean;
  token: string;
}

interface MyContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultUser: User = {
  name: "",
  logged: false,
  token: ""
};

const defaultContext: MyContextType = {
  user: defaultUser,
  setUser: () => { }
};

export const MyContext = createContext<MyContextType>(defaultContext);
