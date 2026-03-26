import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./components/Dashboard";
import { Orders } from "./components/Orders";
import { OrderDetails } from "./components/OrderDetails";
import { Products } from "./components/Products";
import { Customers } from "./components/Customers";
import { Analytics } from "./components/Analytics";
import { Settings } from "./components/Settings";
import { ProfileSettings } from "./components/ProfileSettings";
import { Users } from "./components/Users";
import { Login } from "./components/Login";
import { Notifications } from "./components/Notifications";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "orders", Component: Orders },
      { path: "orders/:orderId", Component: OrderDetails },
      { path: "products", Component: Products },
      { path: "customers", Component: Customers },
      { path: "users", Component: Users },
      { path: "analytics", Component: Analytics },
      { path: "notifications", Component: Notifications },
      { path: "settings", Component: Settings },
      { path: "profile", Component: ProfileSettings },
    ],
  },
]);
