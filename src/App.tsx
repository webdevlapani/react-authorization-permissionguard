import { Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './auth/auth';
import { AuthGuard } from './auth/AuthGuard';
import { useAuth } from './auth/useAuth';

function App() {
  
  const Navigate = useNavigate()
  const Location = useLocation();

    const Layout = () => {
      const { isAuth, login, logout, setPermissions } = useAuth();
  
      const onClickHandler = () => {
           login(() => {});
      };
  
      const onClicAdminkHandler = () => {
           login(() => {
              setPermissions(['admin', 'author'])
          });
        };
  
      const logOutHandler = () => {
          logout(() => {})
      }
  
      return (
        <div>
          <ul>
            <li>
              <Link to="/login">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Private Page</Link>
            </li>
            <li>
              <Link to="/authorisedPage">Authorised Private Page</Link>
            </li>
          </ul>
          {isAuth ? (
            <p> Now you can access Private page as well </p>
          ) : (
            <p> For access Private page you need to click on Login Button</p>
          )}
          { isAuth &&
           <button onClick={logOutHandler}>
             Logout
          </button>
          }
  
          { !isAuth && <button onClick={onClickHandler}>
            {'Click here as Dummy Login'}
          </button>
          }
          
          {
              !isAuth && <button onClick={onClicAdminkHandler}>
              {'Click here as Admin Login'}
            </button>
    
          }
          
          <Outlet />
        </div>
      );
    };
  
    const AuthenticPage = () => {
      return <>
          <AuthGuard  permissions={['admin']}>
              <button>Authorized Button</button>
          </AuthGuard>
          <h1>private page</h1>
      </>;
    };
  
    const UnAuthorisedPage = () => {
      return <>
      <h1>UnAuthorised user for this page</h1>
      <h2>You need to login as Admin for access this page </h2>
      </>;
    };
  
    const AuthorisedPage = () => {
      return <h1>Authorised page it Only access by admin and author</h1>;
    };
  
    const PublicPage = () => {
      return <h1>login is public</h1>;
    };
  
    const onAuthorizationFail = () => {
        Navigate("/unauthorized",{
          replace: true,
          state: { from: Location }
      })
    }
  
    const onAuthenticationFail = () => {
      Navigate("/login",{
          replace: true,
          state: { from: Location }
      })
    }
  
  
    return (
        <AuthProvider>
          <Routes>
            <Route  path="/login" element={<PublicPage />} />
            <Route
              path="/protected"
              element={
                <AuthGuard onAuthenticationFail={onAuthenticationFail}>
                  <AuthenticPage />
                </AuthGuard>
              }
            />
            <Route
              path="/authorisedPage"
              element={
                <AuthGuard permissions={['admin']}  onAuthorizationFail={onAuthorizationFail} onAuthenticationFail={onAuthenticationFail}>
                  <AuthorisedPage />
                </AuthGuard>
              }
            />
            <Route path="/unauthorized" element={<UnAuthorisedPage />} />
          </Routes>
          <Layout />
        </AuthProvider>
    );
}

export default App;
