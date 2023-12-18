import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from "@/components/HelloWorld.vue";
import UsersData from "@/views/UsersData.vue";
import PostsData from "@/views/PostsData.vue";
import UserData from "@/components/users/UserData.vue";
import PostData from "@/components/posts/PostData";
import ProductList from "@/views/ProductList.vue";
import ProductCreate from "@/views/ProductCreate.vue";
import ProductEdit from "@/views/ProductEdit.vue";
import AdminUserEdit from "@/views/AdminUserEdit.vue";
import AdminCategories from "@/views/AdminCategories.vue";
import UserEdit from "@/views/UserEdit.vue";
import ProductData from "@/components/products/ProductData.vue";
import ProductShow from "@/views/ProductShow.vue";
import UserRegister from "@/views/UserRegister.vue";
import UserLogin from "@/views/UserLogin.vue";
import MyProducts from "@/views/MyProducts.vue";
import CategoryData from "@/views/CategoryData.vue";
import UserCategory from "@/views/UserCategory.vue";
import AdminPage from "@/views/AdminPage.vue";   
import AdminProduct from "@/views/AdminProduct.vue"; 
import AdminClient from "@/views/AdminClient.vue";
import CategoryCreate from "@/views/CategoryCreate.vue";

const routes = [
    { path: '/', component: HelloWorld, name: 'Home' },
    { path: '/users', component: UsersData, name: 'UsersData' },
    { path: '/user-data', component: UserData, name: 'UserData' },
    { path: '/posts', component: PostsData, name: 'PostsData' },
    { path: '/products', component: ProductList, name: 'ProductList' },
    { path: '/products/my', component: MyProducts, name: 'MyProducts' },
    { path: '/product/create', component: ProductCreate, name: 'ProductCreate' },
    { path: '/admin/users', component: AdminUserEdit, name: 'AdminUserEdit' },
    { path: `/admin/categories`, component: AdminCategories, name: 'AdminCategories' },
    { path: `/category/create`, component: CategoryCreate, name: 'CategoryCreate' },
    { path: `/user/:id/edit`, component: UserEdit, name: 'UserEdit' },
    // { path: '/admin/users', component: AdminUserEdit, name: 'AdminUserEdit' },
    { path: '/product/:id/edit', component: ProductEdit, name: 'ProductEdit' },
    { path: '/product/:id/show', component: ProductShow, name: 'ProductShow' },
    { path: '/product/:id', component: ProductData, name: 'ProductData' },
    { path: '/post/:id/user/:userId', component: PostData, name: 'PostData' },
    { path: '/register', component: UserRegister, name: 'UserRegister' }, 
    { path: '/login', component: UserLogin, name: 'UserLogin' },
    { path: '/category', component: CategoryData, name: 'CategoryData' }, 
    { path: '/usercategory', component: UserCategory, name: 'UserCategory' },
    { path: '/adminpage', component: AdminPage, name: 'AdminPage' },
    { path: '/adminproduct', component: AdminProduct, name: 'AdminProduct' },
    { path: '/adminclient', component: AdminClient, name: 'AdminClient' }, 
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
router.beforeEach((to, _from, next) => {
    const isAdmin = localStorage.getItem('roles') === 'Admin'; 
    if (to.name === 'CategoryData' && !isAdmin) {
        next({ name: 'UserCategory' }); 
    } else {
        next(); 
    }
});

export default router;
