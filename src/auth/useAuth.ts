import { useContext } from "react";
import { AuthContext } from "./auth";
import { AuthContextType } from "./types";

export const useAuth = () => { 
    const context = useContext<AuthContextType>(AuthContext);

    if (!context) throw new Error('useAuth must be inside Authorization provider');

    const { permissions, setPermissions, login, logout, isAuth } = context

    return {permissions, setPermissions, login, logout, isAuth }; 
}