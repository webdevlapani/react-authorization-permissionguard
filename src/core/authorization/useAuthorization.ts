import { useContext } from "react";
import { AuthorizationContext } from "./authorization";

export const useAuthorization = () => { 
    const context = useContext(AuthorizationContext);

    if (!context) throw new Error('useAuthorization must be inside Authorization provider');

    const { permissions, setPermissions } = context

    return {permissions, setPermissions}; 
}