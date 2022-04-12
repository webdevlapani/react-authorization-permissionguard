import { ComponentMeta } from '@storybook/react';
import  { FC } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth';
import { AuthGuard } from './AuthGuard';
import { AuthGuardProps } from './types';

import { useAuth } from './useAuth';

export default {
  title: 'AuthLayout/AuthLayout',
  component: AuthGuard,
} as ComponentMeta<typeof AuthGuard>;

export const RequiredLayout: FC<AuthGuardProps> = () => {
  const Layout = () => {
    const { isAuth, login, logout } = useAuth();

    const onClickHandler = () => {
      isAuth ? logout(() => {}) : login(() => {});
    };

    return (
      <div>
        <ul>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Private Page</Link>
          </li>
        </ul>
        {isAuth ? (
          <p> Now you can access Private page as well </p>
        ) : (
          <p> For access Private page you need to click on Login Button</p>
        )}
        <button onClick={onClickHandler}>
          {isAuth ? 'Logout' : 'Click here as Dummy Login'}
        </button>
        <Outlet />
      </div>
    );
  };

  const AuthenticPage = () => {
    return <h1>private page</h1>;
  };

  const PublicPage = () => {
    return <h1>login is public</h1>;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route
            path="/protected"
            element={
              <AuthGuard>
                <AuthenticPage />
              </AuthGuard>
            }
          />
        </Routes>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
};
