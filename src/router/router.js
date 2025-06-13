import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UserManagement from "../views/UserManagement.vue";
import Menu from "../views/Menu.vue";
import MenuManagement from "../views/MenuManagement.vue";
import Cart from "../views/Cart.vue";
import Order from "../views/Order.vue";
import UserLayout from "../layouts/UserLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue"
import KitchenLayout from "../layouts/KitchenLayout.vue"
import { h } from 'vue'
const routes = [
  {
    path:"/",
    name: "User",
    redirect: "/menu"
  },
  {
    path:"/menu",
    component: withDefaultLayout(Menu),
  },
  {
    path:"/cart",
    component: withDefaultLayout(Cart),
  },
  {
    path:"/login",
    component: withDefaultLayout(Login),
  },
  {
    path:"/register",
    component: withDefaultLayout(Register),
  },
  // {
  //   path:"/order",
  //   component: withDefaultLayout(Order),
  // },
  {
    path:"/admin",
    name: "Admin",
    component: AdminLayout,
    children:[
      {
        path:"menu-management",
        component: MenuManagement,
      },
      {
        path:"user-management",
        component: UserManagement,
      },
      {
        path:"order",
        component: Order,
      },
      {
        path:"login",
        component: Login,
      },
      {
        path:"register",
        component: Register,
      },
    ]
  },
  {
    path:"/kitchen",
    name: "Kitchen",
    component: KitchenLayout,
    children:[
        {
          path:"menu-management",
          component: MenuManagement,
        },
        {
          path:"order",
          component: Order,
        },
        {
          path:"login",
          component: Login,
        },
        {
          path:"register",
          component: Register,
        },
    ]
  },
  // {
  //   path: "/",
  //   redirect: "/menu",
  // },
  // {
  //   path: "/login",
  //   component: Login,
  // },
  // {
  //   path: "/register",
  //   component: Register,
  // },
  // {
  //   path: "/user-management",
  //   component: UserManagement,
  // },
  // {
  //   path: "/menu",
  //   component: Menu,
  // },
  // {
  //   path: "/cart",
  //   component: Cart,
  // },
  // {
	// 	path: "/order",
  //   component: Order,
  // },
  // {
  //   path: "/menu-management",
  //   component: MenuManagement,
  // },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Hàm lấy thông tin người dùng hiện tại từ localStorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("users"));
};

//Viết hoa chữ đầu dòng
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// Hàm bọc một component (page) vào layout mặc định
function withDefaultLayout(PageComponent) {
  return {
    render() {
      // Sử dụng layout (ví dụ UserLayout) để bọc component
      return h(UserLayout, null, {
        default: () => h(PageComponent),
      });
    },
  };
}

// Middleware router - chặn truy cập không đúng quyền
router.beforeEach((to, from, next) => {
  const user = getCurrentUser(); // Lấy thông tin user từ localStorage

  // Nếu đường dẫn bắt đầu bằng /admin (trang admin)
  if (to.path.startsWith("/admin")) {
    // Nếu chưa đăng nhập hoặc không phải admin
    if (!user || user.role !== "admin") {
      // Chuyển hướng về trang phù hợp với vai trò (User, Guest,...)
      return next({ name: capitalizeFirstLetter(user?.role || "login") });
    }
  }else if (to.path.startsWith("/kitchen")) {
    // Nếu chưa đăng nhập hoặc không phải kitchen
    if (!user || user.role !== "kitchen") {
      // Chuyển hướng về trang phù hợp với vai trò (User, Guest,...)
      return next({ name: capitalizeFirstLetter(user?.role || "login") });
    }
  }

  // Nếu không bị chặn thì tiếp tục
  next();
});
export default router;