import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "./layout/mainLayout";
import { Suspense } from "react";
import { AdminPage, HomePage, LoginPage } from "./pages";
import { AdminLoader } from "./pages/admin/admin.loader";
import { LoadingComponent } from "./layout/loading/loading.component";
import ForecastPage from "./pages/forecast/forecast.page";
import { ForecastLoader } from "./pages/forecast/forecast.loader";

//Utilizo Suspense para lazy loading
export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children:[
          { index: true, element: <Navigate to="/home" replace /> },
          {
              path: "login", 
              element: <Suspense fallback={<LoadingComponent/>}> 
                <LoginPage/>
              </Suspense>
          },
          {
              path: "home", 
              element: <Suspense fallback={<LoadingComponent/>}> 
                <HomePage/>
              </Suspense>
          }, {
              path: "forecast", 
              element: <Suspense fallback={<LoadingComponent/>}> 
                <ForecastPage/>
              </Suspense>,
              loader: async () => await ForecastLoader(),
          }
          ,{
            path: "admin",
            element: <Suspense fallback={<LoadingComponent/>}> <AdminPage/> </Suspense>,
            loader: async () => await AdminLoader(),
            errorElement: <div>Error loading page</div>
          },
          {
            path: "*",
            element: <Navigate to="/home" replace />,
          },
        ]
    }
]);

