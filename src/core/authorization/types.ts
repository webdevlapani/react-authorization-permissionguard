export type Permission = 'user:w' | 'user:r' | 'user:d';

export type AuthorizationContextValue = {
    permissions: Permission[],
    setPermissions: (permissions: Permission[]) => void
}

export type PermissionGuardProps = {
    value?: Permission | Permission[],
}