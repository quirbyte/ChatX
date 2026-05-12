import { Outlet,Navigate } from "react-router-dom";

export default function AuthProtected(){
    const token = localStorage.getItem("chatx_token");
    const user = localStorage.getItem("chatx_user");
    if(token && user){
        return <Navigate to="/chat" replace />
    }
    return <Outlet/>
}