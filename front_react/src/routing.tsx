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
import CompleteRegisterPage from "./pages/complete-register/complete-register.page";
import { CompleteRegisterLoader } from "./pages/complete-register/complete-register.loader";
import { ResultListLoader } from "./pages/home/components/resultList.loader";
import SpyUserPage from "./pages/spyUser/spyUser.page";
import { spyUserLoader, type SpyUserLoaderParams } from "./pages/spyUser/spyUser.loader";
import SpyMatchPage from "./pages/spyMatch/spyMatch.page";
import { spyMatchLoader, type SpyMatchParams } from "./pages/spyMatch/spyMatch.loader";

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
              path: "complete-register",
              element: <Suspense fallback={<LoadingComponent/>}> 
                <CompleteRegisterPage/>
              </Suspense>,
              loader: async (params) => await CompleteRegisterLoader(params),
          },
          {
              path: "home", 
              element: <Suspense fallback={<LoadingComponent/>}> 
                <HomePage/>
              </Suspense>,
              loader: async () => await ResultListLoader(),
          }, {
              path: "forecast/:userId", 
              element: <Suspense fallback={<LoadingComponent/>}> 
                <ForecastPage/>
              </Suspense>,
              loader: async ({params}) => await ForecastLoader(params as ForecastLoaderParams),
          }, {
            path: "spy-match/:matchId", 
            element: <Suspense fallback={<LoadingComponent/>}> 
              <SpyMatchPage/>
            </Suspense>,
            loader: async ({params}) => await spyMatchLoader(params as SpyMatchParams),
          } , {
              path: "spy-user/:userId", 
              element: <Suspense fallback={<LoadingComponent/>}> 
                <SpyUserPage/>
              </Suspense>,
              loader: async ({params}) => await spyUserLoader(params as SpyUserLoaderParams),
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

