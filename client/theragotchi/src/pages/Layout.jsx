import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Layout = () => (
    <div className="Layout">
        <Navbar />
        <Outlet />
    </div>
);

export default Layout;