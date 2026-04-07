import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "./layout/mainLayout";
import { Suspense } from "react";
import { AdminPage, HomePage, LoginPage } from "./pages";
import { AdminLoader } from "./pages/admin/admin.loader";
import { LoadingComponent } from "./layout/loading/loading.component";
import ForecastPage from "./pages/forecast/forecast.page";
import { ForecastLoader, type ForecastLoaderParams } from "./pages/forecast/forecast.loader";
import { loginAction } from "./pages/login/login.action";
import RegisterPage from "./pages/register/register.page";
import { registerAction } from "./pages/register/register.action";

//Utilizo Suspense para lazy loading
export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children:[
          { index: true, element: <Navigate to="/home" replace /> },
          {
              path: "login",
              action:(params) => loginAction(params),
              element: <Suspense fallback={<LoadingComponent/>}> 
                <LoginPage/>
              </Suspense>
          },
          {
              path: "register",
              action:(params) => registerAction(params),
              element: <Suspense fallback={<LoadingComponent/>}> 
                <RegisterPage/>
              </Suspense>,
          },
          {
              path: "home", 
              element: <Suspense fallback={<LoadingComponent/>}> 
                <HomePage/>
              </Suspense>
          }, {
              path: "forecast/:userId", 
              element: <Suspense fallback={<LoadingComponent/>}> 
                <ForecastPage/>
              </Suspense>,
              loader: async ({params}) => await ForecastLoader(params as ForecastLoaderParams),
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

