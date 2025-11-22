import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layout/mainLayout";
import { Suspense } from "react";
import { AdminPage, HomePage } from "./pages";
import { AdminLoader } from "./pages/admin/admin.loader";
import { LoadingComponent } from "./layout/loading/loading.component";

//Utilizo Suspense para lazy loading
export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children:[
          {
              path: "home", 
              element: <Suspense fallback={<LoadingComponent/>}> 
                <HomePage/>
              </Suspense>
          },{
            path: "admin",
            element: <Suspense fallback={<LoadingComponent/>}> <AdminPage/> </Suspense>,
            loader: async () => await AdminLoader(),
          }
        ]
    }
]);

