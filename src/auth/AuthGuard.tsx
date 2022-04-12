import { FC } from "react"
import { AuthGuardProps } from "./types"
import { useAuth } from "./useAuth";
 
export const AuthGuard: FC<AuthGuardProps> = ({ children, permissions = [], onAuthenticationFail, onAuthorizationFail }) => { 
    const  {permissions : authPermission, isAuth}= useAuth();
   
    if (!isAuth) {
        onAuthenticationFail &&  onAuthenticationFail()
        return null
    }
    else {
        let isAuthorize = false;
        const permissionsArray = Array.isArray(permissions) ? permissions : [permissions]; 

        if (!permissionsArray.length)
            isAuthorize = true;
        else
            isAuthorize = permissionsArray.some( (permission) => authPermission.includes(permission))
    
        if(isAuthorize) 
            return <>{children}</>
        else {
            if (onAuthorizationFail) {
                onAuthorizationFail();
                return null;
            }
        }    
    }

    return <>{children}</>
}

