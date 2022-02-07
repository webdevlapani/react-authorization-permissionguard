import { createContext, FC, useContext, useState } from "react";
import { AuthorizationContextValue, Permission } from "./types";

export const AuthorizationContext = createContext<AuthorizationContextValue | null>(null);

export const AuthorizationProvider: FC = ({ children }) => { 
    const [permissions, setPermissions] = useState<Permission[]>([])
   
    return <AuthorizationContext.Provider value={{ permissions, setPermissions }}>
        { children}
    </AuthorizationContext.Provider>
}