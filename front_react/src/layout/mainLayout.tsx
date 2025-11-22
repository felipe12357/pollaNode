import { Outlet, useNavigation } from "react-router-dom"
import { HeaderComponent } from "./header/header.component"
import { ToastContainer } from "react-toastify"
import { LoadingComponent } from "./loading/loading.component";

export const MainLayout = () =>{
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
    return (
        <>
            <HeaderComponent/>
             {isLoading && <LoadingComponent />}
            <ToastContainer />
            <Outlet ></Outlet>
        </>
    )
}