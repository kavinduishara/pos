import HomePage from "../components/HomePage";
import AddEmployees from '../components/AddEmployees';
import SettingsPage from "../components/SettingsPage";
import { Home,Settings,BarChart3,UserPlus2,LogOut, User2, Boxes, RefreshCcw, Replace, Store, } from "lucide-react";
import Statistics from "../components/Statistics";
import Profile from "../components/Profile";
import StockManager from "../components/StockManager";
import ChooseStore from "../components/ChooseStore";
import { useAuth } from "../context/Authcontext";


const array = [
  { link: 'home', text: 'Home', icon: Home, element: HomePage,role:["all"]  },
  { link: 'stock', text: 'Stock', icon: Boxes, element: StockManager,role:["OWNER"]  },
  { link: 'addpeople', text: 'Employees', icon: UserPlus2, element: AddEmployees ,role:["OWNER"] },
  { link: 'statistics', text: 'Statistics', icon: BarChart3, element: Statistics ,role:["OWNER"] },
  { link: 'profile', text: 'Profile', icon: User2, element: Profile ,role:["all"] },
  { link: 'settings', text: 'Settings', icon: Settings, element: SettingsPage,role:["all"]  },
  { link: 'changestore', text: 'Change store', icon:Replace, element: ChooseStore,role:["all"] },
  { link: 'logout', text: 'Logout', icon: LogOut, element: AddEmployees ,role:["all"]}
];

function getArray() {
    return array
}
export default getArray