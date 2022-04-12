import { createContext, FC, useState } from "react";
import { Permissions, AuthContextType} from "./types";

const initAuthData: AuthContextType = {
    permissions: [],
    isAuth: false,
    login: () => {},
    logout: () => {},
    setPermissions:() => {},
  };

export const AuthContext = createContext<AuthContextType>(initAuthData);
  
export const AuthorizationProvider: FC = ({ children }) => { 
    const [permissions, setPermissions] = useState<Permissions[]>([])
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const value: AuthContextType = {
        permissions,
        setPermissions,
        isAuth,
        login(callback: any) {
          return new Promise(() => {
            setIsAuth(true);
            callback();
          });
        },
        logout(callback: any) {
          return new Promise(() => {
            setIsAuth(false);
            callback();
          });
        },
      };

    return <AuthContext.Provider value={value}>
        { children}
    </AuthContext.Provider>
}