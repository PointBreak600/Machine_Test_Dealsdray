import { Create, Admin, Edit, List } from "../Pages";

const protectedRoutes = [
    {
        title: "Create Employee",
        path: "/admin/create",
        description: "Create Employee Page",
        element: <Create />,
    },
    {
        title: "List Employees",
        path: "/admin/list",
        description: "List Employees Page",
        element: <List />,
    },
    {
        title: "Edit Employee",
        path: "/admin/edit/:id",
        description: "Edit Employee Page",
        element: <Edit />,
    },
    {
        title: "Admin Home",
        path: "/admin",
        description: "Admin Panel Page",
        element: <Admin />,
    },
];

export default protectedRoutes;