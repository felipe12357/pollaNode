import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "./layout/mainLayout";
import { Suspense } from "react";
import { 
  AdminPage, AdminLoader,
  HomePage, ResultListLoader, 
  LoginPage, loginAction,
  ForecastPage, ForecastLoader,
  RegisterPage, registerAction,
  CompleteRegisterPage, CompleteRegisterLoader,
  SpyUserPage, spyUserLoader,
  SpyMatchPage, spyMatchLoader
} from "./pages";
import { LoadingComponent } from "./layout/loading/loading.component";
import type { SpyUserLoaderParams } from "./pages/spyUser/spyUser.loader";
import type {  SpyMatchParams } from "./pages/spyMatch/spyMatch.loader";
import type { ForecastLoaderParams } from "./pages/forecast/forecast.loader";

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

