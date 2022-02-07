import { FC } from "react"
import { PermissionGuardProps } from "./types"
import { useAuthorization } from "./useAuthorization";
 
export const PermissionGuard: FC<PermissionGuardProps> = ({ children, value = [] }) => { 
    const  {permissions}  = useAuthorization();
    let isAuthorize = false;
    const permissionsArray = Array.isArray(value) ? value : [value]; 

    if (!permissionsArray.length)
        isAuthorize = true;
    else
        isAuthorize = permissionsArray.some( permission => permissions.includes(permission))
    
    if (isAuthorize)
        return <>{children}</>;
    else
        return null;
}