import { createRouter,createWebHistory } from "vue-router";
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import UserManagement from "../views/UserManagement.vue"
import Menu from "../views/Menu.vue"
import MenuManagement from "../views/MenuManagement.vue"
import Cart from "../views/Cart.vue"
import Order from "../views/Order.vue"
// import UserLayout from "../layouts/UserLayout.vue"

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
        path:"/user-management",
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
        path:"/admin/order",
        component: Order,
    },
    {
        path:"/kitchen/order",
        component: Order,
    },
    {
        path:"/user/order",
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