;import { Outlet, useNavigate, useNavigation } from "react-router-dom"
import { HeaderComponent } from "./header/header.component"
import { ToastContainer } from "react-toastify"
import { LoadingComponent } from "./loading/loading.component";
import './main-layout.scss';
import globalNavigation from "../utilities/navigation";
import { useContextGlobal } from "../contextGlobalProvider";
import { useEffect } from "react";
import type { UserLoginRDto } from "../dtos/user";

export const MainLayout = () =>{
  const navigation = useNavigation();
  const navigate =  useNavigate(); 
  const { setUser } = useContextGlobal();
  const isLoading = navigation.state === "loading";

   useEffect(()=> {
    // seteo la funcion navigate para usarla fuera de los componentes 
    // en este caso para utilizarla en axios interceptor
    globalNavigation.navigate = navigate;

    const sessionUserDataString = sessionStorage.getItem('user-data');
    if(sessionUserDataString) {
      const sessionUserData = JSON.parse(sessionUserDataString) as UserLoginRDto;
      const {token, ...data} = sessionUserData;
      setUser(data);
    }
  },[])


  return (
    <>
      <HeaderComponent/>
        {isLoading && <LoadingComponent />}
        <ToastContainer position="bottom-left" />
         <div className="main-layout">
            <Outlet ></Outlet>
          </div>
       </>
    )
}