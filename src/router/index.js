import MainWrapper from "components/MainWrapper";
import Home from "screens/HomeScreen";
export const MainRoutes = [
  {
    path: "/",
    component: MainWrapper,
    routes: [
      {
        path: "/",
        component: Home,
      },
    ],
  },
];
