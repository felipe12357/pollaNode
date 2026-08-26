import { lazy } from "react";
import type { ForecastLoaderParams } from "./forecast/forecast.loader";
import type { LoaderFunctionArgs } from "react-router-dom";
import type { SpyUserLoaderParams } from "./spyUser/spyUser.loader";
import type { SpyMatchParams } from "./spyMatch/spyMatch.loader";

export const HomePage = lazy(()=>import("./home/home.page"));
export const ResultListLoader  = async () => {
    const { ResultListLoader } = await import('./home/components/resultList.loader');
    return ResultListLoader();
  };
  

export const AdminPage = lazy(()=>import('./admin/admin.page'));
export const AdminLoader  = async () => {
  const { AdminLoader } = await import('./admin/admin.loader');
  return AdminLoader();
};

export const LoginPage = lazy(()=>import('./login/login.page'));
export const loginAction  = async ( params: {request: Request}) => {
    const { loginAction } = await import('./login/login.action');
    return loginAction(params);
  };

export const ForecastPage = lazy(()=>import('./forecast/forecast.page'));
export const ForecastLoader  = async ( params: ForecastLoaderParams ) => {
  const { ForecastLoader } = await import('./forecast/forecast.loader');
  return ForecastLoader(params);
};

export const RegisterPage = lazy(()=>import('./register/register.page'));
export const registerAction  = async ( params: {request: Request}) => {
    const { registerAction } = await import('./register/register.action');
    return registerAction(params);
  };

export const CompleteRegisterPage = lazy(()=>import('./complete-register/complete-register.page'));
export const CompleteRegisterLoader  = async ( params: LoaderFunctionArgs) => {
    const { CompleteRegisterLoader } = await import('./complete-register/complete-register.loader');
    return CompleteRegisterLoader(params);
  };

export const SpyUserPage = lazy(()=>import('./spyUser/spyUser.page'));
export const spyUserLoader  = async ( params: SpyUserLoaderParams) => {
    const { spyUserLoader } = await import('./spyUser/spyUser.loader');
    return spyUserLoader(params);
  };


export const SpyMatchPage = lazy(()=>import('./spyMatch/spyMatch.page'));
export const spyMatchLoader  = async ( params: SpyMatchParams) => {
    const { spyMatchLoader } = await import('./spyMatch/spyMatch.loader');
    return spyMatchLoader(params);
  };