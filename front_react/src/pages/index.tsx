import { lazy } from "react";

export const HomePage = lazy(()=>import("./home/home.page"));
export const AdminPage = lazy(()=>import('./admin/admin.page'));
