import { Outlet, useNavigate, useNavigation } from "react-router-dom"
import { HeaderComponent } from "./header/header.component"
import { ToastContainer } from "react-toastify"
import { LoadingComponent } from "./loading/loading.component";
import './main-layout.scss';
import globalNavigation from "../utilities/navigation";

export const MainLayout = () =>{
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // seteo la funcion navigate para usarla fuera de los componentes 
  // en este caso para utilizarla en axios interceptor
  globalNavigation.navigate = useNavigate();
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