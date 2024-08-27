import React,{useContext} from 'react';
import { UserContext } from '../context/userContext';

const DashboardAside = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>    
    {user.role == 'admin' ? (<h1>ADMIN</h1>):(<h1>Comman User</h1>)}
    <div>
      Dashboard AsideBar

    </div>
    </>

  )
}

export default DashboardAside
