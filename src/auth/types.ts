import React from "react";

export type Permissions = string[] | number[] | string | number;

export type AuthContextType = {
    permissions: Permissions[];
    isAuth: boolean;
    login: (callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
    setPermissions:  React.Dispatch<React.SetStateAction<Permissions[]>>
}

export type AuthGuardProps = {
    permissions?: Permissions,
    onAuthenticationFail?: () => void,
    onAuthorizationFail?: () => void,
}