import { createContext } from "react";
import { User } from "./User.types";

export interface UserType {
  user: User[];
  saveUser: (id: string) => void;
  removeUser: (id: string) => void;
}

export const userContextDefault: UserType = {
  user: [],
  saveUser: () => null,
  removeUser: () => null,
};

export const UserContext = createContext<UserType>(userContextDefault);
