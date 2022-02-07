import { useEffect } from 'react';
import './App.css';
import { PermissionGuard, useAuthorization } from './core';

function App() {
  const { setPermissions } = useAuthorization();
  
  useEffect(() => {
    setPermissions(["user:r", "user:w"])
  }, []);

  return (
    <div className="App">
      <h1>Authorization Demo</h1>
      <PermissionGuard value="user:r"> 
       <h1>Authorized only user read</h1>  
      </PermissionGuard>

      <PermissionGuard value={["user:r", "user:w"]}> 
       <h1>Multiple Permission</h1>  
      </PermissionGuard>

      <PermissionGuard value={["user:d"]}> 
       <h1>Not  Permission</h1>  
      </PermissionGuard>
    </div>
  );
}

export default App;
