import type { NavigateFunction } from "react-router-dom";

const globalNavigation = { navigate: null } as {
  navigate: null | NavigateFunction;
};

export default globalNavigation;