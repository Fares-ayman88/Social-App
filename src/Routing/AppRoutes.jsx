import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from './../pages/Home/Home';
import NotFound from './../pages/NotFound/NotFound';
import Login from './../pages/Auth/Login/Login';
import Register from './../pages/Auth/Register/Register';
import AuthLayout from './../Layouts/AuthLayout/AuthLayout';
import Profile from './../pages/Profile/Profile';
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import PostDetails from "../pages/PostDetails/PostDetails";
import Settings from "../pages/Settings/Settings";
export const router = createBrowserRouter([
    {
        path: "",
        element: <MainLayout />,
        children:[
            {
            index:true,
        element: <ProtectedRoutes><Home /></ProtectedRoutes>,  
            },
            {
              path: "profile/:userId",
        element: <ProtectedRoutes><Profile /></ProtectedRoutes>,  
            },
            {
              path: "post-details/:postId",
        element: <ProtectedRoutes><PostDetails /></ProtectedRoutes>,  
            },
            {
              path: "settings",
        element: <ProtectedRoutes><Settings /></ProtectedRoutes>,  
            },
            {
              path: "*",
        element: <NotFound />,  
            }
        ]
    },
    
    {
        path:"auth",
        element:<AuthLayout/>,
        children :[
         {
        path:"login",
            element:<ProtectedAuthRoutes><Login/></ProtectedAuthRoutes>
         },          
         {
         path:"register",
            element:<ProtectedAuthRoutes><Register/></ProtectedAuthRoutes>
         }          
        ]
    }
])
