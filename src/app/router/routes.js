
import Admin from "../../features/Admin/Admin";
import Dashboard from "../../features/Public/Dashboard/Dashboard";
import Public from "../../features/Public/Public";

const routes = [
    {
        path: "/",
        element: <Public/>,
        children: [
            {
                path: "",
                element: <Dashboard/>
            }
        ],
    },
    {
        path: "/admin",
        element: <Admin/>,
        children: [],
    }
];

export default routes;