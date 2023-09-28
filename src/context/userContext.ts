import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
} from "react";

export const UserContext = createContext<MutableRefObject<{
  email: null | string;
}> | null>(null);
// {
//   user: { email: string | null };
//   setUser: Dispatch<SetStateAction<{ email: string | null }>>;
// } | null
