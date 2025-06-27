import HomePage from "../components/HomePage";
import AddEmployees from "../components/AddEmployees";
import SettingsPage from "../components/SettingsPage";
import { Home,Settings,BarChart3,UserPlus2,LogOut, User2, Boxes, } from "lucide-react";
import Statistics from "../components/Statistics";
import Profile from "../components/Profile";
import StockManager from "../components/StockManager";


const array = [
  { link: '', text: 'Home', icon: Home, element: <HomePage /> },
  { link: 'stock', text: 'Stock', icon: Boxes, element: <StockManager /> },
  { link: 'addpeople', text: 'Employees', icon: UserPlus2, element: <AddEmployees /> },
  { link: 'statistics', text: 'Statistics', icon: BarChart3, element: <Statistics /> },
  { link: 'profile', text: 'Profile', icon: User2, element: <Profile /> },
  { link: 'settings', text: 'Settings', icon: Settings, element: <SettingsPage /> },
  { link: 'logout', text: 'Logout', icon: LogOut, element: <AddEmployees /> }
];

function getArray() {
    return array
}
export default getArray