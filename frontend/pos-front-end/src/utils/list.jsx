import HomePage from "../components/HomePage";
import Employees from '../components/Employees';
import SettingsPage from "../components/SettingsPage";
import { Home,Settings,BarChart3,UserPlus2,LogOut, User2, Boxes, RefreshCcw, Replace, Store, } from "lucide-react";
import Statistics from "../components/Statistics";
import Profile from "../components/Profile";
import StockManager from "../components/StockManager";
import StoreManager from "../components/StoreManager";


const array = [
  { link: 'home',         text: 'Home', icon: Home, element: HomePage,role:["OWNER","ADMIN","CACHE"]  },
  { link: 'stock',        text: 'Stock', icon: Boxes, element: StockManager,role:["OWNER","ADMIN"]  },
  { link: 'employees',    text: 'Employees', icon: UserPlus2, element: Employees ,role:["OWNER","ADMIN"] },
  { link: 'statistics',   text: 'Statistics', icon: BarChart3, element: Statistics ,role:["OWNER","ADMIN"] },
  { link: 'profile',      text: 'Profile', icon: User2, element: Profile ,role:["all"] },
  { link: 'settings',     text: 'Settings', icon: Settings, element: SettingsPage,role:["all"]  },
  { link: 'StoreManager', text: 'StoreManager', icon:Replace, element: StoreManager,role:["all"] },
  
];

function getArray() {
    return array
}
export default getArray