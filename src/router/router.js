import { createRouter,createWebHistory } from "vue-router";
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import UserManagement from "../views/UserManagement.vue"
import Menu from "../views/Menu.vue"
import MenuManagement from "../views/MenuManagement.vue"
import Cart from "../views/Cart.vue"
import Order from "../views/Order.vue"

const routes = [
    {
        path:"/",
        redirect: "/menu"
    },
    {
        path:"/login",
        component: Login,
    },
    {
        path:"/register",
        component: Register,
    },
    {
        path:"/users",
        component: UserManagement,
    },
    {
        path:"/menu",
        component: Menu,
    },
    {
        path:"/cart",
        component: Cart,
    },
    {
        path:"/order",
        component: Order,
    },
    {
        path:"/menu-management",
        component: MenuManagement,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;